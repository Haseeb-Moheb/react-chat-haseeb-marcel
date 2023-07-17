import React from 'react'
import { Button, Table } from 'reactstrap'
// import { PropTypes } from 'prop-types'
import { baseURL } from '../../environment'

function RoomTable (props) {
  async function deleteRoom (id) {
    // console.log(id)
    const URL = `${baseURL}/room/${id}`

    // const headers = new Headers()
    // headers.append('Authorization', props.token)

    let requestOptions = {
        // headers: headers,
        headers: new Headers({
            Authorization: props.token
        }),
        method: 'DELETE'
    }
    try {
        let res = await fetch(URL, requestOptions)
        let data = await res.json()
        // console.log(data.message)

        if (data.message === "Room Removed") {
            props.fetchRoom()
        } else {
            throw new Error("Room was not removed!")
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
