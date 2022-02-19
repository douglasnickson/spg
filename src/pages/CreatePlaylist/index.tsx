import React, { useEffect, useState } from 'react';
import { TestIds, BannerAd, BannerAdSize } from '@react-native-firebase/admob';

import {
  Text,
  FlatList,
  TouchableOpacity,
  ListRenderItemInfo,
  Modal,
  Alert,
} from 'react-native';

import { IArtist } from 'src/model/IArtist';
import {
  getArtists,
  getArtistAlbums,
  getAlbumTracks,
  getUserProfile,
  createPlaylist,
  addTracksToPlaylist,
  getArtistsByGenre,
} from '../../services/spotify';

import {
  Container,
  ContainerModal,
  SafeAreaViewContainer,
  ItemContainer,
  ItemImage,
  ItemTitle,
  ItemDescription,
  ItemInfoContainer,
  MsgText,
  PlaylistInfoContainer,
  PlaylistInfoText,
  PlaylistInfoTextBold,
  ButtonSubmit,
} from './styles';

import { getRandomItems, parseTracksWithUri } from '../../utils/Utils';

import Loading from '../../components/Loading';
import Button from '../../components/Button';
import imageNotFound from '../../assets/image-not-found.jpg';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-1209664770627704/7569123392';

type IArtistRender = {
  item: IArtist;
  onPress(data: IArtist): void;
};

type Props = {
  route: any;
  navigation: any;
};

