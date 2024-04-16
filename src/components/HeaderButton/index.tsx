import {Button} from 'react-native';
import React from 'react';

export const Backbutton = (
  title: string,
  handleOnPress: () => void,
): JSX.Element => <Button onPress={handleOnPress} title={title} />;
