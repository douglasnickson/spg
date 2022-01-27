import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ListRenderItemInfo,
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
} from './styles';

import Loading from '../../components/Loading';
import imageNotFound from '../../assets/image-not-found.jpg';

type IArtistRender = {
  item: IArtist;
  onPress(data: IArtist): void;
};

export default function Search({ route }) {
  const { data } = route.params;

  const [loading, setLoading] = useState(false);
  const [artists, setArtists] = useState([]);
  const [genre, setGenre] = useState('unknown');
  const [artistList, setArtistList] = useState<IArtist[]>([]);

  const selectArtist = (artist: IArtist) => {
    console.log(artist);
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

      console.log(artistsOrdered);
      setArtistList([...artistsOrdered]);
      setLoading(false);
    };

    setArtists(data.artists);
    setGenre(data.genre);

    if (data.artists.length > 0) {
      handleArtists();
    }
  }, [data, artists]);

  return (
    <Container>
      {!loading && artistList && (
        <SafeAreaViewContainer>
          <Text>Selecione os artistas que você deseja adicionar.</Text>
          <FlatList
            data={artistList}
            renderItem={renderItem}
            keyExtractor={(item) => item.uri}
          />
        </SafeAreaViewContainer>
      )}
      {loading && <Loading title="Buscando artistas..." />}
    </Container>
  );
}
