/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  ActivityIndicator,
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
import {observer} from 'mobx-react';
import { IconDefinition, IconLookup, findIconDefinition } from '@fortawesome/fontawesome-svg-core';

export const FilterSelectorView = observer((): JSX.Element => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {availableFilters, setFilter, resetIsLoading} = filterStore;
  const handlePress = (id: string) => {
    setFilter(id).finally(() => {
      navigation.navigate('MeetingsList');
      resetIsLoading();
    });
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
      marginRight: 10,
    },
  });

  const defineIcon = (iconName: string | null): IconDefinition => {
    console.log("name", iconName);
    if(!iconName){
      const icon = findIconDefinition({prefix: 'fas', iconName: 'book'});
      console.log('\n',icon, iconName,'\n', icon);
      return icon;
    }
    const parts = iconName.split('/'); // f.e. fas/name
    const icon = findIconDefinition({prefix: parts[0], iconName: parts[1]} as IconLookup);
    console.log('\n', "ICON",icon, parts,'\n');
    return icon;
  }

  return (
    <ScrollView>
      {availableFilters.map(filter => (
        <TouchableHighlight
          onPress={() => handlePress(filter.type)}
          key={filter.type}>
          <View style={styles.filterButton}>
            <View
              style={{
                backgroundColor: filter.color,
                padding: 7,
                borderRadius: 7,
              }}>
              <FontAwesomeIcon icon={defineIcon(filter?.icon)} style={{color: 'white'}} />
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
              {filter.isLoading && <ActivityIndicator />}
            </View>
          </View>
        </TouchableHighlight>
      ))}
    </ScrollView>
  );
});
