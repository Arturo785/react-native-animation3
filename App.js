import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import {createSharedElementStackNavigator} from "react-navigation-shared-element"
import FoodDetail from './src/screens/FoodDetail';
import FoodList from './src/screens/FoodList';

const Stack = createSharedElementStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="foodList"
            >
                <Stack.Screen name="foodList" component={FoodList} />
                <Stack.Screen name="foodDetails" component={FoodDetail} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({})
