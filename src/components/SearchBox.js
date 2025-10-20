
export default function SearchBox(props) {
    return (
        <input id="query" placeholder="search" autoFocus onChange={props.onChange} onKeyUp={props.onKeyUp}></input>
    );
}