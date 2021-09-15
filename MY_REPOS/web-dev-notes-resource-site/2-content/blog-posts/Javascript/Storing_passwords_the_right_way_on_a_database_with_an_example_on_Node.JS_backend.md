# Storing passwords the right way on a database with an example on Node.JS backend

> A personal blog website

Storing a password is a challenge while designing applications. We have to do it well if we don't want to compromise the security of our applications and users. I would like to briefly explain the approaches we might consider while designing an authentication system that stores users' passwords but first, it's also really important to talk about the approaches we should never take.

This blog is inspired from [Tom Scott's video about storing passwords on Computerphile channel on YouTube](https://www.youtube.com/watch?v=8ZtInClXe1Q) and also my knowledge of Cryptography.

How not to store passwords on a database?
-----------------------------------------

### Plain Text

I don't think I have to mention this but **plain text** is a format we should never consider while storing passwords. The plain text simply is the password that the user has entered while signing up for the service.

For Example: If a user enters `123456` as a password, we simply store `123456` on the database.

So simply if the system gets compromised/hacked, we'll be showing the actual password of the user to the hacker. The main problem with this is, most of the people use the same email and password combination while signing up for multiple services. So the breacher can have access to all the services.

### Encryption

Encryption means converting a plain text (normal text) into a cipher text (encrypted text) with the help of some key.

For Example: We might have an algorithm that maps letters of the alphabet with the letters that are shifted 3 positions. So, if plain text is **abc** then the cipher text would be **def**.

Technically, we're adding a layer of security by simply not exposing the password but there's a problem with this approach. If the breacher gets the key then he can decrypt (obtain original message) from the encrypted password easily. It's easy to do so because the encryption algorithm is known to us and the only thing we don't know is the key. So hypothetically, if the hacker has acquired the key then all the encrypted passwords in the database get compromised.

![Encryption Decryption](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/static/737524375ba003e96b130fa302e84c29/0a47e/encryption-decryption.png "Encryption Decryption")

### Cryptographic Hash Function

A cryptographic hash function is similar to encryption algorithm. The only difference is, if the message is processed with the cryptographic hash function then it is irreversible (i.e. we'll not get back the original password/message from the hash). A cryptographic hash function always generates an output of fixed length and even a slight variation of plain text will result in a totally different hash.

This is slightly an improvisation over encryption but still, it possesses threats. The main problem with this approach is, two passwords get converted to the same hash.

Simply, the breacher might perform a bruteforce attack or a dictionary attack on the system to guess the password. He might take the list guessed passwords, hash it with the hash function and if any of the hash matches the hash on the database then he has successfully decrypted the password from the hash.

![Hashing](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/static/8b98d29943b7305525fb028836221703/0a47e/hashing.png "Hashing")

How to do it right?
-------------------

As we have discarded the possibilities of how not to store passwords on the database, let's talk about how we could store passwords well.

The approach that we have to take while doing so is **hashing and salting**. In this mechanism, a salt is simply a string of random characters that gets added to the password every time we store a new one on the database. If we do this, two different users with the same password will have a different hash.

The salt is **generated randomly** every time a new password is stored on the database. The salt is a long and random string which increases the cost of doing a bruteforce attack.

**Hashing Only**

**Hashing and Salting**

The salt is included in the password, therefore we don't have to separately store the salt.

Example of using salting and hashing on Node.JS
-----------------------------------------------

To do this, we need a package called `bcrypt` which we can download from the NPM registry.

To hash the password, we need to generate a salt. After the generation of salt, we hash the password along with the randomly generated salt. All this is handled by the bcrypt package so we don't have to think much about it.

    const hashPasswordAsync = async password => {
    	const salt = await bcrypt.genSalt()
    	const hash = await bcrypt.hash(password, salt)
    	
    	console.log(hash)
    }
    
    hashPasswordAsync('123456')

I ran the application multiple times and every single time, I was able to get a different hash for the same password `123456`.

Here are some of the outcomes.

    $2b$10$ZSiqlDuvOrjg8AII94LsROYH.rq.sD0dHaI1P/WxdJkMo7d3Q1FbS
    $2b$10$YQYR5GjknzFv0majqhjuQ.e6/P4esEZUmEWBR3P8HwD/AHyNp7Q5y
    $2b$10$f9AjCHiiGkgamZ81Tzgu6OZcq6h2sNwTrGZW2DrgpO//BvDBvgMn.

Some tips on creating passwords for normal user
-----------------------------------------------

As a user, your instinct will be to store a password that is common for every platform because you're likely to forget your password if you use a different password for every different platform. This is not what you should be doing and I highly recommend you to use a password manager in this case.

Also, do not create a password yourself. Let the password manager generate a random password and store it for you. If you do so, you only have to remember a strong master password that unlocks the password manager which in return gives you access to every password you have stored on the password manager.

Conclusion
----------

Thank you for reading the blog. If you liked it, please subscribe to my newsletter to not miss my uploads.


[Source](https://www.bigomega.dev/passwords-in-node)