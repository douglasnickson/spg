import styled from 'styled-components/native';
import Button from '../../components/Button';

export const Container = styled.View`
  flex: 1;
  background-color: #272727;
  align-items: center;
  padding: 12px;
  justify-content: flex-start;
  flex-direction: column;
`;

export const Image = styled.Image`
  justify-content: center;
  margin-bottom: 150px;
`;

export const ButtonLogout = styled(Button)`
  background: red;
  margin-top: 8px;
`;
