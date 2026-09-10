import pytest
from backend.api.auth import hash_password, verify_password, create_access_token, decode_access_token, REVOKED_TOKENS
from fastapi import HTTPException

def test_password_hashing():
    pwd = "marine_secure_pin_1234"
    h1, s1 = hash_password(pwd)
    assert len(s1) == 32
    assert len(h1) == 64
    assert verify_password(pwd, s1, h1) is True
    assert verify_password("wrong_password", s1, h1) is False

def test_jwt_token_lifecycle():
    token = create_access_token("usr_test_skipper", "IND-MH-01-MM-9999", "fisherman")
    assert isinstance(token, str)
    assert len(token) > 50

    payload = decode_access_token(token)
    assert payload["sub"] == "usr_test_skipper"
    assert payload["vessel_id"] == "IND-MH-01-MM-9999"
    assert payload["role"] == "fisherman"
    assert "exp" in payload

def test_jwt_revocation():
    token = create_access_token("usr_revoked", "IND-TN-02", "fisherman")
    REVOKED_TOKENS.add(token)
    with pytest.raises(HTTPException) as exc_info:
        decode_access_token(token)
    assert exc_info.value.status_code == 401
    assert "revoked" in exc_info.value.detail.lower()
