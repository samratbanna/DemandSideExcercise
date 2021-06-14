/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Button} from 'react-native-paper';

export default ({
  label,
  color,
  style,
  mode,
  zeroMargin,
  labelColor,
  onPress,
  loading,
  contentStyle,
  disabled,
  ...other
}) => {
  return disabled ? (
    <Button
      style={[{marginTop: zeroMargin ? 0 : 20}, style]}
      loading={loading}
      mode={mode || 'contained'}
      contentStyle={{padding: 5, ...contentStyle}}
      color={'#AEB4BA'}
      //onPress={!loading ? onPress : null}
      {...other}>
      {label}
    </Button>
  ) : (
    <Button
      style={[{marginTop: zeroMargin ? 0 : 20}, style]}
      loading={loading}
      mode={mode || 'contained'}
      contentStyle={{padding: 6, ...contentStyle}}
      color={color || '#FF853A'}
      onPress={!loading ? onPress : null}
      {...other}>
      {label}
    </Button>
  );
};
