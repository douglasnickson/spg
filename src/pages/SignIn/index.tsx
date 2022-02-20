import React from 'react';
import { useAuth } from '../../contexts/auth';
import { Container, Image } from './styles';

import Button from '../../components/Button';
import logo from '../../assets/logo.png';
import { Alert } from 'react-native';

const SignIn: React.FC = () => {
  const { handleAccessToken } = useAuth();

  function handleSignIn() {
    try {
      handleAccessToken();
    } catch (err) {
      Alert.alert(
        'Erro',
        'Ocorreu um erro durante a autorização do aplicativo, tente novamente.'
      );
    }
  }

  return (
    <Container>
      <Image source={logo} />
      <Button onPress={handleSignIn}>AUTORIZAR APLICATIVO</Button>
    </Container>
  );
};
export default SignIn;
