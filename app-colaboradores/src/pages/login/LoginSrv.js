import axios from "axios";
class LoginSrv {
    url = "http://localhost:3000/api/login";
    async login(data) {
        console.log(data);
        return await axios.post(this.url, data)
            .catch(err => { throw err; });
    }
}
export default new LoginSrv();