const config = {
    table: "enterprises",
};

const getAllEnterprises = async () => {
    try {
        const { connect } = require("../db");
        const conn = await connect();
        const querySql = `SELECT * FROM ${config.table}`;
        const [rows] = await conn.query(querySql);
        return rows;
    } catch (err) {
        console.error(
            "► getAllEnterprises ! problema com a conexão ao banco de dados !"
        );
        return [];
    }
};

const getEnterprise = async (idUser) => {
    if (!idUser) {
        console.error(
            "► getEnterprises ! ID do usuário deve ser especificado !"
        );
        return [];
    }
    try {
        const { connect } = require("../db");
        const conn = await connect();
        const querySql = `SELECT * FROM ${config.table} WHERE id = ${idUser}`;
        const [rows] = await conn.query(querySql);

        if (!rows.length) {
            console.log("► Nenhuma empresa encontrada");
        }
        return rows;
    } catch (err) {
        console.error("► ! problema com a conexão ao banco de dados !", err);
        return false;
    }
};

module.exports = {
    getAllEnterprises,
    getEnterprise,
};
