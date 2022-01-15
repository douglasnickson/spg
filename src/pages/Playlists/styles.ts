import styled from 'styled-components/native';

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
