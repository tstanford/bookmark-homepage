export default function Bookmark({bookmark}){
    return (
        <a href={bookmark.url} target="_blank">
            <img src={bookmark.favicon}/>
            {bookmark.title}
        </a>
    )
}