
export default function AddNewBookmark({folder, prepopulatedUrl, dialogRef, onDismiss, onSubmit, onChange}){
    return(
        <dialog ref={dialogRef}>

            <h1>{folder != null ? folder.name : ""}</h1>
                
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
                        <button className="flat">Ok</button>
                        <button className="flat" onClick={onDismiss}>Cancel</button>                        
                    </div>
                </form>

        </dialog>
    );
}