/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AllMeetingsView} from './views/AllMeetingsView';
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';
import {FilterSelectorView} from './views/FilterSelectorView';
import {FilterButton} from './components/FilterButton';
import {MeetingView} from './views/MeetingView';
import {IMeeting} from './api/types';
import {filterStore} from './stores/FilterStore';
import {DatePickerView} from './views/DatePickerView';
import {initCalendarLocale} from './views/DatePickerView/locale';
import {MarkedDates} from 'react-native-calendars/src/types';

export type RootStackParamList = {
  MeetingsList: undefined;
  Filters: undefined; // Добавьте другие параметры здесь, если они есть
  MeetingDetail: {item: IMeeting};
  Datepicker: {markedDates: MarkedDates};
};

export type MeetingDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'MeetingDetail'
>;

export type DatePickerScreenRouteProp = RouteProp<
  RootStackParamList,
  'Datepicker'
>;

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  enableScreens();
  initCalendarLocale();
  const {currentFilter} = filterStore;
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MeetingsList" component={AllMeetingsView} />
        <Stack.Screen
          name="Filters"
          component={FilterSelectorView}
          options={{
            headerBackVisible: true,
            presentation: 'containedModal',
            headerTitle: () => FilterButton(false, currentFilter),
          }}
        />
        <Stack.Screen
          name="MeetingDetail"
          component={MeetingView}
          options={{
            headerBackVisible: true,
            headerBackTitle: 'Назад',
            title: '',
          }}
        />
        <Stack.Screen
          name="Datepicker"
          component={DatePickerView}
          options={{
            headerTitle: 'Календарь',
            presentation: 'formSheet',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
