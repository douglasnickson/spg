import React from 'react';
import { Alert, Linking } from 'react-native';

import { Container, Image, BtReset, Message } from './styles';

import success from '../../assets/success.png';
import Button from '../../components/Button';

import { useAuth } from '../../contexts/auth';

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
    </Container>
  );
}
