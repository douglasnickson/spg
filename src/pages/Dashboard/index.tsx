import React, { useState } from 'react';
import {
  TouchableOpacity,
  Switch,
  ScrollView,
  Modal,
  FlatList,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  Container,
  Image,
  PickerContainer,
  CustomPicker,
  CustomTextInput,
  TextInputContainer,
  SwitchContainer,
  SwitchText,
  ModalText,
  ListContainer,
  TextList,
  BtReset,
} from './styles';

import logo from '../../assets/logo.png';
import Button from '../../components/Button';

const Dashboard: React.FC = () => {
  const [showCategory, setShowCategory] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState<string>('unknown');
  const [artists, setArtists] = useState<string[]>([]);
  const [artist, setArtist] = useState('');
  const [genre, setGenre] = useState('unknown');
  const [description, setDescription] = useState('');
  const [totalMusics, setTotalMusics] = useState('');
  const [title, setTitle] = useState('');
  const [collaborative, setCollaborative] = useState(false);
  const [isPublic, setIsPublic] = useState(true);

  const handleCategory = (value: any) => {
    if (value) {
      setShowCategory(false);
      return setCategory(value);
    }
    return setCategory('unknown');
  };

  const handleArtist = () => {
    const result: string[] = [];
    result.push(...artists, artist);
    setArtists(result);
    setArtist('');
  };

  const handleGenre = (value: any) => {
    if (value) {
      return setGenre(value);
    }
    return setGenre('unknown');
  };

  const handleCollaborative = () => {
    setCollaborative(!collaborative);
  };

  const handlePublic = () => {
    setIsPublic(!isPublic);
  };

  const openCloseModal = () => {
    setShowModal(!showModal);
  };

  const handleReset = () => {
    setShowCategory(true);
    setCategory('unknown');
    setArtists([]);
    setArtist('');
    setDescription('');
    setTotalMusics('');
    setTitle('');
    setCollaborative(false);
    setIsPublic(true);
    setGenre('unknown');
  };

  const Item = ({ title }) => (
    <ListContainer>
      <TextList>{title}</TextList>
    </ListContainer>
  );

  const renderItem = ({ item }) => <Item title={item} />;

  return (
    <ScrollView style={{ marginBottom: 50, backgroundColor: '#272727' }}>
      <Container>
        <Modal
          animationType="slide"
          visible={showModal}
          onRequestClose={() => {
            setShowModal(!showModal);
          }}>
          <Container>
            <ModalText>Artistas/Bandas Selecionadas</ModalText>
            <FlatList
              data={artists}
              renderItem={renderItem}
              keyExtractor={(item) => item}
            />
            <Button onPress={openCloseModal}>Fechar Modal</Button>
          </Container>
        </Modal>
        <Image source={logo} />
        {showCategory && (
          <>
            <PickerContainer>
              <CustomPicker
                selectedValue={category}
                mode="dropdown"
                onValueChange={(value) => handleCategory(value)}>
                <Picker.Item
                  label="Selecione o tipo de playlist"
                  value="unknown"
                  style={{ color: '#a7a7a7' }}
                />
                <Picker.Item label="Banda/Artistas" value="artista" />
                <Picker.Item label="Gênero Musical" value="genero" />
              </CustomPicker>
            </PickerContainer>
          </>
        )}
        {category && category === 'artista' && (
          <>
            <TextInputContainer>
              <CustomTextInput
                onChangeText={setArtist}
                value={artist}
                placeholder="Informe a banda/artista"
              />
              <TouchableOpacity style={{ marginEnd: 5 }} onPress={handleArtist}>
                <Ionicons name={'add-circle'} size={32} color={'#1ed760'} />
              </TouchableOpacity>
            </TextInputContainer>
          </>
        )}
        {category && category === 'genero' && (
          <>
            <PickerContainer>
              <CustomPicker
                selectedValue={genre}
                mode="dropdown"
                onValueChange={(value) => handleGenre(value)}>
                <Picker.Item
                  label="Selecione uma opção"
                  value="unknown"
                  style={{ color: '#a7a7a7' }}
                />
                <Picker.Item label="Rock" value="rock" />
                <Picker.Item label="Blues" value="blues" />
                <Picker.Item label="Jazz" value="jazz" />
              </CustomPicker>
            </PickerContainer>
          </>
        )}
        <TextInputContainer>
          <CustomTextInput
            onChangeText={setTitle}
            value={title}
            placeholder="Qual o nome da playlist?"
          />
        </TextInputContainer>
        <TextInputContainer>
          <CustomTextInput
            onChangeText={setDescription}
            value={description}
            placeholder="Descreva a playlist"
          />
        </TextInputContainer>
        <TextInputContainer>
          <CustomTextInput
            onChangeText={setTotalMusics}
            value={totalMusics}
            placeholder="Total de músicas (0-99)"
            keyboardType="numeric"
          />
        </TextInputContainer>
        <SwitchContainer>
          <SwitchText>Publica</SwitchText>
          <Switch
            trackColor={{ false: '#767577', true: '#fff' }}
            thumbColor={isPublic ? '#1ed760' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={handlePublic}
            value={isPublic}
          />
        </SwitchContainer>
        <SwitchContainer>
          <SwitchText>Colaborativa</SwitchText>
          <Switch
            trackColor={{ false: '#767577', true: '#fff' }}
            thumbColor={collaborative ? '#1ed760' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={handleCollaborative}
            value={collaborative}
          />
        </SwitchContainer>
        {artists && artists.length > 0 && (
          <TouchableOpacity
            style={{ marginTop: 8, marginEnd: 5, marginBottom: 8 }}
            onPress={openCloseModal}>
            <Ionicons name={'information-circle'} size={32} color={'#1ed760'} />
          </TouchableOpacity>
        )}
        <Button>Criar Playlist</Button>
        <BtReset onPress={handleReset}>Reiniciar</BtReset>
      </Container>
    </ScrollView>
  );
};

export default Dashboard;
