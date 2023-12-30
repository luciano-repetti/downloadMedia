import { createContext, Dispatch, SetStateAction } from 'react';

interface VideoContextProps {
  videoInfo: VideoInfo | null;
  setVideo: Dispatch<SetStateAction<VideoInfo | null>>;
}

interface VideoInfo {
  name: string;
  time: number;
  thumbnail: string;
  author: {
    name: string;
    thumbnail: string;
  };
  views: string;
  videoURL: string;
}

const VideoContext = createContext<VideoContextProps | undefined>(undefined);

export default VideoContext;