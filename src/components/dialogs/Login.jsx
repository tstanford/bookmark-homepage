
export default function Login({login}) {
    return (
        <dialog open class="logindialog">
            <form>
                    <div className="field">
                        <label htmlFor="title">Username:</label>
                        <input id="username" name="username" />
                    </div>
                    <div className="field">
                        <label htmlFor="url">Password:</label>
                        <input id="password" type="password" name="password" />
                    </div>

                    <div className="buttons">
                        <button className="flat" onClick={() => login(form.username, form.password)}>Login</button>
                    </div>
                </form>
        </dialog>
    );
}