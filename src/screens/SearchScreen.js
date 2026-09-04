import React, {
  useCallback,
  useState,
} from 'react';

import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
} from 'react-native';

import {
  useFocusEffect,
} from '@react-navigation/native';

import BookCard from '../components/BookCard';
import FilterButtons from '../components/FilterButtons';

import { getBooks } from '../services/storage';
import { COLORS } from '../constants/colors';

export default function SearchScreen({
  navigation,
}) {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Todos');

  const loadBooks = async () => {
    setBooks(await getBooks());
  };

  useFocusEffect(
    useCallback(() => {
      loadBooks();
    }, [])
  );

  const filteredBooks = books.filter(book => {
    const matchesSearch =
      book.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      book.author
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesFilter =
      filter === 'Todos' ||
      book.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Buscar
      </Text>

      <TextInput
        style={styles.search}
        placeholder="Pesquisar livro..."
        placeholderTextColor="#BBAAAA"
        value={search}
        onChangeText={setSearch}
      />

      <Text style={styles.resultTitle}>
        Resultados
      </Text>

      <FilterButtons
        selected={filter}
        onChange={setFilter}
      />

      <FlatList
        data={filteredBooks}
        keyExtractor={item => item.id}
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
        ListEmptyComponent={
          <Text style={styles.empty}>
            Nenhum livro encontrado.
          </Text>
        }
      />
    </View>
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
    fontSize: 16,
    marginBottom: 20,
  },

  search: {
    height: 42,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 5,
    paddingHorizontal: 13,
    color: COLORS.text,
    fontSize: 11,
  },

  resultTitle: {
    color: COLORS.text,
    fontSize: 11,
    marginTop: 18,
  },

  empty: {
    textAlign: 'center',
    color: '#888',
    marginTop: 40,
    fontSize: 11,
  },
});
