export default function EditBookmark({dialogRef, folder, prepopulatedUrl, onDismiss, onSubmit, onChange}){
    return(

        <dialog ref={dialogRef}>
                
                <form onSubmit={onSubmit}>
                    <div className="field">
                        <label htmlFor="title">Title:</label>
                        <input id="title" name="title" onChange={onChange}  />
                    </div>
                    <div className="field">
                        <label htmlFor="url">URL:</label>
                        <input id="url" name="url" value={prepopulatedUrl} onChange={onChange} />
                    </div>

                    <div className="buttons">
                        <button className="flat">Apply Changes</button>
                        <button className="flat">Delete</button>
                        <button className="flat" onClick={onDismiss}>Cancel</button>                        
                    </div>
                </form>
        </dialog>

    );
}