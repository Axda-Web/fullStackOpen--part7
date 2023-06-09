import axios from 'axios';

const BASED_URL = '/api/login';

const login = async (credentials) => {
    const response = await axios.post(BASED_URL, credentials);
    return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    login,
};
