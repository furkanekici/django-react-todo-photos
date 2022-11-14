import axios from "axios";

const BASE_URL = "http://example.vercelapp.com/api/v1/";

export default axios.create({
    baseURL: BASE_URL,
});