const User = require("../server/user/userModel")
const bcrypt = require("bcrypt")
const saltround = 10

adminseeder = () => {

    User.findOne({email:"admin@cyphertaskinnovate.com"})
    .then(userdata=>{
        if(!userdata){
            let userObj = new User()
            userObj.name = "admin"
            userObj.email = "admin@cyphertaskinnovate.com"
            userObj.password = bcrypt.hashSync("shreya2020",saltround)
            userObj.userType = 1
            userObj.save()
            console.log("Admin Seeded")
        }
        else{
            console.log("Admin already exists")
        }
    })
    .catch(err=>{
        console.log(err.message)
    })
}

module.exports = {
    adminseeder
}