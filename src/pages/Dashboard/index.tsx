import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { useAuth } from '../../contexts/auth';
import { Container, Image } from './styles';

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

const Dashboard: React.FC = () => {
  const { signOut, token } = useAuth();

  function handleSignOut() {
    signOut();
  }

  return (
    <>
      <Container>
        <View style={styles.container}>
          <Text>{token?.accessToken}</Text>
          <Button title="Sign out" onPress={handleSignOut} />
        </View>
      </Container>
    </>
  );
};
export default Dashboard;
