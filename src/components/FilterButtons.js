import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

const FILTERS = [
  'Todos',
  'Quero ler',
  'Lendo',
  'Lido',
];

export default function FilterButtons({
  selected,
  onChange,
}) {
  return (
    <View style={styles.container}>
      {FILTERS.map(filter => {
        const active = selected === filter;

        return (
          <TouchableOpacity
            key={filter}
            onPress={() => onChange(filter)}
            style={[
              styles.button,
              active && styles.active,
            ]}
          >
            <Text
              style={[
                styles.text,
                active && styles.activeText,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 12,
  },

  button: {
    borderWidth: 1,
    borderColor: '#E8CCCC',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginRight: 6,
    backgroundColor: '#FFF',
  },

  active: {
    backgroundColor: '#A85858',
    borderColor: '#A85858',
  },

  text: {
    fontSize: 9,
    color: '#8A6262',
  },

  activeText: {
    color: '#FFF',
  },
});
