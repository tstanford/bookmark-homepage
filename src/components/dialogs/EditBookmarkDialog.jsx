export default function EditBookmark({dialogRef, bookmark, prepopulatedName, prepopulatedUrl, onDismiss, onSubmit, onChange, onDelete}){
    return(

        <dialog ref={dialogRef} class="bookmark">                
                <form onSubmit={onSubmit}>

                    {bookmark != null &&

                    <>

                    <section>
                        <label>Icon:</label>
                        <div className="icon" style={{"background-image": `url(${bookmark.favicon})`}}/>
                        <div>
                            <button>Clear</button>
                            <button>Upload</button>
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