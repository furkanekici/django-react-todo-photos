import React, { useEffect, useRef } from 'react'
import useTodo from '../hooks/useTodo';

function Main() {
    const { getTodos, addTodo } = useTodo();
    const formData = useRef();

    const onSubmit = (event) => {
        event.preventDefault();

        const { title, description } = formData.current;

        addTodo(title.value, description.value).then((response) => {
            console.log(response);
        });
    }

    useEffect(() => {
        getTodos().then((response) => {
            console.log(response.data);
        });
    }, []);

    return (
        <div>
            <h1>Todo List</h1>
            <form ref={formData}>
                <input type="text" name='title' placeholder="Title" />
                <input type="text" name='description' placeholder="Description" />
                <button type="submit" onClick={onSubmit}>Add</button>
            </form>
        </div>
    )
}

export default Main