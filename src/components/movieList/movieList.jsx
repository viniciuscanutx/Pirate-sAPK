import { Dimensions, Image, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import {styles} from '../../theme'
import { useNavigation } from "@react-navigation/native";

var {width, height} = Dimensions.get('window');

export default function MovieList({title, data}) {

    const navigation = useNavigation();
    let movieName = 'Ant-man and the Wasp: Quantumania';

    return (
        <View className="mb-8 mt-5 space-y-4">
            <View className="mx-4 flex-row justify-between items-center">
                <Text className="text-white text-xl">{title}</Text>
                <TouchableOpacity>
                    <Text style={styles.text} className="text-lg">See All</Text>
                </TouchableOpacity>
            </View>
            <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 15}}
            >
                {
                    data.map((item, index)=>{
                        return (
                            <TouchableWithoutFeedback
                            key={index}
                            onPress={()=> useNavigation.navigate('Movie', item)}
                            >
                                <View className="space-y-1 mr-6">
                                    <Image
                                        source={require('../../../assets/foto2.jpg')}
                                        className="rounded-3xl"
                                        style={{width: width*0.28, height: height*0.25}}
                                    />
                                <Text className="text-white ml-1">
                                    {
                                        movieName.length>14? movieName.slice(0,14)+'...': movieName
                                    }
                                </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}