import { IPlaylist } from 'src/model/IPlaylist';
import { IUserProfile } from 'src/model/IUserProfile';

import api from './api';

interface IImage {
  height: number;
  url: string;
  width: number;
}

export async function getUserProfile(): Promise<IUserProfile> {
  try {
    const response = await api.get('/me');
    const { display_name, id, email, href, images, type, uri } = response.data;
    return {
      displayName: display_name,
      email,
      href,
      id,
      images,
      type,
      uri,
    };
  } catch (err) {
    console.error(err);
    throw new Error('Failed to get user profile. ' + err);
  }
}

export async function getPlaylists(userId: string): Promise<IPlaylist[]> {
  try {
    const response = await api.get(`/users/${userId}/playlists`);
    const { items } = response.data;
    const result = items.map((item: IPlaylist) => ({
      id: item.id,
      uri: item.uri,
      name: item.name,
      collaborative: item.collaborative,
      public: item.public,
      description: item.description,
      href: item.href,
      images: item.images.slice(),
      tracks: { ...item.tracks },
    }));
    return result;
  } catch (err) {
    console.error(err);
    throw new Error('Failed to get playlists. Error: ' + err);
  }
}
