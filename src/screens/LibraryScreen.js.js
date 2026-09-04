import React, {
  useCallback,
  useState,
} from 'react';

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {
  useFocusEffect,
} from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';

import BookCard from '../components/BookCard';
import EmptyState from '../components/EmptyState';

import { getBooks } from '../services/storage';
import { COLORS } from '../constants/colors';

export default function LibraryScreen({
  navigation,
}) {
  const [books, setBooks] = useState([]);

  const loadBooks = async () => {
    const data = await getBooks();
    setBooks(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadBooks();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Minha Estante
      </Text>

      {books.length === 0 ? (
        <EmptyState
          onAdd={() =>
            navigation.navigate('Adicionar')
          }
        />
      ) : (
        <>
          <FlatList
            data={books}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <BookCard
                book={item}
                onPress={() =>
                  navigation.navigate(
                    'BookDetails',
                    { id: item.id }
                  )
                }
              />
            )}
          />

          <TouchableOpacity
            style={styles.floating}
            onPress={() =>
              navigation.navigate('Adicionar')
            }
          >
            <Ionicons
              name="add"
              size={26}
              color="#FFF"
            />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 18,
    paddingTop: 50,
  },

  header: {
    textAlign: 'center',
    color: COLORS.primary,
    fontSize: 16,
    fontFamily: 'serif',
    marginBottom: 20,
  },

  list: {
    paddingBottom: 100,
  },

  floating: {
    position: 'absolute',
    right: 22,
    bottom: 20,
    width: 48,
    height: 48,
    borderRadius: 30,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
