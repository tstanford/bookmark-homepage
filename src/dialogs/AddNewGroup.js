import { Dialog } from "@reach/dialog";

export default function Folder({item, onAdd}){
    return(
        <Dialog isOpen={data.showDialogAddGroup} onDismiss={closeAddGroupDialog} className="dialog">
            <h1>Create new Group</h1>
            
            <form onSubmit={onSubmitGroup}>
                <div class="field">
                    <label for="name">Name:</label>
                    <input id="title" name="name" onChange={handleChange} />
                </div>
                

                <div class="buttons">
                    <button class="flat">Ok</button>
                    <button class="flat" onClick={closeAddGroupDialog}>Cancel</button>                        
                </div>
            </form>
        </Dialog>
    );
}