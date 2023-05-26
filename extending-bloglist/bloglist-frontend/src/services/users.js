import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/users';

const getAll = async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAll,
};
