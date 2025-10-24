import React, { useState, useEffect, useRef } from 'react';
import Folder from "./components/Folder"
import SearchBox from "./components/SearchBox"
import PageHeading from './components/pageheading';
import AddNewGroupDialog from './components/dialogs/AddNewGroupDialog'
import AddNewBookmarkDialog from './components/dialogs/AddNewBookmarkDialog'
import EditBookmarkDialog from './components/dialogs/EditBookmarkDialog'

function App() {
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

    useEffect(() => {
        fetch(SERVICE_URL + "/bookmarks")
            .then(res => res.json())
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
    }, [refreshKey, SERVICE_URL]);

    const renameFolderName = async (folder, newName, setFolderName) => {
        if (folder.name === newName) {
            console.log("name hasn't changed.")
            return;
        }

        console.log("rename " + folder.id + " to " + newName);

        let response = await fetch(SERVICE_URL + "/group/" + folder.id, {
            method: "PUT",
            body: newName
        });

        if (response.status === 200) {
            setRefreshKey(oldKey => oldKey + 1);
        } else {
            setFolderName(folder.name);
            alert(await response.text());
        }
    };

    const downloadExportFile = () => {
        window.location = SERVICE_URL + "/export";
    };

    const openAddBookmarkDialog = (folder, url) => {
        setData((prev) => ({
            ...prev, selectedFolder: folder, url: url
        })
        );
        setFormData((prev) => ({
            ...prev, url: url
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

        editBookmarkDialogRef.current.showModal();
    };

    const openAddGroupDialog = () => {
        addNewGroupDialogRef.current.showModal();
    };

    const toggleEditMode = () => setEditMode(!editMode);

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
            method: "PUT",
            body: JSON.stringify({
                bookmarkId: bookmarkId,
                groupName: folderName,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(() => { setRefreshKey(oldKey => oldKey + 1); });
    };

    const deleteBookmark = (bookmarkId) => {
        fetch(SERVICE_URL + "/bookmarks/" + bookmarkId, {
            method: "DELETE",
        }).then(() => { setRefreshKey(oldKey => oldKey + 1); });
    };

    const deleteFolder = (folder) => {
        fetch(SERVICE_URL + "/group/" + folder.id, {
            method: "DELETE",
        }).then(() => { setRefreshKey(oldKey => oldKey + 1); });

    };

    const onSubmitBookmark = (event) => {
        event.preventDefault();

        fetch(SERVICE_URL + "/bookmarks", {
            method: "POST",
            body: JSON.stringify({
                title: formData.title,
                url: formData.url,
                groupName: data.selectedFolder.name
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(() => { setRefreshKey(oldKey => oldKey + 1); });

        closeAddBookmarkDialog();
    };

    const onSubmitGroup = (event) => {
        event.preventDefault();

        fetch(SERVICE_URL + "/group", {
            method: "POST",
            body: formData.name,
            headers: {
                "Content-type": "text/plain; charset=UTF-8"
            }
        }).then(() => { setRefreshKey(oldKey => oldKey + 1); });

        closeAddGroupDialog();
    };

    const appDragoverHandler = (ev) => {
        ev.preventDefault();
    };

    const appDropHandler = (ev) => {
        ev.preventDefault();
        const bookmarkId = ev.dataTransfer.getData("bookmark");
        if (bookmarkId) {
            deleteBookmark(bookmarkId);
        }

    };

    if (!data.isLoaded) {
        return (
            <div className="lds-hourglass"></div>
        );
    }

    return (
        <div>

            <div id="editSwitch">
                <label className="switch">
                    <input type="checkbox" checked={editMode} onChange={toggleEditMode} />
                    <span className="slider round"></span>
                </label>
            </div>

            <div className="exportfile">
                <button>
                    <span className="material-symbols-outlined" onClick={downloadExportFile}>file_save</span>
                </button>
            </div>


            <PageHeading version={APP_VERSION} date={new Date().toDateString()} onDrop={appDropHandler} onDragOver={appDragoverHandler}></PageHeading>
            <SearchBox onChange={searchOnChange} onKeyUp={searchOnKeyUp}></SearchBox>

            <article id="folders">
                {data.items
                    .map(x => (
                        <Folder
                            key={x.id}
                            item={x}
                            onAdd={openAddBookmarkDialog}
                            onBookmarkDrop={moveBookmark}
                            onURIDrop={openAddBookmarkDialog}
                            onDelete={deleteFolder}
                            query={data.query.toLowerCase()}
                            editMode={editMode}
                            editBookmark={openEditBookmarkDialog}
                            deleteBookmark={deleteBookmark}
                            renameFolderName={renameFolderName}
                        />
                    ))}
            </article>

            {editMode &&
                <div className="center spaceabove">
                    <button className="flat" onClick={() => { openAddGroupDialog() }}>Add New Group</button>
                </div>
            }
            <AddNewBookmarkDialog
                folder={data.selectedFolder}
                prepopulatedUrl={formData.url}
                dialogRef={addNewBookmarkDialogRef}
                onDismiss={closeAddBookmarkDialog}
                onSubmit={onSubmitBookmark}
                onChange={handleChange}
            />


            <AddNewGroupDialog
                dialogRef={addNewGroupDialogRef}
                onDismiss={closeAddGroupDialog}
                onSubmit={onSubmitGroup}
                onChange={handleChange}
            />

            <EditBookmarkDialog
                folder={data.selectedFolder}
                prepopulatedUrl={formData.url}
                dialogRef={editBookmarkDialogRef}
                onDismiss={closeEditBookmarkDialog}
                onSubmit={onSubmitBookmark}
                onChange={handleChange}
            />

        </div>
    );
};

export default App
