import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import FullButton from '../button/FullButton'
import { baseURL } from '../../environment'

function RoomEdit (props) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [roomName, setRoomName] = useState('')
  const [roomDescription, setRoomDescription] = useState('')
  const [roomUser, setRoomUser] = useState('')

  const names = [null, 'Room-1', 'Room-2', 'Room-3', 'Room-4', 'Room-5', 'Room-6']
  const users = [null, 'Haseeb', 'Marcel', 'John', 'Tom', 'Bob', 'Eric']
  const descriptions = [null, 'Continental', 'Business', 'Finance', 'Family', 'VIPs', 'Board']
  const url = `${baseURL}/room/${id}`
  const fetchRoom = async () => {
    const requestOptions = {
      method: 'GET',
      headers: new Headers({
        Authorization: props.token
      })
    }
    try {
      const res = await fetch(url, requestOptions)
      const data = await res.json()
      const {
        name, description, user
      } = data.room
      setRoomName(name)
      setRoomDescription(description)
      setRoomUser(user)
      // console.log(data)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    if (props.token) {
      fetchRoom()
    }
  }, [props.token])

  async function handleSubmit (e) {
    e.preventDefault()

    const bodyObj = JSON.stringify({
      name: roomName,
      description: roomDescription,
      user: roomUser
    })
    const requestOptions = {
      headers: new Headers({
        Authorization: props.token,
        'Content-Type': 'application/json'
      }),
      body: bodyObj,
      method: 'PATCH'
    }
    try {
      const res = await fetch(url, requestOptions)
      const data = await res.json()

    //   console.log(data)
    } catch (error) {
      console.error(error)
    }
  }
  return (
        <>
            <h2 style={{
              textAlign: 'center', textDecoration: 'underline'
            }}>Edit Room</h2>
            <Container>
                <Row>
                    <Col md="4">
                        <p><b>{roomName}</b>: <br/>{roomUser} has joind the {roomDescription} meeting! <br/> What needs to be changed?</p>
                        <FullButton>
                            <Button
                                color='info'
                                outline
                                onClick={() => navigate('/room')}
                            >Back to Table</Button>
                        </FullButton>
                    </Col>
                    <Col md="8">
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label>Room #</Label>
                                <Input
                                    type='select'
                                    value={roomName}
                                    onChange={e => setRoomName(e.target.value)}
                                    autoComplete='off'>
                                        {
                                            names.map((g, i) => (
                                                    <option
                                                        key={i}
                                                        value={g}>{g}
                                                    </option>
                                            )
                                            )
                                        }
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Users</Label>
                                <Input
                                    type='select'
                                    value={roomUser}
                                    onChange={e => setRoomUser(e.target.value)}
                                    autoComplete='off'>
                                        {
                                            users.map((r, i) => {
                                              return (
                                                    <option
                                                        key={i}
                                                        value={r}>{r}</option>
                                              )
                                            })
                                        }
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Description</Label>
                                <Input
                                    type='select'
                                    value={roomDescription}
                                    onChange={e => setRoomDescription(e.target.value)}
                                    autoComplete='off'>
                                        {
                                            descriptions.map((m, n) => {
                                              return (
                                                    <option
                                                        key={n}
                                                        value={m}>{m}</option>
                                              )
                                            })
                                        }
                                </Input>
                            </FormGroup>
                            <FullButton>
                                <Button color='success'>Update Room!</Button>
                            </FullButton>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
  )
}
export default RoomEdit
