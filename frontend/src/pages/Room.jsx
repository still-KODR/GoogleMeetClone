import { useParams } from "react-router"

const Room = () => {
  const {roomId}=useParams()
  return (
    <>
      {roomId}
    </>
  )
}

export default Room