import React from 'react'
import SignUp from './signup/SignUp'
import { Col, Container, Row } from 'reactstrap';

function Auth() {
  return (
    <>
    <Container>
        <Row>
            <Col md="4">
            <SignUp /> 
            </Col>
        </Row>
         
    </Container>
    
    </>
  )
}

export default Auth