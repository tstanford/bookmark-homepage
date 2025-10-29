import BookmarksPage from "./BookmarksPage";
import Login from "./components/dialogs/Login";
import { useState } from 'react';

export default function App(){
    const SERVICE_URL = window.env.BMS_SERVICE_URL;

    var storedToken = localStorage.getItem("token");

    const [loginStatus, setLoginStatus] = useState({
            isLoggedIn: storedToken != null,
            token: storedToken
    });

    const logout = () => {
        localStorage.clear();
        setLoginStatus({});
    }

    const login = async (event, username, password) => {
        event.preventDefault();

        console.log(username);
        console.log(password);
        var userRegistered = false;

        var registerResponse = await fetch(SERVICE_URL + "/register", {
                method: "POST",
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            });
        if(registerResponse.status==200) {
            userRegistered = true;
        }        

        var loginResponse = await fetch(SERVICE_URL + "/login", {
                method: "POST",
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            });            

        if(loginResponse.status!=200) {
            setLoginStatus((prev) => ({...prev, isLoggedIn: false }));
        } else {
            var token = await loginResponse.text();
            setLoginStatus((prev) => ({...prev, isLoggedIn: true, token: token }));
            localStorage.setItem('token', token);
        }

        if(userRegistered) {
            alert("New user created");
        }

    };

    if (!loginStatus.isLoggedIn) {
        return (
            <Login onSubmit={login}/>
        );
    }

    return (
        <BookmarksPage logout={logout} loginStatus={loginStatus} setLoginStatus={setLoginStatus} />
    );
    
};