const validator = require('validator');

const sanitizedInput = validator.escape(req.body.input);