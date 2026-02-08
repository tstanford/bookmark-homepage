class UserController{
    token = null;
    #SERVICE_URL = "";   
    isAdminVar = false; 
    tokenExistedInStorage = false;
    retryCount = 5;

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

        if(response.status != 200) {
            //try refresh token
            let refreshToken = localStorage.getItem('refreshToken');

            var refreshResponse = await fetch(this.#SERVICE_URL + "/refresh", {
                method: "POST",
                body: refreshToken
            });

            if(refreshResponse.status == 200) {
                let jsonResponse = await refreshResponse.json();
                localStorage.setItem('token', jsonResponse.authToken);
                localStorage.setItem('refreshToken', jsonResponse.refreshToken);
                this.token = this.result.authToken;
                this.retryCount++;
                if(this.retryCount < 5) {
                    return await this.isAdmin();
                } else {
                    throw "retry period exceeded";
                }
            }
        }

        var body = await response.text();
        return body == "true";
    }

    getEmail = async () => {
        var response = await fetch(this.#SERVICE_URL + "/getemail", {
            method: "GET",
            headers: {
                'Authorization': "Bearer "+this.token                    
            }
        });
        var body = await response.text();

        return body;
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

    editUser = async (userId, email, password) => {
        var response = await fetch(this.#SERVICE_URL + "/admin/user/"+userId, {
            method: "PUT",
            headers: {
                'Authorization': "Bearer "+this.token,           
                'Content-Type': "application/json",
            },
            body: JSON.stringify({emailAddress:email, password:password}),
        });
        var body = await response.text();
        return body;
    };

    deleteUser = async (userId) => {
        var response = await fetch(this.#SERVICE_URL + "/admin/user/"+userId, {
            method: "DELETE",
            headers: {
                'Authorization': "Bearer "+this.token,           
                'Content-Type': "application/json",
            }            
        });
        return response.status == 204;
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
            let result = await loginResponse.json();
            localStorage.setItem('token', result.authToken);
            localStorage.setItem('refreshToken', result.refreshToken);
            this.token = result.authToken;
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