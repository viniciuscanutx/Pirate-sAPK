import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ChevronLeftIcon, HeartIcon, PlayIcon } from 'react-native-heroicons/outline';
import { styles, theme } from '../../theme'
import { LinearGradient } from 'expo-linear-gradient'
import MovieList from '../../components/movieList/movieList';

var { width, height } = Dimensions.get('window');

export default function MovieScreen() {

    let movieName = 'Ant-man and the Wasp: Quantumania';
    const { params: item } = useRoute();
    const [isFavorite, toggleFavorite] = useState(false);
    const [similarMovies, setSimilarMovies] = useState([1,2,3,4,5]);
    const navigation = useNavigation();

    useEffect(() => {

    }, [item])

    return (
        <ScrollView
            contentContainerStyle={{ paddingTop: 0, paddingBottom: 55 }}
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
                        source={require('../../../assets/foto1.jpg')}
                        style={{ width, height: height * 0.55 }}
                    />

                    <TouchableOpacity
                        onPress={() => console.log('Play video')}
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
                    {movieName}
                </Text>
                
                <Text className='text-neutral-400 font-semibold text-base text-center'>
                    Released • 2020 • 170min
                </Text>

                <View className='flex-row justify-center mx-4 space-x-2'>
                    <Text className='text-neutral-400 font-semibold text-base text-center'>
                        Action • 
                    </Text>
                    <Text className='text-neutral-400 font-semibold text-base text-center'>
                        Adventure •  
                    </Text>
                    <Text className='text-neutral-400 font-semibold text-base text-center'>
                        Comedy
                    </Text>
                </View>
                <Text className='text-neutral-400 mb-6 pt-2 mx-12 tracking-wide'>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto amet voluptatum, eos numquam vitae dicta? Optio iusto voluptatem omnis sint commodi quis, enim, voluptates maiores nihil quas quo quibusdam iste?
                </Text>
            </View>

            <MovieList title="Similar Movies" hideSeeAll={true} data={similarMovies} />

        </ScrollView>
    )
}
