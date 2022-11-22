import React, { useEffect, useRef, useState } from 'react'
import useTodo from '../hooks/useTodo';

function Main() {
    const { getTodos, addTodo } = useTodo();
    const [todos, setTodos] = useState([]);
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
            setTodos(response.data);
        });
    }, []);

    return (
        <div className="flex flex-row justify-evenly items-center h-screen">
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-2xl font-bold">Add Todo</h1>
                <div className="card w-96 bg-primary">
                    <div className="card-body">
                        <form ref={formData} onSubmit={onSubmit}>
                            <input ref={formData} type="text" name="title" placeholder="Title" className="input input-bordered w-full" />
                            <input ref={formData} type="text" name="description" placeholder="Description" className="input input-bordered w-full mt-2" />
                            <div className="card-actions justify-end">
                                <button type='submit' className="btn">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-2xl font-bold">Todos</h1>
                    <div className="card w-96 bg-primary text-primary-content">
                        {todos.map((todo) => (
                            <div className="card-body">
                                <h2 className="card-title">{todo.title}</h2>
                                <p>{todo.description}</p>
                                <div className="card-actions justify-end">
                                    <button className="btn">Clear</button>
                                    <button className="btn">Edit</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main;