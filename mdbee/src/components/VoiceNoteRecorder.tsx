import { Box, Button, Text, Flex } from "@mantine/core";
import { Note } from "../Interfaces";
import { useState, useRef, useEffect } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import noteService from "../services/note.service";
import { modals } from "@mantine/modals";

const VoiceNoteRecorder = ({ note, refetch }: { note: Note, refetch: any }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [voiceBlob, setVoiceBlob] = useState<Blob | null>(null);
  const boxRef = useRef<HTMLInputElement>(null);

  const onStop = (blobUrl: string, blob: Blob) => {
    setVoiceBlob(blob);
  };
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ video: false, audio: true, onStop: onStop });

  useEffect(() => {
    if (mediaBlobUrl?.startsWith("blob:") === true) {
      const audio = new Audio();
      audio.src = mediaBlobUrl as string;

      audio.controls = true;
      if (boxRef?.current) {
        boxRef.current.appendChild(audio);
      }
    }
  }, [mediaBlobUrl]);

  const uploadToServer = async () => {
    setIsUploading(true);
    try {
      if (voiceBlob) {
        const fileName = `test.wav`;
        let file = new File([voiceBlob], fileName);
        const formData = new FormData();
        formData.append("voiceMemo", file);
        await noteService.uploadVoiceNote(note.id as string, formData);
        await refetch();
        modals.closeAll();
      }
    }
    catch {
      console.log("Problem with upload data")
    }
    finally {
      setIsUploading(false);
    }
  };

  return (
    <Flex 
      ref={boxRef}
      mih={50}
      gap="md"
      justify="center"
      align="flex-start"
      direction="column"
      wrap="wrap"
    >
      <Button
        onClick={startRecording}
        style={{}}
        bg={"#FF0000"}
        loading={status === "recording"}
        disabled={status !== "idle"}
        loaderProps={{ type: "dots" }}
        w={190}
      >
        Start recording
      </Button>
      <Button
        onClick={stopRecording}
        style={{}}
        bg={"green"}
        disabled={status !== "recording"}
        loaderProps={{ type: "dots" }}
        w={190}
      >
        Stop recording
      </Button>
      <Button
        onClick={uploadToServer}
        style={{}}
        bg={"blue"}
        loading={isUploading}
        disabled={status !== "stopped"}
        loaderProps={{ type: "dots" }}
        w={190}
      >
        Save this recording
      </Button>
      <audio src={mediaBlobUrl} />
    </Flex>
  );
};

export default VoiceNoteRecorder;

const stylingObject = {
  boxStyle: {

  },
};