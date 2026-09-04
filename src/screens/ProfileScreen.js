import React, {
  useCallback,
  useState,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {
  useFocusEffect,
} from '@react-navigation/native';

import { getBooks } from '../services/storage';
import { COLORS } from '../constants/colors';

export default function ProfileScreen() {
  const [books, setBooks] = useState([]);

  useFocusEffect(
    useCallback(() => {
      getBooks().then(setBooks);
    }, [])
  );

  const read = books.filter(
    book => book.status === 'Lido'
  ).length;

  const reading = books.filter(
    book => book.status === 'Lendo'
  ).length;

  const want = books.filter(
    book => book.status === 'Quero ler'
  ).length;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Readly
      </Text>

      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          ♙
        </Text>
      </View>

      <Text style={styles.name}>
        Mariana Silva
      </Text>

      <Text style={styles.email}>
        mariana@email.com
      </Text>

      <View style={styles.stats}>
        <Stat
          number={read}
          label="LIDOS"
        />

        <Stat
          number={reading}
          label="LENDO"
        />

        <Stat
          number={want}
          label="QUERO LER"
        />
      </View>

      <View style={styles.menu}>
        <MenuItem text="Minha Conta" />
        <MenuItem text="Notificações" />
        <MenuItem text="Preferências de Leitura" />
        <MenuItem text="Sobre o Readly" />
        <MenuItem text="Sair" />
      </View>
    </View>
  );
}

function Stat({ number, label }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.number}>
        {number}
      </Text>

      <Text style={styles.statLabel}>
        {label}
      </Text>
    </View>
  );
}

function MenuItem({ text }) {
  return (
    <TouchableOpacity style={styles.menuItem}>
      <Text style={styles.menuText}>
        {text}
      </Text>

      <Text style={styles.arrow}>
        ›
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 18,
    paddingTop: 50,
  },

  header: {
    textAlign: 'center',
    color: COLORS.primary,
    fontFamily: 'serif',
    fontSize: 20,
    marginBottom: 25,
  },

  avatar: {
    width: 65,
    height: 65,
    borderRadius: 50,
    backgroundColor: '#E5E5E5',
    borderWidth: 1,
    borderColor: '#CCC',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    fontSize: 35,
    color: '#555',
  },

  name: {
    textAlign: 'center',
    color: COLORS.text,
    fontSize: 13,
    marginTop: 10,
  },

  email: {
    textAlign: 'center',
    color: COLORS.textLight,
    fontSize: 9,
    marginTop: 4,
  },

  stats: {
    flexDirection: 'row',
    gap: 7,
    marginTop: 20,
  },

  stat: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 12,
    alignItems: 'center',
  },

  number: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '600',
  },

  statLabel: {
    color: '#888',
    fontSize: 7,
    marginTop: 4,
  },

  menu: {
    backgroundColor: '#FFF',
    borderRadius: 6,
    marginTop: 15,
  },

  menuItem: {
    height: 42,
    borderBottomWidth: 1,
    borderBottomColor: '#F1E7E7',
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  menuText: {
    color: '#665555',
    fontSize: 10,
  },

  arrow: {
    color: '#B88',
    fontSize: 18,
  },
});
