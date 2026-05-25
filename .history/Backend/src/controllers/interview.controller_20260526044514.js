const pdfParse = require("pdf-parse");
const generateInterviewReport = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");

async function generateInterviewReportController(req, res) {
    // Fixed the Uint8Array spelling here
    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText();

    const { selfDescription, jobDescription } = req.body;

    const interViewReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    });

    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interViewReportByAi
    });

    res.status(201).json({
        message: "Interview report generated successfully",
        interviewReport
    });
}

// ── NEW CONTROLLER TO FETCH REPORT BY ID ──
async function getInterviewReportByIdController(req, res) {
    try {
        const { id } = req.params;

        // Find the report matching the ID for the logged-in user
        const interviewReport = await interviewReportModel.findOne({
            _id: id,
            user: req.user.id
        });

        if (!interviewReport) {
            return res.status(404).json({ message: "Interview report not found" });
        }

        res.status(200).json({
            interviewReport
        });
    } catch (error) {
        console.error("Error fetching interview report:", error);
        res.status(500).json({ message: "Server error while fetching report" });
    }
}

// Export both functions
module.exports = {
    generateInterviewReportController,
    getInterviewReportByIdController
};