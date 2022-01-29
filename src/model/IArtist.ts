interface IImage {
  height: number;
  url: string;
  width: number;
}

export interface IArtist {
  genres: string[];
  id: string;
  images: IImage[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}
