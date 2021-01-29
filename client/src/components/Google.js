import React from 'react'
import GoogleLogin from 'react-google-login';
import axios from 'axios';

function Google(props) {

    const googleResponse = (res) => {
        console.log('Starting Call')
        axios.post('http://localhost:5000/api/google-login', {idToken: res.tokenId})
        .then(response => (
            // Inform Parent Component
            props.informParent(response)
        ))
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            <GoogleLogin
                        clientId="455738974255-t1nmmen27algfi30bm3jafoluv907o4u.apps.googleusercontent.com"
                        buttonText={props.text}
                        onSuccess={googleResponse}
                        onFailure={googleResponse}
                        cookiePolicy={'single_host_origin'}
                    />
        </div>
    )
}

export default Google
