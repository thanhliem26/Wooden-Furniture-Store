"use strict";

const _ = require("lodash");

const getInfoData = ({ field = [], object = {} }) => {
  return _.pick(object, field);
};

const removeElement = ({ field = [], object = {} }) => {
  return _.omit(object, field);
};

const isJson = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

module.exports = {
  getInfoData,
  removeElement,
  isJson,
};
