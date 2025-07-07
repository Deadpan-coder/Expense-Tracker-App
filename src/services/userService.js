// userService.js
import axios from 'axios';

const API = '/api/auth';

export const login = (data) => axios.post(`${API}/login`, data);
export const signup = (data) => axios.post(`${API}/signup`, data);
