import React, { Component } from 'react';

import { Screen, Spinner, Examples } from '@shoutem/ui';
import { stringify as queryString } from 'query-string';
import MapView, {Marker, AnimatedRegion} from 'react-native-maps'
import styles from './styles';



class Map extends Component {
    state = {
        mapRegion: null,
        gpsAccuracy: null,
        lookingFor: null,
    
    }
    watchID = null

    componentWillMount() {
        this.watchID = navigator.geolocation.watchPosition((position) => {
            let region = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.00922*1.5,
                longitudeDelta: 0.00421*1.5
            }
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null,
              });

            this.onRegionChange(region, position.coords.accuracy);
        });
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    onRegionChange(region, gpsAccuracy) {
       

        this.setState({
            mapRegion: region,
            gpsAccuracy: gpsAccuracy || this.state.gpsAccuracy
        });
    }

 

    render() {
        const { mapRegion } = this.state;

        if (mapRegion) {
            return (
                <Screen>
                    <MapView.Animated region={this.state.mapRegion}
                      style={styles.fullscreen}
                      onRegionChange={this.onRegionChange.bind(this)}>
<Marker.Animated region={this.state.mapRegion}
         onRegionChange={this.onRegionChange}
            coordinate={{"latitude":this.state.latitude,"longitude":this.state.longitude}}
            title={"Your Location"}
          />
       

    </MapView.Animated>

                </Screen>
            );
        }else{
            return (
                <Screen style={styles.centered}>
                    <Spinner styleName="large" />
                </Screen>
            );
        }
    }
}



export default Map;