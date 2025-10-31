import Bookmark from "./Bookmark";
import React, { useState } from 'react';

export default function Folder({item, onAdd, onBookmarkDrop, onURIDrop, onDelete, query, editMode, editBookmark, renameFolderName, onFolderDrop}){

    const folderDragstartHandler = (ev) => {
        ev.stopPropagation();
        console.log("drag start folder");
        ev.dataTransfer.setData("groupid", item.id);
        ev.dataTransfer.effectAllowed = "move";
    };

    const folderDragEnterHandler = (ev) => {
        ev.stopPropagation();
        ev.preventDefault();
    };

    const folderDragoverHandler = (ev) => {
        ev.stopPropagation();
        ev.preventDefault();
        console.log("drag over folder");
        setBeingDraggedOver(true);
    };

    const folderDragoutHander = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        setBeingDraggedOver(false);
    }

    const [folderName, setFolderName] = useState(item.name);
    const [beingDraggedOver, setBeingDraggedOver] = useState(false);

    const folderDropHandler = (ev) =>{
        if(!editMode){
            return;
        }
        ev.preventDefault();

        setBeingDraggedOver(false);

        if(ev.dataTransfer.getData("bookmark").length>0) {
            handleBookmarkDrop(item, ev);
        } else if(ev.dataTransfer.getData("groupid").length>0) {
            handleFolderDrop(item, ev);
        } else {
            handleOtherDrop(item, ev);
        }                 
    };

    const handleFolderDrop = (folder, ev) => {
        const groupid = ev.dataTransfer.getData("groupid");
        if(groupid){
            onFolderDrop(item.id, groupid);
        } 
    };

    const handleBookmarkDrop = (folder, ev) => {
        const folderName = folder.name;
        const bookmarkId = ev.dataTransfer.getData("bookmark");
        if(bookmarkId){
            onBookmarkDrop(bookmarkId, folderName);
        } 
    };

    const handleOtherDrop = (folder, ev) => {
        let url = ev.dataTransfer.getData('text/uri-list');
        if(!url) {
            url = ev.dataTransfer.getData('text/plain');
        }
        if(url) {
            onURIDrop(folder, url);
        }
    };

    const onChangeFolderName = (e) => {
        setFolderName(e.target.value);
    };

    return(
        <>
        {(editMode || item.bookmarks.filter(x => x.title.toLowerCase().includes(query)).length > 0) &&
        <section 
        className={beingDraggedOver ? 'folder dragover' : 'folder'} 
        onDrop={folderDropHandler} 
        onDragOver={folderDragoverHandler} 
        onDragStart={folderDragstartHandler} 
        onDragLeave={folderDragoutHander} 
        onDragEnd={folderDragEnterHandler}
        draggable={editMode}>

            {editMode ?
            <>
                <button className="addButton" onClick={()=>{onAdd(item,"")}}> <span className="material-symbols-outlined">bookmark_add</span> </button>
                <input className="titleTextBox" draggable={false} value={folderName} onChange={onChangeFolderName} onBlur={() => renameFolderName(item, folderName, setFolderName)}/>
            </>
            :
                <label>{item.name}</label>
            }            

            <div className="items">
            {item.bookmarks.length > 0 ? 
                item.bookmarks.filter(x => query === "" || x.title.toLowerCase().includes(query)).map(bookmark => (
                    <Bookmark key={bookmark.id} bookmark={bookmark} editMode={editMode} editBookmark={editBookmark} />                
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