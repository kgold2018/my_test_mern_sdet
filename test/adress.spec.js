const casual = require('casual');
const chai = require('chai');
const chaiSubset =  require('chai-subset')
chai.use(chaiSubset);
const expect =  chai.expect;
const superagent = require('superagent');


const baseUrl = "https://mern-ecommerce.sdet.school/api";
//response.body.token = undefined;
describe("Test address endpoints", ()=> {
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

    it("it should add address to user", async () =>{
       // console.log(token);
        const {street,city, state } = casual;
        const zip =casual.zip(5);
          const addressOpt = {
            isDefault : true,
            address: street,
            city: city,
            state: state,
            country: "USA",
            zipCode: zip,
        }
        let response;
        try {
         response = await superagent.post(baseUrl+"/address/add")
          .set({
                Authorization: token
             })
             .send(addressOpt)
        } catch (err){
            console.log(err.message)
        }
       // console.log(response.body)
       expect(response.body).to.containSubset({
           success: true,
           message: 'Address has been added successfully!',
           address: {
               isDefault: true,
               address: street,
               city: city,
               state: state,
               country: 'USA',
               zipCode: zip,
               user: '643d898760bf530035bb759a',
               __v: 0
           }
       })
    });
});