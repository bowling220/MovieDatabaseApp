// Details.js
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, Card, ActivityIndicator, Avatar } from 'react-native-paper';
import { getMovieDetails, getMovieCast } from './api';

const Details = ({ route, navigation }) => {
  const { id } = route.params;
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const [detailsResponse, castResponse] = await Promise.all([
          getMovieDetails(id),
          getMovieCast(id),
        ]);
        setMovie(detailsResponse.data);
        setCast(castResponse.data.cast);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);

  if (loading) {
    return <ActivityIndicator animating={true} style={styles.loading} />;
  }

  if (!movie) {
    return <Text>No movie details found</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Card>
        <Card.Cover source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} />
        <Card.Content>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.subtitle}>{movie.release_date}</Text>
          <Text style={styles.rating}>Rating: {movie.vote_average}</Text>
          <Text style={styles.overview}>{movie.overview}</Text>
          <Text style={styles.castTitle}>Cast:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.castList}>
            {cast.map((actor) => (
              <TouchableOpacity key={actor.cast_id} onPress={() => navigation.navigate('CastDetails', { id: actor.id })}>
                <View style={styles.castItem}>
                  <Avatar.Image
                    size={80}
                    source={{
                      uri: `https://image.tmdb.org/t/p/w500${actor.profile_path}`,
                    }}
                    style={styles.avatar}
                  />
                  <Text style={styles.actorName}>{actor.name}</Text>
                  <Text style={styles.characterName}>{actor.character}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
  rating: {
    fontSize: 18,
    marginBottom: 15,
  },
  overview: {
    fontSize: 16,
    marginBottom: 20,
  },
  castTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  castList: {
    flexDirection: 'row',
  },
  castItem: {
    alignItems: 'center',
    marginRight: 15,
  },
  avatar: {
    marginBottom: 5,
  },
  actorName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  characterName: {
    fontSize: 12,
    textAlign: 'center',
  },
  loading: {
    marginTop: 20,
  },
});

export default Details;
