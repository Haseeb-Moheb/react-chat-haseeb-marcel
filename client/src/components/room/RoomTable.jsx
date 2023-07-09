import React from 'react'
import { Table } from 'reactstrap'
// import { PropTypes } from 'prop-types'
// import { baseURL } from '../../environment'

function RoomTable (props) {
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
            </tr>
            ))}
            </tbody></Table>
            </>
  )
}

export default RoomTable
