import {getAllInterviewReports, generateInterviewReport, generateInterviewReportById} from "../services/interview.api"
import {use}
import { useContext } from "react"
import { InterviewContext } from "../interview.context"



export const useInterview = () => {
    
    const context = useContext(InterviewContext)

    if(!context){
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const { loading, setLoading, report, setReport, reports, setReports} = context

    const generateReport = async ({jobDescription, selfDescription, resumeFile}) => {
        setLoading(true)

        try{
            const response = await generateInterviewReport
        }
    }

}