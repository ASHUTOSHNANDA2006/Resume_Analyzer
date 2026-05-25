const pdfParse = require("pdf-parse")
const generateInterviewReport = require("../services/ai.service")




async function generateInterviewReportController(req,res){

    const resumeFile = req.file;
    
    const resumeContent = pdfParse(req.file.buffer)

    const {selfDescription, jobDescription} = req.body


    const interViewReportByAi = await generateInterviewReport({
        resume: resumeContent,
        self
    })
}




module.exports = {generateInterviewReportController}