import React, {useCallback, useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MeetingItem from '../../components/MeetingItem';
import WeekItem from '../../components/WeekItem';
import {scheduleStore} from '../../stores/ScheduleStore';
import {observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {FilterButton} from '../../components/FilterButton';
import {CalendarButton} from '../../components/CalendarButton';
import {filterStore} from '../../stores/FilterStore';
import {format} from 'date-fns';
import {ru} from 'date-fns/locale';
import {IWeekItemProps} from '../../components/WeekItem';
import {IWeek} from '../../api/types';

export const AllMeetingsView = observer((): JSX.Element => {
  const {
    selectedWeekSchedule,
    availableWeeks,
    selectedDate,
    setSelectedDate,
    loadSchedule,
    activeDays,
    isScheduleLoading,
  } = scheduleStore;

  const {currentFilter} = filterStore;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => FilterButton(true, currentFilter),
      headerRight: () =>
        CalendarButton(() =>
          navigation.navigate('Datepicker', {markedDates: activeDays ?? {}}),
        ),
    });
  }, [activeDays, currentFilter, navigation]);

  const renderWeekItem = useCallback((props: IWeekItemProps) => {
    return <WeekItem {...props} />;
  }, []);

  const renderMeetingItem = useCallback(({item}: any) => {
    return <MeetingItem {...item} />;
  }, []);

  return (
    <View style={styles.container}>
      {isScheduleLoading ? (
        <View style={styles.center}>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          {availableWeeks && (
            <FlatList<IWeek>
              style={styles.weekList}
              contentContainerStyle={styles.weekListContainer}
              ListFooterComponentStyle={{margin: 0, padding: 0, height: 0}}
              horizontal
              renderItem={({item}) =>
                renderWeekItem({
                  item,
                  onPress: () => setSelectedDate(new Date(item.weekStart)),
                  isSelected:
                    selectedDate.getDate() >=
                      new Date(item.weekStart).getDate() &&
                    selectedDate.getDate() <= new Date(item.weekEnd).getDate(),
                })
              }
              data={availableWeeks}
              keyExtractor={(item, index) => item.weekStart + index}
            />
          )}
          {selectedWeekSchedule ? (
            <SectionList
              sections={selectedWeekSchedule}
              keyExtractor={(item, index) => item.title + index}
              renderItem={renderMeetingItem}
              onRefresh={loadSchedule}
              refreshing={isScheduleLoading}
              renderSectionHeader={({section: {title}}) => (
                <Text style={styles.header}>
                  {format(title, 'EEEE, d MMMM', {locale: ru})}
                </Text>
              )}
            />
          ) : (
            <View style={styles.center}>
              <Text style={styles.center}>Нет запланированных мероприятий</Text>
            </View>
          )}
        </>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F7F7',
  },
  weekList: {
    paddingHorizontal: 6,
    paddingVertical: 15,
    flexGrow: 0,
  },
  weekListContainer: {
    gap: 8,
  },
  center: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#8E8E93',
    padding: 10,
    fontSize: 14,
  },
  header: {
    fontSize: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    color: '#8E8E93',
  },
});
