import './App.css';
import { Descope } from '@descope/react-sdk'
import { AuthProvider } from '@descope/react-sdk'


function App() {
    return (
        <AuthProvider
            projectId='P2R7oMHgGJUbwwdNn9FxAmkjthKT'
        >
         <WaitList />
        </AuthProvider>
    )
}


function WaitList() {
  return (
    <Descope
      flowId="airtable"
      onSuccess = {(e) => console.log(e.detail.user)}
      onError={(e) => console.log('Could not log in!')}
    />
  );
}


export default App;
