const express = require("express");
const response = require("../network/response");
const store = require("../store/mysql"); //En lugar de controller
const router = express.Router();

router.get("/:table", list);
router.get("/:table/:id", get);
router.post("/:table", insert);
router.post("/:table/login", login);
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

async function insert(req, res, next) {
  try {
    const data = await store.upsert(req.params.table, req.body, true);
    response.success(req, res, data, 201);
  } catch (error) {
    console.log(error);
    response.error(next);
  }
}

async function upsert(req, res, next) {
  try {
    const data = await store.upsert(req.params.table, req.body, false);
    response.success(req, res, data, 201);
  } catch (error) {
    console.log(error);
    response.error(next);
  }
}

async function login(req, res, next) {
  try {
    console.log(req.body.query);
    const data = await store.query(req.params.table, req.body.query);
    response.success(req, res, data, 201);
  } catch (error) {
    console.log(error);
    response.error(next);
  }
}

module.exports = router;
