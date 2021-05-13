const express = require("express");
const response = require("../../../network/response");
const controller = require("./index");
const secure = require("./secure");
const router = express.Router();

router.get("/", (req, res, next) => {
  controller
    .list()
    .then((data) => response.success(req, res, data, 200))
    .catch(next);
});

router.get("/:id", (req, res, next) => {
  controller
    .get(req.params.id)
    .then((data) => response.success(req, res, data, 200))
    .catch(next);
});

router.post("/", (req, res, next) => {
  controller
    .upsert(req.body, true)
    .then((data) => response.success(req, res, data, 201))
    .catch(next);
});

router.put("/", secure("update"), (req, res, next) => {
  controller
    .upsert(req.body, false)
    .then((data) => response.success(req, res, data, 200))
    .catch(next);
});

module.exports = router;
