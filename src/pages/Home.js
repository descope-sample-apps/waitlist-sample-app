import React from 'react'
import { useDescope, useSession, useUser } from '@descope/react-sdk'
import { Descope } from '@descope/react-sdk'
import { useCallback } from 'react'


function Home() {
    const { isAuthenticated, isSessionLoading } = useSession()
    const { user, isUserLoading } = useUser()
    const { logout } = useDescope()

    const handleLogout = useCallback(() => {
        logout()
    }, [logout])

    return (
        <div>
            { !isAuthenticated &&
                (
                <Descope
                    flowId="airtable"
                    onSuccess = {(e) => console.log(e.detail.user)}
                    onError={(e) => console.log('Could not log in!')}
                />
                )
            }
    
            {
                (isSessionLoading || isUserLoading) && <p>Loading...</p>
            }

            {isAuthenticated && (
                <>
                    <p>Hello ${user.name}</p>
                    <div>My Private Component</div>
                    <button onClick={handleLogout}>Logout</button>
                </>
            )}
        </div>
    );
}
  

export default Home
