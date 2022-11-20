import React from 'react'

function Missing() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-9xl font-bold">404</h1>
            <p className="text-2xl font-semibold">Page not found</p>
            <a href="/" className="text-blue-500">Go back to home page</a>
        </div>
    )
}

export default Missing