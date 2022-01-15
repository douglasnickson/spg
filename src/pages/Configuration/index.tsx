import React from 'react';

import { Container, Image, ButtonLogout, Text } from './styles';

import logo from '../../assets/logo.png';
import Button from '../../components/Button';

const Configuration: React.FC = () => {
  return (
    <Container>
      <Image source={logo} />
      <Button>Remover Anúncios</Button>
      <ButtonLogout>Sair do Aplicativo</ButtonLogout>
    </Container>
  );
};

export default Configuration;
