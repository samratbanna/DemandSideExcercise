import React from 'react';
import {StackActions, CommonActions} from '@react-navigation/native';

export const navigationRef = React.createRef();
export const isMountedRef = React.createRef();

function navigate(routeName, params) {
  console.log('LOG_navigate', routeName, params);
  if (isMountedRef.current && navigationRef.current) {
    navigationRef.current.navigate(routeName, params);
  } else {
  }
}

function replace(route, params, ...args) {
  navigationRef.current?.dispatch(StackActions.replace(route, params, ...args));
}

const NavigationService = {
  navigate,
  goBack: () => navigationRef.current?.dispatch(CommonActions.goBack()),
  replace,
};

export default NavigationService;
