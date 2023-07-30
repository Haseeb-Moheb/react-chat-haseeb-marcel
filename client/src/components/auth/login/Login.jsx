import React, { useRef } from 'react'
import { Form, FormGroup, Input, Button } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import FullButton from '../../button/FullButton'

function Login ({updateToken}) {

    const emailRef = useRef()
    const passwordRef = useRef()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        // package up our data (users input)
        let bodyObj = JSON.stringify({
            email: emailRef.current.value,
            password: passwordRef.current.value
        });

        // target endpoint url
        const url = 'http://localhost:5000/user/login';

        // build try/catch
        try {
            
            const res = await fetch(url, {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: bodyObj
            });

            const data = await res.json();
            // console.log(data.token);
            
            emailRef.current.value = '';
            passwordRef.current.value = '';
            
            // console.log(data)
            if(data.user) {
                updateToken(data.token);
                navigate('/room');
            } else {
                alert("Try a different email or password")
            }
            
        } catch (error) {
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
                        type="email"
                        placeholder='email'
                        autoComplete="off"
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        innerRef={passwordRef}
                        type="password"
                        placeholder='password'
                        autoComplete="off"
                    />
                </FormGroup>
                <FullButton>
                    <Button type="submit" color="dark">Login</Button>
                </FullButton>
            </Form>
        </>
    )
}

export default Login

