const express = require("express");
const response = require("../../../network/response");
const controller = require("./index");
const router = express.Router();

router.get("/", (req, res) => {
  controller
    .list()
    .then((list) => response.success(req, res, list, 200))
    .catch((err) => response.error(req, res, err.message, 500));
});

router.get("/:id", (req, res) => {
  controller
    .get(req.params.id)
    .then((user) => response.success(req, res, user, 200))
    .catch((err) => response.error(req, res, err.message, 500));
});

router.post("/", (req, res) => {
  controller
    .upsert(req.body)
    .then((data) => response.success(req, res, data, 201))
    .catch((err) => response.error(req, res, err.message, 500));
});

router.put("/", (req, res) => {
  controller
    .upsert(req.body)
    .then((data) => response.success(req, res, data, 201))
    .catch((err) => response.error(req, res, err.message, 500));
});

// router.delete("/:id", () => {
//   controller
//     .remove(req.params.id)
//     .then(() => response.success(req, res, "Se eliminó correctamente", 200))
//     .catch((err) => response.error(req, res, err.message, 500));
// });

module.exports = router;
