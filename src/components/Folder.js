import Bookmark from "./Bookmark";

export default function Folder({item, onAdd, onBookmarkDrop, onURIDrop}){

    const folderDragoverHandler = (ev) => {
        ev.preventDefault();
    };

    const folderDropHandler = (ev) =>{
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

    return(
        <div className="folder" onDrop={folderDropHandler} onDragOver={folderDragoverHandler}>
            <label>{item.name}
                <button className="addButton" onClick={()=>{onAdd(item)}}>+</button>
            </label>
            <div className="items">
            {item.bookmarks.map(bookmark => (
                <Bookmark key={bookmark.id} bookmark={bookmark} />                
            ))}
            </div>
        </div>
    );
}