const User = require("./userModel");
const Employee = require("../employee/employeeModel");
const bcrypt = require("bcrypt")
const roundvalue = 10
const jwt = require("jsonwebtoken")
const privatekey = "^MyProject@123"
const register = (req, res) => {
    const validationErrors = [];

    if (!req.body.name)
        validationErrors.push("Name is required");
    if (!req.body.email)
        validationErrors.push("Email is required");
    if (!req.body.password)
        validationErrors.push("Password is required");
    if (!req.body.department)
        validationErrors.push("Department is required");
    if (!req.body.designation)
        validationErrors.push("Designation is required");

    if (validationErrors.length > 0) {
        res.json({
            status: 422,
            success: false,
            message: "Validation error",
            errors: validationErrors
        });
    } else {
        User.findOne({ email: req.body.email })
            .then(userData => {
                if (!userData) {
                    let userObj = new User()
                    userObj.name = req.body.name
                    userObj.email = req.body.email
                    userObj.password = bcrypt.hashSync(req.body.password, roundvalue)
                    userObj.userType = 2
                    userObj.save()
                    
                        .then(userSaveRes => {
                            let employeeObj = new Employee()
                            employeeObj.name = req.body.name
                            employeeObj.email = req.body.email
                            employeeObj.password = req.body.password
                            employeeObj.department = req.body.department
                            employeeObj.designation = req.body.designation
                            employeeObj.userId = userSaveRes._id
                            employeeObj.save()
                                .then(employeeSaveRes => {
                                    res.json({
                                        status: 200,
                                        success: true,
                                        message: "Employee registered successfully",
                                        data: employeeSaveRes
                                    });
                                })
                                .catch(err => {
                                    res.json({
                                        status: 500,
                                        success: false,
                                        message: "Internal server error while creating employee",
                                        errors: err.message
                                    });
                                });
                        })
                        .catch(err => {
                            res.json({
                                status: 500,
                                success: false,
                                message: "Internal server error while creating user",
                                errors: err.message
                            });
                        });
                } else {
                    res.json({
                        status: 422,
                        success: false,
                        message: "Email already registered"
                    });
                }
            })
            .catch(err => {
                res.json({
                    status: 500,
                    success: false,
                    message: "Internal server error",
                    errors: err.message
                });
            });
    }
};

const getallemployee = async (req, res) => {
    try {
        const totalcount = await Employee.find(req.body).countDocuments().exec();
        const employeeData = await Employee.find(req.body).populate("userId");
        res.json({
            status: 200,
            success: true,
            message: "Data Loaded",
            total: totalcount,
            data: employeeData
        });
    } catch (err) {
        res.json({
            status: 500,
            success: false,
            message: "Internal Server Error",
            errors: err.message
        });
    }
};
getsingle = (req, res) => {
    validationerrors = []

    if (!req.body._id)
        validationerrors.push("_id is required")

    if (validationerrors.length > 0) {
        res.json({
            status: 422,
            success: false,
            message: "Validation error",
            errors: validationerrors
        })
    } else {
        //existance of record
        Employee.findOne({ _id: req.body._id })
            .populate("userId")
            .then(userData => {
                if (!userData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "Record not found"
                    })
                }
                else {
                    res.json({
                        status: 200,
                        success: true,
                        message: "Data loaded",
                        data: userData
                    })
                }
            })
            .catch(err => {
                res.json({
                    status: 500,
                    success: false,
                    message: "Internal Server Error",
                    errors: err.message
                })
            })
    }
}

