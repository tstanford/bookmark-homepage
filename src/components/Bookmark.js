export default function Bookmark({bookmark}){
    const dragstartHandler = (ev) => {
        ev.dataTransfer.setData("bookmark", bookmark.id);
    };

    return (
        <a
        href={bookmark.url}
        onDragStart={dragstartHandler}
        draggable="true" 
        target="_blank" 
        key={bookmark.key}
        rel="noreferrer">
            <img src={bookmark.favicon} alt="{bookmark.title} icon"/>
            {bookmark.title}
        </a>
    )
}