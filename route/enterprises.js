const express = require("express");
const router = express.Router();
const { ROLE } = require("../data");
const { authUser, authRole } = require("../basicAuth");
// const { canViewProject, canDeleteProject, scopedProjects } = require('../permissions/project')
const { getAllEnterprises, getEnterprise } = require("../repositories/enterprises");

router.get("/", authUser, authRole(ROLE.ADMIN), (req, res) => {
    const response = async () => {
        res.json(await getAllEnterprises());
    };
    response();
});

router.get("/:enterpriseId", authUser, authRole(ROLE.ADMIN), (req, res) => {
    const response = async () => {
        const enterpriseId = parseInt(req.params.enterpriseId);
        res.json(await getEnterprise(enterpriseId));
    };
    response();
});

router.post("/", authUser, authRole(ROLE.ADMIN), (req, res) => {
    const response = async () => {
        const enterpriseId = parseInt(req.params.enterpriseId);
        res.json(`► Work In Progress » Create`);
    };
    response();
});

router.delete("/:enterpriseId", authUser, authRole(ROLE.ADMIN), (req, res) => {
    const response = async () => {
        const enterpriseId = parseInt(req.params.enterpriseId);
        res.json(`► Work In Progress » Delete`);
    };
    response();
});

router.put("/:enterpriseId", authUser, authRole(ROLE.ADMIN), (req, res) => {
    const response = async () => {
        const enterpriseId = parseInt(req.params.enterpriseId);
        res.json(`► Work In Progress » Update`);
    };
    response();
});

module.exports = router;
