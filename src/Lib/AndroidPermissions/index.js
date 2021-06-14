import React, {useState} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';

const isIos = Platform.OS === 'ios';

export const READ_STORAGE_PERMISSION =
  PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
export const WRITE_STORAGE_PERMISSION =
  PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
export const CAMERA_PERMISSION = PermissionsAndroid.PERMISSIONS.CAMERA;

//results
const GRANTED = PermissionsAndroid.RESULTS.GRANTED;
const DENIED = PermissionsAndroid.RESULTS.DENIED;
const NEVER_ASK_AGAIN = PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN;

export async function _check(Permission) {
  return await PermissionsAndroid.check(Permission);
}

export async function requestPermission(permission, options) {
  if (isIos) {
    return Promise.resolve(true);
  }
  try {
    let checkResult = await _check(permission, options);

    if (checkResult == GRANTED) {
      return true;
    } else {
      const granted = await PermissionsAndroid.request(
        permission,
        options || null,
      );
      if (granted == GRANTED) {
        return true;
      }
      console.log('permission denied', permission);
      return false;
    }
  } catch (e) {
    console.log('COULD NOT REQUEST PERMISSION', e);
    return false;
  }
}

export async function requestMultiple(permissions) {
  if (isIos) {
    return Promise.resolve(true);
  }

  try {
    let response = await PermissionsAndroid.requestMultiple(permissions);
    console.log('permission results', response);
    if (response) {
      return response;
    }
    return false;
  } catch (e) {
    console.log('COULD NOT REQUEST PERMISSIONS', e);
    return false;
  }
}
