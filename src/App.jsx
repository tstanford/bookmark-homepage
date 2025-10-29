import BookmarksPage from "./BookmarksPage";
import Login from "./components/dialogs/Login";
import { useState } from 'react';

export default function App(){

    const [loginStatus, setLoginStatus] = useState({
            isLoggedIn: true,
            token: ""
    });

    const login = (username, password) => {

    };

    if (!loginStatus.isLoggedIn) {
        return (
            <Login onSubmit={login}/>
        );
    }

    return (
        <BookmarksPage loginStatus={loginStatus} setLoginStatus={setLoginStatus} />
    );
    
};