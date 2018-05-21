import React from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';

import styles from './styles'

export default class extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                <Image style={styles.image}
          source={require('../../assets/images/logo.png')}
        />
                    <Text style={styles.title}>HALALGO</Text>
                    <Text style={{color:'white'}}>Your New Halal Experience </Text>
                </View>
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator animating={true}/>
                </View>
            </View>
        );
    }
}