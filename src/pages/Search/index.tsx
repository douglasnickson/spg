import React, { useEffect, useState } from 'react';
import {
  Text,
  FlatList,
  TouchableOpacity,
  ListRenderItemInfo,
  Modal,
} from 'react-native';

import { IArtist } from 'src/model/IArtist';
import { getArtists } from '../../services/spotify';

import {
  Container,
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

import Loading from '../../components/Loading';
import Button from '../../components/Button';
import imageNotFound from '../../assets/image-not-found.jpg';

type IArtistRender = {
  item: IArtist;
  onPress(data: IArtist): void;
};

export default function Search({ route }) {
  const { data } = route.params;

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [artists, setArtists] = useState([]);
  const [genre, setGenre] = useState('unknown');
  const [artistList, setArtistList] = useState<IArtist[]>([]);
  const [selectedArtists, setSelectedArtists] = useState<IArtist[]>([]);

  const handleSubmit = () => {
    console.log('Criando playlist');
  };

  const selectArtist = (artist: IArtist) => {
    setSelectedArtists([...selectedArtists, artist]);
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
      setLoading(false);
    };

    setArtists(data.artists);
    setGenre(data.genre);

    if (data.artists.length > 0) {
      handleArtists();
    }
    console.log(data);
  }, [data, artists]);

  return (
    <Container>
      {genre === 'unknown' && (
        <>
          <MsgText>
            Selecione os artistas que você deseja adicionar na playlist.
          </MsgText>
          <Button onPress={openCloseModal}>Selecionar Artistas</Button>
          <MsgText>
            Confirme as informações da playlist que será criada abaixo.
          </MsgText>
        </>
      )}
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
      <ButtonSubmit onPress={handleSubmit}>Criar Playlist</ButtonSubmit>

      <Modal
        animationType="slide"
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}>
        <Container>
          {!loading && artistList && (
            <SafeAreaViewContainer>
              <FlatList
                data={artistList}
                renderItem={renderItem}
                keyExtractor={(item) => item.uri}
              />
              <Button onPress={openCloseModal}>Fechar Modal</Button>
            </SafeAreaViewContainer>
          )}
          {loading && <Loading title="Buscando artistas..." />}
        </Container>
      </Modal>
    </Container>
  );
}
