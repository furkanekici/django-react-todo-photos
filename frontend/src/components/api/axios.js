import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/v1/";

export default axios.create({
    baseURL: BASE_URL,
});