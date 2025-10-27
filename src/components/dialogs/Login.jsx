
export default function Login({clickLogin, login}) {
    return (
        <dialog open class="logindialog">
            <form onSubmit={login}>
                    <div className="field">
                        <label htmlFor="title">Username:</label>
                        <input id="username" name="username" />
                    </div>
                    <div className="field">
                        <label htmlFor="url">Password:</label>
                        <input id="password" type="password" name="password" />
                    </div>

                    <div className="buttons">
                        <button className="flat" onClick={clickLogin}>Login</button>
                    </div>
                </form>
        </dialog>
    );
}