import axios from 'axios'

export const getAllDB = () => axios.get('/api/alldbs');

export const getKey = (dbName, keys) => axios.post(`/api/getKey/${dbName}`, { keys });