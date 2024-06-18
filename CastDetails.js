// CastDetails.js
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, Card, ActivityIndicator, Avatar } from 'react-native-paper';
import { getCastDetails } from './api';

const CastDetails = ({ route }) => {
  const { id } = route.params;
  const [cast, setCast] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCastDetails = async () => {
      try {
        const response = await getCastDetails(id);
        setCast(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCastDetails();
  }, [id]);

  if (loading) {
    return <ActivityIndicator animating={true} style={styles.loading} />;
  }

  if (!cast) {
    return <Text>No cast details found</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Card>
        <Card.Cover source={{ uri: `https://image.tmdb.org/t/p/w500${cast.profile_path}` }} />
        <Card.Content>
          <Text style={styles.title}>{cast.name}</Text>
          <Text style={styles.subtitle}>Born: {cast.birthday}</Text>
          <Text style={styles.subtitle}>Place of Birth: {cast.place_of_birth}</Text>
          <Text style={styles.biography}>{cast.biography}</Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  biography: {
    fontSize: 16,
    marginTop: 15,
  },
  loading: {
    marginTop: 20,
  },
});

export default CastDetails;
