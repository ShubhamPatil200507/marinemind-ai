# tests/conftest.py
import os

# Set a secure test secret if not provided or too short/invalid (e.g. from CI env)
jwt_sec = os.environ.get("JWT_SECRET")
if not jwt_sec or len(jwt_sec) < 32:
    os.environ["JWT_SECRET"] = "ci-test-secure-jwt-secret-key-marine-mind-ai-2026-audit"

os.environ.setdefault("APP_ENV", "development")

