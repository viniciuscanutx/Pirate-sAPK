import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, ScrollView, TouchableWithoutFeedback, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Loading from '../LoadingScreen/loadingscreen';
import { fetchTrendingMovies } from '../../api/moviedb'; 

var { width, height } = Dimensions.get('window');

export default function MovieListScreen() {
    const navigation = useNavigation();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getMovies = async () => {
            setLoading(true);
            const allMovies = await fetchTrendingMovies();
            setMovies(Array.isArray(allMovies) ? allMovies : []);
            setLoading(false);
        };

        getMovies();
    }, []);

    return (
        <SafeAreaView className='bg-black flex-1'>
            {loading ? (
                <Loading />
            ) : movies.length > 0 ? (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 40 }}
                    className='space-y-5'
                >
                    <Text className='text-white font-semibold ml-1 mt-4'>All Movies ({movies.length})</Text>
                    <View className='flex-row justify-between flex-wrap'>
                        {movies.map((item, index) => (
                            <TouchableWithoutFeedback
                                key={index}
                                onPress={() => navigation.push("Movie", item)}
                            >
                                <View className='space-y-2 mb-4'>
                                    <Image
                                        className="rounded-3xl"
                                        source={{ uri: item.poster }}
                                        style={{ width: width * 0.39, height: height * 0.32 }}
                                    />
                                    <Text className='text-neutral-300 ml-1'>
                                        {item.titulo && item.titulo.length > 22 ? item.titulo.slice(0, 20) + '...' : item.titulo}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        ))}
                    </View>
                </ScrollView>
            ) : (
                <View className='flex-row justify-center'>
                    <Image
                        source={require('../../../assets/movietime.png')}
                        className='mt-20 h-90 w-60'
                    />
                </View>
            )}
        </SafeAreaView>
    );
}