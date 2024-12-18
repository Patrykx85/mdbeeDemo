import { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Group,
  TextInput,
  Title,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Note } from "../Interfaces";
import { modals } from "@mantine/modals";
import noteService from "../services/note.service";

const AddNote = () => {
  const [isAdding, setIsAdding] = useState(false);

  const noteForm = useForm({
    initialValues: {
      title: "",
      description: "",
    },
  });

  const addNote = async (values: Note) => {
    try {
      setIsAdding(true);
      const response = await noteService.addNote(values);
      openModal();
      noteForm.reset();
    } catch {
      noteForm.setFieldError("title", "Unable to add note");
    } finally {
      setIsAdding(false);
    }
  };

  const finishAdd = () => {
    noteForm.reset();
    modals.closeAll();
  };

  const openModal = () =>
    modals.open({
      title: "New note added",
      children: (
        <>
          <Button fullWidth onClick={finishAdd} mt="md">
            OK
          </Button>
        </>
      ),
    });

  return (
    <Box
      component="form"
      mx="auto"
      style={stylingObject.boxStyle}
      onSubmit={noteForm.onSubmit((values) => addNote(values))}
    >
      <Flex direction={"column"} gap={"md"}>
        <Title order={1} c={"#FF0000"} size={"h2"}>
          Enter new note
        </Title>
        <Divider my="sm" size={"sm"} />
        <TextInput
          label="Title"
          placeholder="Enter note title"
          mt="md"
          flex={1}
          name="title"
          {...noteForm.getInputProps("title")}
        />
        <Textarea
          label="Description"
          placeholder="Enter note description"
          mt="md"
          flex={1}
          {...noteForm.getInputProps("description")}
          name="description"
          resize="vertical"
          minRows={5}
        />
        <Group justify="center" mt="xl">
          <Button
            type="submit"
            loading={isAdding}
            loaderProps={{ type: "dots" }}
          >
            Add note
          </Button>
        </Group>
      </Flex>
    </Box>
  );
};

export default AddNote;

const stylingObject = {
  boxStyle: {
    marginBottom: "30px",
  },
  sectionTitle: {
    paddingTop: "20px",
    textAlign: "left",
  },
  countryInput: {
    maxWidth: "60px",
  },
};
