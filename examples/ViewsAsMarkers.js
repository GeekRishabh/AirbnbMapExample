import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import MapView from 'react-native-maps';
import PriceMarker from './PriceMarker';

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 12.91074;
const LONGITUDE = 77.601825;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class ViewsAsMarkers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      coordinate: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
      },
      amount: 99,
    };
  }

  increment() {
    this.setState({amount: this.state.amount + 1});
  }

  decrement() {
    this.setState({amount: this.state.amount - 1});
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          style={styles.map}
          initialRegion={this.state.region}
        >
          <MapView.Marker coordinate={this.state.coordinate}>
            <PriceMarker amount={this.state.amount} />
          </MapView.Marker>
        </MapView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => this.decrement()}
            style={[styles.bubble, styles.button]}
          >
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.increment()}
            style={[styles.bubble, styles.button]}
          >
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

ViewsAsMarkers.propTypes = {
  provider: MapView.ProviderPropType,
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});

module.exports = ViewsAsMarkers;
