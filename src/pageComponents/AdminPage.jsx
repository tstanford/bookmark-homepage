import React, { useState, useEffect, useRef } from 'react';
import PageFooter from "../components/pagefooter";
import PageHeading from "../components/pageheading";
import { Suspense } from 'react';
const RegisterUserDialog = React.lazy(() => import('../components/dialogs/RegisterUserDialog'));
const EditUserDialog = React.lazy(() => import('../components/dialogs/EditUserDialog'));

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
    var editUserDialogRef = useRef();

    useEffect(() => {
        fetch(SERVICE_URL + "/admin/users", 
            {headers: {'Authorization': "Bearer "+loginStatus.token}}
        )
            .then(res => {
                if(res.status == 401 || res.status == 403) {
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

    var openEditUserDialog = (event, user) => {
        event.preventDefault();
        event.stopPropagation();
        setFormData( () => ({userId:user.userId, username:user.username, email:user.emailAddress||"", password:user.password}));
        editUserDialogRef.current.showModal();
    };

    var closeRegisterUser = (event) => {
        event.preventDefault();
        event.stopPropagation();
        registerUserDialogRef.current.close()
    };

    var closeEditUser = (event) => {
        event.preventDefault();
        event.stopPropagation();
        editUserDialogRef.current.close()
    };

    var onSubmitRegisterUser = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        if(formData.username != "" && formData.email != "" && formData.password != ""){
            var result = await userController.register(formData.username, formData.email, formData.password);

            if (result.startsWith("Username already exists:")){
                alert("Username already exists, please choose another");
                return;
            }

            setRefreshKey(oldKey => oldKey + 1);
            registerUserDialogRef.current.close()        
        } else{
            alert("Please complete all fields");
        }
    };

    var onSubmitEditUser = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        await userController.editUser(formData.userId, formData.email, formData.password);
        setRefreshKey(oldKey => oldKey + 1);
        editUserDialogRef.current.close();
    };

    var deleteUser = async (event, item) => {
        event.preventDefault();
        event.stopPropagation();
        if(confirm("This will delete the user and their bookmarks, Are you sure?")) {
            await userController.deleteUser(item.userId);
            setRefreshKey(oldKey => oldKey + 1);
        }        
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    return (
        <>
            <PageHeading logout={logout} adminMode={true} emailAddress={loginStatus.emailAddress}></PageHeading>

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
                            <div>
                                <button class="flat mini" onClick={(event) => openEditUserDialog(event, item)}>Edit</button>
                                { !item.isAdmin &&
                                    <button class="flat mini" onClick={(event) => deleteUser(event, item)}>Delete</button>
                                }                                
                            </div>
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

            <EditUserDialog
                form={formData}
                dialogRef={editUserDialogRef}
                onDismiss={closeEditUser}
                onSubmit={onSubmitEditUser}
                onChange={handleChange}
            />
            </Suspense>

            
            <PageFooter version={APP_VERSION}></PageFooter>
        </>
    );
}