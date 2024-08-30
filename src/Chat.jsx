import React, { useEffect, useState } from 'react';
import "../src/Assets/chat.css"

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");
  
const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
console.log(apiKey);
const genAI = new GoogleGenerativeAI(apiKey);
  
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash-latest",
    systemInstruction: "You are Edu Saathi, an approachable and knowledgeable assistant specializing in helping individuals navigate the mahaDBT government scholarship program. Your primary responsibilities include guiding users through the registration process for the scholarships and assessing their eligibility based on their annual income.\n\nAs a friendly and engaging assistant, you are encouraged to make users feel comfortable and supported. Feel free to engage in light, personable conversation to build rapport and create a positive experience for users. However, it’s important to remain focused on the scholarship-related queries and avoid getting sidetracked by unrelated topics.\n\nYour role involves:\n\nAssisting with Registration: Providing clear instructions and support to users who are filling out their mahaDBT scholarship applications.\nEligibility Assessment: Evaluating users’ eligibility based on their annual income and other relevant criteria.\nProviding Information: Offering detailed information about the scholarship program, including eligibility requirements, application deadlines, and documentation needed.\nOffering Guidance: Helping users troubleshoot any issues they encounter during the application process.\nMaintaining a balance between being personable and staying on topic is key to ensuring that users receive the assistance they need efficiently and effectively.",
});
  
const generationConfig = {
    temperature: 0.7,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

function Chat() {

    const [prompt, setPrompt] = useState('');
    const [history, setHistory] = useState([]);
    const [isChat, setChat] = useState(false);

    const run = async () => {
        const chatSession = model.startChat({
          generationConfig,
          history,
        });
      
        if (prompt !== "") {
            const result = await chatSession.sendMessage(prompt);

            setHistory([...history])
            setPrompt("");
        }
    }

    const openChat = () => {
        setChat(true);
        console.log(isChat);
    }

    const closeChat = () => {
        setChat(false);
        console.log(isChat);
    }

    return (
        <>
            <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
            rel="stylesheet"
            />
            {!isChat && (
                <div className="chat-bar-open" id="chat-open">
                    <button
                        id="chat-open-button"
                        type="button"
                        className="collapsible close"
                        onClick={openChat}
                    >
                        <i className="material-icons-outlined">headset_mic</i>
                    </button>
                </div>
            )}

            {isChat && (
                <>
                    <div className="chat-bar-close" id="chat-close">
                        <button
                            id="chat-close-button"
                            type="button"
                            className="collapsible close"
                            onClick={closeChat}
                        >
                            <i className="material-icons-outlined">close</i>
                        </button>
                    </div>

                    <div className='chatbot-container' id='chatbox'>
                        <h1 className='chatbot-header'>AI assistant</h1>
                        <div className='chatbot-messagebox'>
                            {history.map((msg, index) => {
                                return (
                                    <div className={msg.role} key={index}>
                                        <p>{msg.parts[0].text}</p>
                                    </div>
                                )
                            })}
                            <div className='chatbot-inputs'>
                                <div className='chatbot-inputbar'>
                                    <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} className='chatbot-inputtext' placeholder='Ask Edu Saathi...'/>
                                </div>
                                <div className='chatbot-button'>
                                    <button onClick={run} className='chatbot-submit'><i className="material-icons-outlined">send</i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default Chat;