import axios from 'axios'

export const getAllDB = () => axios.get('/api/alldbs');

export const getKeys = (dbName, keys) => axios.post(`/api/getKeys/${dbName}`, { data: { keys } });