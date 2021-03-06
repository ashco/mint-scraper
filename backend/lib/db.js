﻿// Setup the DB
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);
db.defaults({
  cashData: [],
  creditCardData: [],
  loanData: [],
  investmentData: [],
  propertyData: [],
}).write();

module.exports = db;
