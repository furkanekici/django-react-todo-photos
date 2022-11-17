import axios from "../api/axios";

const useUser = () => {
    const key = localStorage.getItem('key');

    const getUserInfo = async () => {
        try {
            const response = await axios.get("/accounts/user/", {
                headers: {
                    "Authorization": `Token ${key}`
                }
            });
            return response;
        } catch (err) {
            return err.response;
        }
    }

    return { getUserInfo };
}

export default useUser;