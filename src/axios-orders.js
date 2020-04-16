import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://reactburguer-e5e24.firebaseio.com/'
})

export default instance;