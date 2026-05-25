import { Children, createContext } from "react";




export const InterviewContext = createContext()



export const InterviewProvider = ({Children}) => {

    const [loading, setLoading] = useState(false)
    const [report, setReport] = useState(null)


    return (
        <
    )
}