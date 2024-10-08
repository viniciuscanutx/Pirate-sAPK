import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import { useRoute } from '@react-navigation/native';
import { fetchMovieDetails } from '../../api/moviedb'; 

const { width, height } = Dimensions.get('window');

export default function WatchScreen() {
  const { params: { id } } = useRoute(); 
  const [videoUrl, setVideoUrl] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const videoRef = useRef(null); 

  useEffect(() => {
    getMovieVideoLink(id); 
  }, [id]);

  const getMovieVideoLink = async (movieId) => {
    try {
      const data = await fetchMovieDetails(movieId); 
      if (data && data.link) {
        console.log(data.link)
        setVideoUrl(data.link); 
      }
    } catch (error) {
      console.error('Erro ao buscar o link do vídeo:', error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : videoUrl ? (
        <Video
          ref={videoRef}
          source={{ uri: videoUrl }} 
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="contain"
          shouldPlay
          useNativeControls 
          style={styles.video}
        />
      ) : (
        <Text style={styles.errorText}>Não foi possível carregar o vídeo.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: width,
    height: height * 0.4, 
  },
  errorText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
