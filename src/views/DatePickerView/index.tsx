import React, {useEffect} from 'react';
import {CalendarList, DateData} from 'react-native-calendars';
import {DatePickerScreenRouteProp, RootStackParamList} from '../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {scheduleStore} from '../../stores/ScheduleStore';
import {Backbutton} from '../../components/HeaderButton';

type Props = {
  route: DatePickerScreenRouteProp;
};
export const DatePickerView: React.FC<Props> = ({route}): JSX.Element => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => Backbutton('Отменить', () => navigation.goBack()),
    });
  }, [navigation]);
  const {setSelectedDate} = scheduleStore;

  const today = new Date();
  today.setMonth(today.getMonth() - 2);
  const minDate = new Date(today);
  today.setMonth(today.getMonth() + 4);
  const maxDate = new Date(today);

  const handleDaySelect = (day: DateData) => {
    setSelectedDate(new Date(day.timestamp));
    navigation.goBack();
  };

  return (
    <CalendarList
      minDate={minDate.toDateString()}
      maxDate={maxDate.toDateString()}
      onDayPress={handleDaySelect}
      markedDates={route.params.markedDates}
      theme={{
        todayBackgroundColor: '#FF3B30',
        todayDotColor: '#FFF',
        todayTextColor: '#FFF',
      }}
    />
  );
};
