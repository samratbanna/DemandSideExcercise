/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

export default ({style, ...other}) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}} edge={['top']}>
        <View
          {...other}
          style={[style, {backgroundColor: '#dddddd', flex: 1}]}
          useSafeAreaView
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
