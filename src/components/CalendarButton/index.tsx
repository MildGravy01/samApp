/* eslint-disable react-native/no-inline-styles */
import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCalendarDays} from '@fortawesome/free-solid-svg-icons';

export function CalendarButton(
  handleOpenCalendar: () => void,
): React.JSX.Element {
  return (
    <TouchableOpacity onPress={handleOpenCalendar}>
      <View
        style={{
          padding: 10,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <FontAwesomeIcon
          icon={faCalendarDays}
          size={15}
          style={{color: '#007AFF'}}
        />
      </View>
    </TouchableOpacity>
  );
}
