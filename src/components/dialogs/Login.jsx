
import { useState } from 'react';

export default function Login({onSubmit, isShaking}) {

    const [form, setForm] = useState({
        username:"",
        password:""
        });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    return (

        <dialog open class={isShaking?"logindialog error":"logindialog"}>
            <div class="logo"></div>
                <form>
                    <div className="field">
                        <label htmlFor="title">Username:</label>
                        <input id="username" name="username" onChange={handleChange} />
                    </div>
                    <div className="field">
                        <label htmlFor="url">Password:</label>
                        <input id="password" type="password" name="password" onChange={handleChange} />
                    </div>

                    <div className="buttons">
                        <button className="flat" onClick={(e) => onSubmit(e, form.username, form.password)}>Login</button>
                    </div>
                </form>
        </dialog>

    );
}