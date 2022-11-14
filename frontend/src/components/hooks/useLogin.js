import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogin = () => {
    const { setAuth } = useAuth();

    const login = async (username, password) => {
        try {
            const response = await axios.post(
                "dj-rest-auth/login/", {
                username,
                password
            }
            );

            const key = response?.data?.key;

            setAuth({ username, key });
            localStorage.setItem("key", key);
            return response;
        } catch (err) {
            return err.response;
        }
    }
    return login;
}

export default useLogin;