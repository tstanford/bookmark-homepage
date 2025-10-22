import React, {useState, useEffect} from 'react';
import Folder from "./components/Folder"
import SearchBox from "./components/SearchBox"
import PageHeading from './components/pageheading';
import AddNewGroupDialog from './dialogs/AddNewGroupDialog'
import AddNewBookmarkDialog from './dialogs/AddNewBookmarkDialog'
import EditBookmarkDialog from './dialogs/EditBookmarkDialog'

export default function App() {
    const [data, setData] = useState({
        isLoaded: false,
        items: [],
        selectedGroup: -1,
        showDialogAddBookmark: false,
        showDialogAddGroup: false
    });

    //const serviceUrl = "http://192.168.0.30:8088";
    const serviceUrl = "http://localhost:8080";

    const [formData, setFormData] = useState();
    const [refreshKey, setRefreshKey] = useState(0);
    var [editMode, setEditMode] = useState(false);

    useEffect(() => {
        fetch(serviceUrl+"/bookmarks")
        .then(res => res.json())
        .then(json => {
            setData({
                isLoaded: true,
                filteredData: json,
                items: json,
                query: "",
                showDialogAddBookmark: false,
                showDialogEditBookmark: false,
                showDialogAddGroup: false,
                selectedFolder: null,
                changeMade : false
            });
            setFormData({});
        });
    }, [refreshKey]);

    const renameFolderName = async (folder, newName, setFolderName) => {

        if(folder.name === newName) {
            console.log("name hasn't changed.")
            return;
        }

        console.log("rename "+folder.id+ " to "+newName);

        let response = await fetch(serviceUrl+"/group/"+folder.id, {
                method: "PUT",
                body: newName
        });

        if(response.status === 200){
            setRefreshKey(oldKey => oldKey+1);
        } else {
            setFolderName(folder.name);
            alert(await response.text());            
        }
    }

    const downloadExportFile = () => {
        window.location = serviceUrl+"/export";
    };

    const openAddBookmarkDialog = (folder,url) => {
        setData((prev) => ({
        ...prev, showDialogAddBookmark: true, selectedFolder: folder, url: url})
        );
        setFormData((prev) =>  ({
            ...prev, url: url})
        );
    };

    const openEditBookmarkDialog = (bookmark, event) => {
        if(!editMode){
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        console.log("editing "+bookmark.id);

        setData((prev) => ({
            ...prev,
            showDialogEditBookmark: true,
            selectedBookmark: bookmark
        }));
    };

    const toggleEditMode = () => setEditMode(!editMode);
    const closeAddBookmarkDialog = () => setData((prev) => ({...prev, showDialogAddBookmark: false}));
    const openAddGroupDialog = (folder) => setData((prev) => ({...prev, showDialogAddGroup: true}));
    const closeAddGroupDialog = () => setData((prev) => ({...prev, showDialogAddGroup: false}));
    const closeEditBookmarkDialog = () => setData((prev) => ({...prev, showDialogEditBookmark: false}));

    const searchOnChange = (event) => {
        setData((prev) => ({
            ...prev,
            query: event.target.value})
            );
    };

    const onSearchSubmit = (query) => {
        window.location = "https://duckduckgo.com/?q="+ encodeURI(query)+"&ia=web";
    };

    const searchOnKeyUp = (event) => {
        if(event.key === 'Enter'){
            onSearchSubmit(event.target.value)
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const moveBookmark = (bookmarkId, folderName) => {
        fetch(serviceUrl+"/bookmarks", {
            method: "PUT",
            body: JSON.stringify({
                bookmarkId: bookmarkId,
                groupName: folderName,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(() => {setRefreshKey(oldKey => oldKey+1);});
    };

    const deleteBookmark = (bookmarkId) => {
        fetch(serviceUrl+"/bookmarks/"+bookmarkId, {
            method: "DELETE",
        }).then(() => {setRefreshKey(oldKey => oldKey+1);});
    };

    const deleteFolder = (folder) => {
        fetch(serviceUrl+"/group/"+folder.id, {
            method: "DELETE",
        }).then(() => {setRefreshKey(oldKey => oldKey+1);});

    };

    const onSubmitBookmark = (event) => {
        event.preventDefault();
        
        fetch(serviceUrl+"/bookmarks", {
            method: "POST",
            body: JSON.stringify({
                title: formData.title,
                url: formData.url,
                groupName: data.selectedFolder.name
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(() => {setRefreshKey(oldKey => oldKey+1);});

        closeAddBookmarkDialog();
    };

    const onSubmitGroup = (event) => {
        event.preventDefault();
        
        fetch(serviceUrl+"/group", {
            method: "POST",
            body: formData.name,
            headers: {
                "Content-type": "text/plain; charset=UTF-8"
            }
        }).then(() => {setRefreshKey(oldKey => oldKey+1);});

        closeAddGroupDialog();
    };

    const appDragoverHandler = (ev) => {
        ev.preventDefault();
    };

    const appDropHandler = (ev) =>{
        ev.preventDefault();
        const bookmarkId = ev.dataTransfer.getData("bookmark");
        if(bookmarkId){
            deleteBookmark(bookmarkId);
        } 
        
    };

    if(!data.isLoaded){
        return (
            <div className="lds-hourglass"></div>
        );
    }

    return( 
        <div>

            <div id="editSwitch">
                <label className="switch">
                    <input type="checkbox" checked={editMode} onChange={toggleEditMode}/>
                    <span className="slider round"></span>
                </label>
            </div>

            <div class="exportfile">
                <button>
                    <span class="material-symbols-outlined" onClick={downloadExportFile}>file_save</span>
                </button>
            </div>


            <PageHeading date={ new Date().toDateString()} onDrop={appDropHandler} onDragOver={appDragoverHandler}></PageHeading>
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

            { editMode &&
            <div className="center spaceabove">
                <button className="flat" onClick={()=>{openAddGroupDialog()}}>Add New Group</button>
            </div>
            }
            <AddNewBookmarkDialog 
                folder={data.selectedFolder}
                prepopulatedUrl={formData.url}
                isOpen={data.showDialogAddBookmark}
                onDismiss={closeAddBookmarkDialog}
                onSubmit={onSubmitBookmark}
                onChange={handleChange}
                />


            <AddNewGroupDialog 
                isOpen={data.showDialogAddGroup} 
                onDismiss={closeAddGroupDialog} 
                onSubmit={onSubmitGroup} 
                onChange={handleChange}
                />

            <EditBookmarkDialog 
                folder={data.selectedFolder}
                prepopulatedUrl={formData.url}
                isOpen={data.showDialogEditBookmark}
                onDismiss={closeEditBookmarkDialog}
                onSubmit={onSubmitBookmark}
                onChange={handleChange}
                />

        </div>
    );
}