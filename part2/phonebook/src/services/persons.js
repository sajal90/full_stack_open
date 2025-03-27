import axios from "axios";

const url = "http://localhost:3001/persons";

const getAll = () => {
	const req = axios.get(url);
	return req.then((res) => res.data);
};

const create = (value) => {
	const req = axios.post(url, value);
	return req.then((res) => res.data);
};

const update = (id, value) => {
	const req = axios.put(`${url}/${id}`, value);
	return req.then((res) => res.data);
};

export default { getAll, create, update };
