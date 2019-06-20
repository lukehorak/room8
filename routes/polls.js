"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/new", (req, res) => {
    res.render("new_poll");
  });

  router.get("/:id", (req, res) => {

    knex
      .select("*")
      .from("polls")
      .where('poll_id', '=', req.params.id)
      .then((results) => {
        let templateVars = {
          polls: results
        };
        res.render("results", templateVars);
      }).catch(() => {
        let templateVars = {
          err: "Invalid results link. Please confirm link."
        };
        res.render("index", templateVars);
      })

  });

  return router;
}
