import React, {useState, useEffect} from 'react';
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import Folder from "./Folder"
import SearchBox from "./SearchBox"
import PageHeading from './pageheading';

export default function App() {
    const [data, setData] = useState({
        items :[],
        isLoaded: false,
        selectedGroup: -1,
        showDialog: false
    });

    const serviceUrl = "http://192.168.0.30:8088";
    //const serviceUrl = "http://localhost:8080";

    const [formData, setFormData] = useState();

    useEffect(() => {
        fetch(serviceUrl+"/bookmarks")
        .then(res => res.json())
        .then(json => {
            for(var folderKey in json) {
                for(var bookmarkKey in json[folderKey].bookmarks){
                    json[folderKey].bookmarks[bookmarkKey].favicon = "data:image/png;base64,"+json[folderKey].bookmarks[bookmarkKey].favicon;
                }
            }
            setData({
                isLoaded: true,
                items: json,
                filteredData: json,
                query: "",
                showDialog: false,
                selectedFolder: null
            })
        });
    }, []);


    const open = (folder) => setData((prev) => ({...prev, showDialog: true, selectedFolder: folder}));
    const close = () => setData((prev) => ({...prev, showDialog: false}));

    const searchOnChange = (event) => {
        setData((prev) => ({
            ...prev,
            query: event.target.value})
            );
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };


    const onSubmit = (event) => {
        event.preventDefault();
        data.selectedFolder.bookmarks.push({
            "url":formData.url,
            "title":formData.title,
            "favicon":null
        });
        
        fetch(serviceUrl+"/bookmarks", {
            method: "POST",
            body: JSON.stringify({
                 title: formData.title,
                 url: formData.url,
                 groupName: data.selectedFolder.name
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });

        close();

    };

    if(!data.isLoaded){
        return (
            <div className="lds-hourglass"></div>
        );
    }

    return(        

        <>

            <PageHeading date={ new Date().toDateString()}></PageHeading>
            <SearchBox onChange={searchOnChange}></SearchBox>

            <article id="folders">
                {data.items
                .filter(x => x.name.toLowerCase().includes(data.query.toLowerCase()))
                .map(x => (

                    <Folder key={x.id} item={x} onAdd={open}/>

                ))}
            </article>

            <div class="center">
                <button class="flat">Add Folder</button>
            </div>

            <Dialog isOpen={data.showDialog} onDismiss={close} className="dialog">
                <h1>{data.selectedFolder != null ? data.selectedFolder.name : "blah"}</h1>
                
                <form onSubmit={onSubmit}>
                    <div class="field">
                        <label for="title">Title:</label>
                        <input id="title" name="title" onChange={handleChange} />
                    </div>
                    <div class="field">
                        <label for="url">URL:</label>
                        <input id="url" name="url" onChange={handleChange} />
                    </div>

                    <div class="buttons">
                        <button class="flat" onClick={close}>Cancel</button>
                        <button class="flat">Ok</button>
                    </div>
                </form>
            </Dialog>
        </>
    );


    /*
    {folder.bookmarks.filter(
            b => query === "" || 
            query.startsWith("g=") ||
            b.title.toLowerCase().includes(query.toLowerCase())
        ).map(bookmark => (
        <a href={bookmark.url}
        target="_blank">
            <img src={bookmark.favicon}/>{bookmark.title}</a>
    ))}
*/

    /*
    render(){
        var {isLoaded, items, query, showDialog, selectedFolder} = this.state;
        var filteredFolders = items.filter(i => query === "" || i.name.startsWith(query));
        if (filteredFolders.length === 0 ) filteredFolders = items
        if(!isLoaded){
            return (
                <div className="lds-hourglass"></div>
            );
        }
        else {
            return (
            <div id="app">
                <SearchBox onChange={this.searchOnChange}/>
                <Dialog isOpen={showDialog} onDismiss={this.close}>
                    <p>{selectedFolder != null && selectedFolder.name}</p>
                    <button onClick={this.close}>
                    Cancel
                    </button>
                    <button onClick={this.addBookmark}>
                    Ok
                    </button>
                </Dialog>   
                
                <article id="folders">
                    {filteredFolders.filter(
                            f => query === "" || 
                            f.bookmarks.filter(b => b.title.toLowerCase().includes(query.toLowerCase())).length > 0 ||
                            (query.startsWith("g=") && query.length > 2 && f.name.toLowerCase().startsWith(query.replace("g=","").toLowerCase()))
                        ).map(folder => (
                        <div className="folder">
                            <label>{folder.name}
                                <button className="addButton" onClick={() => this.open(folder)}>+</button>
                            </label>
                            
                            {folder.bookmarks.filter(
                                    b => query === "" || 
                                    query.startsWith("g=") ||
                                    b.title.toLowerCase().includes(query.toLowerCase())
                                ).map(bookmark => (
                                <a href={bookmark.url}
                                target="_blank">
                                 <img src={bookmark.favicon}/>{bookmark.title}</a>
                            ))}
                        </div>
                    ))}
                </article>
            </div>
            );
        }
    }*/
}