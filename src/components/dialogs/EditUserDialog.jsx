
export default function EditUser({form, dialogRef, onDismiss, onSubmit, onChange}){
    return(
        <dialog ref={dialogRef}>

            <h1>{form.userId} - {form.username}</h1>
                
                <form onSubmit={onSubmit}>
                    <input id="userId" type="hidden" value={form.userId} name="userId" />

                    <div className="field">
                        <label htmlFor="title">Email Address:</label>
                        <input id="email" type="email" placeholder="somebody@company.com" value={form.email} name="email" onChange={onChange}  />
                    </div>

                    <div className="field">
                        <label htmlFor="password">Password:</label>
                        <input id="password" value={form.password} placeholder="password" type="text" name="password" onChange={onChange} />
                    </div>

                    <div className="buttons">
                        <button className="flat">Ok</button>
                        <button className="flat" onClick={onDismiss}>Cancel</button>                        
                    </div>
                </form>

        </dialog>
    );
}