/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';

export default ({
  style,
  spread,
  justify,
  align,
  right,
  center,
  children,
  ...other
}) => {
  const rowStyles = {
    justifyContent: justify
      ? justify
      : spread
      ? 'space-between'
      : center
      ? 'center'
      : right
      ? 'flex-end'
      : 'flex-start',
  };

  return (
    <View
      {...other}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
        },
        rowStyles,
        style,
      ]}>
      {children}
    </View>
  );
};
