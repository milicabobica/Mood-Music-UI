console.log('Happy developing ✨')



// async function callPythonAPI(prompt) {
//     const response = await fetch("http://127.0.0.1:8000/generate", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ text: prompt }),
//     });
//
//     const data = await response.json();
//     console.log("Model says:", data.output);
// }
//
// callPythonAPI("Write me a playlist of 10 songs that explain the emotion happiness");

import { useState } from "react";

function App() {
    const [prompt, setPrompt] = useState("");
    const [reply, setReply] = useState("");
    const [loading, setLoading] = useState(false);

    async function callPythonAPI() {
        setLoading(true);
        setReply("");

        try {
            const response = await fetch("http://127.0.0.1:8000/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: prompt }),
            });

            const data = await response.json();
            setReply(data.output);
        } catch (err) {
            setReply("Error connecting to backend 😢");
            console.error(err);
        }

        setLoading(false);
    }

    return (
        <div style={{ padding: "2rem", fontFamily: "Arial" }}>
            <h1>Ask the Model 🤖</h1>
            <textarea
                rows="4"
                cols="50"
                placeholder="Type your question..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
            />
            <br />
            <button onClick={callPythonAPI} disabled={loading || !prompt}>
                {loading ? "Thinking..." : "Ask"}
            </button>
            <h2>Response:</h2>
            <p>{reply}</p>
        </div>
    );
}

export default App;