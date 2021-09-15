import NetInfo, { NetInfoState, NetInfoSubscription } from '@react-native-community/netinfo';
import { useState, useRef, useEffect } from 'react';

const useDeviceOnlineStatus = () => {
  const [online, setOnline] = useState(false);
  const unsubscribeRef = useRef<NetInfoSubscription | undefined>();

  useEffect(() => {
    unsubscribeRef.current = NetInfo.addEventListener((state: NetInfoState) => {
      setOnline(state.isConnected);
    });

    return () => {
      unsubscribeRef?.current && unsubscribeRef.current();
    };
  }, []);

  return { online };
};

export default useDeviceOnlineStatus;
