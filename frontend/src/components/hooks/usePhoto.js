import axios from "../api/axios";

const usePhoto = () => {

    const key = localStorage.getItem('key');

    const getPhotos = async () => {
        try {
            const response = await axios.get("/photos/", {
                headers: {
                    "Authorization": `Token ${key}`
                }
            });
            return response;
        } catch (err) {
            return err.response;
        }
    }

    return { getPhotos };
}

export default usePhoto;