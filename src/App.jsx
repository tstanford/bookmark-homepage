import React, { useState } from 'react';
import { Suspense } from 'react';
import { UserController } from './controllers/UserController';
const AdminPage = React.lazy(() => import('./pageComponents/AdminPage'));
const BookmarksPage = React.lazy(() => import('./pageComponents/BookmarksPage'));
const Login = React.lazy(() => import('./components/dialogs/Login'));
const PageFooter = React.lazy(() => import('./components/pagefooter'));

export default function App() {
    const APP_VERSION = window.env.BMS_VERSION;
    var userController = new UserController();

    const [loginStatus, setLoginStatus] = useState({
        isLoggedIn: userController.token !== null,
        token: userController.token,
        isAdmin: userController.isAdminVar,
        isChecked: false,
<<<<<<< HEAD
        isChecking: false,
=======
>>>>>>> f757d1d (Fix refresh token logic)
        emailAddress : "",
        refreshTokenExpired : true
    });

    userController.setLoginStatusFunc(setLoginStatus);

     if(!loginStatus.isChecked) {
        if(!loginStatus.isLoggedIn) {
            setLoginStatus((prev) => ({...prev, isChecked: true}));
        } else {
<<<<<<< HEAD
            if(!loginStatus.isChecking){

                setLoginStatus((prev) => ({...prev, isChecking: true}));

                userController.isAdmin(setLoginStatus).then(() => {
                    userController.getEmail().then((emailAddress) => {
                        setLoginStatus((prev) => ({
                            ...prev, 
                            emailAddress:emailAddress, 
                            refreshTokenExpired: false, 
                            isLoggedIn: true, 
                            token: userController.token,
                            isChecking: false
                        }));
                    });
                });
            }
=======
            userController.isAdmin(setLoginStatus).then((x) => {
                userController.getEmail().then((emailAddress) => {
                    setLoginStatus((prev) => ({
                        ...prev, 
                        emailAddress:emailAddress, 
                        refreshTokenExpired: false, 
                        isLoggedIn: true, 
                        token: userController.token,
                    }));
                });
            });
>>>>>>> f757d1d (Fix refresh token logic)
        }
     }

    const [loginDialogState, setLoginDialogState] = useState({
        shaking: false
    })

    const login = async (event, username, password) => {
        event.preventDefault();

        //todo: change this to fluent interface.
        userController.login(username, password, (token, isAdmin) => {
            setLoginStatus({ isLoggedIn: true, token: token, isAdmin: isAdmin, isChecked: false });
        }, () => {
            setLoginStatus({ isLoggedIn: false, token: null, isAdmin: false, isChecked: false });
            setLoginDialogState({shaking: true});
            setTimeout(() => {
                setLoginDialogState({shaking: false});
            }, 1000);

        });
    };

    const logout = () => {
        userController.logout()
        setLoginStatus({ isLoggedIn: false, token: null, isAdmin: false });
    }

    if(loginStatus.isChecked) {
        if (!loginStatus.isLoggedIn) {
<<<<<<< HEAD
            console.log("Displaying Login page");
=======
            //userController.logout();
            console.log("aaa");
>>>>>>> f757d1d (Fix refresh token logic)
            return (
                <Suspense>
                    <Login onSubmit={login} isShaking={loginDialogState.shaking} />
                    <div className="loginscreen">
                        <PageFooter version={APP_VERSION}></PageFooter>
                    </div>
                </Suspense>
            );
        } else {
<<<<<<< HEAD
            console.log("Is logged in");
=======
            console.log("bbb");
>>>>>>> f757d1d (Fix refresh token logic)
            if (loginStatus.isAdmin === true) {
                return (
                    <Suspense>
                        <AdminPage userController={userController} logout={logout} loginStatus={loginStatus} setLoginStatus={setLoginStatus} />
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
    }

};