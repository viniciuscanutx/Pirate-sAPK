import React, { useEffect, useState } from 'react';
import { View, Text, Touchable, TouchableOpacity, ScrollView } from "react-native";
import TrendingMovies from '../../components/trendingMovies/trendingMovies';
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { styles } from '../../theme/index'
import MovieList from '../../components/movieList/movieList';
import { useNavigation } from '@react-navigation/native';
import Loading from '../LoadingScreen/loadingscreen';
import { fetchTrendingMovies } from '../../api/moviedb';

export default function HomeScreen() {
    
    const [trending, setTrending] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(()=>{
        getTrendingMovies();
        getTopRatedMovies();
    }, [])

    const getTrendingMovies = async ()=>{
        const data = await fetchTrendingMovies();
        if(data && data) setTrending(data);
        setLoading(false);
    }

    const getTopRatedMovies = async ()=>{
        const data = await fetchTrendingMovies();
        if(data && data) setTopRated(data);
    }

    return (
        <View className="flex-1 bg-black">

            <SafeAreaView className="mt-3 mb-3">
                <StatusBar style="light" />
                <View className="flex-row justify-between items-center mx-4">
                    <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
                    <Text className="text-white text-3xl font-bold">
                        <Text style={styles.text}>P</Text>irate's
                    </Text>
                    <TouchableOpacity onPress={()=> navigation.navigate('Search')}>
                        <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            {
                loading? (
                    <Loading />
                ):(
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom: 10}}
                    >

                        { trending.length>0 && <TrendingMovies data={trending} /> } 

                        <MovieList title="Top Rated Movies" data={topRated} />   
                     
                    </ScrollView>
                )
            }

        </View>
    );
  }