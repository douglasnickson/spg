import React from 'react';
import { useAuth } from '../../contexts/auth';
import { Container, Image } from './styles';

import Button from '../../components/Button';
import logo from '../../assets/logo.png';

const SignIn: React.FC = () => {
  const { handleAccessToken } = useAuth();

  function handleSignIn() {
    handleAccessToken();
  }

  return (
    <Container>
      <Image source={logo} />
      <Button onPress={handleSignIn}>AUTORIZAR APLICATIVO</Button>
    </Container>
  );
};
export default SignIn;
