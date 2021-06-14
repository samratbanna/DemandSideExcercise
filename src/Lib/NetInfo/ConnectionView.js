import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import useNetInfo from '../NetInfo';
import {Heading, Section, Row} from '../../Components';
import {IconX, ICON_TYPE} from '../../Icons';
import {showInfoToast} from '../Toast';

export default () => {
  const {type, isConnected} = useNetInfo();

  useEffect(() => {
    !isConnected && showInfoToast('Internet not connected');
  }, [isConnected]);

  return !isConnected ? (
    <Section style={styles.container}>
      <Row>
        <IconX color="white" name="wifi-off" origin={ICON_TYPE.FEATHER_ICONS} />
        <Heading style={styles.text}>Internet Disconnected </Heading>
      </Row>
    </Section>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D7263D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginLeft: 20,
    color: 'white',
  },
});
