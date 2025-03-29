import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => {
	const req = axios.get(baseUrl);
	return req.then((res) => res.data);
};

const create = (value) => {
	const req = axios.post(baseUrl, value);
	return req.then((res) => res.data);
};

const update = (id, value) => {
	const req = axios.put(`${baseUrl}/${id}`, value);
	return req.then((res) => res.data);
};

const remove = (id) => {
	const req = axios.delete(`${baseUrl}/${id}`);
	return req.then((response) => response.data);
};

export default { getAll, create, update, remove };
