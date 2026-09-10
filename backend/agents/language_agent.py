# backend/agents/language_agent.py
from backend.services.language_service import detect_query_language, get_localized_response

class LanguageAgent:
    """Detects user language and provides localization for UI outputs."""
    def __init__(self):
        self.name = "Language Agent"

    def process(self, query: str, user_override: str = None) -> dict:
        query_lang = detect_query_language(query)
        if query_lang in ["hi", "mr", "ta"]:
            detected = query_lang
        elif user_override and user_override in ["hi", "mr", "ta"]:
            detected = user_override
        else:
            detected = query_lang or "en"
        lang_names = {
            "en": "English",
            "hi": "Hindi (हिन्दी)",
            "mr": "Marathi (मराठी)",
            "ta": "Tamil (தமிழ்)"
        }
        return {
            "detected_language": detected,
            "language_name": lang_names.get(detected, "English"),
            "response_mode": f"Language detected: {lang_names.get(detected, 'English')}"
        }