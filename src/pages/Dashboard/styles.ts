import styled from 'styled-components/native';
import { View, TextInput, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export const Container = styled.View`
  flex: 1;
  background-color: #272727;
  align-items: center;
  padding: 30px;
  justify-content: flex-start;
  flex-direction: column;
`;

export const Image = styled.Image`
  justify-content: center;
  margin-bottom: 50px;
`;

export const PickerContainer = styled(View)`
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin: 5px 0;
`;

export const CustomPicker = styled(Picker)`
  width: 300px;
`;

export const Label = styled.Text`
  font-size: 16px;
  color: #fff;
`;

export const CustomTextInput = styled(TextInput)`
  margin-left: 5px;
`;

export const TextInputContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  width: 300px;
  margin: 5px 0;
`;

export const SwitchContainer = styled(View)`
  width: 300px;
  flex-direction: row;
  align-items: center;
  align-items: center;
  justify-content: space-between;
  margin: 5px 0;
`;

export const SwitchText = styled(Text)`
  color: #fff;
  font-weight: bold;
  margin-left: 5px;
`;

export const ModalText = styled(Text)`
  color: #fff;
  font-weight: bold;
  margin-left: 5px;
  font-size: 16px;
  margin-bottom: 50px;
`;

export const ListContainer = styled(View)`
  justify-content: center;
  align-items: flex-start;
  width: 300px;
  border: 1px solid #1ed760;
  border-radius: 10px;
  height: 40px;
  margin-top: 10px;
`;

export const TextList = styled(Text)`
  color: #fff;
  font-size: 16px;
  margin-left: 5px;
`;
