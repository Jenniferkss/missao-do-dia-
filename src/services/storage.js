import AsyncStorage from '@react-native-async-storage/async-storage';

const BOOKS_KEY = '@readly_books';

export async function getBooks() {
  try {
    const data = await AsyncStorage.getItem(BOOKS_KEY);

    if (!data) {
      return [];
    }

    return JSON.parse(data);
  } catch (error) {
    console.log('Erro ao buscar livros:', error);
    return [];
  }
}

export async function getBookById(id) {
  const books = await getBooks();

  return books.find(book => book.id === id);
}

export async function createBook(book) {
  try {
    const books = await getBooks();

    const newBook = {
      ...book,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    const updatedBooks = [...books, newBook];

    await AsyncStorage.setItem(
      BOOKS_KEY,
      JSON.stringify(updatedBooks)
    );

    return newBook;
  } catch (error) {
    console.log('Erro ao criar livro:', error);
    throw error;
  }
}

export async function updateBook(id, data) {
  try {
    const books = await getBooks();

    const updatedBooks = books.map(book => {
      if (book.id === id) {
        return {
          ...book,
          ...data,
          updatedAt: new Date().toISOString(),
        };
      }

      return book;
    });

    await AsyncStorage.setItem(
      BOOKS_KEY,
      JSON.stringify(updatedBooks)
    );

    return updatedBooks.find(book => book.id === id);
  } catch (error) {
    console.log('Erro ao atualizar livro:', error);
    throw error;
  }
}

export async function deleteBook(id) {
  try {
    const books = await getBooks();

    const updatedBooks = books.filter(
      book => book.id !== id
    );

    await AsyncStorage.setItem(
      BOOKS_KEY,
      JSON.stringify(updatedBooks)
    );

    return true;
  } catch (error) {
    console.log('Erro ao excluir livro:', error);
    throw error;
  }
}

export async function initializeBooks() {
  const books = await AsyncStorage.getItem(BOOKS_KEY);

  if (!books) {
    await AsyncStorage.setItem(
      BOOKS_KEY,
      JSON.stringify([])
    );
  }
}
