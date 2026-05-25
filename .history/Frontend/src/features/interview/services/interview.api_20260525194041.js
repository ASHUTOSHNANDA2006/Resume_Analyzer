import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
})

export const generateInterviewReport = ({jobDescription, selfDescription, resumeFile }) => {

    const formData = new FormData()
}