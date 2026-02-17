import React from 'react'
import { Button } from 'primereact/button'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
    return (
        <div>
            <h1>Page not found</h1>
            <h1> 404 </h1>
            <p>Oops! The page you're looking for is not here.</p>
            <Link to={"/"}>
                <Button>Go Back to Home</Button>
            </Link>
        </div>
    )
}

export default NotFoundPage;