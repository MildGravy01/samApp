import {faArrowUpFromBracket} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {TouchableOpacity} from 'react-native';
import React from 'react';

export const ShareButton = (handleOnPress: () => void): JSX.Element => (
  <TouchableOpacity onPress={handleOnPress}>
    <FontAwesomeIcon icon={faArrowUpFromBracket} size={16} color="#007AFF" />
  </TouchableOpacity>
);