deletedata = (req, res) => {
    validationerrors = []

    if (!req.body._id)
        validationerrors.push("_id is required")

    if (validationerrors.length > 0) {
        res.json({
            status: 422,
            success: false,
            message: "Validation error",
            errors: validationerrors
        })
    } else {
        //existance of record
        Employee.findOne({ _id: req.body._id })
            .then(employeeData => {
                if (!employeeData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "Record not found"
                    })
                }
                else {
                    //delete 
                    Employee.deleteOne({ _id: req.body._id })
                        .then(() => {

                            res.json({
                                status: 200,
                                success: true,
                                message: "Record Deleted"
                            })
                        })
                        .catch(err => {
                            res.json({
                                status: 500,
                                success: false,
                                message: "Unable to delete record",
                                errors: err.message
                            })
                        })
                }
            })
            .catch(err => {
                res.json({
                    status: 500,
                    success: false,
                    message: "Internal Server Error",
                    errors: err.message
                })
            })
    }
}
updatedata = (req, res) => {
    validationerrors = []

    if (!req.body._id)
        validationerrors.push("_id is required")

    if (validationerrors.length > 0) {
        res.json({
            status: 422,
            success: false,
            message: "Validation error",
            errors: validationerrors
        })
    } else {
        //existance of record
        Employee.findOne({ _id: req.body._id })
            .then(employeeData => {
                if (!employeeData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "Record not found"
                    })
                }
                else {
                    //update

                    if (req.body.name)
                        employeeData.name = req.body.name
                    if (req.body.email)
                        employeeData.email = req.body.email
                    
                    if (req.body.department)
                        employeeData.department = req.body.department
                    if (req.body.designation)
                        employeeData.designation = req.body.designation

                    employeeData.save()
                        .then(saveRes => {

                            User.findOne({ _id: employeeData.userId })
                                .then(userData => {
                                    if (!userData) {
                                        res.json({
                                            status: 404,
                                            success: false,
                                            message: "record not found"
                                        })
                                    }
                                    else {
                                        //update
                                        if (req.body.name)
                                            userData.name = req.body.name
                                        if (req.body.email)
                                            userData.email = req.body.email
                                        if (req.body.password)
                                            userData.password = req.body.password
                                        userData.save()
                                            .then(tres => {
                                                res.json({
                                                    status: 200,
                                                    success: true,
                                                    message: "record updated",
                                                    data: tres
                                                })
                                            }).catch(err => {
                                                res.json({
                                                    status: 500,
                                                    success: false,
                                                    message: "Internal Server error",
                                                    errors: err.message
                                                })
                                            })
                                    }
                                })

                        })

                }
            })
            .catch(err => {
                res.json({
                    status: 500,
                    success: false,
                    message: "Internal Server Error",
                    errors: err.message
                })
            })
    }
}
softdelete = (req, res) => {
    validationerrors = []

    if (!req.body._id)
        validationerrors.push("_id is required")

    if (validationerrors.length > 0) {
        res.json({
            status: 422,
            success: false,
            message: "Validation error",
            errors: validationerrors
        })
    } else {
        //existance of record
        Employee.findOne({ _id: req.body._id })
            .then(employeeData => {
                if (!employeeData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "Record not found"
                    })
                }
                else {
                    //update

                    if (req.body.status)
                        employeeData.status = req.body.status
                   

                    employeeData.save()
                        .then(saveRes => {

                            User.findOne({ _id: employeeData.userId })
                                .then(userData => {
                                    if (!userData) {
                                        res.json({
                                            status: 404,
                                            success: false,
                                            message: "record not found"
                                        })
                                    }
                                    else {
                                        //update
                                        if (req.body.status)
                                            userData.status = req.body.status
                                        
                                        userData.save()
                                            .then(tres => {
                                                res.json({
                                                    status: 200,
                                                    success: true,
                                                    message: "record soft deleted successfully",
                                                    data: tres
                                                })
                                            }).catch(err => {
                                                res.json({
                                                    status: 500,
                                                    success: false,
                                                    message: "Internal Server error",
                                                    errors: err.message
                                                })
                                            })
                                    }
                                })

                        })

                }
            })
            .catch(err => {
                res.json({
                    status: 500,
                    success: false,
                    message: "Internal Server Error",
                    errors: err.message
                })
            })
    }
}
login =(req,res)=>{
    validationerrors = []

    if (!req.body.email)
        validationerrors.push("Email is required")
    if (!req.body.password)
        validationerrors.push("Password is required")

    if (validationerrors.length > 0) {
        res.json({
            status: 422,
            success: false,
            message: "Validation Errors",
            errors: validationerrors
        })
    }else{
        User.findOne({email:req.body.email})
        .then(userData => {
            //data empty
            if (!userData) {
                res.json({
                    status: 404,
                    success: false,
                    message: "Email doesn`t  exists"
                })
            }else{
                //password compare
                bcrypt.compare(req.body.password,userData.password,function(err,result){
                    if(result)
                    {
                        var payload = {
                            name : userData.name,
                            email : userData.email,
                            userId : userData._id,
                            userType : userData.userType
                        }
                         var token = jwt.sign(payload,privatekey)

                        res.json({
                            status:200,
                            success:true,
                            message : "login Successfully",
                            token : token,
                            data : userData
                        })
                    }else{
                        res.json({
                            status : 422,
                            success:false,
                            message  : "Invalid password"
                        })
                    }
                })
            }
        }).catch(err => {
            res.json({
                status: 500,
                success: false,
                message: "Internal Server Error",
                errors: err.message
            })
        })
}
}

                
        

module.exports = {
    register,
    getallemployee,
    getsingle,
    deletedata,
    updatedata,
    softdelete,
    login
};
