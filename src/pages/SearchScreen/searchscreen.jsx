import { View, Text, Dimensions, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image } from 'react-native';
import React, { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import Loading from '../LoadingScreen/loadingscreen';
import debounce from 'lodash.debounce';
import { searchMovies } from '../../api/moviedb';

var { width, height } = Dimensions.get('window');

export default function SearchScreen() {
    const navigation = useNavigation();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (value) => {
        setLoading(true);
        const searchResults = await searchMovies(value);
        setResults(Array.isArray(searchResults) ? searchResults : []);
        setLoading(false);
    };

    const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

    return (
        <SafeAreaView className='bg-black flex-1'>
            <View
                className='mx-4 mt-4 mb-3 flex-row justify-between items-center border border-neutral-600 rounded-full'>
                <TextInput
                    onChangeText={handleTextDebounce}
                    placeholder='Search Movie'
                    placeholderTextColor={'lightgray'}
                    className='pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider'
                />
                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    className='rounded-full p-3 m-1 bg-neutral-800'
                >
                    <XMarkIcon size="25" color="white" />
                </TouchableOpacity>
            </View>
            {
                loading ? (
                    <Loading />
                ) : results && results.length > 0 ? (  
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 40 }}
                        className='space-y-5'>
                        <Text className='text-white font-semibold ml-1'>Results ({results.length})</Text>
                        <View className='flex-row justify-between flex-wrap'>
                            {
                                results.map((item, index) => {
                                    return (
                                        <TouchableWithoutFeedback
                                            key={index}
                                            onPress={() => navigation.push("Movie", item)}
                                        >
                                            <View className='space-y-2 mb-4'>
                                                <Image className="rounded-3xl"
                                                    source={{ uri: item.poster }}
                                                    style={{ width: width * 0.39, height: height * 0.32 }}
                                                />
                                                <Text className='text-neutral-300 ml-1'>
                                                    {
                                                        item.titulo && item.titulo.length > 22 ? item.titulo.slice(0, 20) + '...' : item.titulo
                                                    }
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    )
                                })
                            }
                        </View>
                    </ScrollView>
                ) : (
                    <View className='flex-row justify-center'>
                        <Image source={require('../../../assets/movietime.png')}
                            className='mt-20 h-90 w-60' />
                    </View>
                )
            }

        </SafeAreaView>
    )
}
