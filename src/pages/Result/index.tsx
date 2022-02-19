import React from 'react';
import { Alert, Linking } from 'react-native';
import { TestIds, BannerAd, BannerAdSize } from '@react-native-firebase/admob';
import { Container, Image, BtReset, Message } from './styles';

import success from '../../assets/success.png';
import Button from '../../components/Button';

import { useAuth } from '../../contexts/auth';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-1209664770627704/9019481026';

type Props = {
  navigation: any;
};

export default function Result({ navigation }: Props) {
  const { handlePlaylist } = useAuth();

  const handleDashboard = () => {
    handlePlaylist(null);
    navigation.navigate('Criar Playlist');
  };

  const handleSpotify = () => {
    Linking.openURL('spotify://app').catch(() => {
      Alert.alert(
        'Ocorreu um erro!',
        'Não foi possível abrir o Spotify. Verifique se você tem o aplicativo instalado.'
      );
    });
  };

  return (
    <Container>
      <Image source={success} />
      <Message>PARABÉNS!</Message>
      <Message>Sua nova playlist criada com sucesso.</Message>
      <Message>
        Você pode acessar o Spotify para conferir a playlist clicando no botão
        abaixo.
      </Message>

      <Button onPress={handleSpotify}>Abrir Spotify</Button>
      <BtReset onPress={handleDashboard}>Nova Playlist</BtReset>
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
    </Container>
  );
}
