import React, { useEffect, useState } from 'react'
import RoomCreate from './RoomCreate'
import { Col, Container, Row } from 'reactstrap'
import RoomTable from './RoomTable'
import { baseURL } from '../../environment'

function RoomIndex(props) {

    const [ rooms, setRooms ] = useState([]);

    const fetchRooms = async () => {
        const url = `${baseURL}/room`;

        const requestOptions = {
            headers: new Headers({
                "Authorization": props.token
            }),
            method: "GET"
        }
        try {
            const res = await fetch(url, requestOptions);
            const data = await res.json();
            // console.log(data.rooms);

            setRooms(data.rooms);
            
        } catch (err) {
            console.error(err);
        }
    }
    useEffect(() => {
        if(props.token) {
            fetchRooms();
        }
    }, [props.token])

  return (
        <>
            <Container>
                <Row>
                    <Col md="4" >
                          <RoomCreate token={props.token} />
                    </Col>
                    <Col md="8" >
                        <RoomTable rooms={rooms} />
                    </Col>
                </Row>
            </Container>
            
        </>
  )
}

export default RoomIndex
