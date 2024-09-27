import { useEffect, useState } from "react"
import Avatar from "./Avatar/Avatar"

interface Avatar {
  id: number
}

const AvatarList = () => {
  const [avatars, setAvatars] = useState<Avatar[]>([])
  const [selectedAvatarId, setSelectedAvatarId] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const fetchAvatars = async () => {
      const response = await fetch(
        `/api/avatars?format=json`, { signal }
      );
      const data = await response.json();
      setAvatars(data)
    };

    fetchAvatars();
    
    return () => controller.abort()
  }, [])

  return (
    <div className="avatars">
      {avatars.map(avatar => (
        <br/>
      ))}
    </div>
  )
}

export default AvatarList