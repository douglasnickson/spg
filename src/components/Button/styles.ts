import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

export const Touchable = styled(TouchableOpacity)`
  height: 46px;
  width: 300px;
  background: #1ed760;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin: 8px 0;
`;

export const Text = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  text-shadow: 1px 1px 8px #4a4a4a;
`;
