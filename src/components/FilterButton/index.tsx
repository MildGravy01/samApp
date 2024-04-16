/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {TouchableOpacity, View, Text} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons';
import {IFilter} from '../../stores/FilterStore';

export function FilterButton(
  isFilter: boolean,
  currentFilter: IFilter,
): React.JSX.Element {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      onPress={() =>
        isFilter
          ? navigation.navigate('Filters')
          : navigation.navigate('MeetingsList')
      }>
      <View
        style={{
          padding: 10,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 16, color: '#0d0d0e', paddingRight: 5}}>
          {currentFilter.name}
        </Text>
        <FontAwesomeIcon
          icon={faChevronDown}
          size={10}
          style={{color: '#007AFF'}}
        />
      </View>
    </TouchableOpacity>
  );
}
