import NetInfo from '@react-native-community/netinfo';

let isConnected = false;

export const listenConnection = () => {
  NetInfo.addEventListener(state => {
    isConnected = state.isConnected;
  });
}

export const getIsConnected = () => {
  // return false;
  return isConnected;
}