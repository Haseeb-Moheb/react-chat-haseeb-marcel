    import React, { useState } from 'react'
    import SignUp from './signup/SignUp'
    import { Button, Col, Container, Row } from 'reactstrap';
    import Login from './login/Login';
    // import { set } from 'mongoose';

    function Auth(props) { 

      const [ button, setButton ] = useState("To Signup");

      const swapForm = () => {
        button === "To Login" ?
        setButton("To Signup") :
        setButton("To Login");
      }

      const displayform = () => {
        return(
          button === "To Login" ?
          <Container>
            <Row>
                <Col md="4">
                <SignUp updateToken={props.updateToken} /> 
                </Col>
            </Row>
            </Container> :

            <Container>
            <Row>
                <Col md="4">
                <Login updateToken={props.updateToken} />
                </Col>
            </Row>
        </Container>

        )
      }
      
      return (
        <>
        <Button onClick={swapForm} 
        style={{margin: ".5em"}} >{button}</
        Button>
        <br/>
        {displayform()}
        </>
      )
    }

    export default Auth