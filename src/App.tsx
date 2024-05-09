/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
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
import ErrorBoundary from './components/ErrorBoundary';
import messaging from '@react-native-firebase/messaging';
import {Alert, AppRegistry} from 'react-native';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

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

// Запрос на разрешение использования уведомлений (только для iOS)
async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

// Получение токена устройства
async function getFcmToken() {
  await messaging().registerDeviceForRemoteMessages();
  const fcmToken = await messaging().getToken();
  if (fcmToken) {
    console.log('Firebase Token is:', fcmToken);
  } else {
    console.log('Failed to get FCM token');
  }
}

function App(): JSX.Element {
  enableScreens();
  initCalendarLocale();

  useEffect(() => {
    requestUserPermission();
    getFcmToken();

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const {notification, data} = remoteMessage;
      // Проверка, если notification не undefined
      const title = notification?.title
        ? String(notification.title)
        : String(data?.title);
      const message = notification?.body
        ? String(notification.body)
        : String(data?.body);
      console.log('MASSAGE', title, message);
      if (title && message) {
        PushNotification.localNotification({
          channelId: 'your-channel-id', // (required for Android)
          title,
          message,
          playSound: true,
          soundName: 'default',
          priority: 'high',
          importance: 'high',
        });
      }
    });

    return unsubscribe;
  }, []);

  AppRegistry.registerComponent('app', () => App);

  const {currentFilter} = filterStore;
  return (
    <NavigationContainer>
      <ErrorBoundary>
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
      </ErrorBoundary>
    </NavigationContainer>
  );
}

export default App;
