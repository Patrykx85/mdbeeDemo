import {
  QueryClientProvider,
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { modals } from "@mantine/modals";
import { MRT_ColumnDef, MantineReactTable } from "mantine-react-table";
import { useMemo, useState } from "react";
// import packageService from "../services/package.service";
import {
  Box,
  Button,
  Divider,
  Flex,
  LoadingOverlay,
  Text,
} from "@mantine/core";
import { Note } from "../Interfaces";
import noteService from "../services/note.service";
import moment from "moment";

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
  const [isLoading, setIsLoading] = useState(false);const queryClient = useQueryClient();
  const columns = useMemo(
    () =>
      [
        {
          accessorKey: "id",
          header: "ID",
        },
        {
          accessorKey: "created_at",
          header: "Date",
          Cell: ({ cell }: any) => (
            <span>{moment(cell.getValue()).format("lll")}</span>
          ),
        },
        {
          accessorKey: "title",
          header: "Title",
        },
      ] as MRT_ColumnDef<Note>[],
    [],
  );
  return (
    <QueryClientProvider client={queryClient}>
      <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
      <MantineReactTable
        columns={columns}
        data={data ? data : []}
        enableExpandAll={false}
        // #E9ECEF
        mantineDetailPanelProps={{bg:"#F1F3F5"}}
        renderDetailPanel={({ row }) => (
          <Box>
            <Box
              style={{
                display: "grid",
                margin: "auto",
                gridTemplateColumns: "1fr 1fr 1fr",
                width: "100%",
              }}
            >
              <Text>{row.original.description}</Text>
            </Box>
            <Flex
              align={"center"}
              justify={"center"}
              gap={5}
              mt={10}
            >
              {/* <Button
                onClick={() => printBase64PDF(row.original.label)}
                style={{}}
                bg={"#FF0000"}
                disabled={row.original.status === "canceled"}
              >
                Print label
              </Button>
              <Button
                onClick={() => openCancelModal(row.original.id as string)}
                style={{}}
                bg={"#FF0000"}
                disabled={row.original.status !== "new"}
                loading={isCanceling}
                loaderProps={{ type: 'dots' }}
              >
                Cancel package
              </Button>
              <Button
                style={{}}
                bg={"#FF0000"}
                disabled={row.original.status === "canceled"}
                onClick={() => window.open(`https://www.fedex.com/wtrk/track/?action=track&tracknumbers=${row.original.number}&locale=en_US&cntry_code=us`, "_blank")}
              >
                Track package
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
