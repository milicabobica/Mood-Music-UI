from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from llama_cpp import Llama

llm = Llama( #Local gguf model
    model_path="models/my_model.gguf",  # path to your file
    n_ctx=2048,
    n_threads=8
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/generate")
async def generate(request: Request):
    data = await request.json()
    emotion = data.get("emotion", "")

    prompt = f"""
        I want a music playlist of songs, that best describe the '{emotion}'.
        The songs can be from different countries and can be in different languages.
        
        Each song should be returned in a numbered list of songs accordingly in the format:
        1. Song Title – Artist - Year of release
        2. ...
        3. ...
        
        Be careful to make sure that the song describing the emotion is correct.
        Also watch out for the output to be in the correct format. 
        """
    try:
        response = llm(
            prompt,
            max_tokens=500,
        )

        text=response["choices"][0]["text"].strip()
        print("DEBUG raw response:", response)  # log to terminal
        return {"playlist": text}

    except Exception as e:
        print("ERROR:", e)  # log to terminal
        return {"error": str(e)}
