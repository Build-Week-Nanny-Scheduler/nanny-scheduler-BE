module.exports = {
    validateUser
}

function validateUser(user){
    let error = [];

    if(!user.username || user.username.length<2){
        error.push('Please include a username with at least 2 characters')
    }

    if(!user.password || user.password.length<5){
        error.push('Please include a password with at least 5 characters.')
    }

    return{
        isSuccessful: error.length > 0 ? false : true,
        error
    }
};