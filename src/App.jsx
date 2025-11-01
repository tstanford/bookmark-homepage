import React, { useState } from 'react';
import { Suspense } from 'react';
import { UserController } from './UserController';
const AdminPage = React.lazy(() => import('./AdminPage'));
const BookmarksPage = React.lazy(() => import('./BookmarksPage'));
const Login = React.lazy(() => import('./components/dialogs/Login'));
const PageFooter = React.lazy(() => import('./components/pagefooter'));

export default function App() {
    const APP_VERSION = window.env.BMS_VERSION;
    var userController = new UserController()

    const [loginStatus, setLoginStatus] = useState({
        isLoggedIn: userController.token !== null,
        token: userController.token,
        isAdmin: userController.isAdminVar
    });

    const login = async (event, username, password) => {
        event.preventDefault();

        //todo: change this to fluent interface.
        userController.login(username, password, (token, isAdmin) => {
            setLoginStatus(() => ({ isLoggedIn: true, token: token, isAdmin: isAdmin }));
            console.log("logged in");
        }, () => {
            setLoginStatus(() => ({ isLoggedIn: false, token: null, isAdmin: false }));
            console.log("login failed");
        });
    };

    const logout = () => {
        userController.logout()
        setLoginStatus({ isLoggedIn: false, token: null, isAdmin: false });
    }

    if (!loginStatus.isLoggedIn) {
        return (
            <Suspense>
                <Login onSubmit={login} />
                <div className="loginscreen">
                    <PageFooter version={APP_VERSION}></PageFooter>
                </div>
            </Suspense>
        );
    } else {
        console.log("X:"+ loginStatus.isAdmin);
        if (loginStatus.isAdmin === true) {
            return (
                <Suspense>
                    <AdminPage logout={logout} />
                </Suspense>
            );
        } else {
            return (
                <Suspense>
                    <BookmarksPage logout={logout} loginStatus={loginStatus} setLoginStatus={setLoginStatus} />
                </Suspense>
            );
        }
    }

};