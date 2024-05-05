

from fastapi import FastAPI
from transformers import AutoTokenizer, AutoModelForCausalLM

class PromptRequest():
    prompt: str

# Initialize FastAPI app
app = FastAPI()

# Load the model and tokenizer
tokenizer = AutoTokenizer.from_pretrained("microsoft/phi-2")
model = AutoModelForCausalLM.from_pretrained("microsoft/phi-2")

# Define API endpoint
@app.post("/generate_text/")

async def generate_text(request: PromptRequest):
    prompt = request.prompt

    # Tokenize input text
    input_ids = tokenizer.encode(prompt, return_tensors="pt", max_length=50, truncation=True)

    # Generate text using the model
    output = model.generate(input_ids, max_length=100, num_return_sequences=1, temperature=0.7)

    # Decode the generated output
    generated_text = tokenizer.decode(output[0], skip_special_tokens=True)

    return {"generated_text": generated_text}

# Run the FastAPI app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)


    
