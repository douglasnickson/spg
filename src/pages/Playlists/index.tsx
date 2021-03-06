import React, { useEffect, useState } from 'react';
import {
  FlatList,
  TouchableOpacity,
  ListRenderItemInfo,
  Alert,
} from 'react-native';
import { TestIds, BannerAd, BannerAdSize } from '@react-native-firebase/admob';

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

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-1209664770627704/3842681120';

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
    const { id, name, description } = item;
    handlePlaylist({ data: { id, name, description } });
    navigation.navigate('HomeTab');
  };

  useEffect(() => {
    const getUserPlaylists = async () => {
      setLoading(true);
      try {
        const user = await getUserProfile();
        const userPlaylists = await getPlaylists(user.id);
        setPlaylists(userPlaylists);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        Alert.alert(
          'Erro',
          'Ocorreu um erro ao buscar as playlists do usuário.'
        );
      }
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
            {loading && <Loading title="Buscando playlists..." />}
            <BannerAd
              unitId={adUnitId}
              size={BannerAdSize.SMART_BANNER}
              requestOptions={{
                requestNonPersonalizedAdsOnly: true,
              }}
              onAdLoaded={() => {
                console.log('Advert loaded');
              }}
              onAdFailedToLoad={(error) => {
                console.error('Advert failed to load: ', error);
              }}
            />
          </SafeAreaViewContainer>
        )}
      </Container>
    </>
  );
};

export default Playlist;
