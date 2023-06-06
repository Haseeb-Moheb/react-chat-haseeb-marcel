    import React from 'react'
    import SignUp from './signup/SignUp'
    import { Col, Container, Row } from 'reactstrap';
    import Login from './login/Login';

    function Auth(props) {
      
      return (
        <>
        <Container>
            <Row>
                <Col md="4">
                <SignUp updateToken={props.updateToken} /> 
                </Col>
            </Row>
            <Row>
                <Col md="4">
                <Login updateToken={props.updateToken} />
                </Col>
            </Row>
        </Container>
        </>
      )
    }

    export default Auth