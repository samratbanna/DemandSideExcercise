import React, {useEffect} from 'react';
import {Platform, StatusBar, UIManager} from 'react-native';
import {NetInfoProvider} from './Lib/NetInfo/Context';
import {Provider as StoreProvider} from 'react-redux';
import {Screen} from './Components';
import {enableScreens} from 'react-native-screens';
import createStore from './Redux';
import RootNavigation from './Navigation/AppNavigation';

import {Provider as PaperProvider} from 'react-native-paper';

const isAndroid = Platform.OS === 'android' ? true : false;

if (isAndroid) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

//create the easy store
const store = createStore();
enableScreens();

//return root component
const Root = () => {
  return (
    <Screen>
      <NetInfoProvider>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={'rgba(0,10,10,0.2)'}
        />
        <StoreProvider store={store}>
          <PaperProvider>
            <RootNavigation />
          </PaperProvider>
        </StoreProvider>
      </NetInfoProvider>
    </Screen>
  );
};

export default Root;
export {store};
