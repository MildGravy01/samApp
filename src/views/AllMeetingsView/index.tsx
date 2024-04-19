import React, {useCallback, useEffect} from 'react';
import {FlatList, SectionList, StyleSheet, Text, View} from 'react-native';
import MeetingItem, {IMeetingItemProps} from '../../components/MeetingItem';
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
import {IMeeting, IWeek} from '../../api/types';

export const AllMeetingsView = observer((): JSX.Element => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {
    selectedWeekSchedule,
    availableWeeks,
    selectedDate,
    setSelectedDate,
    loadSchedule,
    activeDays,
    isScheduleLoading,
    networkError,
  } = scheduleStore;

  const {currentFilter} = filterStore;

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

  const renderMeetingItem = useCallback((props: IMeetingItemProps) => {
    return <MeetingItem {...props} />;
  }, []);

  return (
    <View style={styles.container}>
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
                selectedDate >= new Date(item.weekStart) &&
                selectedDate <= new Date(item.weekEnd),
            })
          }
          data={availableWeeks}
          keyExtractor={(item, index) => item.weekStart + index}
        />
      )}
      <SectionList
        sections={selectedWeekSchedule}
        keyExtractor={(item, index) => item.title + index}
        renderItem={({item}) =>
          renderMeetingItem({
            item: item as IMeeting,
            handlePress: () =>
              navigation.navigate('MeetingDetail', {
                item: item as IMeeting,
              }),
          })
        }
        onRefresh={loadSchedule}
        refreshing={isScheduleLoading}
        ListEmptyComponent={() => (
          <View style={styles.center}>
            <Text style={styles.center}>
              {networkError ?? 'Нет запланированных мероприятий'}
            </Text>
          </View>
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.header}>
            {format(title, 'EEEE, d MMMM', {locale: ru})}
          </Text>
        )}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F7F7',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 2,
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
    backgroundColor: '#F7F7F7',
  },
});
