import "@reach/dialog/styles.css";
import { Dialog } from "@reach/dialog";

export default function AddNewGroup({isOpen, onDismiss, onSubmit, onChange}){
    return(
        <Dialog isOpen={isOpen} onDismiss={onDismiss} className="dialog">
            <h1>Create new Group</h1>
            
            <form onSubmit={onSubmit}>
                <div class="field">
                    <label for="name">Name:</label>
                    <input id="title" name="name" onChange={onChange} />
                </div>
                

                <div class="buttons">
                    <button class="flat">Ok</button>
                    <button class="flat" onClick={onDismiss}>Cancel</button>                        
                </div>
            </form>
        </Dialog>
    );
}