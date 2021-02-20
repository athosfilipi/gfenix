const { getAllUsers, getUser } = require("./repositories/users");
console.log("começou");
console.log(`SELECT * FROM users`);

const asd = async () => {
    console.log( await getAllUsers() )
//     console.log(await getUser(1));
};
asd();
