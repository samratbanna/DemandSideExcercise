import React from 'react';
import {AbsoluteContainer, Row} from '../Components';
import {IconX, ICON_TYPE} from '../Icons';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

export default ({
  onPress,
  buttonStyle,
  buttonBg,
  style,
  renderCenter,
  renderRight,
}) => {
  const _goback = () => {
    onPress && onPress();
  };

  return (
    <AbsoluteContainer style={[styles.container, {style}]}>
      <Row style={buttonStyle || {margin: 1}}>
        <TouchableOpacity onPress={_goback} color={'#4169E1'}>
          <View
            style={[styles.buttonView, {backgroundColor: buttonBg || 'black'}]}>
            <IconX
              name="arrowleft"
              color={'white'}
              origin={ICON_TYPE.ANT_ICON}
            />
          </View>
        </TouchableOpacity>

        <View style={{marginLeft: 20}}>
          {renderCenter ? renderCenter() : null}
        </View>
      </Row>
    </AbsoluteContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 0,
    paddingTop: 10,
    left: 12,
  },
  containerRight: {
    top: 0,
    paddingTop: 30,
    right: 0,
  },
  buttonView: {
    alignSelf: 'flex-start',
    padding: 10,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
    backgroundColor: 'black',
    borderRadius: 99,
  },
});
