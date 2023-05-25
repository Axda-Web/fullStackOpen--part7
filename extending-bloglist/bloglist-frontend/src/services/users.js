import axios from 'axios';

const BASE_URL = 'api/users';

const getAll = async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAll,
};