export default function Bookmark({bookmark}){
    return (
        <a href={bookmark.url} target="_blank" rel="noreferrer">
            <img src={bookmark.favicon} alt="{bookmark.title} icon"/>
            {bookmark.title}
        </a>
    )
}