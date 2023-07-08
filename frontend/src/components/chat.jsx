import { useState } from 'react'




const Chat = () => {


    const [message ,setMessage]=useState("");
    const [chats,setChats]=useState([]);
    const [isTyping,setIsTyping]=useState(false);

    const reply = async(e,message) =>{
        e.preventDefault();
        if(!message) return;
        setIsTyping(true)
        let msgs= chats;
        msgs.push({role:'user',content:message})
        setChats(msgs);
        scrollTo(0,1e10)
        setMessage("")

        fetch("http://localhost:8080/", {
            method:"post",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({chats})    
        }).then((res)=>res.json())
        .then((data)=>{
            msgs.push(data.output);
            setChats(msgs);
            setIsTyping(false);
            scrollTo(0,1e10)
        }).catch(err=>console.log(err))
    }
  return (
    <div>
      <h1 className='text-center mt-1'>ChattyMind</h1>
      <section className='messages___container container d-flex flex-column'>
    {
        chats && chats.length ? (chats.map((chat,key)=>(
            <>
            
            
            <p key={key} className={chat.role ==="user"? "user___messages p-3 rounded rounded-4 align-self-end":"Ai___messages p-3 rounded rounded-4 align-self-start"}>
                <span>{chat.role}</span>
                <span>: </span>
                <span>{chat.content}</span>

            </p>

            </>
        ))):""
    }


{isTyping ? (
        <span className='Ai___waiting p-2 rounded rounded-4 mb-4'>
        Typing...
        </span>
    ) : ""}
      </section>



      <form onSubmit={e=> reply(e,message)} className='container d-flex flex-column'>
        <div className="d-flex w-100"><input className='input___message rounded w-100' type="text" name="message" value={message} placeholder='Type a message here' onChange={e=>setMessage(e.target.value)}/>
        <button className='send___button rounded' type='submit'><img src="./send.svg" alt="send" width={"20px"}/>
</button></div>

      </form>
    </div>
  )
}

export default Chat
