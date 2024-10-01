import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View, Text, TouchableWithoutFeedback, Dimensions, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel'


var {width, height} = Dimensions.get('window');

export default function TrendingMovies({data}) {
    const navigation = useNavigation();
    const handleClick = ()=>{
        navigation.navigate('Movie', item);
    }
  return (
    <View className='mb-8'>
        <Text className='text-white text-xl mx-4 mt-5 mb-8'>Trending</Text>
        <Carousel 
            data={data}
            renderItem={({item}) => <MovieCard item={item} handleClick={handleClick} />}
            firstitem={1}
            inactiveSlideOpacity={0.60}
            sliderWidth={width}
            itemWidth={width*0.53}
            slideStyle={{display: 'flex', alignItems: 'center'}}
        />
    </View>
  )
}

const MovieCard = ({item, handleClick})=>{
    return (
        <TouchableWithoutFeedback onPress={handleClick}>
            <Image
            source={require("../../../assets/foto1.jpg")}
            style={{
                width: width*0.5,
                height: height*0.4
            }}
            className="rounded-3xl"
            />
        </TouchableWithoutFeedback>
    )
}