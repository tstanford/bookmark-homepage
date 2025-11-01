class UserController{
    token = null;
    #SERVICE_URL = "";    

    constructor() {
        this.#SERVICE_URL = window.env.BMS_SERVICE_URL;
        this.name = "UserController";
        this.token = null;//localStorage.getItem('token');
    }

    isAdmin = async () => {
        var response = await fetch(this.#SERVICE_URL + "/amiadmin", {
            method: "GET",
            headers: {
                'Authorization': "Bearer "+this.token                    
            }
        });
        console.log(response.status);

        var body = await response.text();

        console.log(body);

        return body == "true";
    }

    login = async (username, password, successAction, failureAction) => {
        var loginResponse = await fetch(this.#SERVICE_URL + "/login", {
                method: "POST",
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            });            

        if(loginResponse.status!=200) {
            failureAction();
        } else {
            this.token = await loginResponse.text();
            localStorage.setItem('token', this.token);
            successAction(this.token, await this.isAdmin());
            
        }
    };

    logout = () => {
        this.token = null
        localStorage.clear();
    };
}

export {UserController}