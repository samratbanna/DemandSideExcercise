import React from 'react';
import {Easing, Animated} from 'react-native';

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 450,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },

    screenInterpolator: sceneProps => {
      const {position, layout, scene, index, scenes} = sceneProps;
      const toIndex = index;
      const thisSceneIndex = scene.index;
      const height = layout.initHeight;
      const width = layout.initWidth;

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [width, 0, 0],
      });

      const opacity = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [0, 1],
      });

      // Since we want the card to take the same amount of time
      // to animate downwards no matter if it's 3rd on the stack
      // or 53rd, we interpolate over the entire range from 0 - thisSceneIndex
      const translateY = position.interpolate({
        inputRange: [0, thisSceneIndex],
        outputRange: [height, 0],
      });

      const slideFromRight = {opacity, transform: [{translateX}]};
      const slideFromBottom = {transform: [{translateY}]};

      const opacityTransform = {opacity};

      const slideFromBottomWithOpacity = {
        opacity,
        transform: [{translateY}],
      };

      const lastSceneIndex = scenes[scenes.length - 1].index;

      // Test whether we're skipping back more than one screen
      // and slide from bottom if true
      if (lastSceneIndex - toIndex > 1) {
        // Do not transoform the screen being navigated to
        if (scene.index === toIndex) {
          return;
        }
        // Hide all screens in between
        if (scene.index !== lastSceneIndex) {
          return {opacity: 0};
        }
        // Slide top screen down
        return slideFromBottom;
      }
      // Otherwise slide from right
      return opacityTransform;
    },
  };
};
//export our config
export default transitionConfig;

export const modalOpacityconfig = () => ({
  transitionSpec: {
    duration: 300,
    easing: Easing.inOut(Easing.ease),
    timing: Animated.timing,
    useNativeDriver: true,
  },
  screenInterpolator: sceneProps => {
    const {position, layout, scene} = sceneProps;
    const {index} = scene;
    const height = layout.initHeight;

    const opacity = position.interpolate({
      inputRange: [index - 1, index - 0.5, index],
      outputRange: [0, 0, 1],
    });

    const translateY = position.interpolate({
      inputRange: [0, index],
      outputRange: [height, 0],
    });

    const slideFromBottom = {opacity, transform: [{translateY}]};

    return index == 0 ? null : slideFromBottom; //{ opacity };
  },
});

export const slideXConfig = () => ({
  transitionSpec: {
    easing: Easing.inOut(Easing.ease),
    timing: Animated.timing,
    useNativeDriver: true,
  },
  screenInterpolator: sceneProps => {
    const {position, layout, scene} = sceneProps;
    const {index} = scene;
    const width = layout.initWidth;

    // const opacity = position.interpolate({
    //   inputRange: [index - 1, index - 0.5, index],
    //   outputRange: [0, 0.5, 1],
    // });

    const translateX = position.interpolate({
      inputRange: [0, index],
      outputRange: [width, 0],
    });

    const slideFromRight = {transform: [{translateX}]};

    return slideFromRight; //{ opacity };
  },
});
