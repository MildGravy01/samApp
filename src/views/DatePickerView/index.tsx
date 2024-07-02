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

  const handleDaySelect = (day: DateData) => {
    setSelectedDate(new Date(day.timestamp));
    navigation.goBack();
  };

  return (
    <CalendarList
      onDayPress={handleDaySelect}
      markedDates={route.params.markedDates}
      disabledByDefault
      theme={{
        todayBackgroundColor: '#FF3B30',
        todayDotColor: '#FFF',
        todayTextColor: '#FFF',
      }}
    />
  );
};
