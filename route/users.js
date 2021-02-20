const express = require("express");
const router = express.Router();
// const { projects } = require('../data')
const { ROLE } = require("../data");
const { authUser, authRole } = require("../basicAuth");
// const { canViewProject, canDeleteProject, scopedProjects } = require('../permissions/project')
// const { getAllUsers, getUser, deleteUser, recoveryUser } = require("../repositories/users");
const {
    getAllUsers,
    getUser,
    deleteUser,
    recoveryUser,
    updateUser,
    createUser,
} = require("../repositories/users");

router.get("/", authUser, authRole(ROLE.ADMIN), (req, res) => {
    const response = async () => {
        res.json(await getAllUsers());
    };
    response();
});

router.get("/:userId", authUser, authRole(ROLE.ADMIN), (req, res) => {
    const response = async () => {
        const userId = parseInt(req.params.userId);
        res.json(await getUser(userId));
    };
    response();
});

router.post("/", authUser, authRole(ROLE.ADMIN), (req, res) => {
    const response = async () => {
        const userId = parseInt(req.params.userId);
        // res.json(`► Work In Progress » Create`);
        res.json(await createUser(req.body.payload));
    };
    response();
});

router.delete("/:userId", authUser, authRole(ROLE.ADMIN), (req, res) => {
    const response = async () => {
        const userId = parseInt(req.params.userId);
        // res.json(`► Work In Progress » Delete`);
        res.json(await deleteUser(userId));
    };
    response();
});

router.patch("/:userId", authUser, authRole(ROLE.ADMIN), (req, res) => {
    // Recovery
    const response = async () => {
        const userId = parseInt(req.params.userId);
        res.json(await recoveryUser(userId));
    };
    response();
});

router.put("/:userId", authUser, authRole(ROLE.ADMIN), (req, res) => {
    const response = async () => {
        const userId = parseInt(req.params.userId);
        res.json(await updateUser(userId));        
        res.json(`► Work In Progress » Update`);
    };
    response();
});

module.exports = router;
