# run_server.py
import os
import uvicorn

if __name__ == "__main__":
    os.environ["JWT_SECRET"] = "006edaf1bc007e6b0beda690c67d4ab231a6e134c4fc879a88d5b7340351c6a6"
    os.environ["APP_ENV"] = "development"
    uvicorn.run("backend.main:app", host="127.0.0.1", port=8000, reload=False)
