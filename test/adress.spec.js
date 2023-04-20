const casual = require('casual');
const chai = require('chai');
const chaiSubset =  require('chai-subset')
chai.use(chaiSubset);
const expect =  chai.expect;
const superagent = require('superagent');
const clientAddress = require("../src/client/address")
const clienAuth = require("../src/client/auth")
const {User} = require("../src/users/user");


const baseUrl = "https://mern-ecommerce.sdet.school/api";
//response.body.token = undefined;
describe("Test address endpoints", ()=> {
    let token;
    // m test

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
        let response
        const opts = {
            token, //token : token
            address : addressOpt
        }
        console.log(opts)
        try {
        // response = await superagent.post(baseUrl+"/address/add")
            response = await clientAddress.addAddress(opts)
          // .set({
          //       Authorization: token
          //    })
          //    .send(addressOpt)
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

    it("it should register user" , async()=> {
        const opts = {
            "email": "user1111111@email.com",
            "firstName": "Harold",
            "lastName": "Olseny",
            "password": "Password1"
        }
        let response;
        try {
            response = await clienAuth.register(opts)
        } catch (err){
        console.log(err)
        }
        //console.log(response);
    })
    it.only("should create a User" , async() => {
        //const user = await User.createUser()
        const user = new User();
        await user.register()
        })
       // console.log(user)

    })
