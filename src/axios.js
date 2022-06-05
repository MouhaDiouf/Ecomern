import axios from "axios";

const instance = axios.create({
    baseURL: "https://ecomern-backend.herokuapp.com/",
});

export default instance;
