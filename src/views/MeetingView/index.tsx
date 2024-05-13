/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {MeetingDetailScreenRouteProp, RootStackParamList} from '../../App';
import {format} from 'date-fns';
import {ru} from 'date-fns/locale';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Share} from 'react-native';
import {ShareButton} from '../../components/ShareButton';

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
      borderRadius: 10,
      backgroundColor: '#575757',
      justifyContent: 'center',
      alignItems: 'center',
      width: 100,
      height: 100,
      overflow: 'hidden',
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
  const startTime = format(item.startTime, 'HH:mm', {locale: ru});

  const endTime = format(item.endTime, 'HH:mm', {locale: ru});

  const date = format(item.startTime, 'EEEE, d MMMM', {locale: ru});

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        ShareButton(() =>
          Share.share({
            title: item.title + ' ' + date,
            message: `${date} \nМероприятие: ${item.title} ${
              item.location ? `\nМесто: ${item.location}` : ''
            } ${
              item.description ? `\nИнфо: ${item.description}` : ''
            } \nВремя: ${startTime} - ${endTime} \n\n${item.imgUrl ?? ''}`,
          }),
        ),
    });
  });

  return (
    <View style={styles.container}>
      <Text style={styles.typeStyle}>{item.type.name}</Text>
      <View style={styles.titleContainer}>
        <View style={styles.titleImg}>
          {item.imgUrl ? (
            <Image
              width={100}
              height={100}
              source={{width: 100, height: 100, uri: item.imgUrl}}
            />
          ) : (
            <Text style={{color: '#FFF'}}>Нет фото</Text>
          )}
        </View>
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={{color: '#8E8E93'}}>{date}</Text>
        <Text>
          {startTime}- {endTime}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={{color: '#8E8E93', fontWeight: '500'}}>Место</Text>
        <Text>{item.location}</Text>
      </View>
      <View>
        <Text style={{color: '#8E8E93', fontWeight: '500'}}>
          Информация о событии
        </Text>
        <Text>{item.description ?? 'Нет информации'}</Text>
      </View>
    </View>
  );
};
