import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'reactstrap'

function Logout({setToken}) {

  const navigate = useNavigate()

  const style = {
    float: "right",
    margin: ".5em"
  }
  const signout = () => {
    localStorage.removeItem('token') // Clears our localstorage
    setToken('') // rests our state to an empty string
    navigate('/') // routes us back to auth

  }

  return (
    <>
    <Button
      onClick={signout}
      style={style}
      color='danger'
      outline
    >Logout</Button>
    
    </>
  )
}

export default Logout