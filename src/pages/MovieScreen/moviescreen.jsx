import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ChevronLeftIcon, HeartIcon, PlayIcon } from 'react-native-heroicons/outline';
import { styles, theme } from '../../theme';
import { LinearGradient } from 'expo-linear-gradient';
import MovieList from '../../components/movieList/movieList';
import { fetchMovieDetails, fetchTrendingMovies } from '../../api/moviedb';

const { width, height } = Dimensions.get('window');

export default function MovieScreen() {
    const { params: item } = useRoute();
    const [isFavorite, toggleFavorite] = useState(false);
    const [similarMovies, setSimilarMovies] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const getMovieDetails = async id => {
            try {
                const data = await fetchMovieDetails(id);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };
        getMovieDetails(item._id);
    }, [item]);

    useEffect(() => {
        const getSimilarMovies = async () => {
            try {
                const data = await fetchTrendingMovies();
                if (data) setSimilarMovies(data);
            } catch (error) {
                console.error('Error fetching similar movies:', error);
            }
        };

        getSimilarMovies();
    }, []);

    return (
        <ScrollView
            contentContainerStyle={{ paddingTop: 30, paddingBottom: 55 }}
            className='flex-1 bg-black'
        >
            <View className='w-full'>
                <SafeAreaView className='absolute mt-10 z-20 w-full flex-row justify-between items-center px-4'>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.background} className='rounded-xl p-1'>
                        <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleFavorite(!isFavorite)}>
                        <HeartIcon size="35" color={isFavorite ? theme.text : "white"} />
                    </TouchableOpacity>
                </SafeAreaView>
                
                <View>

                    <Image
                        source={{uri: item.poster}}
                        style={{ width, height: height * 0.55 }}
                    />

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Watch', { id: item._id })}
                        className='absolute z-10'
                        style={{
                            position: 'absolute',
                            top: height * 0.215, 
                            left: width * 0.45,  
                        }}
                    >
                        <PlayIcon size={60} color="white" />
                    </TouchableOpacity>

                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0, 0.8)', 'rgba(0,0,0, 125)']}
                        style={{ width, height: height * 0.75 }}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        className='absolute bottom-0'
                    />

                </View>
            </View>

            <View style={{ marginTop: -(height * 0.140) }} className='space-y-4'>
                <Text className='text-white text-center text-3xl font-bold tracking-wider'>
                    {item.titulo}
                </Text>
                
                <Text className='text-neutral-400 font-semibold text-base text-center'>
                    Released • {item.lancamento}
                </Text>

                <View className='flex-row justify-center mx-4 space-x-2'>
                    <Text className='text-neutral-400 font-semibold text-base text-center'>
                        {item.genero}
                    </Text>
                </View>
                <Text className='text-neutral-400 mb-10 pt-5 pl-5 mx-7 tracking-wide'>
                {item.sinopse}
                </Text>
            </View>

            <MovieList title="Similar Movies" hideSeeAll={true} data={similarMovies} />

        </ScrollView>
    )
}
