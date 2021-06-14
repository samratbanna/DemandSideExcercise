import React from 'react';
import {StyleSheet, Text} from 'react-native';

export default ({style, color, primary, ...other}) => {
  const colorStyles = {
    color: color || '#0D7BBF',
  };

  return <Text {...other} style={[styles.heading, colorStyles, style]} />;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
  },
  heading: {
    fontSize: 18,
    marginBottom: 2,
    letterSpacing: 0.3,
  },
});
