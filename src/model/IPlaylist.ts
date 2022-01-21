interface IImage {
  height: number;
  url: string;
  width: number;
}

interface ITrack {
  href: string;
  total: number;
}

export interface IPlaylist {
  id: string;
  uri: string;
  name: string;
  collaborative: boolean;
  public: boolean;
  description: string;
  href: string;
  images: IImage[];
  tracks: ITrack;
}
