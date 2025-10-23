export default function Bookmark({bookmark, editMode, editBookmark, deleteBookmark}){
    const dragstartHandler = (ev) => {
        ev.dataTransfer.setData("bookmark", bookmark.id);
    };

    return (
        <>
        <div className="bookmarkicon">
            {editMode &&
            <button onClick={() => deleteBookmark(bookmark.id)} className="deletebookmark">
                <span className="material-symbols-outlined">delete</span>
            </button>
            }
            <a
            href={bookmark.url}
            onDragStart={dragstartHandler}
            draggable={editMode}
            target="_blank" 
            onClick={(e) => editBookmark(bookmark,e)}
            key={bookmark.key}
            rel="noreferrer">
                <img src={bookmark.favicon} alt="{bookmark.title} icon" draggable={editMode}/>
                {bookmark.title}
            </a>
        </div>
        </>
    )
}