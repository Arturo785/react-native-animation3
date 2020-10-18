import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { width, SPACING, height } from '../utils/theme'
import * as Animatable from "react-native-animatable"
import { SharedElement } from 'react-navigation-shared-element'

const animation = {
    0 : {opacity : 0, translateY : 100},
    1 : {opacity : 1, translateY : 0},
}

const DURATION = 400


const CELL_WIDTH = width * 0.64
const CELL_HEIGHT = CELL_WIDTH * 1.4
const FULL_SIZE = CELL_WIDTH + SPACING * 2


const createAnimation = (from) => ({
    0 : {opacity : 0 ,translateY : -150, translateX : from},
    1 : {opacity : 1 ,translateY : 0, translateX : 0},
})

const animations = [
    createAnimation(100),
    createAnimation(0),
    createAnimation(-100),
]


export default function FoodDetail({navigation, route}) {

    const {item} = route.params 

    return (
        <SafeAreaView style={{flex : 1}}>
            
            <SharedElement id={`item.${item.key}.bg`} style={[StyleSheet.absoluteFillObject]}>

                <View style={[
                    StyleSheet.absoluteFillObject,
                    {backgroundColor : item.color, borderRadius : 16}
                ]} />
            
            </SharedElement>

            <SharedElement id={`item.${item.key}.meta`}>

                <View style={{position : "absolute", top : SPACING * 2, left : SPACING *2 }}>
                    
                    <Text style={styles.type}> {item.type} </Text>
                    <Text style={styles.subType}> {item.subType} </Text>
                    
                </View>

            </SharedElement>

            <View style={{ marginTop : height * 0.1}}>

                <SharedElement id={`item.${item.key}.image`}>

                    <Image  source={{ uri : item.image }} style={styles.image} />

                </SharedElement>

                <View style={{flexDirection : "row", justifyContent : "space-evenly", marginBottom : SPACING * 3}}>
                    {item.subcategories.map((subCategory,key) =>{
                        return (
                            <Animatable.View key={key}
                                useNativeDriver
                                animation={animations[key]}
                                delay={DURATION}
                                style={{backgroundColor : item.fullColor, padding : SPACING, borderRadius : 50}}>

                                <Image  source={{uri : subCategory.image}} style={{width : 32, height : 32, resizeMode : "contain"}} />

                            </Animatable.View>
                        )
                    })}
                </View>

            </View>

            <View style={{padding : SPACING}}>
                
                <Animatable.Text style={{fontSize : 32, fontWeight : "700", marginBottom : SPACING / 2}}
                    useNativeDriver
                    animation = {animation}    
                    delay={DURATION + 100}
                >
                     {item.price}
                </Animatable.Text>
                
                <Animatable.Text style={{fontSize : 14, lineHeight : 20, color : "rgba(0,0,0,0.7)" }}
                    useNativeDriver
                    animation = {animation}    
                    delay={DURATION + 200}
                >
                     {item.description}
                </Animatable.Text>

            </View>

        </SafeAreaView>
    )
}

FoodDetail.sharedElements = (route, otherRoute, showing) => {
    const { item } = route.params;
    return [
      {
        id: `item.${item.key}.bg`,
      },
      {
        id: `item.${item.key}.meta`,
      },
      {
        id: `item.${item.key}.image`,
      },
    ];
  };


const styles = StyleSheet.create({
    type : {
        fontWeight : "800",
        fontSize: 22,
    },
    subType : {
        fontSize : 12,
        opacity : 0.8,

    },
    image : {
        width : CELL_WIDTH * 0.9,
        height : CELL_WIDTH * 0.9,
        alignSelf : "center",
        resizeMode : "contain",
        marginVertical : SPACING * 4,
        zIndex : 2,
    }

})
