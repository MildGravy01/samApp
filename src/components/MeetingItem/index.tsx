import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import React from 'react';
import {IMeeting} from '../../api/types';
import {format} from 'date-fns';
import {ru} from 'date-fns/locale';

export interface IMeetingItemProps {
  item: IMeeting;
  handlePress: () => void;
}

const MeetingItem = ({item, handlePress}: IMeetingItemProps): JSX.Element => {
  const styles = StyleSheet.create({
    item: {
      backgroundColor: '#FFF',
      display: 'flex',
      flexDirection: 'row',
      gap: 10,
    },
    timeHolder: {
      backgroundColor: '#FFF',
      borderRightWidth: 1,
      borderColor: '#3C3C4321',
      height: '100%',
      paddingVertical: 12,
      paddingHorizontal: 15,
      width: 70,
    },
    startTime: {fontSize: 13, fontWeight: '600'},
    endTime: {fontSize: 12, color: '#3C3C4399'},
    title: {
      fontSize: 13,
      color: '#000000',
    },
    typeStyle: {
      fontSize: 11,
      fontWeight: '600',
      color: '#007AFF',
    },
    location: {
      fontSize: 11,
      color: '#8E8E93',
    },
    infoContainer: {
      gap: 8,
      paddingVertical: 16,
      paddingHorizontal: 5,
    },
  });

  if (!item?.title) {
    return (
      <View style={styles.item}>
        <View style={styles.timeHolder} />
        <View style={styles.infoContainer}>
          <Text style={styles.location}>Нет мероприятий</Text>
        </View>
      </View>
    );
  }
  const startTime = format(item.startTime, 'HH:mm', {locale: ru});

  const endTime = format(item.endTime, 'HH:mm', {locale: ru});

  return (
    <TouchableHighlight onPress={handlePress}>
      <View style={styles.item}>
        <View style={styles.timeHolder}>
          <Text style={styles.startTime}>{startTime}</Text>
          <Text style={styles.endTime}>{endTime}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.typeStyle}>{item.type.name}</Text>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.location}>{item.location}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default React.memo(MeetingItem);
