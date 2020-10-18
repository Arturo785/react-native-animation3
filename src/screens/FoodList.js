import React, {useState} from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { width, SPACING } from '../utils/theme'
import food, { tabs, popularFood, foodConfig,} from "../data/food" // this way the food takes the default data and the other exports the ones in brackets
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons';
import { SharedElement } from 'react-navigation-shared-element'


const CELL_WIDTH = width * 0.64
const CELL_HEIGHT = CELL_WIDTH * 1.4
const FULL_SIZE = CELL_WIDTH + SPACING * 2

export default function FoodList(props) {

    const {navigation} = props

    const [selectedTab, setSelectedTab] = useState(tabs[0]) // 1st string

    return (

        <ScrollView>

        <SafeAreaView style={{flex : 1}}>

            <FlatList
                data={tabs}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{flexGrow : 0}}
                contentContainerStyle={{padding : SPACING}}
                keyExtractor={(item,index) => `${item}-${index}`}
                renderItem={({item : tab}) => {
                    return (
                        <TouchableOpacity onPress={() => setSelectedTab(tab)}>

                            <View 
                                style={[styles.pill,
                                {backgroundColor : selectedTab === tab
                                ? "#ff9642"
                                : "transparent" }]}
                                >

                                <Text 
                                    style={[styles.piilText,
                                        {color : selectedTab === tab
                                        ? "#fff"
                                        : "#000" }]}
                                >
                                    {tab}
                                </Text>

                            </View>

                        </TouchableOpacity>
                    )
                }}
            />

            <FlatList   
                data={food}
                keyExtractor={(item) => item.key}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={FULL_SIZE}
                decelerationRate={"fast"}
                renderItem={({item}) =>{
                    return (
                        <TouchableOpacity
                            style={{width : CELL_WIDTH, height : CELL_HEIGHT, margin : SPACING}}
                            onPress={() =>{
                                navigation.navigate("foodDetails", {item} )
                            }}
                        >
                            <View style={{flex : 1, padding : SPACING, justifyContent : "center"}}>

                            <SharedElement id={`item.${item.key}.bg`} style={[StyleSheet.absoluteFillObject]} >

                                <View style={[
                                    StyleSheet.absoluteFillObject,
                                    {backgroundColor : item.color, borderRadius : 16}
                                ]} />
                            
                            </SharedElement>

                                <SharedElement id={`item.${item.key}.meta`} style={[StyleSheet.absoluteFillObject]} >

                                    <View style={{position : "absolute", top : SPACING, left : SPACING }}>
                                        <Text style={styles.type}> {item.type} </Text>
                                        <Text style={styles.subType}> {item.subType} </Text>
                                    </View>

                                </SharedElement>

                                <SharedElement id={`item.${item.key}.image`} style={styles.image} >

                                    <Image  source={{ uri : item.image }} style={styles.image} />
                                
                                </SharedElement>

                            </View>
                        </TouchableOpacity>
                    )
                }}
            
            />


            <FlatList 
                data={popularFood}
                scrollEnabled={false}
                keyExtractor={item => item.key}
                renderItem={({item}) =>{
                    return(
                        <View style={{flexDirection : "row", alignItems : "center", padding : SPACING}}>

                            <Image source={{uri : item.image }} style={styles.popularImage } />

                            <View style={{flex : 1}}>
                                <Text style={styles.popularType}> {item.type} </Text>

                                <View style={{flexDirection : "row"}}>

                                    <Icon 
                                        name="star"
                                        size={16}
                                        color="#ff9642"
                                        style={{marginRight: SPACING / 2}}
                                    />
                                    <Text style={{fontWeight : "700"}}>{item.rating}</Text>

                                </View>

                            </View>

                            <Text style={styles.popularPrice}>{item.price}</Text>

                        </View>
                    )
                }}
                
            
            />

        </SafeAreaView>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    pill : {
        paddingHorizontal : SPACING,
        paddingVertical : SPACING / 2,
        borderRadius : 12
    },
    piilText : {
        fontWeight : "700"
    },
    popularType : {
        fontWeight : "800",
        fontSize : 16,

    },
    popularImage : {
        width : 54,
        height : 54,
        resizeMode : "contain",
        marginRight : SPACING
    },
    popularPrice : {
        fontWeight : "bold",
    },
    type : {
        fontWeight : "800",
        fontSize: 22,
    },
    subType : {
        fontSize : 12,
        opacity : 0.8,

    },
    image : {
        width : CELL_WIDTH * 0.7,
        height : CELL_WIDTH * 0.7,
        alignSelf : "center",
        resizeMode : "contain",
        position : "absolute"
    }
})
