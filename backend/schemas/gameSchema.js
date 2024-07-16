const Joi = require('joi');

const gameSchema = Joi.object({
    user_id: Joi.number().integer().positive().required(),
    numOf_ends: Joi.number().integer().min(1).max(24).default(24)
});

module.exports = gameSchema;