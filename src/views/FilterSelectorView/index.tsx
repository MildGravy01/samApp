/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {filterStore} from '../../stores/FilterStore';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

export const FilterSelectorView = (): JSX.Element => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {availableFilters, setFilter} = filterStore;
  const handlePress = (id: string) => {
    setFilter(id).finally(() => navigation.navigate('MeetingsList'));
  };

  const styles = StyleSheet.create({
    filterButton: {
      minHeight: 44,
      backgroundColor: '#FFF',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      fontWeight: 400,
      paddingHorizontal: 20,
      gap: 16,
    },
    buttonText: {
      fontSize: 15,
    },
  });

  return (
    <ScrollView>
      {availableFilters.map(filter => (
        <TouchableHighlight
          onPress={() => handlePress(filter.id)}
          key={filter.id}>
          <View style={styles.filterButton}>
            <View
              style={{
                backgroundColor: filter.color,
                padding: 7,
                borderRadius: 7,
              }}>
              <FontAwesomeIcon icon={filter.icon} style={{color: 'white'}} />
            </View>
            <View
              style={{
                borderBottomColor: '#3C3C4321',
                borderBottomWidth: 1,
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={styles.buttonText}>{filter.name}</Text>
            </View>
          </View>
        </TouchableHighlight>
      ))}
    </ScrollView>
  );
};
