# run_server.py
import os
import uvicorn

if __name__ == "__main__":
    if "JWT_SECRET" not in os.environ or not os.environ["JWT_SECRET"]:
        os.environ["JWT_SECRET"] = "006edaf1bc007e6b0beda690c67d4ab231a6e134c4fc879a88d5b7340351c6a6"
    if "APP_ENV" not in os.environ:
        os.environ["APP_ENV"] = "development"
    port = int(os.getenv("PORT", 8000))
    host = os.getenv("HOST", "0.0.0.0")
    uvicorn.run("backend.main:app", host=host, port=port, reload=False)

