import React from 'react';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native';

export default ({children, bottom, top, onPress, fill, style, ...other}) => {
  let styles = {
    position: 'absolute',
    ...style,
  };

  styles = fill
    ? Object.assign(styles, {
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
      })
    : bottom
    ? Object.assign(styles, {
        bottom: 0,
        left: 0,
        right: 0,
      })
    : top
    ? Object.assign(styles, {
        top: 0,
        left: 0,
        right: 0,
      })
    : Object.assign(styles, {});

  return onPress ? (
    <TouchableOpacity {...other} onPress={onPress} style={[styles]}>
      {children}
    </TouchableOpacity>
  ) : (
    <View {...other} style={[styles]}>
      {children}
    </View>
  );
};
