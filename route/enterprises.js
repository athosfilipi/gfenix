const express = require("express");
const router = express.Router();
const { ROLE } = require("../data");
const { authUser, authRole } = require("../basicAuth");
// const { canViewProject, canDeleteProject, scopedProjects } = require('../permissions/project')
const {
    getAllEnterprises,
    getEnterprise,
    deleteEnterprise,
    recoveryEnterprise,
    updateEnterprise,
    createEnterprise,
} = require("../repositories/enterprises");

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
        res.json(await createEnterprise(req.body.payload));
    };
    response();
});

router.delete("/:enterpriseId", authUser, authRole(ROLE.ADMIN), (req, res) => {
    const response = async () => {
        const enterpriseId = parseInt(req.params.enterpriseId);
        res.json(await deleteEnterprise(enterpriseId));
    };
    response();
});

router.patch("/:enterpriseId", authUser, authRole(ROLE.ADMIN), (req, res) => {
    // Recovery
    const response = async () => {
        const enterpriseId = parseInt(req.params.enterpriseId);
        res.json(await recoveryEnterprise(enterpriseId));
    };
    response();
});

router.put("/:enterpriseId", authUser, authRole(ROLE.ADMIN), (req, res) => {
    const response = async () => {
        res.json(
            await updateEnterprise(req.params.enterpriseId, req.body.payload)
        );
    };
    response();
});

module.exports = router;
