import "@reach/dialog/styles.css";
import { Dialog } from "@reach/dialog";

export default function AddNewGroup({isOpen, onDismiss, onSubmit, onChange}){
    return(
        <Dialog isOpen={isOpen} onDismiss={onDismiss} className="dialog">
            <h1>Create new Group</h1>
            
            <form onSubmit={onSubmit}>
                <div className="field">
                    <label htmlFor="name">Name:</label>
                    <input id="title" name="name" onChange={onChange} />
                </div>
                

                <div className="buttons">
                    <button className="flat">Ok</button>
                    <button className="flat" onClick={onDismiss}>Cancel</button>                        
                </div>
            </form>
        </Dialog>
    );
}