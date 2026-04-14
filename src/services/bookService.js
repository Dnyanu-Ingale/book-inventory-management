import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/books';

export const getAllBooks = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const getBookById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data;
};

export const createBook = async (bookData) => {
  const response = await axios.post(API_BASE_URL, bookData);
  return response.data;
};