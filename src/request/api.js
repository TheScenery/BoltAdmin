import axios from 'axios'

export const getAllDB = () => axios.get('/api/alldbs');

export const getKey = (dbName, keys) => axios.post(`/api/getKey/${dbName}`, { keys });
export const setKey = (dbName, keys, value) => axios.post(`/api/setKey/${dbName}`, { keys, value });
export const deleteKey = (dbName, keys) => axios.post(`/api/deleteKey/${dbName}`, { keys })