interface IImage {
  height: number;
  url: string;
  width: number;
}

export interface IUserProfile {
  displayName: string;
  href: string;
  id: string;
  images: IImage[];
  type: string;
  uri: string;
}
