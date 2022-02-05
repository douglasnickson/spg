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

const Configuration: React.FC = () => {
  const [userProfile, setUserProfile] = useState<IUserProfile>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      const profile = await getUserProfile();
      setUserProfile(profile);
      setLoading(false);
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
          <ButtonLogout>Sair do Aplicativo</ButtonLogout>
          <BannerAd
            unitId={TestIds.BANNER}
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
      {loading && <Loading />}
    </Container>
  );
};

export default Configuration;
