import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useCallback} from 'react';
import {IWeek} from '../../api/types';
import {format} from 'date-fns';
import {ru} from 'date-fns/locale';

export interface IWeekItemProps {
  item: IWeek;
  isSelected: boolean;
  onPress: () => void;
}

const WeekItem = ({item, onPress, isSelected}: IWeekItemProps): JSX.Element => {
  const styles = StyleSheet.create({
    item: {
      backgroundColor: isSelected ? '#007AFF' : '#ECECEC',
      flexDirection: 'row',
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderRadius: 10,
      gap: 3,
    },
    text: {
      color: isSelected ? '#fafafa' : '#000000',
    },
  });

  const itemPressed = useCallback(onPress, [onPress]);

  return (
    <TouchableOpacity onPress={itemPressed}>
      <View style={styles.item}>
        <Text style={styles.text}>
          {format(item.weekStart, 'd MMM', {locale: ru})}
        </Text>
        <Text style={styles.text}>-</Text>
        <Text style={styles.text}>
          {format(item.weekEnd, 'd MMM', {locale: ru})}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(WeekItem);
