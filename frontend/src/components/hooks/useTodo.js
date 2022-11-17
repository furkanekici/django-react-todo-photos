import axios from "../api/axios";

const useTodo = () => {

    const key = localStorage.getItem('key');

    const getTodos = async () => {
        try {
            const response = await axios.get("/todos/", {
                headers: {
                    "Authorization": `Token ${key}`
                }
            });
            return response;
        } catch (err) {
            return err.response;
        }
    }

    const addTodo = async (title, description) => {
        try {
            const response = await axios.post("/todos/", {
                title,
                description
            }, {
                headers: {
                    "Authorization": `Token ${key}`
                },
            });
            return response;
        } catch (err) {
            return err.response;
        }
    }

    const updateTodo = async (id, title, description, user) => {
        try {
            const response = await axios.put(`/todos/${id}/`, {
                title,
                description,
                user
            }, {
                headers: {
                    "Authorization": `Token ${key}`
                },
            });
            return response;
        } catch (err) {
            return err.response;
        }
    }

    const deleteTodo = async (id) => {
        try {
            const response = await axios.delete(`/todos/${id}/`, {
                headers: {
                    "Authorization": `Token ${key}`
                }
            });
            return response;
        } catch (err) {
            return err.response;
        }
    }

    return {
        getTodos,
        addTodo,
        updateTodo,
        deleteTodo
    };
}

export default useTodo;