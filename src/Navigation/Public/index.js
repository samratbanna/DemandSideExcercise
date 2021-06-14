import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Routes from '../Routes';
import Home from '../../Screens/Home';
import movieDetail from '../../Screens/Home/movieDetail';

const Stack = createStackNavigator();

export default props => {
  return (
    <Stack.Navigator initialRouteName={Routes.HOME_SCREEN}>
      <Stack.Screen
        name={Routes.HOME_SCREEN}
        options={{headerShown: false}}
        component={Home}
      />

      <Stack.Screen
        name={Routes.MOVIE_DETAIL}
        options={{headerShown: false}}
        component={movieDetail}
      />
    </Stack.Navigator>
  );
};
