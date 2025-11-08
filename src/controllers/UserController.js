class UserController{
    token = null;
    #SERVICE_URL = "";   
    isAdminVar = false; 
    tokenExistedInStorage = false;

    constructor() {
        this.#SERVICE_URL = window.env.BMS_SERVICE_URL;
        this.name = "UserController";
        this.token = localStorage.getItem('token');
        this.tokenExistedInStorage = localStorage.getItem('token') != null;
        this.isAdminVar = false;
    }

    isAdmin = async () => {
        var response = await fetch(this.#SERVICE_URL + "/amiadmin", {
            method: "GET",
            headers: {
                'Authorization': "Bearer "+this.token                    
            }
        });
        var body = await response.text();

        return body == "true";
    }

    register = async (username, email, password) => {
        var response = await fetch(this.#SERVICE_URL + "/admin/user", {
            method: "POST",
            headers: {
                'Authorization': "Bearer "+this.token,           
                'Content-Type': "application/json",
            },
            body: JSON.stringify({username:username, emailAddress:email, password:password}),
        });
        var body = await response.text();
        return body;
    };

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
            localStorage.setItem('token', null);
            localStorage.setItem("isAdminVar", false);
            failureAction();
        } else {
            this.token = await loginResponse.text();
            localStorage.setItem('token', this.token);
            successAction(this.token, await this.isAdmin());            
        }
    };

    logout = () => {
        this.token = null
        this.tokenExistedInStorage = false;
        this.isAdminVar = false;
        localStorage.clear();
    };
}

export {UserController}