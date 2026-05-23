import axios from 'axios';


export async function register(username, email, password) {

    try{
        const response = awaitaxios.post('http://localhost:5000/api/auth/register', {
            username,
            email,
            password
        },{
            withCredentials: true
       })
    } catch(err){
        console.log
    }
}