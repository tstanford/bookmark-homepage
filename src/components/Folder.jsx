import Bookmark from "./Bookmark";
import React, { useState, useRef } from 'react';

export default function Folder({item, onAdd, onBookmarkDrop, onURIDrop, onDelete, query, editMode, editBookmark, renameFolderName, onFolderDrop}){

    const folderRef = useRef(null);

    const folderDragstartHandler = (ev) => {
        ev.stopPropagation();
        ev.dataTransfer.setData("groupid", item.id);
        ev.dataTransfer.effectAllowed = "move";
    };

    const folderDragEnterHandler = (ev) => {
        ev.stopPropagation();
        ev.preventDefault();
        if(editMode){
            folderRef.current.setAttribute('draggable', false);
        }
    };

    const folderDragoverHandler = (ev) => {
        ev.stopPropagation();
        ev.preventDefault();
        if(editMode){
            setBeingDraggedOver(true);
        }
    };

    const folderDragoutHander = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        if(editMode){
            setBeingDraggedOver(false);
        }
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
            let sourceGroupId = parseInt(item.id);
            let targetGroupId = parseInt(groupid);
            if(sourceGroupId != targetGroupId) {
                onFolderDrop(sourceGroupId, targetGroupId);
            }
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

    var draggerMouseDown = () => {
        folderRef.current.setAttribute('draggable', true);
        folderRef.current.dispatchEvent(new DragEvent('dragstart', {
            bubbles: true,
            cancelable: true,
            dataTransfer: new DataTransfer()
        }));
    };

    return(
        <>
        {(editMode || item.bookmarks.filter(x => x.title.toLowerCase().includes(query)).length > 0) &&
        <section 
        ref={folderRef}
        className={beingDraggedOver ? 'folder dragover' : 'folder'} 
        onDrop={folderDropHandler} 
        onDragOver={folderDragoverHandler} 
        onDragStart={folderDragstartHandler} 
        onDragLeave={folderDragoutHander} 
        onDragEnd={folderDragEnterHandler}
        >

            <div className="foldertitlebar">
            {editMode ?
            <>
                <div className="dragger" onMouseDown={draggerMouseDown}><span className="material-symbols-outlined">reorder</span></div>
                <input className="titleTextBox" draggable={false} value={folderName} onChange={onChangeFolderName} onBlur={() => renameFolderName(item, folderName, setFolderName)}/>
                <button className="addButton" title="Add a new bookmark to this folder" onClick={()=>{onAdd(item,"")}}> <span className="material-symbols-outlined">bookmark_add</span> </button>
            </>
            :
            <>
                <div></div>
                <label>{item.name}</label>
                <div></div>
            </>
            }   
            </div>         

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