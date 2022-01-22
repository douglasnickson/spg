import styled from 'styled-components/native';
import Button from '../../components/Button';

export const Container = styled.View`
  flex: 1;
  background-color: #272727;
  align-items: center;
  padding: 24px;
  justify-content: center;
  flex-direction: column;
`;

export const Image = styled.Image`
  justify-content: center;
  width: 128px;
  height: 128px;
  border-radius: 100px;
`;

export const ButtonLogout = styled(Button)`
  background: red;
  margin-bottom: 64px;
`;

export const InfoContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const ProfileInfo = styled.Text`
  color: #fff;
  padding: 4px;
  font-size: 16px;
`;
