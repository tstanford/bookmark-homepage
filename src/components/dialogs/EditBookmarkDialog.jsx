import { useRef } from "react";

export default function EditBookmark({dialogRef, bookmark, prepopulatedName, prepopulatedUrl, onDismiss, onSubmit, onChange, onDelete, uploadIcon}){
    const imagefile = useRef(null);

    var openImageFileDialog = (ev) => {
        imagefile.current.click();
        ev.preventDefault();

    };

    var uploadImage = (ev) => {
        ev.preventDefault();
        const file = ev.target.files[0];

        const reader = new FileReader();
        reader.onload = (e) => {
            var importData = e.target.result;
            bookmark.favicon = importData;
            uploadIcon(bookmark, importData);
        };

        reader.readAsDataURL(file);
    };

    var clearIcon = (ev) => {
        ev.preventDefault();
        uploadIcon(bookmark, "");
    };
    
    return(

        <dialog ref={dialogRef} className="bookmark">                
                <form onSubmit={onSubmit}>

                    {bookmark != null &&
                    <>
                        <input type='file' id='imagefile' ref={imagefile} onChange={uploadImage} accept=".png,.svg,.jpg,.gif,.ico" style={{ display: 'none' }} />

                        <section>
                            <label>Icon:</label>
                            <div className="icon" style={{"background-image": `url(${bookmark.favicon})`}}/>
                            <div>
                                <button onClick={clearIcon}>Clear</button>
                                <button onClick={openImageFileDialog}>Upload</button>
                            </div>
                        </section>
                        
                        <section>                   
                            <div className="field">
                                <label htmlFor="title">Title:</label>
                                <input id="title" name="title" value={prepopulatedName} onChange={onChange}  />
                            </div>

                            <div className="field">
                                <label htmlFor="url">URL:</label>
                                <input id="url" name="url" value={prepopulatedUrl} onChange={onChange} />
                            </div>

                            <div className="buttons">
                                <button className="flat" onClick={onSubmit}>Apply Changes</button>
                                <button className="flat" onClick={() => onDelete(bookmark.id)}>Delete</button>
                                <button className="flat" onClick={onDismiss}>Cancel</button>                        
                            </div>
                        </section>
                    </>
                    }
                </form>
        </dialog>

    );
}