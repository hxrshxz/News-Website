import React from 'react'
import { useGlobalContext } from '../context'

const RemovePost = ({id}) => {

   const { removePost } = useGlobalContext();



  return (
    <div>
      <a href="#" onClick={()=>removePost(id)}>Remove</a>

    </div>
  )
}

export default RemovePost
