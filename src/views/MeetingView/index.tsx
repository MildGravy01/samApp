/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MeetingDetailScreenRouteProp} from '../../App';
import {format} from 'date-fns';

import {ru} from 'date-fns/locale';
type Props = {
  route: MeetingDetailScreenRouteProp;
};

export const MeetingView: React.FC<Props> = ({route}) => {
  const styles = StyleSheet.create({
    container: {
      paddingVertical: 16,
      paddingHorizontal: 20,
      backgroundColor: '#FFF',
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
    },
    typeStyle: {
      fontSize: 11,
      fontWeight: '600',
      color: '#007AFF',
    },
    titleImg: {
      height: 100,
      width: 100,
      backgroundColor: 'black',
      borderRadius: 10,
    },
    titleContainer: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      gap: 15,
    },
    title: {
      fontSize: 17,
      flexShrink: 1,
    },
    infoContainer: {
      color: '#000000',
      borderBottomColor: '#3C3C4321',
      borderBottomWidth: 1,
      paddingVertical: 12,
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
    },
  });
  const {item} = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.typeStyle}>{item.type.name}</Text>
      <View style={styles.titleContainer}>
        <View style={styles.titleImg} />
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={{color: '#8E8E93'}}>
          {format(item.startTime, 'EEEE, d MMMM', {locale: ru})}
        </Text>
        <Text>
          {format(item.startTime, 'HH:mm')} - {format(item.endTime, 'HH:mm')}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text>{item.location}</Text>
      </View>
      <View>
        <Text style={{color: '#8E8E93', fontWeight: '500'}}>
          Информация о событии
        </Text>
        <Text>{item.description}</Text>
      </View>
    </View>
  );
};
