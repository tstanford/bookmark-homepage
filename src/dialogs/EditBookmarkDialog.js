import "@reach/dialog/styles.css";
import { Dialog } from "@reach/dialog";

export default function EditBookmark({folder, prepopulatedUrl, isOpen, onDismiss, onSubmit, onChange}){
    return(
        <Dialog isOpen={isOpen} onDismiss={onDismiss} className="dialog">
                
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
        </Dialog>
    );
}