import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

export default function EmptyState({ onAdd }) {
  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Ionicons
          name="library-outline"
          size={55}
          color="#C99494"
        />
      </View>

      <Text style={styles.title}>
        Sua estante está vazia
      </Text>

      <Text style={styles.description}>
        Que tal adicionar seu primeiro livro?
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={onAdd}
      >
        <Ionicons
          name="add"
          size={17}
          color="#FFF"
        />

        <Text style={styles.buttonText}>
          Adicionar livro
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 60,
  },

  circle: {
    width: 125,
    height: 125,
    borderRadius: 70,
    backgroundColor: '#F2E2DF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },

  title: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '600',
  },

  description: {
    color: COLORS.textLight,
    fontSize: 11,
    marginTop: 7,
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 19,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 22,
  },

  buttonText: {
    color: '#FFF',
    fontSize: 11,
    marginLeft: 5,
  },
});
