// src/services/expenseService.js
import axios from 'axios';

const API = '/api/expenses';

export const getAllExpenses = () => axios.get(API);
export const getExpenseById = (id) => axios.get(`${API}/${id}`);
export const createExpense = (data) => axios.post(API, data);
export const updateExpense = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteExpense = (id) => axios.delete(`${API}/${id}`);

const expenseService = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
};

export default expenseService;
