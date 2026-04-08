class BookmarksController{
    token = null;
    #SERVICE_URL = "";   
    isAdminVar = false; 
    tokenExistedInStorage = false;

    #getExecutionContext = () => {
        return {
            onFailFunc: {},
            target: () => {},
            execute: () => {this.target(this)},
            onFail: (func) => {this.onFailFunc = func; return this.#getExecutionContext;},
            onComplete: (func) => {this.onCompleteFunc = func; this.#getExecutionContext;},
        };
    };

    constructor() {
        this.#SERVICE_URL = window.env.BMS_SERVICE_URL;
        this.token = localStorage.getItem('token');
    }

    #funcGetBookmarks = (context) => {
        fetch(this.#SERVICE_URL + "/bookmarks", 
            {headers: {'Authorization': "Bearer "+this.token}}
        )
        .then(res => {
            if(res.status == 401 || res.status == 403) {
                context.onFailFunc();
            }
            return res.json()
        })
        .then(json => {
            context.onCompleteFunc(json);
        });
    };

    getBookmarks = () => {
        var context = this.#getExecutionContext();
        context.target = this.#funcGetBookmarks;
        return context;
    };


    
}

export {BookmarksController}