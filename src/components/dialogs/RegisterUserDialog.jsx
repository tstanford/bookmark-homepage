
export default function RegisterUser({form, dialogRef, onDismiss, onSubmit, onChange}){
    return(
        <dialog ref={dialogRef}>

            <h1>Register New User</h1>
                
                <form onSubmit={onSubmit}>
                    <div className="field">
                        <label htmlFor="username">Username:</label>
                        <input id="username" value={form.username} placeholder="Joe" name="username" onChange={onChange}  />
                    </div>

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