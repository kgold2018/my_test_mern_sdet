const baseUrl = "https://mern-ecommerce.sdet.school/api";
const superagent = require('superagent');
//response.body.token = undefined;
describe("Test address endpoints" , ()=> {
    let token;
    beforeEach(async () => {
        //login as Olsen Y
        const reqBody = {
            email: "Olsen.Y@gmail.com",
            password: "Password1"
        }
        try {
            const response = await superagent.post(baseUrl+"/auth/login").send(reqBody)
            token = response.body.token
        } catch (error) {
            console.log("catch?")
            console.error(error.message);
        }
    })

    it("should run test", () =>{
        console.log(token);

    })
})