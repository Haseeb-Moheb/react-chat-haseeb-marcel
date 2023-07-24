import React from 'react'
import { Button, Table } from 'reactstrap'
import { baseURL } from '../../environment'
import { useNavigate } from 'react-router-dom'

function RoomTable (props) {
  const navigate = useNavigate()
  async function deleteRoom (id) {
    // console.log(id)
    const URL = `${baseURL}/room/${id}`

    // const headers = new Headers()
    // headers.append('Authorization', props.token)

    const requestOptions = {
      // headers: headers,
      headers: new Headers({
        Authorization: props.token
      }),
      method: 'DELETE'
    }
    try {
      const res = await fetch(URL, requestOptions)
      const data = await res.json()
      // console.log(data.message)

      if (data.message === 'Room Removed') {
        props.fetchRoom()
      } else {
        throw new Error('Room was not removed!')
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
        <>
        <h2>Rooms</h2>
            <Table striped>
        <thead>
            <tr>
                <th>
                Room #
                </th>
            <th>
                Description
            </th>
            <th>
                Added Users
            </th>
            <th>
                Edit / Delete
            </th>
            </tr>
        </thead>
        <tbody>
            {
            props.rooms.map(room => (
            <tr key={room._id}>
            <th scope="row">
                {room.name}
            </th>
            <td>
                {room.description}
            </td>
            <td>
                {room.user}
            </td>
            <td>
                <Button
                onClick={() => navigate(`/room/${room._id}`)}
                color='warning'>Edit</Button>
                <Button
                    onClick={() => deleteRoom(room._id)}
                    color="danger">Delete</Button>
            </td>
            </tr>
            ))}
            </tbody></Table>
            </>
  )
}

export default RoomTable
