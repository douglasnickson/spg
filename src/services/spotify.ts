import { IArtist } from 'src/model/IArtist';
import { INewPlaylist } from 'src/model/INewPlaylist';
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

export async function getArtists(artist: string): Promise<IArtist[]> {
  try {
    const response = await api.get(`/search?q=${artist}&type=artist`);
    const { artists } = response.data;
    const { items } = artists;

    const result = items
      .filter((item: IArtist) => item.name.includes(artist))
      .map((item: IArtist) => ({
        genres: [...item.genres],
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

export async function getGenres(): Promise<string[]> {
  try {
    const response = await api.get('/recommendations/available-genre-seeds');
    const { genres } = response.data;
    return genres;
  } catch (err) {
    console.error(err);
    throw new Error('Failed to get genres. Error: ' + err);
  }
}

export async function getArtistsByGenre(genre: string): Promise<IArtist[]> {
  try {
    const response = await api.get(`/search?q=${genre}&type=artist&limit=50`);
    const { artists } = response.data;
    const { items } = artists;

    const result = items
      .map((item: IArtist) => ({
        genres: [...item.genres],
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

export async function getArtistAlbums(artistId: string): Promise<string[]> {
  try {
    const response = await api.get(
      `/artists/${artistId}/albums?market=BR&include_groups=album`
    );
    const { items } = response.data;
    const result = items.map((item: any) => item.id);
    return result;
  } catch (err) {
    console.error(err);
    throw new Error('Failed to get artist albums. Error: ' + err);
  }
}

export async function getAlbumTracks(albumId: string): Promise<string[]> {
  try {
    const response = await api.get(
      `/albums/${albumId}/tracks?market=BR&limit=50`
    );
    const { items } = response.data;
    const result = items.map((item: any) => item.id);
    return result;
  } catch (err) {
    console.error(err);
    throw new Error('Failed to get album tracks. Error: ' + err);
  }
}

export async function createPlaylist(
  playlistInfo: INewPlaylist,
  userId: string
): Promise<string> {
  try {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const data = {
      name: playlistInfo.name,
      description: playlistInfo.description,
      public: playlistInfo.public,
      collaborative: playlistInfo.collaborative,
    };

    const response = await api.post(
      `/users/${userId}/playlists`,
      data,
      headers
    );
    const { id } = response.data;
    return id;
  } catch (err) {
    console.error(err);
    throw new Error('Failed to create new playlist. Error: ' + err);
  }
}

export async function addTracksToPlaylist(
  trackList: string[],
  playlistId: string
): Promise<void> {
  try {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const data = {
      uris: trackList,
    };

    await api.post(`/playlists/${playlistId}/tracks`, data, headers);
  } catch (err) {
    console.error(err);
    throw new Error('Failed to add tracks to playlist. Error: ' + err);
  }
}
