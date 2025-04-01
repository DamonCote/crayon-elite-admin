import RestApi from "@/helpers/RestApi";
import md5 from "blueimp-md5";

class AuthenticationApi extends RestApi {
    constructor(endpoint = "/authentication") {
        super(endpoint);
    }

    login(username, password) {
        const md5Password = md5(password);
        return this.extendPost("login", { username, password: md5Password });
    }

    logout() {
        return this.extendPost("logout");
    }
}

export { AuthenticationApi };
