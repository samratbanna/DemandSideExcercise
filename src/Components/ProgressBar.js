import React from 'react';
import {ProgressBar} from 'react-native-paper';

export default ({value, total, final, color, style = {}}) => {
  let sum = final || total;
  const percent = !parseInt(sum, 10)
    ? 1
    : parseInt(value, 10) / parseInt(sum, 10);

  return <ProgressBar progress={percent} color={color} style={style} />;
};
