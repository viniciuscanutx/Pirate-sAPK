import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { fetchMovieDetails } from '../../api/moviedb'; 
import * as ScreenOrientation from 'expo-screen-orientation'; 

export default function WatchScreen() {
  const { params: { id } } = useRoute(); 
  const [videoUrl, setVideoUrl] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const videoRef = useRef(null); 

  useEffect(() => {
    getMovieVideoLink(id); 
    const lockOrientation = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    };
    lockOrientation();

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, [id]);

  useFocusEffect(
    React.useCallback(() => {
      const lockOrientation = async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      };
      lockOrientation();

      return () => {
        const unlockOrientation = async () => {
          await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        };
        unlockOrientation();
      };
    }, [])
  );

  const getMovieVideoLink = async (movieId) => {
    try {
      const data = await fetchMovieDetails(movieId); 
      if (data && data.link) {
        console.log(data.link);
        setVideoUrl(data.link); 
      }
    } catch (error) {
      console.error('Erro ao buscar o link do vídeo:', error);
    } finally {
      setLoading(false); 
    }
  };

  const handleFullscreenUpdate = async (status) => {
    if (status.didJustExitFullscreen) {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
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
          onFullscreenUpdate={handleFullscreenUpdate} 
        />
      ) : (
        <Text style={styles.errorText}>Não foi possível carregar o filme.</Text>
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
    width: '100%', 
    height: '100%', 
  },
  errorText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
