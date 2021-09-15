const table = process.env.USERS_TABLE;
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

/**
 * Reset password 
 * @param {*} req - body.email, body.token, body.password1, body.password2
 * @param {*} res
 */
const resetPassword = async (req, res) => {
    // reset password
    try {   
        // compare the two passwords - error if don't match
        if (req.body.password1 !== req.body.password2) {
            throw new Error("Passwords do not match")
        }
        // check pw validity
        if (!validatePassword(req.body.password1)) {
            throw new Error("Password should have 8+ characters with one lowercase, uppercase, and number")
        }
        // find the token entry in DynamoDB - returns error if no token or expired
        // if successful, update token to used = 1
        await User.usePasswordToken({ 'token': req.body.token, 'email': req.body.email })
        
        // generate hash for new password for User
        let password = hashPassword(req.body.password1);
     
        // prepare params to update User with new password item
        const params = {
            TableName: table,
            Key: { 
                email: req.body.email
            },
            UpdateExpression: "set password=:v",
            ExpressionAttributeValues: { ":v": password },
        };

        // use DynamoDB.DocumentClient to update 
        await dynamodb.update(params).promise();
      
        res.status(200).json({ "message": "Password Reset Successful" })
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}