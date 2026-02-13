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
        this.setLoginStatus = ()=>{};
    }

    setLoginStatusFunc = (func) => {
        this.setLoginStatus = func;        
    };

    isAdmin = async () => {
        var response = await fetch(this.#SERVICE_URL + "/amiadmin", {
            method: "GET",
            headers: {
                'Authorization': "Bearer "+this.token                    
            }
        });

        if(response.status == 401) {
            //try refresh token
            let refreshToken = localStorage.getItem('refreshToken');
            console.log("Attemping to refresh token");

            var refreshResponse = await fetch(this.#SERVICE_URL + "/refresh", {
                method: "POST",
                body: refreshToken
            });

            if(refreshResponse.status == 200) {
                console.log("refreshed!");
                let jsonResponse = await refreshResponse.json();
                localStorage.setItem('token', jsonResponse.authToken);
                localStorage.setItem('refreshToken', jsonResponse.refreshToken);
                this.token = jsonResponse.authToken;
                this.refreshToken = jsonResponse.refreshToken;
            } else {
                this.retryCount++;
                if(this.retryCount < 5) {
                    return await this.isAdmin();
                } else {
                    this.setLoginStatus((prev) => ({...prev, refreshTokenExpired: true, isChecked: true}));
                    console.log("refresh token expired. need to login again");
                    throw "retry period exceeded";
                }
            }
        }

        this.retryCount = 0;

        var body = await response.text();

        this.setLoginStatus((prev) => ({...prev, 
            isAdmin:body == "true", 
            isChecked:true, 
            isLoggedIn:true
        }));

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