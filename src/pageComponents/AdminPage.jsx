import React, { useState, useEffect, useRef } from 'react';
import PageFooter from "../components/pagefooter";
import PageHeading from "../components/pageheading";
import { Suspense } from 'react';
const RegisterUserDialog = React.lazy(() => import('../components/dialogs/RegisterUserDialog'));

export default function Admin({userController, logout, loginStatus, setLoginStatus}){
    const SERVICE_URL = window.env.BMS_SERVICE_URL;
    const APP_VERSION = window.env.BMS_VERSION;

    const [data, setData] = useState({
        items: [],
        isLoaded: false
    });

    const [formData, setFormData] = useState({});
    const [refreshKey, setRefreshKey] = useState(0);

    var registerUserDialogRef = useRef();

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
    }, [refreshKey]);


    if (!data.isLoaded) {
        return (
            <div className="lds-hourglass"></div>
        );
    }

    var openRegisterUserDialog = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setFormData( () => ({username:"", email:"", password:""}));
        registerUserDialogRef.current.showModal();
    };

    var closeRegisterUser = (event) => {
        event.preventDefault();
        event.stopPropagation();
        registerUserDialogRef.current.close()
    };

    var onSubmitRegisterUser = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        console.log(formData);

        if(formData.username != "" && formData.email != "" && formData.password != ""){
            await userController.register(formData.username, formData.email, formData.password);
            setRefreshKey(oldKey => oldKey + 1);
            registerUserDialogRef.current.close()        
        } else{
            alert("Please complete all fields");
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

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
                    <button class="addNewUser flat" onClick={openRegisterUserDialog}>Add User</button>
                </aside>

            </article>

            
            <Suspense>
            <RegisterUserDialog
                form={formData}
                dialogRef={registerUserDialogRef}
                onDismiss={closeRegisterUser}
                onSubmit={onSubmitRegisterUser}
                onChange={handleChange}
            />
            </Suspense>

            
            <PageFooter version={APP_VERSION}></PageFooter>
        </>
    );
}