import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
})

/**
 * @description Service to generate interview report based on user self description, resume and job description. 
 */

export const generateInterviewReport = ({jobDescription, selfDescription, resumeFile }) => {

    const formData = new FormData()
    formData.append("jobDescription", jobDescription)
    formData.append("selfDescription", selfDescription)
    formData.append("resume", resumeFile)

    const response = return api.post("/api/interview/", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

    return response.data




}

/**
 * @description Service to get interview report by interviewId
 */


export const generateInterviewReportById = (interviewId) => {
    const response = await api.get("/api/interview")

    return response.data


}


/**
 * @description 
 */

export const getAllInterviewReports = () => {
    const response = await 
}