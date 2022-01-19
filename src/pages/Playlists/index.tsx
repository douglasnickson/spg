import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

import {
  Container,
  SafeAreaViewContainer,
  ItemContainer,
  ItemImage,
  ItemTitle,
  ItemDescription,
  ItemInfoContainer,
} from './styles';

import { useAuth } from '../../contexts/auth';
import { IPlaylist } from 'src/model/IPlaylist';
import { getPlaylists, getUserProfile } from '../../services/spotify';

const playlists = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    name: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: 'Third Item',
  },
];

interface IFlatlistItem {
  item: {
    id: string;
    name: string;
  };
}

interface IFlatlistRender {
  item: {
    id: string;
    name: string;
  };
  onPress(data: IFlatlistPlaylist): void;
}

interface IFlatlistPlaylist {
  id: string;
  name: string;
}

interface Props {
  navigation: any;
}

const Playlist: React.FC<Props> = ({ navigation }: Props) => {
  const { handlePlaylist } = useAuth();
  const [data, setData] = useState<IPlaylist[]>([]);

  const Item = ({ item, onPress }: IFlatlistRender) => (
    <TouchableOpacity onPress={() => onPress(item)}>
      <ItemContainer>
        <ItemImage
          source={{
            uri: 'https://cdn.neemo.com.br/uploads/settings_webdelivery/logo/3957/image-not-found.jpg',
          }}
        />
        <ItemInfoContainer>
          <ItemTitle>{item.name}</ItemTitle>
          <ItemDescription>Minha playlist super incrível</ItemDescription>
          <ItemDescription>Pública - Músicas: 129</ItemDescription>
        </ItemInfoContainer>
      </ItemContainer>
    </TouchableOpacity>
  );

  const renderItem = ({ item }: IFlatlistItem) => (
    <Item item={item} onPress={goToHome} />
  );

  const goToHome = (item: IFlatlistPlaylist) => {
    const { id, name } = item;
    handlePlaylist({ data: { id, name } });
    navigation.navigate('HomeTab');
  };

  useEffect(() => {
    const getUserPlaylists = async () => {
      const user = await getUserProfile();
      const userPlaylists = await getPlaylists(user.id);
      setData(userPlaylists);
    };
    getUserPlaylists();
  }, []);

  return (
    <Container>
      <SafeAreaViewContainer>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaViewContainer>
    </Container>
  );
};

export default Playlist;
