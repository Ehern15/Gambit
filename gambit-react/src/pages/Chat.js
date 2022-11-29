import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, UNSAFE_enhanceManualRouteObjects, useNavigate, useParams  } from "react-router-dom";
import './../chat.css';

export default function Chat() {

    const [from, setFrom]=useState({
        name:"",
    });

    const [to, setTo]=useState({
        name:"",
    });

    const { id } = useParams();
    const { otherId } = useParams();
    var messageList = [];
    const [messages, setMessages] = useState([]);

    useEffect(() => {
      loadUser();
    }, []);
  
    const loadUser = async () => {
      const fromResult = await axios.get(`http://localhost:8080/from/${id}/${otherId}`);
      setFrom(fromResult.data);
      console.log("From:", fromResult.data);
      const toResult = await axios.get(`http://localhost:8080/to/${id}/${otherId}`);
      setTo(fromResult.data);
      console.log("To:", toResult.data);
      const result = await axios.get(`http://localhost:8080/chat/${id}/${otherId}`);

      setMessages(result.data);
      console.log("result: ", result.data);

      console.log("id: ", id, " other: ", otherId);
    };

    const sendMessage = async () => {
        var textarea = document.getElementById("message");
        var msg = textarea.value;
        messageList.push(messages.firstName + ": " + msg);
        setMessages(messageList);
        console.log("sending msg: ", msg);
        const result = await axios.post(`http://localhost:8080/chat/${id}/${otherId}`, msg);
        setMessages(result.data);
        //console.log(result.data);
    };

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-6-offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">View User</h2>
                
                    <div className="card">
                        <div className="card-header">

                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>First Name:</b>
                                    {messages.firstName}
                                </li>
                                
                                {Array.from(messages).map((message, index) => (
                                    <div className="chat-card" key={index}>
                                        <p>{message}</p>
                                    </div>
                                ))}
                                <label><b>Message</b></label>
                                <textarea placeholder="Type message.." name="msg" id="message" required></textarea>

                            </ul>
                        </div>
                    </div>
                    <button className="btn btn-primary my-2" onClick={sendMessage}>Send</button>
                    <Link className="btn btn-success my-2" to={`/matchlist/` + id}>Back</Link>
                </div>
            </div>
        </div>
    );
}