export default function Search({ route, navigation }: Props) {
  const { data } = route.params;

  const [loading, setLoading] = useState(false);
  const [editPlaylist, setEditPlaylist] = useState(false);
  const [creatingPlaylist, setCreatingPlaylist] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [artists, setArtists] = useState([]);
  const [genre, setGenre] = useState('unknown');
  const [artistList, setArtistList] = useState<IArtist[]>([]);
  const [selectedArtists, setSelectedArtists] = useState<IArtist[]>([]);

  const handleSubmit = async () => {
    const playlistInfo = {
      name: data.title,
      description: data.description,
      public: data.isPublic,
      collaborative: data.collaborative,
      playlistId: data.playlist.data.id,
    };

    if (selectedArtists.length === 0) {
      Alert.alert(
        'Erro',
        'Você deve selecionar pelo menos um artista para criar a playlist'
      );
      return;
    }

    setCreatingPlaylist(true);
    try {
      const userProfile = await getUserProfile();

      const artistsIds = selectedArtists.map((artist) => artist.id);

      const albumIds = [];
      for (const artistId of artistsIds) {
        const response = await getArtistAlbums(artistId);
        albumIds.push(...response);
      }

      const tracksIds = [];
      for (const albumId of albumIds) {
        const response = await getAlbumTracks(albumId);
        tracksIds.push(...response);
      }

      const randomTracks = getRandomItems(tracksIds, data.totalMusics);
      const tracksFormatted = parseTracksWithUri(randomTracks);

      let playlistId;
      if (playlistInfo.playlistId) {
        playlistId = playlistInfo.playlistId;
      } else {
        playlistId = await createPlaylist(playlistInfo, userProfile.id);
      }

      if (!playlistId) {
        Alert.alert('Erro', 'Não foi possível criar a playlist');
        return;
      }

      await addTracksToPlaylist(tracksFormatted, playlistId);
      setCreatingPlaylist(false);
      console.log('Playlist criada com sucesso');
      navigation.navigate('Result');
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível criar a playlist');
      setCreatingPlaylist(false);
    }
  };

  const selectArtist = (artist: IArtist) => {
    const isFound = selectedArtists.find(
      (artistSelected) => artistSelected.id === artist.id
    );
    if (isFound) {
      const arrayWithoutElment = selectedArtists.filter(
        (element) => element.id !== artist.id
      );
      setSelectedArtists(arrayWithoutElment);
      Alert.alert('Sucesso', `${artist.name} removido da playlist`);
      return;
    }
    setSelectedArtists([...selectedArtists, artist]);
    Alert.alert('Sucesso', `${artist.name} adicionado na playlist`);
  };

  const openCloseModal = () => {
    setShowModal(!showModal);
  };

  const Item = ({ item, onPress }: IArtistRender) => (
    <TouchableOpacity onPress={() => onPress(item)}>
      <ItemContainer>
        <ItemImage
          source={{
            uri: item.images[0] ? item.images[0].url : imageNotFound,
          }}
        />
        <ItemInfoContainer>
          <ItemTitle>{item.name}</ItemTitle>
          <ItemDescription>
            {item.genres.length === 0 && <Text>Gênero: N/A</Text>}
            {item.genres.length > 0 && (
              <Text>{`Gênero: ${item.genres
                .map((g: string) => g)
                .join(', ')}`}</Text>
            )}
          </ItemDescription>
        </ItemInfoContainer>
      </ItemContainer>
    </TouchableOpacity>
  );

  const renderItem = ({ item }: ListRenderItemInfo<IArtist>) => (
    <Item item={item} onPress={selectArtist} />
  );

  useEffect(() => {
    const handleArtists = async () => {
      setLoading(true);

      const result = [] as IArtist[];

      if (data.category === 'artist') {
        for (const artist of artists) {
          const response = await getArtists(artist);
          result.push(...response);
        }

        const artistsOrdered = result
          .filter((artist) => artist.images[0])
          .sort((a, b) => {
            return b.popularity - a.popularity;
          });

        setArtistList([...artistsOrdered]);
      } else {
        const response = await getArtistsByGenre(genre);
        const artistsFiltered = response
          .filter((artist) => artist.images[0])
          .sort((a, b) => {
            return b.popularity - a.popularity;
          });
        setArtistList([...artistsFiltered]);
      }

      setLoading(false);
    };

    setArtists(data.artists);
    setGenre(data.genre);

    if (data.playlist.data.id) {
      setEditPlaylist(true);
    }

    if (data.artists.length > 0) {
      handleArtists();
    }
    console.log(data);
  }, [data, artists, genre]);

  return (
    <Container>
      <>
        <MsgText>
          Selecione os artistas que você deseja adicionar na playlist.
        </MsgText>
        <Button disabled={creatingPlaylist} onPress={openCloseModal}>
          Selecionar Artistas
        </Button>
        <MsgText>
          Confirme as informações da playlist que será criada/editada abaixo.
        </MsgText>
      </>
      <PlaylistInfoContainer>
        <PlaylistInfoText>
          <PlaylistInfoTextBold>Título: </PlaylistInfoTextBold>
          {data.title}
        </PlaylistInfoText>
        <PlaylistInfoText>
          <PlaylistInfoTextBold>Descrição: </PlaylistInfoTextBold>
          {data.description}
        </PlaylistInfoText>
        {genre !== 'unknown' && (
          <PlaylistInfoText>
            <PlaylistInfoTextBold>Gênero: </PlaylistInfoTextBold>
            {data.genre}
          </PlaylistInfoText>
        )}
        <PlaylistInfoText>
          <PlaylistInfoTextBold>Total de Músicas: </PlaylistInfoTextBold>
          {data.totalMusics}
        </PlaylistInfoText>
        <PlaylistInfoText>
          <PlaylistInfoTextBold>Publica: </PlaylistInfoTextBold>
          {data.isPublic ? 'Sim' : 'Não'}
        </PlaylistInfoText>
        <PlaylistInfoText>
          <PlaylistInfoTextBold>Colaborativa: </PlaylistInfoTextBold>
          {data.collaborative ? 'Sim' : 'Não'}
        </PlaylistInfoText>
        {genre === 'unknown' && (
          <PlaylistInfoText>
            <PlaylistInfoTextBold>Artistas Selecionados: </PlaylistInfoTextBold>
            {selectedArtists.length === 0 && (
              <PlaylistInfoText>Nenhum artista selecionado</PlaylistInfoText>
            )}
            {selectedArtists.length > 0 &&
              selectedArtists.map((artist) => (
                <PlaylistInfoText key={artist.id}>
                  {artist.name}
                  {', '}
                </PlaylistInfoText>
              ))}
          </PlaylistInfoText>
        )}
      </PlaylistInfoContainer>
      <ButtonSubmit disabled={creatingPlaylist} onPress={handleSubmit}>
        {editPlaylist ? 'Editar Playlist' : 'Criar Playlist'}
      </ButtonSubmit>
      {creatingPlaylist && <Loading title="Criando playlist..." />}

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

      <Modal
        animationType="slide"
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}>
        <ContainerModal>
          {!loading && artistList && (
            <SafeAreaViewContainer>
              <MsgText>
                Selecione um artista abaixo para adicionar na playlist. Caso
                você queira remover um artista, basta seleciona-lo novamente.
              </MsgText>
              <FlatList
                data={artistList}
                renderItem={renderItem}
                keyExtractor={(item) => item.uri}
              />
              <Button onPress={openCloseModal}>Fechar Modal</Button>
              <BannerAd
                unitId={TestIds.BANNER}
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
          {loading && <Loading title="Buscando artistas..." />}
        </ContainerModal>
      </Modal>
    </Container>
  );
}
