import Bookmark from "./Bookmark";
import React, { useState } from 'react';

export default function Folder({item, onAdd, onBookmarkDrop, onURIDrop, onDelete, query, editMode, editBookmark, deleteBookmark, renameFolderName}){

    const folderDragoverHandler = (ev) => {
        ev.preventDefault();
    };

    const [folderName, setFolderName] = useState(item.name);

    const folderDropHandler = (ev) =>{
        if(!editMode){
            return;
        }
        ev.preventDefault();
        const folderName = item.name;
        const bookmarkId = ev.dataTransfer.getData("bookmark");
        if(bookmarkId){
            onBookmarkDrop(bookmarkId, folderName);
        } else {
            let url = ev.dataTransfer.getData('text/uri-list');
            if(!url) {
                url = ev.dataTransfer.getData('text/plain');
            }
            if(url) {
                onURIDrop(item, url);
            }
        }         
    };

    const onChangeFolderName = (e) => {
        setFolderName(e.target.value);
    };

    return(
        <>
        {(editMode || item.bookmarks.filter(x => x.title.toLowerCase().includes(query)).length > 0) &&
        <section className="folder" onDrop={folderDropHandler} onDragOver={folderDragoverHandler}>

            {editMode ?
            <>
                <button className="addButton" onClick={()=>{onAdd(item)}}> <span className="material-symbols-outlined">bookmark_add</span> </button>
                <input className="titleTextBox" value={folderName} onChange={onChangeFolderName} onBlur={() => renameFolderName(item, folderName, setFolderName)}/>
                
            </>
            :
                <label>{item.name}</label>
            }   

            

            <div className="items">
            {item.bookmarks.length > 0 ? 
                item.bookmarks.filter(x => query === "" || x.title.toLowerCase().includes(query)).map(bookmark => (
                    <Bookmark key={bookmark.id} bookmark={bookmark} editMode={editMode} editBookmark={editBookmark} deleteBookmark={deleteBookmark}/>                
                ))
            :
                <button className="flat" onClick={()=>{onDelete(item)}}>Delete this folder</button>
            }

            </div>
        </section>
        }
        </>
    );
}