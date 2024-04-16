"use client"
import { useSession } from 'next-auth/react'
import {useState, useEffect} from 'react'
import { CustomSession } from '../components/interfaces'
export default function Page() {
    const { data: session } = useSession();
    const [sessionState, setSessionState] = useState<CustomSession | null>(null);

    useEffect(() => {
        if (session) {
            setSessionState(session as CustomSession); 
            console.log(session);
            updateUser(session as CustomSession);
        }
    }, [session]);

    function updateUser(userData: CustomSession) {
        // Define the API endpoint you are using to handle the user data
        const apiUrl = 'http://localhost:5000/users'; // Change to your actual API URL

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: userData.user?.email,
                name: userData.user?.name,
                accessToken: userData.accessToken,
                refreshToken: userData.refreshToken,
                idToken: userData.idToken,
                accessTokenExpires: userData.accessTokenExpires,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    
  return (
    <div>page</div>
  )
}
