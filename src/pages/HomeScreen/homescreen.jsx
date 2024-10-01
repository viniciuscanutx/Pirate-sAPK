import React, { useState } from 'react';
import { View, Text, Touchable, TouchableOpacity, ScrollView } from "react-native";
import TrendingMovies from '../../components/trendingMovies/trendingMovies';
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { styles } from '../../theme/index'
import MovieList from '../../components/movieList/movieList';

export default function AppNavigation() {
    
    const [trending, setTrending] = useState([1,2,3]);
    const [upcoming, setUpcoming] = useState([1,2,3]);
    const [topRated, setTopRated] = useState([1,2,3]);

    return (
        <View className="flex-1 bg-slate-950">

            <SafeAreaView className="mt-3 mb-3">
                <StatusBar style="light" />
                <View className="flex-row justify-between items-center mx-4">
                    <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
                    <Text className="text-white text-3xl font-bold">
                        <Text style={styles.text}>M</Text>ovies
                    </Text>
                    <TouchableOpacity>
                        <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            <ScrollView
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 10}}
                >

                    <TrendingMovies data={trending} />

                    <MovieList title="Upcoming" data={upcoming} />

                    <MovieList title="Top Rated Movies" data={topRated} />   
                     
                </ScrollView>
        </View>
    );
  }