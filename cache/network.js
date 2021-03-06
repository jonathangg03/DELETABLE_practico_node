const express = require("express");
const response = require("../network/response");
const store = require("../store/redis"); //Trabajaremos sobre el store de redis
const router = express.Router();

router.get("/:table", list);
router.get("/:table/:id", get);
router.put("/:table", upsert);

async function list(req, res, next) {
  const data = await store.list(req.params.table);
  response.success(req, res, data, 200);
}

async function get(req, res, next) {
  // console.log(req.params.table);
  // console.log(req.params.id);
  try {
    const data = await store.get(req.params.table, req.params.id);
    response.success(req, res, data, 200);
  } catch (error) {
    console.log(error);
    response.success(next);
  }
}

async function upsert(req, res, next) {
  try {
    const data = await store.upsert(req.params.table, req.body);
    response.success(req, res, data, 201);
  } catch (error) {
    console.log(error);
    response.error(next);
  }
}

module.exports = router;
