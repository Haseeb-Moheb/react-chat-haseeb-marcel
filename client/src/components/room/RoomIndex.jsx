import React, { useEffect, useState } from 'react'
import RoomCreate from './RoomCreate'
import { Col, Container, Row } from 'reactstrap'
import RoomTable from './RoomTable'
import { baseURL } from '../../environment'
// import { PropTypes } from 'prop-types'

function RoomIndex (props) {
  const [rooms, setRooms] = useState([])
  const fetchRoom = async () => {
    const URL = `${baseURL}/room`

    const requestOptions = {
      headers: new Headers({
        Authorization: props.token
      }),
      method: 'GET'
    }
    try {
      const res = await fetch(URL, requestOptions)
      const data = await res.json()
      // console.log(data.rooms);

      setRooms(data.rooms)
    } catch (err) {
      console.error(err)
    }
  }
  useEffect(() => {
    if (props.token) {
      fetchRoom()
    }
  }, [props.token])

  return (
        <>
            <Container>
                <Row>
                    <Col md="4" >
                          <RoomCreate token={props.token} fetchRoom={fetchRoom} />
                    </Col>
                    <Col md="8" >
                        <RoomTable fetchRoom={fetchRoom} token={props.token} room={rooms} />
                    </Col>
                </Row>
            </Container>
        </>
  )
}

export default RoomIndex
