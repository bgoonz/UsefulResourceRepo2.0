const table = process.env.USERS_TABLE;
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
/**
 * Validate password reset token entry 
 * checks:
 * - token entry exists with the given token
 * - email on the token entry matches the user email
 * - token is not expired
 * 
 * actions:
 * - if above checks successfull updates token entry to indicate it's been used
 * 
 * @param {object} params { token: <password reset token> , email: <user email> }
**/
const usePasswordToken = async ({ token, email }) => {
    if (!token) throw new Error(`"token" is required`) ;
    if (!email) throw new Error(`"email" is required`) ;

    // get user
    let user = await getByEmail(email);
    if (!user) throw new Error("No user found with given email")

    let tokenEntry = user.password_reset_tokens[token];

    if (!tokenEntry) throw new Error("No token exists, please request another password reset");

    // check if the token is expired
    if (tokenEntry.expiration < new Date()) throw new Error("Password Reset Token has expired, please request another password reset");

    // check if the token has been used
    if (tokenEntry.used === true) throw new Error("Password Reset Token already used, please request another password reset");

    // if all good, mark token as used and return promise
    let updated_tokens = {...user.password_reset_tokens,
            [token]: {...user.password_reset_tokens[token],
                "used": true, 
            }
    }

    // prepare params to update User with new password_reset_tokens item
      const params = {
          TableName: table,
          Key: { 
              email: email
          },
          UpdateExpression: "set password_reset_tokens=:v",
          ExpressionAttributeValues: { ":v": updated_tokens },
          ReturnValues: "ALL_NEW"
      };

      // use DynamoDB.DocumentClient to update 
      return await dynamodb.update(params).promise();
}