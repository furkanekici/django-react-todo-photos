import axios from "../api/axios";

const useRegister = () => {
    const register = async (username, password1, password2) => {
        try {
            const response = await axios.post(
                "dj-rest-auth/registration/", {
                username,
                password1,
                password2
            }
            );
            return response;
        } catch (err) {
            return err.response;
        }
    }
    return register;
}

export default useRegister;