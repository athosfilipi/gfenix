const config = {
    table: "users",
};

const getAllUsers = async () => {
    try {
        const { connect } = require("../db");
        const conn = await connect();
        const querySql = `SELECT * FROM ${config.table} WHERE active = 1`;
        const [rows] = await conn.query(querySql);
        return rows;
    } catch (err) {
        console.error(
            "► getAllUsers ! problema com a conexão ao banco de dados !"
        );
        return [];
    }
};

const getUser = async (idUser) => {
    if (!idUser) {
        console.error("► getUser ! ID do usuário deve ser especificado !");
        return [];
    }
    try {
        const { connect } = require("../db");
        const conn = await connect();
        const querySql = `SELECT * FROM ${config.table} WHERE active = 1 AND id = ${idUser}`;
        const [rows] = await conn.query(querySql);

        if (!rows.length) {
            console.log("► Nenhum usuário encontrado");
        }
        return rows;
    } catch (err) {
        console.error("► ! problema com a conexão ao banco de dados !", err);
        return [];
    }
};

const deleteUser = async (idUser) => {
    try {
        const { connect } = require("../db");
        const conn = await connect();
        const querySql = `UPDATE ${config.table} SET active = 0 WHERE id = ${idUser}`;
        const [rows] = await conn.query(querySql);

        if (!rows.length) {
            console.log("► Nenhum usuário encontrado");
        }
        return Boolean(rows.affectedRows);
    } catch (err) {
        console.error("► ! problema com a conexão ao banco de dados !", err);
        return [];
    }
};

const recoveryUser = async (idUser) => {
    try {
        const { connect } = require("../db");
        const conn = await connect();
        const querySql = `UPDATE ${config.table} SET active = 1 WHERE id = ${idUser}`;
        const [rows] = await conn.query(querySql);

        if (!rows.length) {
            console.log("► Nenhum usuário encontrado");
        }
        return Boolean(rows.affectedRows);
    } catch (err) {
        console.error("► ! problema com a conexão ao banco de dados !", err);
        return [];
    }
};

const updateUser = async (idUser) => {
    return `WIP ${idUser}`;
};

const createUser = async (payload) => {
    if (!payload) {
        return false;
    }

    const userData = {
        id_role: payload.id_role || "",
        name: payload.name || "",
        email: payload.email || "",
    };

    // {
    //     "userId": 1,
    //     "payload": {
    //         "id_role": 1,
    //         "name": "Carlos",
    //         "email": "carlos@cherrytech.com.br"
    //     }
    // }

    if (!Object.values(userData).every((elem) => Boolean(elem) == true)) {
        return false;
    }

    try {
        const { connect } = require("../db");
        const conn = await connect();
        const querySql = `INSERT INTO ${config.table} (id_role, name, email) VALUES ('${userData.id_role}','${userData.name}','${userData.email}')`;
        const [rows] = await conn.query(querySql);

        if (!rows.affectedRows) {
            console.log("► ! Nenhum usuário Cadastrado !");
        }
        return Boolean(rows.affectedRows);
    } catch (err) {
        console.error("► ! problema com a conexão ao banco de dados !", err);
        return [];
    }
};

module.exports = {
    getAllUsers,
    getUser,
    deleteUser,
    recoveryUser,
    updateUser,
    createUser,
};
