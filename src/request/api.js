import axios from 'axios'

export const getAllDB = () => axios.get('/api/alldbs');