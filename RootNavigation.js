import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function goBack() {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
}

export function popToTop() {
  if (navigationRef.isReady()) {
    navigationRef.popToTop();
  }
}

export function replace(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.replace(name, params);
  }
}