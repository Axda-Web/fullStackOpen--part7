import axios from 'axios';
const baseUrl = '/api/blogs';

const getAll = async () => {
    const request = await axios.get(baseUrl);
    return request.data;
};

const create = async ({ blog, token }) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(baseUrl, blog, config);
    return response.data;
};

const update = async ({ id, blog, token }) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.put(`${baseUrl}/${id}`, blog, config);

    return response.data;
};

const remove = async ({ id, token }) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.delete(`${baseUrl}/${id}`, config);

    return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update, remove };
