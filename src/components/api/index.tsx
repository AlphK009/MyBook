import axios from 'axios';

const api = axios.create({
    baseURL : "https://www.googleapis.com/books/v1/volumes?q=search+terms"
})
export default api;