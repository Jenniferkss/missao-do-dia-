import React, {
  useCallback,
  useState,
} from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import {
  useFocusEffect,
} from '@react-navigation/native';

import BookForm from '../components/BookForm';

import {
  getBookById,
  updateBook,
  deleteBook,
} from '../services/storage';

import { COLORS } from '../constants/colors';

export default function BookDetailsScreen({
  route,
  navigation,
}) {
  const { id } = route.params;

  const [book, setBook] = useState(null);
  const [editing, setEditing] = useState(false);

  const loadBook = async () => {
    const data = await getBookById(id);
    setBook(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadBook();
    }, [])
  );

  if (!book) {
    return (
      <View style={styles.loading}>
        <Text>Livro não encontrado.</Text>
      </View>
    );
  }

  async function handleUpdate(data) {
    const updated = await updateBook(
      id,
      data
    );

    setBook(updated);
    setEditing(false);
  }

  function handleDelete() {
  Alert.alert(
    'Excluir este livro?',
    'Essa ação não poderá ser desfeita.',
    [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteBook(id);

            navigation.navigate('Main', {
              screen: 'Estante',
            });
          } catch (error) {
            console.log('Erro ao excluir:', error);

            Alert.alert(
              'Erro',
              'Não foi possível excluir o livro.'
            );
          }
        },
      },
    ]
  );
}

  if (editing) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          Editar Livro
        </Text>

        <BookForm
          initialBook={book}
          onSubmit={handleUpdate}
        />

        <TouchableOpacity
          style={styles.cancel}
          onPress={() => setEditing(false)}
        >
          <Text style={styles.cancelText}>
            Cancelar
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Detalhes do Livro
      </Text>

      <Image
        source={{ uri: book.cover }}
        style={styles.cover}
      />

      <Text style={styles.title}>
        {book.title}
      </Text>

      <Text style={styles.author}>
        {book.author}
      </Text>

      <View style={styles.infoBox}>
        <View>
          <Text style={styles.label}>
            GÊNERO
          </Text>

          <Text style={styles.value}>
            {book.genre || 'Não informado'}
          </Text>
        </View>

        <View>
          <Text style={styles.label}>
            STATUS
          </Text>

          <Text style={styles.value}>
            {book.status}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => setEditing(true)}
      >
        <Text style={styles.editText}>
          ✎ Editar livro
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDelete}
      >
        <Text style={styles.deleteText}>
          Excluir livro
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 25,
    paddingTop: 50,
  },

  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    textAlign: 'center',
    color: COLORS.primary,
    fontFamily: 'serif',
    fontSize: 16,
    marginBottom: 25,
  },

  cover: {
    width: 125,
    height: 170,
    borderRadius: 5,
    alignSelf: 'center',
  },

  title: {
    textAlign: 'center',
    color: COLORS.text,
    fontSize: 17,
    fontWeight: '600',
    marginTop: 15,
  },

  author: {
    textAlign: 'center',
    color: COLORS.textLight,
    fontSize: 11,
    marginTop: 5,
  },

  infoBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 8,
    marginTop: 25,
    marginBottom: 20,
  },

  label: {
    fontSize: 9,
    color: '#999',
    marginBottom: 5,
  },

  value: {
    color: '#644848',
    fontSize: 11,
  },

  editButton: {
    height: 44,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },

  editText: {
    color: '#FFF',
    fontSize: 11,
  },

  deleteButton: {
    height: 44,
    borderWidth: 1,
    borderColor: '#D58A8A',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  deleteText: {
    color: '#C35D5D',
    fontSize: 11,
  },

  cancel: {
    marginTop: 10,
    alignItems: 'center',
  },

  cancelText: {
    color: COLORS.primary,
    fontSize: 11,
  },
});
