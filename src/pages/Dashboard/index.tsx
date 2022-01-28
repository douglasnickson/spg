import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  TouchableOpacity,
  Switch,
  ScrollView,
  Modal,
  FlatList,
  StyleSheet,
} from 'react-native';

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

import { useAuth } from '../../contexts/auth';
import { getGenres } from '../../services/spotify';

interface IPlaylist {
  data: {
    id: string;
    name: string;
  };
}

interface IFlatlistItem {
  item: string;
}

interface Props {
  navigation: any;
}

const Dashboard: React.FC<Props> = ({ navigation }: Props) => {
  const [showCategory, setShowCategory] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState<string>('artist');
  const [artists, setArtists] = useState<string[]>([
    'Pink Floyd',
    'Iron Maiden',
  ]);
  const [artist, setArtist] = useState('');
  const [genre, setGenre] = useState('unknown');
  const [description, setDescription] = useState('teste');
  const [totalMusics, setTotalMusics] = useState('3');
  const [title, setTitle] = useState('teste');
  const [collaborative, setCollaborative] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [playlist, setPlaylist] = useState<IPlaylist | null>(null);
  const [genres, setGenres] = useState<string[]>([]);

  const { currentPlaylist } = useAuth();

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
    setPlaylist(null);
  };

  const handleSubmit = () => {
    const data = {
      category,
      artists,
      description,
      totalMusics,
      title,
      collaborative,
      isPublic,
      genre,
      playlist,
    };

    navigation.navigate('Search', { data });
  };

  const Item = ({ item }: IFlatlistItem) => (
    <ListContainer>
      <TextList>{item}</TextList>
    </ListContainer>
  );

  const renderItem = ({ item }: IFlatlistItem) => <Item item={item} />;

  useEffect(() => {
    const handleGenres = async () => {
      const response = await getGenres();
      setGenres(response);
    };

    if (currentPlaylist) {
      setPlaylist(currentPlaylist);
    }

    if (category === 'genre') {
      handleGenres();
    }
  }, [currentPlaylist, category]);

  return (
    <ScrollView style={styles.scrollViewStyle}>
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

        {playlist && (
          <TextInputContainer>
            <CustomTextInput
              onChangeText={setTitle}
              value={'Playlist: ' + playlist.data.name}
              editable={false}
              style={styles.placeholderStyle}
            />
          </TextInputContainer>
        )}
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
                  style={styles.placeholderStyle}
                />
                <Picker.Item label="Banda/Artistas" value="artist" />
                <Picker.Item label="Gênero Musical" value="genre" />
              </CustomPicker>
            </PickerContainer>
          </>
        )}
        {category && category === 'artist' && (
          <>
            <TextInputContainer>
              <CustomTextInput
                onChangeText={setArtist}
                value={artist}
                placeholder="Informe a banda/artista"
              />
              <TouchableOpacity
                style={styles.btAddArtist}
                onPress={handleArtist}>
                <Ionicons name={'add-circle'} size={32} color={'#1ed760'} />
              </TouchableOpacity>
            </TextInputContainer>
          </>
        )}
        {category && category === 'genre' && (
          <>
            <PickerContainer>
              <CustomPicker
                selectedValue={genre}
                mode="dropdown"
                onValueChange={(value) => handleGenre(value)}>
                <Picker.Item
                  label="Selecione uma opção"
                  value="unknown"
                  style={styles.placeholderStyle}
                />
                {genres &&
                  genres.map((item: string) => (
                    <Picker.Item key={item} label={item} value={item} />
                  ))}
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
            style={styles.btListArtist}
            onPress={openCloseModal}>
            <Ionicons name={'information-circle'} size={32} color={'#1ed760'} />
          </TouchableOpacity>
        )}
        <Button onPress={handleSubmit}>Próximo</Button>
        <BtReset onPress={handleReset}>Reiniciar</BtReset>
      </Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewStyle: {
    marginBottom: 50,
    backgroundColor: '#272727',
  },

  btListArtist: {
    marginTop: 8,
    marginEnd: 5,
    marginBottom: 8,
  },

  btAddArtist: {
    marginEnd: 5,
  },

  placeholderStyle: {
    color: '#a7a7a7',
  },
});

export default Dashboard;
