import React, { useState, useEffect } from 'react';
import PageFooter from "../components/pagefooter";
import PageHeading from "../components/pageheading";

export default function Admin({logout, loginStatus, setLoginStatus}){
    const SERVICE_URL = window.env.BMS_SERVICE_URL;
    const APP_VERSION = window.env.BMS_VERSION;

    const [data, setData] = useState({
        items: [],
        isLoaded: false
    });

    useEffect(() => {
        fetch(SERVICE_URL + "/admin/users", 
            {headers: {'Authorization': "Bearer "+loginStatus.token}}
        )
            .then(res => {
                if(res.status == 401 || res.status == 403) {
                    console.log("logged out?");
                    setLoginStatus(() => ({isLoggedIn: false, token: null, isAdmin: false }));
                }
                return res.json()
            })
            .then(json => {
                setData({
                    items: json,
                    isLoaded: true,
                });
            });
    }, []);


    if (!data.isLoaded) {
        return (
            <div className="lds-hourglass"></div>
        );
    }

    return (

        <>
            <PageHeading logout={logout} adminMode={true}></PageHeading>

            <article className="tablecontainer headingspacer">

                <table border="1">
                <thead>
                    <tr>
                    <th>User Id</th>
                    <th>Username</th>
                    <th>Email Address</th>
                    <th>Bookmarks</th>
                    <th className="actions">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.items.map(item => (

                    <tr>
                        <td>{item.userId}</td>
                        <td>{item.username}</td>
                        <td>{item.emailAddress}</td>
                        <td>{item.bookmarkCount}</td>
                        <td className="actions">
                            <button>Edit</button>
                            <button>Delete</button>
                        </td>
                    </tr>

                    ))}
                    
                </tbody>
                </table>

                <aside>
                <button class="addNewUser flat">Add User</button>
                </aside>

            </article>

            
            <PageFooter version={APP_VERSION}></PageFooter>
        </>

    );
}