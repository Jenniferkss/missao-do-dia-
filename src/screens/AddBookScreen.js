import React from 'react';

import {
  ScrollView,
  Text,
  StyleSheet,
} from 'react-native';

import BookForm from '../components/BookForm';
import { createBook } from '../services/storage';
import { COLORS } from '../constants/colors';

export default function AddBookScreen({
  navigation,
}) {
  async function handleCreate(data) {
    await createBook(data);

    navigation.navigate('Estante');
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.header}>
        Adicionar Livro
      </Text>

      <BookForm
        onSubmit={handleCreate}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    padding: 25,
    paddingTop: 50,
    paddingBottom: 40,
  },

  header: {
    textAlign: 'center',
    color: COLORS.primary,
    fontFamily: 'serif',
    fontSize: 16,
    marginBottom: 25,
  },
});
