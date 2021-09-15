import { getProviderStatusAsync, LocationProviderStatus } from 'expo-location';
import { useState } from 'react';
import { Platform } from 'react-native';
import useInterval from 'use-interval';

const useLocationProviderStatus = (delay: number = 2000) => {
  const [locationProviderAvailable, setLocationProviderAvailable] = useState<boolean | undefined>(undefined);

  const getLocationProviderStatus = ({
    gpsAvailable,
    networkAvailable,
    passiveAvailable,
  }: LocationProviderStatus): boolean | undefined => {
    if (Platform.OS === 'ios') return undefined;

    return gpsAvailable || networkAvailable || passiveAvailable;
  };

  useInterval(async () => {
    const providerStatus = await getProviderStatusAsync();
    setLocationProviderAvailable(getLocationProviderStatus(providerStatus));
  }, delay);

  return { locationProviderAvailable };
};

export default useLocationProviderStatus;
