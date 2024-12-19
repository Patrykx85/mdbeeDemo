import { Button, Flex } from "@mantine/core";
import noteService from "../services/note.service";
import { useRef, useState } from "react";

const VoiceNote = ({ id }: { id: string }) => {
  const refForAudio = useRef<HTMLInputElement>(null);
  const [fileDownloaded, setFileDownloaded] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const downloadVoiceNote = async () => {
    setIsDownloading(true);
    try {
      const respponse = await noteService.downloadVoiceNote(id);
      const fileDownload: string = respponse.data;
      setFileDownloaded(true);
      const audio = new Audio(fileDownload);
      audio.controls = true;
      if (refForAudio?.current) {
        refForAudio.current.appendChild(audio);
      }
    } catch (e) {
      console.log("problem with download");
    } finally {
      setIsDownloading(false);
    }
  };
  return (
    <Flex ref={refForAudio}>
      <Button
        onClick={downloadVoiceNote}
        style={{}}
        bg={"#FF0000"}
        loading={isDownloading}
        disabled={fileDownloaded}
        loaderProps={{ type: "dots" }}
      >
        Download voice note
      </Button>
    </Flex>
  );
};

export default VoiceNote;
