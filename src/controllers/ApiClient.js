class ApiClient{
    token = null;
    refreshToken = null;
    #SERVICE_URL = "";
    loggedIn = true;

    constructor() {
        this.#SERVICE_URL = window.env.BMS_SERVICE_URL;
        this.token = localStorage.getItem('token');
        this.refreshToken = localStorage.getItem('refreshToken');
        this.loggedIn = this.token != null;
    }

    #makeCall = async (endpoint, method, payload) => {
        var params = {
            method: method,
            headers: {
                'Authorization': "Bearer "+this.token
            },
        };

        if (method == 'POST' || method == 'PUT' || method == 'PATCH') {
            params.headers['Content-Type'] = "application/json";
            params.body = JSON.stringify(payload);
        }

        var response = await fetch(this.#SERVICE_URL + endpoint, params);

        if(response.status == 401) {
            console.log("Attemping to refresh token");

            var refreshResponse = await fetch(this.#SERVICE_URL + "/refresh", {
                method: "POST",
                body: this.refreshToken
            });

            if(refreshResponse.status == 200) {
                console.log("refreshed!");
                let jsonResponse = await refreshResponse.json();
                localStorage.setItem('token', jsonResponse.authToken);
                localStorage.setItem('refreshToken', jsonResponse.refreshToken);
                this.token = jsonResponse.authToken;
                this.refreshToken = jsonResponse.refreshToken;
                this.loggedIn = true;

                return this.#makeCall(endpoint, method, payload);
            }

            throw("Could not refresh token");
        }

        var body = await response.text();
        return body;
    };

    post = async (endpoint, payload) => {
        return this.#makeCall(endpoint, 'POST', payload);      
    };

    get = async (endpoint) => {
        return this.#makeCall(endpoint, 'GET', null);      
    };

}

export const apiClient = new ApiClient();