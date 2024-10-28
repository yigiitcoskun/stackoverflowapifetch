import {View, StyleSheet, Text, Image} from 'react-native';
import React from 'react';


export const Item = ({item}) => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{uri: item.profile_image}} />
            <View style={styles.item}>
                <Text style={styles.text}>{item.display_name}</Text>
                <Text style={styles.text}>{item.location}</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding:10,
        paddingHorizontal:15,
        backgroundColor:'white',
        flexDirection:'row',
        marginBottom:5,
        borderBottomWidth:1,
        borderBottomColor:'#ddd'
    },
    image: {
        width: 50,
        height: 50,
        borderRadius:100,
    },
    item: {
        justifyContent:'center',
    },
    text: {
        marginLeft:10,
    }
})