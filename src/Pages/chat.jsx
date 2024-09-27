import Card from '../Components/Card/Card'
import Inbox from '../Components/Inbox/Inbox'

const Chat = () => {
  return (
   <>
     <div className="w-full">
     <div className="flex">
       <Card/>
       <Inbox/>
     </div>
      
     </div>
   </>
  )
}

export default Chat