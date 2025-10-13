import "@reach/dialog/styles.css";
import { Dialog } from "@reach/dialog";

export default function AddNewBookmark({folder, isOpen, onDismiss, onSubmit, onChange}){
    return(
        <Dialog isOpen={isOpen} onDismiss={onDismiss} className="dialog">
            <h1>{folder != null ? folder.name : ""}</h1>
                
                <form onSubmit={onSubmit}>
                    <div class="field">
                        <label for="title">Title:</label>
                        <input id="title" name="title" onChange={onChange} />
                    </div>
                    <div class="field">
                        <label for="url">URL:</label>
                        <input id="url" name="url" onChange={onChange} />
                    </div>

                    <div class="buttons">
                        <button class="flat">Ok</button>
                        <button class="flat" onClick={onDismiss}>Cancel</button>                        
                    </div>
                </form>
        </Dialog>
    );
}