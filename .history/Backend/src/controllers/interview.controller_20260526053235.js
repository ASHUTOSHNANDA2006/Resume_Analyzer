const pdfParse = require("pdf-parse");
const { generateInterviewReport, generateResumePdf } = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");

// 1. Generate Report
async function generateInterviewReportController(req, res) {
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
        ...interViewReportByAi // This automatically saves the "title" from Gemini too!
    });

    res.status(201).json({
        message: "Interview report generated successfully",
        interviewReport
    });
}

// 2. Get Single Report by ID (Fixed the req.params variable)
async function getInterviewReportByIdController(req, res) {
    try {
        // FIX: This MUST match the ":interviewId" in your routes.js
        const { interviewId } = req.params; 

        const interviewReport = await interviewReportModel.findOne({
            _id: interviewId,
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

// 3. Get ALL Reports for the Home Page (ADDED MISSING CONTROLLER)
async function getAllInterviewReportsController(req, res) {
    try {
        // Find all reports belonging to the logged-in user, sorted newest first
        const interviewReports = await interviewReportModel.find({
            user: req.user.id
        }).sort({ createdAt: -1 });

        res.status(200).json({
            interviewReports
        });
    } catch (error) {
        console.error("Error fetching all reports:", error);
        res.status(500).json({ message: "Server error while fetching reports" });
    }
}

async function generateResumePdfController(req, res) {
    try {
        const { interviewReportId } = req.params;

        // 1. Fetch the original report from the database to get the inputs
        const interviewReport = await interviewReportModel.findOne({
            _id: interviewReportId,
            user: req.user.id
        });

        if (!interviewReport) {
            return res.status(404).json({ message: "Interview report not found" });
        }

        // 2. Generate the PDF buffer using the AI service
        const pdfBuffer = await generateResumePdf({
            resume: interviewReport.resume || "",
            selfDescription: interviewReport.selfDescription || "",
            jobDescription: interviewReport.jobDescription || ""
        });

        // 3. Send the buffer back to the frontend as a downloadable PDF file
        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`,
            "Content-Length": pdfBuffer.length
        });

        res.status(200).send(pdfBuffer);

    } catch (error) {
        console.error("Error generating resume PDF:", error);
        res.status(500).json({ message: "Server error while generating PDF" });
    }
}

module.exports = {
    generateInterviewReportController,
    getInterviewReportByIdController,
    getAllInterviewReportsController,
    generateResumePdfController
};