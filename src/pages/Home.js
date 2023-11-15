import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useSession } from '@descope/react-sdk'
import { Descope } from '@descope/react-sdk'
import "../App.css"


function Home() {
    const { isAuthenticated } = useSession()
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) {
            return navigate("/profile");
        }
    }, [isAuthenticated]) // listen for when isAuthenticated has changed

    return (
        <div className='flex-row'>
            <div className='flex-col first-flex-box blue-bg'>
                <p className='party'>🦄</p>
            </div>
            <div className='flex-col'>
                <div>
                    <h1>A Better <span className='blue'>Waitlist.</span></h1>
                    <p>
                        Using <a href='https://docs.descope.com/customize/flows/' rel="noreferrer" target='_blank'>Descope Flows</a> with <a href='https://docs.descope.com/customize/connectors/' rel="noreferrer" target='_blank'>Connectors</a> you can now create beautiful custom Waitlist Form with Authentication. 
                        If you're approved on Airtable just input your email address to login.
                    </p>
                    <div className='descope-widget'>
                        { !isAuthenticated &&
                            (
                            <Descope
                                flowId={process.env.REACT_APP_FLOW_ID || "waitlist"}
                                onSuccess = {(e) => console.log(e.detail.user)}
                                onError={(e) => console.log('Could not log in!')}
                            />
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
  

export default Home
