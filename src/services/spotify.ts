import { IArtist } from 'src/model/IArtist';
import { IPlaylist } from 'src/model/IPlaylist';
import { IUserProfile } from 'src/model/IUserProfile';

import api from './api';

export async function getUserProfile(): Promise<IUserProfile> {
  try {
    const response = await api.get('/me');
    const { display_name, id, email, href, images, type, uri, followers } =
      response.data;
    return {
      displayName: display_name,
      email,
      href,
      id,
      images,
      type,
      uri,
      followers: followers.total,
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

export async function getArtist(artist: string): Promise<IArtist[]> {
  try {
    const response = await api.get(`/search?q=${artist}&type=artist`);
    const { artists } = response.data;
    const { items } = artists;

    const result = items
      .filter((item: IArtist) => item.name.includes(artist))
      .map((item: IArtist) => ({
        genres: { ...item.genres },
        id: item.id,
        images: item.images.slice(),
        name: item.name,
        popularity: item.popularity,
        type: item.type,
        uri: item.uri,
      }))
      .sort((a: IArtist, b: IArtist) => b.popularity - a.popularity);
    return result;
  } catch (err) {
    console.error(err);
    throw new Error('Failed to get artist. Error: ' + err);
  }
}
