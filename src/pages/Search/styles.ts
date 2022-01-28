import styled from 'styled-components/native';

import Button from '../../components/Button';

export const Container = styled.View`
  flex: 1;
  background-color: #272727;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`;

export const SafeAreaViewContainer = styled.SafeAreaView`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
  margin-bottom: 16px;
`;

export const ItemContainer = styled.View`
  margin-top: 8px;
  width: 400px;
  background-color: #fff;
  padding: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid #1ed760;
  border-radius: 4px;
`;

export const ItemImage = styled.Image`
  width: 64px;
  height: 64px;
`;

export const ItemInfoContainer = styled.View`
  display: flex;
  flex-direction: column;
`;

export const ItemTitle = styled.Text`
  font-weight: bold;
  font-size: 16px;
  margin-left: 8px;
`;

export const ItemDescription = styled.Text`
  margin-left: 8px;
  margin-top: 2px;
  font-size: 12px;
`;

export const MsgText = styled.Text`
  font-size: 14px;
  color: #fff;
  margin: 8px 5px 8px 5px;
  text-align: center;
  padding: 8px;
  border-radius: 8px;
  font-weight: 500;
`;

export const PlaylistInfoContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border: 1px solid #ccc;
  width: 90%;
  padding: 8px;
  border-radius: 8px;
`;

export const PlaylistInfoText = styled.Text`
  color: #fff;
  font-size: 14px;
  text-align: left;
  padding: 4px;
`;

export const PlaylistInfoTextBold = styled.Text`
  color: #fff;
  font-size: 14px;
  text-align: left;
  padding: 4px;
  font-weight: 500;
`;

export const ButtonSubmit = styled(Button)`
  background-color: red;
  margin-top: 24px;
`;
