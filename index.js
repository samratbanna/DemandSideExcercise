/**
 * @format
 */

import 'react-native-gesture-handler'; // remove after bug fixes hermes gesturehandler
import {AppRegistry, YellowBox} from 'react-native';
import App from './src';
import {name as appName} from './app.json';
// import "./debugmodules";

YellowBox.ignoreWarnings([
  'Require cycle:',
  'Remote debugger',
  'Accessing view manager configs',
  'Warning: componentWillReceiveProps',
  'Warning: componentWillMount',
  'ReactNativeFiberHostComponent:',
  'Animated: `useNativeDriver` was not specified.',
]);

AppRegistry.registerComponent(appName, () => App);