import React, { useEffect, useState } from 'react';
import { TestIds, BannerAd, BannerAdSize } from '@react-native-firebase/admob';

import {
  Container,
  Image,
  ButtonLogout,
  ProfileInfo,
  InfoContainer,
} from './styles';

import imageNotFound from '../../assets/image-not-found.jpg';
import Button from '../../components/Button';

import { getUserProfile } from '../../services/spotify';
import { IUserProfile } from 'src/model/IUserProfile';

import Loading from '../../components/Loading';

import { useAuth } from '../../contexts/auth';
import { Alert } from 'react-native';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-1209664770627704/7590354447';

const Configuration: React.FC = () => {
  const { signOut } = useAuth();
  const [userProfile, setUserProfile] = useState<IUserProfile>();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    signOut();
  };

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      try {
        const profile = await getUserProfile();
        setUserProfile(profile);
        setLoading(false);
      } catch (err) {
        Alert.alert('Erro', 'Ocorreu um erro ao buscar o perfil do usuário.');
        setLoading(false);
      }
    };
    getUser();
  }, []);

  return (
    <Container>
      {!loading && userProfile && (
        <>
          <Image
            source={{
              uri: userProfile.images[0].url
                ? userProfile.images[0].url
                : imageNotFound,
            }}
          />
          <InfoContainer>
            <ProfileInfo>{userProfile.displayName}</ProfileInfo>
            <ProfileInfo>E-mail: N/A</ProfileInfo>
            <ProfileInfo>Seguidores: {userProfile.followers}</ProfileInfo>
            <ProfileInfo>Tipo: {userProfile.type}</ProfileInfo>
          </InfoContainer>
          <Button>Remover Anúncios</Button>
          <ButtonLogout onPress={handleLogout}>Sair do Aplicativo</ButtonLogout>
          {loading && <Loading />}
          <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.SMART_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
            onAdLoaded={() => {
              console.log('Advert loaded');
            }}
            onAdFailedToLoad={(error) => {
              console.error('Advert failed to load: ', error);
            }}
          />
        </>
      )}
      {!loading && !userProfile && (
        <>
          <ButtonLogout onPress={handleLogout}>Sair do Aplicativo</ButtonLogout>
          <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.SMART_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
            onAdLoaded={() => {
              console.log('Advert loaded');
            }}
            onAdFailedToLoad={(error) => {
              console.error('Advert failed to load: ', error);
            }}
          />
        </>
      )}
    </Container>
  );
};

export default Configuration;
