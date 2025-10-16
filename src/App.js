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

    const serviceUrl = "http://192.168.0.30:8088";
    //const serviceUrl = "http://localhost:8080";

    const [formData, setFormData] = useState();
    const [refreshKey, setRefreshKey] = useState(0);
    var [editMode, setEditMode] = useState(false);

    useEffect(() => {
        fetch(serviceUrl+"/bookmarks")
        .then(res => res.json())
        .then(json => {
            for(var folderKey in json) {
                for(var bookmarkKey in json[folderKey].bookmarks){
                    json[folderKey].bookmarks[bookmarkKey].favicon = "data:image/png;base64,"+json[folderKey].bookmarks[bookmarkKey].favicon;
                }
            }
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

            <button className={"edit flat " + (editMode ? "editmode" : "viewmode")} onClick={toggleEditMode}>Edit</button>

            <PageHeading date={ new Date().toDateString()} onDrop={appDropHandler} onDragOver={appDragoverHandler}></PageHeading>
            <SearchBox onChange={searchOnChange}></SearchBox>

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


    /*
    {folder.bookmarks.filter(
            b => query === "" || 
            query.startsWith("g=") ||
            b.title.toLowerCase().includes(query.toLowerCase())
        ).map(bookmark => (
        <a href={bookmark.url}
        target="_blank">
            <img src={bookmark.favicon}/>{bookmark.title}</a>
    ))}
*/

    /*
    render(){
        var {isLoaded, items, query, showDialog, selectedFolder} = this.state;
        var filteredFolders = items.filter(i => query === "" || i.name.startsWith(query));
        if (filteredFolders.length === 0 ) filteredFolders = items
        if(!isLoaded){
            return (
                <div className="lds-hourglass"></div>
            );
        }
        else {
            return (
            <div id="app">
                <SearchBox onChange={this.searchOnChange}/>
                <Dialog isOpen={showDialog} onDismiss={this.close}>
                    <p>{selectedFolder != null && selectedFolder.name}</p>
                    <button onClick={this.close}>
                    Cancel
                    </button>
                    <button onClick={this.addBookmark}>
                    Ok
                    </button>
                </Dialog>   
                
                <article id="folders">
                    {filteredFolders.filter(
                            f => query === "" || 
                            f.bookmarks.filter(b => b.title.toLowerCase().includes(query.toLowerCase())).length > 0 ||
                            (query.startsWith("g=") && query.length > 2 && f.name.toLowerCase().startsWith(query.replace("g=","").toLowerCase()))
                        ).map(folder => (
                        <div className="folder">
                            <label>{folder.name}
                                <button className="addButton" onClick={() => this.open(folder)}>+</button>
                            </label>
                            
                            {folder.bookmarks.filter(
                                    b => query === "" || 
                                    query.startsWith("g=") ||
                                    b.title.toLowerCase().includes(query.toLowerCase())
                                ).map(bookmark => (
                                <a href={bookmark.url}
                                target="_blank">
                                <img src={bookmark.favicon}/>{bookmark.title}</a>
                            ))}
                        </div>
                    ))}
                </article>
            </div>
            );
        }
    }*/
}