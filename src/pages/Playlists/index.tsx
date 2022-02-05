import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, ListRenderItemInfo } from 'react-native';

import {
  Container,
  SafeAreaViewContainer,
  ItemContainer,
  ItemImage,
  ItemTitle,
  ItemDescription,
  ItemInfoContainer,
  MsgText,
} from './styles';

import Loading from '../../components/Loading';

import { useAuth } from '../../contexts/auth';
import { IPlaylist } from 'src/model/IPlaylist';
import { getPlaylists, getUserProfile } from '../../services/spotify';

import imageNotFound from '../../assets/image-not-found.jpg';

interface IFlatlistRender {
  item: IPlaylist;
  onPress(data: IPlaylist): void;
}

interface Props {
  navigation: any;
}

const Playlist: React.FC<Props> = ({ navigation }: Props) => {
  const { handlePlaylist } = useAuth();
  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);
  const [loading, setLoading] = useState(false);

  const Item = ({ item, onPress }: IFlatlistRender) => (
    <TouchableOpacity onPress={() => onPress(item)}>
      <ItemContainer>
        <ItemImage
          source={{
            uri: item.images[0].url ? item.images[0].url : imageNotFound,
          }}
        />
        <ItemInfoContainer>
          <ItemTitle>{item.name}</ItemTitle>
          <ItemDescription>{item.description}</ItemDescription>
          <ItemDescription>
            {`Public: ${item.public} - Total de músicas: ${item.tracks.total}`}
          </ItemDescription>
        </ItemInfoContainer>
      </ItemContainer>
    </TouchableOpacity>
  );

  const renderItem = ({ item }: ListRenderItemInfo<IPlaylist>) => (
    <Item item={item} onPress={goToHome} />
  );

  const goToHome = (item: IPlaylist) => {
    const { id, name } = item;
    handlePlaylist({ data: { id, name } });
    navigation.navigate('HomeTab');
  };

  useEffect(() => {
    const getUserPlaylists = async () => {
      setLoading(true);
      const user = await getUserProfile();
      const userPlaylists = await getPlaylists(user.id);
      setPlaylists(userPlaylists);
      setLoading(false);
    };
    getUserPlaylists();
  }, []);

  return (
    <>
      <Container>
        {!loading && playlists && (
          <SafeAreaViewContainer>
            <MsgText>
              Selecione uma playlist abaixo para adicionar novas músicas.
            </MsgText>
            <FlatList
              data={playlists}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </SafeAreaViewContainer>
        )}
        {loading && <Loading title="Buscando playlists..." />}
      </Container>
    </>
  );
};

export default Playlist;
