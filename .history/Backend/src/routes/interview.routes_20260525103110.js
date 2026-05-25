const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const interviewController = require("../controllers/interview.controller")


/**
 * @route POST /api/interview/
 * @description Generate new interview report on the basis of user self description, resume pdf and job description. 
 * @access private
 */
interviewRouter.post("/", authMiddleware.authUser, )


module.exports = interviewRouter