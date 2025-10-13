import Bookmark from "./Bookmark";

export default function Folder({item, onAdd, onBookmarkDrop}){

    const folderDragoverHandler = (ev) => {
        ev.preventDefault();
    };

    const folderDropHandler = (ev) =>{
        ev.preventDefault();
        const bookmarkId = ev.dataTransfer.getData("bookmark");
        const folderName = item.name;
        onBookmarkDrop(bookmarkId, folderName);
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