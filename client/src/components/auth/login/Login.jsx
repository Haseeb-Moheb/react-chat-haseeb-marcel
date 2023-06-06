import React, { useRef } from 'react'
import { Form, FormGroup, Input, Button } from 'reactstrap'

function Login({updateToken}) {

    const emailRef = useRef();
    const passwordRef = useRef(); 

    const handleSubmit = async (e) => {
        e.prevenDefaulte();

        // console.log(emailRef.current.value);
        // console.log(passwordRef.current.value);

        let bodyObj = JSON.stringify({
            email: emailRef.current.value,
            password: passwordRef.current.value
        });
        console.log();

        const url = 'http://localhost:4000/user/login';


        try {
            const res = await fetch(url, { method: "post",
        headers: new Headers({
            "Content-Type": "application/json"
        }),
        body: bodyObj
    });

    const data = await res.json();
    // console.log(data.token);
    updateToken(data.token)

    emailRef.current.value = '';
    passwordRef.current.value = '';
 
        } catch (error){
            console.error(error);
        }
    }

  return (
    <>
     <h2>Login</h2>

            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Input 
                    innerRef={emailRef}
                    type = "email"
                    placeholder='email'
                    autoComplete='off'/>
                </FormGroup>
                <FormGroup>
                    <Input 
                    innerRef={passwordRef}
                    type = "password"
                    placeholder='password'
                    autoComplete='off'/>
                </FormGroup>
                <Button type="submit"
                color='dark'>Login</Button>
            </Form>
    </>
  )
}

export default Login