import React, { useState, useEffect, useRef } from 'react';
import { Suspense } from 'react';
import Folder from "../components/Folder";
import SearchBox from "../components/SearchBox";
import PageHeading from '../components/pageheading';
import PageFooter from '../components/pagefooter';
const AddNewGroupDialog = React.lazy(() => import('../components/dialogs/AddNewGroupDialog'));
const AddNewBookmarkDialog = React.lazy(() => import('../components/dialogs/AddNewBookmarkDialog'));
const EditBookmarkDialog = React.lazy(() => import('../components/dialogs/EditBookmarkDialog'));

function BookmarksPage({loginStatus, setLoginStatus, logout}) {
    const SERVICE_URL = window.env.BMS_SERVICE_URL;
    const SEARCH_URL = window.env.BMS_SEARCH_URL;
    const APP_VERSION = window.env.BMS_VERSION;

    const [data, setData] = useState({
        isLoaded: false,
        items: [],
        selectedGroup: -1,
    });

    const [formData, setFormData] = useState();
    const [refreshKey, setRefreshKey] = useState(0);
    var [editMode, setEditMode] = useState(false);
    var addNewBookmarkDialogRef = useRef();
    var editBookmarkDialogRef = useRef();
    var addNewGroupDialogRef = useRef();
    const inputFile = useRef(null);

    useEffect(() => {
        fetch(SERVICE_URL + "/bookmarks", 
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
                    isLoaded: true,
                    filteredData: json,
                    items: json,
                    query: "",
                    selectedFolder: null,
                    changeMade: false
                });
                setFormData({});
            });
    }, [refreshKey, SERVICE_URL, loginStatus.token, setLoginStatus]);

    const renameFolderName = async (folder, newName, setFolderName) => {
        if (folder.name === newName) {
            console.log("name hasn't changed.")
            return;
        }

        console.log("rename " + folder.id + " to " + newName);

        let response = await fetch(SERVICE_URL + "/group/" + folder.id, {
            method: "PUT",
            headers: {'Authorization': "Bearer "+loginStatus.token},
            body: newName
        });

        if (response.status === 200) {
            setRefreshKey(oldKey => oldKey + 1);
        } else {
            setFolderName(folder.name);
            alert(await response.text());
        }
    };

    const selectedImportFile = () => {
        inputFile.current.click();
    };

    const downloadExportFile =  () => {
        fetch(SERVICE_URL + "/export", {
            headers: {'Authorization': "Bearer "+loginStatus.token},
        }).then(async (res) => {
            var exportedData = await res.text();
            console.log(exportedData);
            const dataUrl = 'data:text/plain;base64,' + btoa(exportedData);
            const link = document.createElement('a');
            link.href = dataUrl;
            const epochSecondsString = Math.floor(Date.now() / 1000).toString();
            link.download = 'export_'+epochSecondsString+'.yml'
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);  
        });
    };

    const deleteAll = () => {
        fetch(SERVICE_URL + "/all", {
            headers: {'Authorization': "Bearer "+loginStatus.token},
            method: "DELETE"
        }).then(() => { setRefreshKey(oldKey => oldKey + 1); });
    };

    const uploadImportFile = (event) => {
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.onload = (e) => {
            var importData = e.target.result;
            console.log(importData);
            fetch(SERVICE_URL + "/import", {
                 headers: {
                    'Authorization': "Bearer "+loginStatus.token,
                    'Content-type': "text/plain"
                 },
                 method: "POST",
                 body: importData
             }).then(() => { setRefreshKey(oldKey => oldKey + 1); });
        };

        reader.readAsText(file);
    };


    const openAddBookmarkDialog = (folder, url) => {
        setData((prev) => ({
            ...prev, selectedFolder: folder, url: url
        })
        );
        setFormData(() => ({
            url: url
            })
        );
        addNewBookmarkDialogRef.current.showModal();
    };

    const openEditBookmarkDialog = (bookmark, event) => {
        if (!editMode) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        console.log("editing " + bookmark.id);

        setData((prev) => ({
            ...prev,
            selectedBookmark: bookmark
        }));

        setFormData(() => ({
            title: bookmark.title,
            url: bookmark.url,
        }));

        editBookmarkDialogRef.current.showModal();
    };

    const toggleEditMode = () => setEditMode(!editMode);

    const openAddGroupDialog = () => {
        addNewGroupDialogRef.current.showModal();
    };    

    const closeAddBookmarkDialog = () => {
        addNewBookmarkDialogRef.current.close()
    };

    const closeAddGroupDialog = () => {
        addNewGroupDialogRef.current.close();
    };

    const closeEditBookmarkDialog = () => {
        editBookmarkDialogRef.current.close();
    };

    const searchOnChange = (event) => {
        setData((prev) => ({
            ...prev,
            query: event.target.value
        })
        );
    };

    const onSearchSubmit = (query) => {
        window.location = SEARCH_URL + encodeURI(query) + "&ia=web";
    };

    const searchOnKeyUp = (event) => {
        if (event.key === 'Enter') {
            onSearchSubmit(event.target.value)
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const moveBookmark = (bookmarkId, folderName) => {
        fetch(SERVICE_URL + "/bookmarks", {
            headers: {
                'Authorization': "Bearer "+loginStatus.token,
                "Content-type": "application/json; charset=UTF-8"
            },
            method: "PUT",
            body: JSON.stringify({
                bookmarkId: bookmarkId,
                groupName: folderName,
            })            
        }).then(() => { setRefreshKey(oldKey => oldKey + 1); });
    };

    const deleteBookmarkBeingEdited = (id) => {
        deleteBookmark(id)
        closeEditBookmarkDialog();
    };

    const deleteBookmark = (bookmarkId) => {
        fetch(SERVICE_URL + "/bookmarks/" + bookmarkId, {
            headers: {'Authorization': "Bearer "+loginStatus.token},
            method: "DELETE",
        }).then(() => { setRefreshKey(oldKey => oldKey + 1); });
    };

    const deleteFolder = (folder) => {
        fetch(SERVICE_URL + "/group/" + folder.id, {
            headers: {'Authorization': "Bearer "+loginStatus.token},
            method: "DELETE",
        }).then(() => { setRefreshKey(oldKey => oldKey + 1); });

    };

    const onSubmitBookmark = (event) => {
        event.preventDefault();

        fetch(SERVICE_URL + "/bookmarks", {
            headers: {
                'Authorization': "Bearer "+loginStatus.token,
                "Content-type": "application/json; charset=UTF-8"
            },
            method: "POST",
            body: JSON.stringify({
                title: formData.title,
                url: formData.url,
                groupName: data.selectedFolder.name
            })            
        }).then(() => { setRefreshKey(oldKey => oldKey + 1); });

        closeAddBookmarkDialog();
    };

    const onSubmitEditBookmark = (event) => {
        event.preventDefault();

        fetch(SERVICE_URL + "/bookmark/" + data.selectedBookmark.id, {
            headers: {
                'Authorization': "Bearer "+loginStatus.token,
                "Content-type": "application/json; charset=UTF-8"
            },
            method: "PUT",
            body: JSON.stringify({
                title: formData.title,
                url: formData.url,
            })
        }).then(() => { setRefreshKey(oldKey => oldKey + 1); });

        closeEditBookmarkDialog();
    };

    const onSubmitGroup = (event) => {
        event.preventDefault();

        fetch(SERVICE_URL + "/group", {
            headers: {
                'Authorization': "Bearer "+loginStatus.token,
                "Content-type": "text/plain; charset=UTF-8"
            },
            method: "POST",
            body: formData.name
        }).then(() => { setRefreshKey(oldKey => oldKey + 1); });

        closeAddGroupDialog();
    };

    const moveFolder = (targetFolder, draggedFolder) => {
        fetch(SERVICE_URL + "/group", {
            headers: {
                'Authorization': "Bearer "+loginStatus.token,
                "Content-type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify({sourceGroupId:draggedFolder, targetGroupId: targetFolder})
        }).then(() => { setRefreshKey(oldKey => oldKey + 1); });
    }

    if (!data.isLoaded) {
        return (
            <div className="lds-hourglass"></div>
        );
    }

    return (
        <div>
            
            <Suspense>
            <PageHeading
                editMode={editMode} 
                toggleEditMode={toggleEditMode} 
                downloadExportFile={downloadExportFile}
                inputFile={inputFile}
                uploadImportFile={uploadImportFile}
                selectedImportFile={selectedImportFile}
                deleteAll={deleteAll}
                logout={logout}
            />
            </Suspense>

            <SearchBox onChange={searchOnChange} onKeyUp={searchOnKeyUp}></SearchBox>

            <article id="folders">
                {data.items
                    .filter(folder => data.query == null || data.query.length==0 || folder.bookmarks.filter(bookmark => bookmark.title.toLowerCase().includes(data.query.toLowerCase())).length > 0)
                    .map(filterFolder => (
                        <Folder
                            key={filterFolder.id}
                            item={filterFolder}
                            onAdd={openAddBookmarkDialog}
                            onBookmarkDrop={moveBookmark}
                            onURIDrop={openAddBookmarkDialog}
                            onDelete={deleteFolder}
                            query={data.query.toLowerCase()}
                            editMode={editMode}
                            editBookmark={openEditBookmarkDialog}
                            renameFolderName={renameFolderName}
                            onFolderDrop={moveFolder}
                        />
                    ))}
            </article>

            {editMode &&
                <div className="center spaceabove">
                    <button className="flat" onClick={() => { openAddGroupDialog() }}>Add New Group</button>
                </div>
            }
            <Suspense>
            <AddNewBookmarkDialog
                folder={data.selectedFolder}
                prepopulatedUrl={formData.url}
                dialogRef={addNewBookmarkDialogRef}
                onDismiss={closeAddBookmarkDialog}
                onSubmit={onSubmitBookmark}
                onChange={handleChange}
            />
            </Suspense>

            <Suspense>
            <AddNewGroupDialog
                dialogRef={addNewGroupDialogRef}
                onDismiss={closeAddGroupDialog}
                onSubmit={onSubmitGroup}
                onChange={handleChange}
            />
            </Suspense>

            <Suspense>
            <EditBookmarkDialog
                dialogRef={editBookmarkDialogRef}
                bookmark={data.selectedBookmark}
                prepopulatedName={formData.title}
                prepopulatedUrl={formData.url}
                onDismiss={closeEditBookmarkDialog}
                onSubmit={onSubmitEditBookmark}
                onChange={handleChange}
                onDelete={deleteBookmarkBeingEdited}
            />
            </Suspense>

            <Suspense>
            <PageFooter version={APP_VERSION}/>
            </Suspense>

        </div>
    );
};

export default BookmarksPage
