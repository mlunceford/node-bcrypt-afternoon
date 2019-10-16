//Go back to authController.js and require bcryptjs as a variable called bcrypt.
const bcrypt = require('bcryptjs')

module.exports = {
    //Next, create a register method with parameters req and res. We will use async and await, so make sure to use the async keyword before the function.
    register: async (req, res) => {
        //Destructure username, password and isAdmin from req.body.
        const { username, password, isAdmin } = req.body;
        //Get the database instance and run the sql file get_user, passing in username. This query will check the database to see if the username is already taken. Since this query is asynchronous, make sure to use the await keyword to ensure that the promise resolves before the rest of the code executes.
        let result = await db.check_user(username);
        const existingUser = result[0];
        //If existingUser is defined, send a response with status 409 and the text 'Username taken');
        if (existingUser) {
            return res.status(409).send('Username taken')
        }
        //Otherwise, create a const variable called salt, equal to bcrypt.genSaltSync(10).
        //Create a const variable called hash, equal to bcrypt.hashSync(password, salt).
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        let registeredUser = await db.register_user(isAdmin, id, username, hash)
        const user = registeredUser[0]

    },
    login: () => {

    },
    getUser: () => {

    },
    logout: () => {

    },
}