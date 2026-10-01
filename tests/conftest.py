# tests/conftest.py
import os

# Set a secure test secret if not already provided in the environment
os.environ.setdefault("JWT_SECRET", "test-secure-jwt-secret-key-marine-mind-ai-2026-audit")
os.environ.setdefault("APP_ENV", "development")
