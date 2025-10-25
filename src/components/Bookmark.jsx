export default function Bookmark({bookmark, editMode, editBookmark}){
    const dragstartHandler = (ev) => {
        ev.dataTransfer.setData("bookmark", bookmark.id);
    };

    return (
        <>
        <div className="bookmarkicon">
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