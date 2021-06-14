import {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';

const inititalState = {
  type: null,
  effectiveType: null,
};

const useNetInfo = () => {
  const [netInfo, setNetInfo] = useState(inititalState);

  useEffect(() => {
    NetInfo.fetch().then(connectionInfo => {
      setNetInfo(connectionInfo);
    });
  }, []);

  useEffect(() => {
    const unsubscriber = NetInfo.addEventListener(setNetInfo);
    return () => {
      unsubscriber();
    };
  }, []);

  return netInfo;
};

export default useNetInfo;
