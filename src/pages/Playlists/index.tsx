import React from 'react';
import { FlatList } from 'react-native';

import {
  Container,
  SafeAreaViewContainer,
  ItemContainer,
  ItemImage,
  ItemTitle,
  ItemDescription,
  ItemInfoContainer,
} from './styles';

const data = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({ title }) => (
  <ItemContainer>
    <ItemImage
      source={{
        uri: 'https://cdn.neemo.com.br/uploads/settings_webdelivery/logo/3957/image-not-found.jpg',
      }}
    />
    <ItemInfoContainer>
      <ItemTitle>{title}</ItemTitle>
      <ItemDescription>Minha playlist super incrível</ItemDescription>
      <ItemDescription>Pública - Músicas: 129</ItemDescription>
    </ItemInfoContainer>
  </ItemContainer>
);

const Playlist: React.FC = () => {
  const renderItem = ({ item }) => <Item title={item.title} />;

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
