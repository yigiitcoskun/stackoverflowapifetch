import React from 'react';
import {View, Text, StyleSheet} from "react-native";

export const Header = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>mUserList</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 23,
        fontWeight: 700,
    }
})