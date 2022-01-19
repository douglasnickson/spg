import { IPlaylist } from 'src/model/IPlaylist';
import { IUserProfile } from 'src/model/IUserProfile';

export async function getUserProfile(): Promise<IUserProfile> {
  throw new Error('Method not implemented.');
}

export async function getPlaylists(userId: string): Promise<IPlaylist[]> {
  throw new Error('Method not implemented.');
}
