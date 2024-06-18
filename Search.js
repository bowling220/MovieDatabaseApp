// Search.js
import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, ActivityIndicator, Title } from 'react-native-paper';
import { searchMovies, getPopularMovies, getTrendingMovies } from './api';
import MovieItem from './MovieItem';

const Search = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [popularMovies, setPopularMovies] = useState([]);
  const [trendingToday, setTrendingToday] = useState([]);
  const [trendingThisWeek, setTrendingThisWeek] = useState([]);
  const [loadingPopular, setLoadingPopular] = useState(true);
  const [loadingTrendingToday, setLoadingTrendingToday] = useState(true);
  const [loadingTrendingThisWeek, setLoadingTrendingThisWeek] = useState(true);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await getPopularMovies();
        setPopularMovies(response.data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingPopular(false);
      }
    };

    const fetchTrendingToday = async () => {
      try {
        const response = await getTrendingMovies('day');
        setTrendingToday(response.data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingTrendingToday(false);
      }
    };

    const fetchTrendingThisWeek = async () => {
      try {
        const response = await getTrendingMovies('week');
        setTrendingThisWeek(response.data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingTrendingThisWeek(false);
      }
    };

    fetchPopularMovies();
    fetchTrendingToday();
    fetchTrendingThisWeek();
  }, []);

  const handleSearch = async () => {
    if (query.trim() === '') return;
    setLoading(true);
    try {
      const response = await searchMovies(query);
      setResults(response.data.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToTrends = () => {
    setResults([]);
    setQuery('');
  };

  const renderItem = ({ item }) => (
    <MovieItem item={item} onPress={(id) => navigation.navigate('Details', { id })} />
  );

  const renderSearchResults = () => (
    <View style={styles.searchResultsContainer}>
      <Title style={styles.resultTitle}>Search Results</Title>
      <Button mode="outlined" onPress={handleBackToTrends} style={styles.backButton}>
        Back to Trend List
      </Button>
      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalListContent}
      />
    </View>
  );

  const renderInitialContent = () => (
    <>
      <Title style={styles.trendingTitle}>Trending Today</Title>
      {loadingTrendingToday ? (
        <ActivityIndicator animating={true} style={styles.loading} />
      ) : (
        <FlatList
          data={trendingToday}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalListContent}
        />
      )}
      <Title style={styles.trendingTitle}>Trending This Week</Title>
      {loadingTrendingThisWeek ? (
        <ActivityIndicator animating={true} style={styles.loading} />
      ) : (
        <FlatList
          data={trendingThisWeek}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalListContent}
        />
      )}
      <Title style={styles.popularTitle}>Popular Movies</Title>
      {loadingPopular ? (
        <ActivityIndicator animating={true} style={styles.loading} />
      ) : (
        <FlatList
          data={popularMovies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalListContent}
        />
      )}
    </>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          label="Search for movies"
          value={query}
          onChangeText={setQuery}
          style={styles.input}
        />
        <Button mode="contained" onPress={handleSearch} style={styles.button}>
          Search
        </Button>
      </View>
      {loading ? (
        <ActivityIndicator animating={true} style={styles.loading} />
      ) : results.length > 0 ? (
        renderSearchResults()
      ) : (
        renderInitialContent()
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginRight: 10,
  },
  button: {
    height: 50,
    justifyContent: 'center',
  },
  backButton: {
    marginVertical: 10,
  },
  loading: {
    marginTop: 20,
  },
  searchResultsContainer: {
    marginTop: 20,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  trendingTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  popularTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  listContent: {
    paddingBottom: 10,
  },
  horizontalListContent: {
    paddingBottom: 10,
    paddingLeft: 10,
  },
});

export default Search;
