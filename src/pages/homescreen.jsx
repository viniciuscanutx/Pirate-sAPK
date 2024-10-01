import { View, Text } from "react-native";
import React from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {} from 'react-native-heroicons/outline';

export default function AppNavigation() {
    return (
        <View className="flex-1 bg-neutral-800">
            <SafeAreaView className="mb-3">
                <StatusBar style="light" />
                <View className="flex-row justify-between items-center mx-4">
                    
                </View>
            </SafeAreaView>
        </View>
    );
  }