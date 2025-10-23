

export default function AddNewGroup({dialogRef, onDismiss, onSubmit, onChange}){
    return(

        <dialog ref={dialogRef}>
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
        </dialog>

    );
}