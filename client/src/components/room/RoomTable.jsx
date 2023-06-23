import React from 'react'
import { Table } from 'reactstrap'
// import { baseURL } from '../../environment'

function RoomTable() {
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
            props.rooms.maps(room => (  
            <tr key={room._id}>
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
            ))}
        </tbody>
        </Table>
        </>    
  )
}

export default RoomTable