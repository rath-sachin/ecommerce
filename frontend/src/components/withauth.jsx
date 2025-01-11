import React, { useEffect } from 'react'
import {useAuth} from "../providers/auth.provider"
import { useNavigate } from 'react-router-dom'

function WithAuth({children}) {
    const navigate = useNavigate()
    const {state} = useAuth()
    useEffect(() => {
        if (state == "loading" || state == "authenticated")
            return
        navigate("/signin")
    }, [state])
    if (state != "authenticated")
        return "Loading"

  return (
   children
  )
}

export default WithAuth