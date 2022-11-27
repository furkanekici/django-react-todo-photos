import React, { useEffect, useRef, useState } from 'react';
import useTodo from '../hooks/useTodo';
import alerts from '../general/Alert';

function Main() {
    const { getTodos, addTodo, updateTodo, deleteTodo } = useTodo();
    const [todos, setTodos] = useState([]);
    const [whichAlert, setWhichAlert] = useState("none");
    const [alertMessage, setAlertMessage] = useState("");

    const id = useRef();
    const title = useRef();
    const description = useRef();
    const formData = useRef();

    const { infoAlert, successAlert, warningAlert, errorAlert } = alerts();

    const onSubmit = (event) => {
        event.preventDefault();

        const { title, description } = formData.current;

        addTodo(title.value, description.value).then((response) => {
            if (response.status === 201) {
                setWhichAlert("success");
                setAlertMessage("Todo added successfully!");
                setTodos([...todos, response.data]);

                title.value = "";
                description.value = "";
            } else {
                setWhichAlert("error");
                setAlertMessage("Something went wrong");
            }
        });
    };

    const onDelete = (event) => {
        event.preventDefault();

        deleteTodo(id.current).then((response) => {
            if (response.status === 204) {
                setWhichAlert("success");
                setAlertMessage("Todo deleted successfully!");
                setTodos(todos.filter((todo) => todo.id !== id.current));
            } else {
                setWhichAlert("error");
                setAlertMessage("Something went wrong");
            }
        });
    };

    const onUpdate = (event) => {
        event.preventDefault();

        updateTodo(id.current, title.current, description.current).then((response) => {
            if (response.status === 200) {
                setWhichAlert("success");
                setAlertMessage("Todo updated successfully!");
                setTodos(todos.map((todo) => (todo.id === id.current ? response.data : todo)));
            } else {
                setWhichAlert("error");
                setAlertMessage("Something went wrong");
            }
        });
    };

    useEffect(() => {
        getTodos().then((response) => {
            setTodos(response.data);
        });
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setWhichAlert("none");
        }, 3000)
    }, [whichAlert])

    return (
        <div className="relative">
            <div className='absolute inset-x-0 w-3/4 md:w-2/5 mx-auto'>
                {whichAlert === "info" ? infoAlert(alertMessage) : whichAlert === "success" ? successAlert(alertMessage) : whichAlert === "warning" ? warningAlert(alertMessage) : whichAlert === "error" ? errorAlert(alertMessage) : null}
            </div>
            <div className="py-6 h-100 w-full flex items-center justify-center">
                <div className="bg-accent-focus rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
                    <div className="mb-4">
                        <h1 className="text-2xl font-bold">Todo List</h1>
                        <form ref={formData} onSubmit={onSubmit}>
                            <div className="flex flex-col mt-4">
                                <input name='title' className="input input-bordered shadow appearance-none border rounded w-full py-2 px-3 mr-4 mb-2 text-grey-darker" placeholder="Title" />
                                <input name='description' className="input input-bordered shadow appearance-none border rounded w-full py-2 px-3 mr-4 mb-2 text-grey-darker" placeholder="Description" />
                                <button type='submit' className="btn btn-secondary flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal">Add</button>
                            </div>
                        </form>
                    </div>
                    <div>
                        {
                            todos.map((todo) => {
                                return (
                                    <div key={todo.id} tabIndex={0} className="collapse collapse-arrow mb-4 border border-base-300 bg-base-100 rounded-box">
                                        <input type="checkbox" />
                                        <div className="collapse-title flex items-center">
                                            <p className="w-full font-bold">{todo.title}</p>
                                            <p className="w-full italic">{todo.description}</p>
                                        </div>
                                        <div className="collapse-content">
                                            <div className="flex flex-col">
                                                <input ref={title} className="input input-bordered shadow appearance-none border rounded w-full py-2 px-3 mr-4 mb-2 text-grey-darker" placeholder="Title" defaultValue={todo.title} />
                                                <input ref={description} className="input input-bordered shadow appearance-none border rounded w-full py-2 px-3 mr-4 mb-2 text-grey-darker" placeholder="Description" defaultValue={todo.description} />
                                                <button className="btn btn-warning flex-no-shrink p-2 border-2 rounded hover:text-white text-green border-green hover:bg-green" onClick={(e) => {
                                                    e.preventDefault();
                                                    id.current = todo.id;
                                                    title.current = todo.title;
                                                    description.current = todo.description;
                                                    onUpdate(e);
                                                }}>Update</button>
                                                <button className="btn btn-error flex-no-shrink p-2  border-2 rounded text-red border-red hover:text-white hover:bg-red" onClick={(e) => {
                                                    id.current = todo.id;
                                                    onDelete(e);
                                                }}>Delete</button>
                                            </div>
                                        </div>

                                    </div>
                                );
                            }
                            )
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Main;