import React from 'react'
import "../App.css"
import { useDescope, useSession, useUser } from '@descope/react-sdk'


function Profile() {
    const { isSessionLoading } = useSession()
    const { logout } = useDescope()
    const { user, isUserLoading } = useUser()

    const logoutUser = async () => {
        await logout()
    }
    
    return (
        <>
            {!isUserLoading && (
                <div className='flex-col'>
                    <h1 className='email'>Welcome <span className='blue'>{user.email}</span> 👋</h1>
                    <button className='logout-btn' onClick={logoutUser}>Logout</button> 
                </div>   
            )}
        </>
    );
}
  

export default Profile
