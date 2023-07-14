import React from 'react'
import { Button, Table } from 'reactstrap'
// import { PropTypes } from 'prop-types'
import { baseURL } from '../../environment'

function RoomTable (props) {
  async function deleteRoom (id) {
    // console.log(id)
    const URL = `${baseURL}/room/${id}`
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
