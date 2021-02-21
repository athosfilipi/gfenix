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

        if (!rows.affectedRows) {
            console.log("► Nenhum usuário deletado");
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

const updateUser = async (idUser, payload) => {
    if (!payload) {
        return false;
    }

    const userData = {
        id_role: Number(payload.id_role) || "",
        name: payload.name.toString().toLowerCase() || "",
        email: payload.email.toString().toLowerCase() || "",
    };

    if (!Object.values(userData).every((elem) => Boolean(elem) == true)) {
        console.error("► ! Erro de validação !");
        return false;
    }

    const handleColumns = Object.entries(userData).reduce((acc, curr) => {
        return (acc += `${curr[0]} = "${curr[1].toString().toLowerCase()}",`);
    }, "");
    const setColumns = handleColumns.slice(0, handleColumns.lastIndexOf(","));

    try {
        const { connect } = require("../db");
        const conn = await connect();
        const querySql = `UPDATE ${config.table} SET ${setColumns} WHERE id = ${idUser}`;
        const [rows] = await conn.query(querySql);

        if (!rows.affectedRows) {
            console.log("► ! Nenhum usuário Alterado !");
        }
        return Boolean(rows.affectedRows);
    } catch (err) {
        console.error("► ! problema com a conexão ao banco de dados !", err);
        return [];
    }
};

const createUser = async (payload) => {
    if (!payload) {
        return false;
    }

    const userData = {
        id_role: Number(payload.id_role) || "",
        name: payload.name.toString().toLowerCase() || "",
        email: payload.email.toString().toLowerCase() || "",
    };

    if (!Object.values(userData).every((elem) => Boolean(elem) == true)) {
        return false;
    }
    
    const handleColumns = Object.keys(userData).join(", ")
    const handleValues = Object.values(userData).join("', '")
    const handleInsertValues = `(${handleColumns}) VALUES ('${handleValues}')`;    
    const querySql = `INSERT INTO ${config.table} ${handleInsertValues}`;
    
    try {
        const { connect } = require("../db");
        const conn = await connect();
        const [rows] = await conn.query(querySql);
        if (!rows.insertId) {
            console.log("► ! Nenhum usuário Cadastrado !");
        }
        
        return {insertId: rows.insertId, ...userData};
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

// =========== // Paylod // =========== //
// {
//     "userId": 1,
//     "payload": {
//         "id_role": 1,
//         "name": "nome",
//         "email": "nome@cherrytech.com.br"
//     }
// }
// =========== // Paylod // =========== //
