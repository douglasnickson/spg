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
  margin-bottom: 16px;
  height: 160px;
  width: 160px;
`;

export const BtReset = styled(Button)`
  background-color: red;
`;

export const Message = styled.Text`
  color: #fff;
  font-size: 16px;
  margin: 8px auto;
  font-weight: 500;
  text-align: center;
`;
