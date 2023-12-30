import React, { useState, createContext, Dispatch, SetStateAction } from 'react';

interface VideoProviderProps {
  children: React.ReactNode;
}

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

const VideoProvider: React.FC<VideoProviderProps> = ({ children }) => {
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);

  const setVideo: VideoContextProps['setVideo'] = (newVideoInfo) => {
    setVideoInfo(newVideoInfo);
  };

  return (
    <VideoContext.Provider value={{ videoInfo, setVideo }}>
      {children}
    </VideoContext.Provider>
  );
};

export { VideoContext, VideoProvider };