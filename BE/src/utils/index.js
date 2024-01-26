'use strict'


const _ = require('lodash');

const getInfoData = ({field = [], object = {}}) => {
    return _.pick(object, field)
}

const removeElement = ({field = [], object = {}}) => {
    return _.omit(object, field)
}

module.exports = {
    getInfoData,
    removeElement
}