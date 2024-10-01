import {View, Text, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ChevronDoubleLeftIcon, ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/outline';
import { styles, theme} from '../../theme'
import { LinearGradient } from 'expo-linear-gradient'

var {width, height} = Dimensions.get('window');

export default function MovieScreen() {

    const {params: item} = useRoute();
    const [isFavorite, toggleFavorite] = useState(false);
    const navigation = useNavigation();

    useEffect(()=> {

    }, [item])

    return (
       
       <ScrollView
        contentContainerStyle={{paddingTop: 0, paddingBottom: 55}}
        className='flex-1 bg-neutral-900'
       >

        <View className='w-full'>
            <SafeAreaView className='absolute mt-10 z-20 w-full flex-row justify-between items-center px-4'>
                <TouchableOpacity onPress={()=> navigation.goBack()} style={styles.background} className='rounded-xl p-1'>
                    <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> toggleFavorite(!isFavorite)}>
                    <HeartIcon size="35" color={isFavorite? theme.text : "white"} />
                </TouchableOpacity>
            </SafeAreaView>
        </View>
            <Image 
            source={require('../../../assets/foto1.jpg')}
            style={{width, height: height*0.55}}
            />

            <LinearGradient 
            colors={['transparent', 'rgba(23,23,23, 0.9)', 'rgba(23,23,23, 1)']}
            style={{width, height: height*0.75}}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
            className='absolute bottom-0'
            />

       </ScrollView>
    )
}