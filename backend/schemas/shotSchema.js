const Joi = require('joi');

const shotSchema = Joi.object({
    end_id: Joi.number().integer().positive().required(),
    shot_number: Joi.number().integer().positive().required(),
    score: Joi.number().integer().min(0).max(10).positive().required()
});

module.exports = shotSchema;