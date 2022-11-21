import { Route, Routes } from 'react-router-dom'
import Layout from './components/general/Layout'
import RequireAuth from './components/general/RequireAuth'
import Login from './components/login/Main'
import Register from './components/register/Main'
import Todo from './components/todo/Main'
import Photo from './components/photo/Main'

import './App.css'
import Missing from './components/general/Missing'

function App() {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                {/* Public routes */}
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
                {/* Private routes */}
                <Route element={<RequireAuth />}>
                    <Route path='/' element={<div>Home</div>} />
                    <Route path='todo' element={<Todo />} />
                    <Route path='photo' element={<Photo />} />
                </Route>
                {/* Missing routes */}
                <Route path='*' element={
                    <Missing />
                } />
            </Route>
        </Routes>
    )
}

export default App