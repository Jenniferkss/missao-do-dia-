import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function BookCard({ book, onPress }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image
        source={{
          uri: book.cover,
        }}
        style={styles.cover}
      />

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {book.title}
        </Text>

        <Text style={styles.author}>
          {book.author}
        </Text>

        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusDot,
              {
                backgroundColor:
                  book.status === 'Lendo'
                    ? '#5BAA76'
                    : book.status === 'Lido'
                    ? '#C77878'
                    : '#D99B9B',
              },
            ]}
          />

          <Text style={styles.status}>
            {book.status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 9,
    padding: 9,
    marginBottom: 10,

    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },

  cover: {
    width: 55,
    height: 70,
    borderRadius: 4,
    backgroundColor: '#EEE',
  },

  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },

  title: {
    color: '#4A3737',
    fontSize: 13,
    fontWeight: '600',
  },

  author: {
    color: '#777777',
    fontSize: 10,
    marginTop: 4,
  },

  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 10,
    marginRight: 5,
  },

  status: {
    color: '#777777',
    fontSize: 9,
  },
});
