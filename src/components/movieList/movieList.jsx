import { Dimensions, Image, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import {styles} from '../../theme';
import { useNavigation } from "@react-navigation/native";

var {width, height} = Dimensions.get('window');

export default function MovieList({title, data, hideSeeAll}) {

    const navigation = useNavigation();

    return (
        <View className="mb-5 mt-5 space-y-4">
            <View className="mx-4 flex-row justify-between items-center">
                <Text className="text-white text-xl">{title}</Text>
                {
                    !hideSeeAll && (
                        <TouchableOpacity onPress={() => navigation.push('SeeAll')}>
                            <Text style={styles.text} className="text-lg">See All</Text>
                        </TouchableOpacity>
                    )
                }
            </View>
            <ScrollView 
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal: 15}}
            >
                {
                    data.map((item, index) => (
                        <TouchableWithoutFeedback
                            key={index}
                            onPress={() => navigation.push('Movie', item)}
                        >
                            <View className="space-y-1 mr-6">
                                <Image
                                    source={{uri: item.poster}}
                                    className="rounded-3xl"
                                    style={{width: width * 0.28, height: height * 0.25}}
                                />
                                <Text className="text-white ml-1">
                                    {item.titulo.length > 14 ? item.titulo.slice(0, 14) + '...' : item.titulo}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    ))
                }
            </ScrollView>
        </View>
    );
}
