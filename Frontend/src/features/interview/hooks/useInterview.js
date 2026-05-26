import { getAllInterviewReports, generateInterviewReport, getInterviewReportById, generateResumePdf } from "../services/interview.api"
import { useContext, useEffect, useCallback } from "react"
import { InterviewContext } from "../interview.context"
import { useParams } from "react-router"
import { useAuth } from "../../auth/hooks/useAuth"


export const useInterview = () => {

    const context = useContext(InterviewContext)
    const { interviewId } = useParams()
    const { user } = useAuth()

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context

    const generateReport = useCallback(async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true)
        try {
            const response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile })
            if (response && response.interviewReport) {
                setReport(response.interviewReport)
                setReports(prev => [response.interviewReport, ...prev])
                return response.interviewReport
            } else {
                throw new Error("Invalid response schema from the AI analysis engine.")
            }
        } catch (error) {
            console.error("Error generating report:", error)
            const errMsg = error?.response?.data?.message || error?.message || "Gemini AI model is busy or limit reached. Please try again."
            throw new Error(errMsg)
        } finally {
            setLoading(false)
        }
    }, [setLoading, setReport, setReports])

    const getReportById = useCallback(async (interviewId) => {
        // Flickering fix: Skip fetching if matching report is already in the global context
        if (report && report._id === interviewId) {
            return report;
        }

        setLoading(true)
        let response = null
        try {
            response = await getInterviewReportById(interviewId)
            setReport(response.interviewReport)
        } catch (error) {
            console.error("Error fetching report:", error.message)
            setReport(null)
        } finally {
            setLoading(false)
        }
        return response?.interviewReport || null
    }, [setLoading, setReport, report])

    const getReports = useCallback(async () => {
        setLoading(true)
        let response = null
        try {
            response = await getAllInterviewReports()
            setReports(response.interviewReports)
        } catch (error) {
            console.error("Error fetching reports:", error.message)
            setReports([])
        } finally {
            setLoading(false)
        }

        return response?.interviewReports || []
    }, [setLoading, setReports])

    const getResumePdf = async (interviewReportId) => {
        // Premium non-blocking PDF generation logic (no global fullscreen loader)
        try {
            const response = await generateResumePdf({ interviewReportId })
            const url = window.URL.createObjectURL(new Blob([ response ], { type: "application/pdf" }))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `resume_${interviewReportId}.pdf`)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)
        }
        catch (error) {
            console.error("PDF generation failed:", error)
            throw new Error("Failed to compile optimized ATS resume PDF. Try again.")
        }
    }

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        } else if (user) {
            getReports()
        }
    }, [interviewId, getReportById, getReports, user])

    return { loading, report, reports, generateReport, getReportById, getReports, getResumePdf }

}