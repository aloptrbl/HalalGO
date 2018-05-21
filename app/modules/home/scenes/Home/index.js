import {NativeModules} from 'react-native';
import Home from "./Home"
console.disableYellowBox = true;
console.reportErrorsAsExceptions = false;
NativeModules.ExceptionsManager = null;
export default Home;