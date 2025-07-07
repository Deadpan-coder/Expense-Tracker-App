// src/services/incomeService.js
import axios from 'axios';

const API = '/api/incomes';

export const getAllIncomes = () => axios.get(API);
export const getIncomeById = (id) => axios.get(`${API}/${id}`);
export const createIncome = (data) => axios.post(API, data);
export const updateIncome = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteIncome = (id) => axios.delete(`${API}/${id}`);

export default {
  getAllIncomes,
  getIncomeById,
  createIncome,
  updateIncome,
  deleteIncome
};
