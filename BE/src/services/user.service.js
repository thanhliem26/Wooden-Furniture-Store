'use strict'
import db from '../models';

const findByEmail = async ({email}) => {
    return await db.User.findOne({where: {email}, raw: true});
}

const findById = async (id) => {
    return await db.User.findOne({where: {id}, raw: true})
} 

module.exports = {
    findByEmail,
    findById
}