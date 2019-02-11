const jwt = require('jsonwebtoken');
function checkToken (a){
    return jwt.verify(a, 'my_token', (error, decoded) => {
            if (error) {
                return 0;
            }
            return decoded;
        })
}

module.exports = checkToken;