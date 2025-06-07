import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer';

const NoPage = () => {
    const [token, setToken] = useState(localStorage.token || null);

    return (
        <>
            <header className="container" id="header">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                    <div className="col-md-3 mb-2 mb-md-0">
                        <a className="d-inline-flex link-body-emphasis text-decoration-none">
                            <h2><i className="bi bi-box2"></i></h2>
                        </a>
                    </div>
                </div>
            </header>
            <main className="container text-center mt-5">
                <h1 className="display-4">404 - Page Not Found</h1>
                <p className="lead">Oops! The page you are looking for might be in another castle.</p>
                <i class="bi bi-hand-thumbs-down"></i>

                {token && <p className="mt-4">Return to <Link to={"/inicio"}>Home</Link></p>}
                {!token && <p className="mt-4">Return to <Link to={"/login"}>Login</Link></p>}
            </main>
            <Footer />
        </>
    );
}

export default NoPage;