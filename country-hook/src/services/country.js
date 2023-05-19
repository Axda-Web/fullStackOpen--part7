import axios from 'axios'

const BASE_URL = 'https://restcountries.com/v3.1/'

const getCountry = async (name) => {
    const response = await axios.get(`${BASE_URL}name/${name}?fullText=true`)
    return response.data[0]
}   

// eslint-disable-next-line
export default {
    getCountry
}