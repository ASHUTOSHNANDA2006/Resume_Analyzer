const pdfParse = require("pdf-parse")
const generateInterviewReport = require("../services/ai.service")




async function generateInterviewReportController(req,res){

    const resumeFile = req.file;
    
    const resumeCOntent = pdfParse(req.file.buffer)

    const {selfDescription, jobDescription} = req.body


    const interview
}




module.exports = {generateInterviewReportController}