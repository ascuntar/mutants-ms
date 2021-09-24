// Created By Eyder Ascuntar Rosales
const express = require("express");
const controller = require("../../controllers/mutant/mutantController");

const router = express.Router();

router.post("/", controller.isMutant);
router.get("/stats", controller.stats);

module.exports = router;
