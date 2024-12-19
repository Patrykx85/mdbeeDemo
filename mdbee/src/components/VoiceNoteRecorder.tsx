import { Box, Button, Text } from "@mantine/core";
import { Note } from "../Interfaces";
import { useState, useRef, useEffect } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import noteService from "../services/note.service";

const VoiceNoteRecorder = ({ note }: { note: Note }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [voiceBlob, setVoiceBlob] = useState<Blob | null>(null);
  const myRef = useRef<HTMLInputElement>(null);

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
      if (myRef?.current) {
        myRef.current.appendChild(audio);
      }
    }
  }, [mediaBlobUrl]);

  const uploadToServer = () => {
    if (voiceBlob) {
      const fileName = `test.wav`;
      let file = new File([voiceBlob], fileName);
      const formData = new FormData();
      formData.append("voiceMemo", file);
      noteService.uploadVoiceNote(note.id as string, formData);
    }
  };

  return (
    <Box ref={myRef}>
      <Text>{isRecording ? "yyy" : "no"}</Text>
      <p>{status}</p>
      <p>{mediaBlobUrl}</p>
      <audio src={mediaBlobUrl} />
      <Button
        onClick={startRecording}
        style={{}}
        bg={"#FF0000"}
        loading={status !== "idle"}
        loaderProps={{ type: "dots" }}
      >
        Start recording {isRecording}
      </Button>
      <Button
        onClick={stopRecording}
        style={{}}
        bg={"#FF0000"}
        // loading={isRecording}
        disabled={status !== "recording"}
        loaderProps={{ type: "dots" }}
      >
        Stop recording
      </Button>
      <Button
        onClick={uploadToServer}
        style={{}}
        bg={"#FF0000"}
        // loading={isRecording}
        disabled={status !== "stopped"}
        loaderProps={{ type: "dots" }}
      >
        Save this recording
      </Button>
    </Box>
  );
};

export default VoiceNoteRecorder;
