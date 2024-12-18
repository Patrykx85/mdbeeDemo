import {
  QueryClientProvider,
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { modals } from "@mantine/modals";
import {
  MRT_ColumnDef,
  MRT_TableOptions,
  MantineReactTable,
} from "mantine-react-table";
import { useMemo, useState } from "react";
import {
  ActionIcon,
  Box,
  Button,
  Flex,
  LoadingOverlay,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { Note } from "../Interfaces";
import noteService from "../services/note.service";
import moment from "moment";
import { IconEdit, IconTrash } from "@tabler/icons-react";

const useNotes = () => {
  return useQuery({
    queryKey: ["id"],
    queryFn: async () => {
      const { data } = await noteService.getNotes();
      console.log(data);
      return data;
    },
    placeholderData: keepPreviousData, //useful for paginated queries by keeping data from previous pages on screen while fetching the next page
    // staleTime: 30_000, //don't refetch previously viewed pages until cache is more than 30 seconds old
  });
};

const NotesPage = () => {
  const { status, data, error, isFetching, refetch } = useNotes();
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const openDeleteModal = (note: Note) =>
    modals.openConfirmModal({
      title: "Delete note",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete note <b>{note.title}</b>? This can't
          be undone.
        </Text>
      ),
      labels: { confirm: "Delete note", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => deleteNote(note.id as string),
      lockScroll: true,
    });

  const openEditModal = (note: Note) =>
    modals.open({
      title: "Subscribe to newsletter",
      children: <></>,
    });

  const deleteNote = async (noteId: string) => {
    setIsLoading(true);
    try {
      const response = await noteService.deleteNote(noteId);
      refetch();
    } catch (_error: any) {
      console.log(_error.response);
    } finally {
      setIsLoading(false);
    }
  };

  const columns = useMemo(
    () =>
      [
        {
          accessorKey: "id",
          header: "ID",
          enableEditing: false,
        },
        {
          accessorKey: "created_at",
          header: "Date",
          Cell: ({ cell }: any) => (
            <span>{moment(cell.getValue()).format("lll")}</span>
          ),
          enableEditing: false,
        },
        {
          accessorKey: "title",
          header: "Title",
        },
        {
          accessorKey: "description",
          header: "Description",
          maxSize: 10,
          enableColumnFilter: false,
          Cell: ({ cell }: any) => (
            <div style={{
              maxWidth: '200px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              {cell.getValue()}
            </div>
          ),
        },
      ] as MRT_ColumnDef<Note>[],
    [],
  );

  const handleSaveNote: MRT_TableOptions<Note>["onEditingRowSave"] = async ({
    values,
    table,
  }) => {
    await updateNote(values);
    table.setEditingRow(null); //exit editing mode
  };

  const useUpdateNote = () => {
    return useMutation({
      mutationFn: async (note: Note) => {
        await noteService.updateNote(note.id as string, {
          title: note.title,
          description: note.description,
        });
      },
    });
  };

  const { mutateAsync: updateNote, isPending: isUpdatingUser } =
    useUpdateNote();

  return (
    <QueryClientProvider client={queryClient}>
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <MantineReactTable
        renderRowActions={({ row, table }) => (
          <Flex gap="md">
            <Tooltip label="Edit">
              <ActionIcon onClick={() => table.setEditingRow(row)}>
                <IconEdit />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Delete">
              <ActionIcon
                color="red"
                onClick={() => openDeleteModal(row.original)}
              >
                <IconTrash />
              </ActionIcon>
            </Tooltip>
          </Flex>
        )}
        onEditingRowSave={handleSaveNote}
        enableEditing={true}
        editDisplayMode="modal"
        columns={columns}
        data={data ? data : []}
        enableExpandAll={false}
        mantineDetailPanelProps={{ bg: "#F1F3F5" }}
        renderDetailPanel={({ row }) => (
          <Box>
            <Box
              style={{
                display: "grid",
                margin: "auto",
                gridTemplateColumns: "1fr",
                width: "100%",
              }}
            >
              <Title order={1} c={"#000"} size={"h5"}>
                Note description
              </Title>
              <Text>{row.original.description}</Text>
            </Box>
            <Flex align={"center"} justify={"center"} gap={5} mt={10}>
              <Button
                onClick={() => openEditModal(row.original)}
                style={{}}
                bg={"#FF0000"}
                loading={isLoading}
                loaderProps={{ type: "dots" }}
              >
                Edit Note
              </Button>
              {/* <Button
                onClick={() => openDeleteModal(row.original.id as string)}
                style={{}}
                bg={"#FF0000"}
                loading={isLoading}
                loaderProps={{ type: "dots" }}
              >
                Delete Note
              </Button> */}
            </Flex>
          </Box>
        )}
        positionGlobalFilter="right"
      />
    </QueryClientProvider>
  );
};

export default NotesPage;
