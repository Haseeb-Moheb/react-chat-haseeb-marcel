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
                Name
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
            props.room.map(room => (
            <tr key={room.id}>
            <td>
                {room.name}
            </td>
            <td>
                {room.description}
            </td>
            <td>
                {room.addedusers}
            </td>
            </tr>
            ))}</tbody></Table></>
  )
}

export default RoomTable
