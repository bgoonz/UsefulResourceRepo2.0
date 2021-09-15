const table = process.env.USERS_TABLE;
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

/**
 * Update password 
 * @param {*} req - body.email, body.currentPassword, body.password1, body.password2
 * @param {*} res
 */
const updatePassword = async (req, res) => {
    try {
        let user = await User.getByEmail(req.body.email);

        // User not found
        if (!user) throw new Error("User with provided email not found. Could not reset password.")

        // Validate current password
        if (!req.body.currentPassword || !comparePassword(req.body.currentPassword, user.password)) {
            throw new Error("Current Password Incorrect. Could not update password.")
        }

        // compare the two new passwords - error if don't match
        if (req.body.password1 !== req.body.password2) {
            throw new Error("New passwords do not match. Could not update password.")
        }
        // check pw validity
        if (!validatePassword(req.body.password1)) {
            throw new Error("Password should have 8+ characters with one lowercase, uppercase, and number")
        }

        // set new password for User
        let password = hashPassword(req.body.password1);
     
        // prepare params to update User with new password_reset_tokens item
        const params = {
            TableName: table,
            Key: { 
                email: email
            },
            UpdateExpression: "set password=:v",
            ExpressionAttributeValues: { ":v": password },
            ReturnValues: "ALL_NEW"
        };

        // use DynamoDB.DocumentClient to update 
        await dynamodb.update(params).promise();

        res.status(200).json({ "message": "Password Update Successful" })

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}