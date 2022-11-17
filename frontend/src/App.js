import { Route, Routes } from 'react-router-dom'
import Layout from './components/general/Layout'
import RequireAuth from './components/general/RequireAuth'
import Login from './components/login/Main'
import Todo from './components/todo/Main'
import Photo from './components/photo/Main'

import './App.css'

function App() {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                {/* Public routes */}
                <Route path='login' element={<Login />} />
                {/* Private routes */}
                <Route element={<RequireAuth />}>
                    <Route path='/' element={<div>Home</div>} />
                    <Route path='todo' element={<Todo />} />
                    <Route path='photo' element={<Photo />} />
                </Route>
                {/* Missing routes */}
                <Route index element={
                    <div>
                        <h1>404</h1>
                        <p>Page not found</p>
                    </div>
                } />
            </Route>
        </Routes>
    )
}

export default App