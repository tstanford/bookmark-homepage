
export default function RegisterUser({dialogRef, onDismiss, onSubmit, onChange}){
    return(
        <dialog ref={dialogRef}>

            <h1>Register New User</h1>
                
                <form onSubmit={onSubmit}>
                    <div className="field">
                        <label htmlFor="title">Username:</label>
                        <input id="username" name="title" onChange={onChange}  />
                    </div>

                    <div className="field">
                        <label htmlFor="title">Email Address:</label>
                        <input id="username" type="email" name="title" onChange={onChange}  />
                    </div>

                    <div className="field">
                        <label htmlFor="password">Password:</label>
                        <input id="password" name="password" onChange={onChange} />
                    </div>

                    <div className="buttons">
                        <button className="flat">Ok</button>
                        <button className="flat" onClick={onDismiss}>Cancel</button>                        
                    </div>
                </form>

        </dialog>
    );
}