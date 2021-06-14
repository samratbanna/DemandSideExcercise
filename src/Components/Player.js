/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState, useEffect, useCallback} from 'react';
import {AbsoluteBackButton} from '.';
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Text,
} from 'react-native';
import Video from 'react-native-video';
import AbsoluteContainer from './AbsoluteContainer';
import Row from './Row';
import {IconX, ICON_TYPE} from '../Icons';
import Slider from '@react-native-community/slider';
import NavigationService from '../Navigation';
import Orientation from 'react-native-orientation-locker';
import {ProgressBarX} from '.';
import metrics from '../Lib/Metrics';
import shareData from '../Lib/Share';

export default ({uri, title}) => {
  const player = useRef();
  const [playing, setPlaying] = useState(true);
  const [buffering, setBuffering] = useState(true);
  const [activeVideoTrack, setActiveVideoTrack] = useState({
    type: 'resolution',
    value: 360,
  });
  const [overlay, setOverlay] = useState(true);
  const [max, setMax] = useState(100);
  const [slide, setSlidingValue] = useState(0);
  const [progress, setProgress] = useState({});

  console.log('buffering', buffering, progress);
  const _onBuffer = e => {
    setBuffering(e.isBuffering);
  };

  const _onProgress = e => {
    setProgress(e);
    setSlidingValue(e.currentTime);
    if (parseInt(e.currentTime, 10) >= parseInt(e.seekableDuration, 10)) {
      setPlaying(false);
      setSlidingValue(0);
      player.current.seek(0);
    }
  };

  const _onLoad = payload => {
    console.log('onLoad', {...payload});
    let isresset = false;
    // let tracks = payload.videoTracks;
    // let sizefactor = payload.duration / 8388608;
    if (
      payload.naturalSize &&
      payload.naturalSize.orientation === 'landscape'
    ) {
      Orientation.lockToLandscapeLeft();
      setOverlay(false);
    } else {
      Orientation.lockToPortrait();
    }
    if (!isresset) {
      setActiveVideoTrack({type: 'auto'});
    }

    setMax(payload.duration);
  };

  const _onSingleTap = e => {
    setOverlay(o => (o ? false : true));

    if (overlay) {
      setOverlay(false);
    } else {
      setOverlay(true);
    }
  };

  const _onSlidingStart = e => {
    setPlaying(false);
  };
  const _onSlidingEnd = e => {
    player.current.seek(e);
    setPlaying(true);
  };
  const _valueChange = e => {
    setSlidingValue(e);
  };
  const _goback = () => NavigationService.goBack();

  useEffect(() => {
    Orientation.lockToLandscapeLeft();
    return () => {
      Orientation.lockToPortrait();
    };
  }, []);

  const seekback = () => {
    let time = progress.currentTime && progress.currentTime - 10;
    time && player.current.seek(time);
  };
  const seekforward = () => {
    let time = progress.currentTime && progress.currentTime + 10;
    time && player.current.seek(time);
  };

  const _onEnd = e => {
    //player.current.seek(0);
    setPlaying(false);
    // setSlidingValue(0);
  };

  const _togglePlaying = () => {
    return setPlaying(playing ? false : true);
  };

  return (
    <View
      style={{
        paddingLeft: 20,
        paddingTop: 100,
        width: '100%',
        height: '100%',
      }}>
      <Video
        ref={player}
        // controls
        //playInBackground
        paused={!playing}
        playWhenInactive
        progressUpdateInterval={500}
        fullscreenOrientation="landscape"
        hideShutterView
        resizeMode={'contain'}
        // pictureInPicture
        source={{
          uri,
        }}
        fullscreen={true}
        selectedVideoTrack={activeVideoTrack}
        style={[styles.backgroundVideo]}
        onEnd={_onEnd}
        onBuffer={_onBuffer}
        onLoad={_onLoad}
        //onLoadStart={_onLoadStart}
        //onSeek={_onSeek}
        onError={e => {
          //  console.log('error', e);
          let message =
            e &&
            e.error &&
            e.error.errorException.startsWith('Unable to connect to')
              ? 'Network error. Could not connect to network'
              : e.error && e.error.errorException;
          setPlaying(false);
        }}
        onProgress={_onProgress}
      />

      <TouchableWithoutFeedback
        onPress={_onSingleTap}
        onLongPress={() =>
          shareData({
            url: uri,
          })
        }>
        <AbsoluteContainer
          style={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}>
          {buffering ? (
            <AbsoluteContainer
              style={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.3)',
              }}>
              <ActivityIndicator color={'#4169E1'} size="large" />
            </AbsoluteContainer>
          ) : null}

          {overlay ? (
            <AbsoluteContainer
              style={{
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
              }}>
              <View style={{justifyContent: 'space-between', flex: 1}}>
                <View style={{flex: 1}}>
                  <AbsoluteBackButton onPress={_goback} />
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity onPress={seekback}>
                    <View
                      style={{
                        borderRadius: 999,
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        padding: 10,
                      }}>
                      <IconX
                        size={24}
                        color={'white'}
                        origin={ICON_TYPE.ENTYPO}
                        name={'controller-fast-backward'}
                      />
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={_togglePlaying}>
                    <View
                      style={{
                        borderRadius: 999,
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        padding: 20,
                      }}>
                      <IconX
                        size={42}
                        color={'white'}
                        origin={ICON_TYPE.ENTYPO}
                        name={playing ? 'controller-paus' : 'controller-play'}
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={seekforward}>
                    <View
                      style={{
                        borderRadius: 999,
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        padding: 10,
                      }}>
                      <IconX
                        size={24}
                        color={'white'}
                        origin={ICON_TYPE.ENTYPO}
                        name={'controller-fast-forward'}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0,0,0,0.8)',
                  }}>
                  <View
                    style={{paddingHorizontal: 16, paddingTop: 9, height: 20}}>
                    <ProgressBarX
                      style={{height: 2}}
                      color={'white'}
                      value={progress.playableDuration || 0}
                      total={max}
                    />
                    <View
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        left: 0,
                        bottom: 0,
                      }}>
                      <Slider
                        minimumValue={0}
                        style={{height: 20}}
                        value={progress.currentTime || 0}
                        maximumValue={max}
                        onSlidingStart={_onSlidingStart}
                        onSlidingComplete={_onSlidingEnd}
                        thumbTintColor={'#4169E1'}
                        onValueChange={_valueChange}
                        minimumTrackTintColor={'#4169E1'}
                        maximumTrackTintColor={'transparent'}
                      />
                    </View>
                  </View>
                  <Row spread style={{paddingHorizontal: 10}}>
                    <Text style={{color: 'white'}}>
                      {getTimerFromSeconds(slide)}
                    </Text>
                    <Text style={{color: 'white'}}>
                      {getTimerFromSeconds(progress.seekableDuration)}
                    </Text>
                  </Row>
                </View>
              </View>
            </AbsoluteContainer>
          ) : null}
        </AbsoluteContainer>
      </TouchableWithoutFeedback>
    </View>
  );
};

var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    right: 0,
  },
});

const getTimerFromSeconds = seconds => {
  if (!seconds) {
    return '0:00';
  }
  const minutes = Math.floor(seconds / 60);
  const leftSeconds = parseInt(seconds % 60, 10);
  const secondsStr =
    leftSeconds >= 0 && leftSeconds < 10
      ? '0' + leftSeconds
      : String(leftSeconds);
  console.log(minutes + ':' + secondsStr);
  return minutes + ':' + secondsStr;
};
