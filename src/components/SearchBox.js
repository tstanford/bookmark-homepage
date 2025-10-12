
export default function SearchBox(props) {
    return (
        <input id="query" placeholder="search" autoFocus onChange={props.onChange}></input>
    );
}