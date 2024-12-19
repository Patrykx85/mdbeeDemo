export interface Note {
  id?: string;
  title: string;
  description: string;
  created_at?: string;
  voice_memos?: string[];
}

export interface VoiceMemo {
  id: string;
  file: string;
}