import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import { COLORS } from '../constants/colors';

const STATUSES = [
  'Quero ler',
  'Lendo',
  'Lido',
];

export default function BookForm({
  initialBook,
  onSubmit,
}) {
  const [title, setTitle] = useState(
    initialBook?.title || ''
  );

  const [author, setAuthor] = useState(
    initialBook?.author || ''
  );

  const [genre, setGenre] = useState(
    initialBook?.genre || ''
  );

  const [cover, setCover] = useState(
    initialBook?.cover || ''
  );

  const [status, setStatus] = useState(
    initialBook?.status || 'Quero ler'
  );

  function handleSubmit() {
    if (!title.trim()) {
      Alert.alert(
        'Atenção',
        'Digite o título do livro.'
      );
      return;
    }

    if (!author.trim()) {
      Alert.alert(
        'Atenção',
        'Digite o autor do livro.'
      );
      return;
    }

    onSubmit({
      title: title.trim(),
      author: author.trim(),
      genre: genre.trim(),
      cover: cover.trim(),
      status,
    });
  }

  return (
    <View>
      <Text style={styles.label}>
        Título
      </Text>

      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Ex.: Dom Casmurro"
        placeholderTextColor="#BBAAAA"
      />

      <Text style={styles.label}>
        Autor
      </Text>

      <TextInput
        style={styles.input}
        value={author}
        onChangeText={setAuthor}
        placeholder="Ex.: Machado de Assis"
        placeholderTextColor="#BBAAAA"
      />

      <Text style={styles.label}>
        Gênero
      </Text>

      <TextInput
        style={styles.input}
        value={genre}
        onChangeText={setGenre}
        placeholder="Ex.: Romance"
        placeholderTextColor="#BBAAAA"
      />

      <Text style={styles.label}>
        Capa
      </Text>

      <TextInput
        style={styles.input}
        value={cover}
        onChangeText={setCover}
        placeholder="URL da capa"
        placeholderTextColor="#BBAAAA"
        autoCapitalize="none"
      />

      <Text style={styles.label}>
        Status de leitura
      </Text>

      {STATUSES.map(item => (
        <TouchableOpacity
          key={item}
          style={styles.statusRow}
          onPress={() => setStatus(item)}
        >
          <View
            style={[
              styles.radio,
              status === item && styles.radioActive,
            ]}
          />

          <Text style={styles.statusText}>
            {item}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSubmit}
      >
        <Text style={styles.saveText}>
          {initialBook
            ? 'Salvar alterações'
            : 'Salvar livro'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: '#777',
    fontSize: 10,
    marginBottom: 6,
    marginTop: 7,
  },

  input: {
    height: 42,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: '#FFF',
    borderRadius: 4,
    paddingHorizontal: 12,
    fontSize: 11,
    color: COLORS.text,
    marginBottom: 8,
  },

  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 7,
  },

  radio: {
    width: 13,
    height: 13,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#C8AAAA',
    marginRight: 9,
  },

  radioActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  statusText: {
    color: '#665555',
    fontSize: 11,
  },

  saveButton: {
    height: 44,
    backgroundColor: COLORS.primaryDark,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  saveText: {
    color: '#FFF',
    fontSize: 11,
  },
});
