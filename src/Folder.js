import Bookmark from "./Bookmark";

export default function Folder({item, onAdd}){
    return(
        <div className="folder">
            <label>{item.name}
                <button className="addButton" onClick={()=>{onAdd(item)}}>+</button>
            </label>
            
            {item.bookmarks.map(bookmark => (
                <Bookmark key={bookmark.id} bookmark={bookmark}/>                
            ))}
        </div>
    );
}