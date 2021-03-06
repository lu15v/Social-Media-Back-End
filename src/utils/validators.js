module.exports.validateRegisterInput = (
    username,
    email,
    password,
    confirmPassword,
    avatar
) => {
    const errors = {};

    if(!username.trim()) errors.username = "Username cannot be empty";

    if(!email.trim()){ 
        errors.email = "Email cannot be empty";
    }{
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if(!email.match(regEx)) errors.email = "Invalid email format"
    }
    if(!password) {
        errors.password = "Password cannot be empty";
    }else{
        if(confirmPassword !== password) errors.confirmPassword = "Password does not match";
    }

    if(!avatar.trim()) errors.avatar = "You must choose an avatar";

    return{
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports.validateLoginInput = (username, password) => {
    const errors = {};

    if(!username.trim()) errors.username = "Username cannot be empty";
    if(!password) errors.password = "Password cannot be empty";

    return{
        errors,
        valid: Object.keys(errors).length < 1
    }
}