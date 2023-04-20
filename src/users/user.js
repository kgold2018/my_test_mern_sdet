const helper = require("../helper/userGenerator");
const auth = require("../client/auth");

class User {
    constructor(opts = {}) {
        const randomUser = helper.randomUser();
        console.log(randomUser)

        this.email = opts.email || randomUser.email,
        this.firstName = opts.firstName || randomUser.firstName,
        this.lastName = opts.lastName || randomUser.lastName,
         this.password = opts.password || randomUser.password
    }

    async register() {
        const resp = await auth.register( {
            email : this.email,
            firstName : this.firstName,
            lastName: this.lastName,
            password: this.password
        })
        console.log(resp.body)
    }







    // static async createUser(opts = {}) {
    //
    //
    //     const resp = await auth.register({
    //         email : opts.email || randomUser.email,
    //         firstName : firstName || randomUser.firstName,
    //         lastName: lastName || randomUser.lastName,
    //         password: password || randomUser.password
    //     })
    //     console.log(resp.body);
    // }

}
module.exports = {User}