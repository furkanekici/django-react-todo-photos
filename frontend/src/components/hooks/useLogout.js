import axios from "../api/axios";

const useLogout = () => {
    const logout = async () => {
        try {
            const response = await axios.post(
                "dj-rest-auth/logout/", {
            }
            );
            localStorage.removeItem("key");
            return response;
        } catch (err) {
            return err.response;
        }
    }
    return logout;
}

export default useLogout;