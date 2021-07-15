require("dotenv").config();
require("./config/database"); //database configuration
const express = require("express");
const app = express();
const FetchExecutionByAccountInteractor = require('./interactors/fetch_execution_by_account_interactor')


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/flow_execution", async function(req, res) {
  const account_id = req.query.account_id
  if(!account_id){
    res.sendStatus(400)
  }
  try {
    const flow_executions = await FetchExecutionByAccountInteractor.call(account_id)
    res.json({ flow_executions });
  } catch (e) {
    console.log('could not finish flow execution', e)
    res.sendStatus(500)
}
});

const port = process.env.PORT || 3000;

  app.listen(port, function() {
    console.log("Node server listening on port", port);
  });
