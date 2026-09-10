# backend/api/auth.py
import os
import uuid
import hashlib
import datetime
from typing import Optional, Dict, Any, Set
from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session
import jwt

from backend.models.database import get_db, SessionLocal
from backend.models.db_models import User

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

JWT_SECRET = os.getenv("JWT_SECRET", "marinemind-ai-orca-secure-jwt-secret-key-2024")
JWT_ALGORITHM = "HS256"
JWT_EXPIRY_DAYS = 7

REVOKED_TOKENS: Set[str] = set()
security = HTTPBearer(auto_error=False)

def hash_password(password: str, salt: Optional[str] = None) -> tuple[str, str]:
    """Hashes password using PBKDF2 with SHA-256 and unique salt."""
    if not salt:
        salt = os.urandom(16).hex()
    hashed = hashlib.pbkdf2_hmac(
        "sha256",
        password.encode("utf-8"),
        salt.encode("utf-8"),
        100000
    ).hex()
    return hashed, salt

def verify_password(password: str, salt: str, expected_hash: str) -> bool:
    """Verifies plaintext password against stored hash."""
    calc_hash, _ = hash_password(password, salt)
    return calc_hash == expected_hash

def create_access_token(user_id: str, vessel_id: Optional[str], role: str) -> str:
    """Creates a cryptographically signed HMAC-SHA256 JWT token with 7-day expiration."""
    now = datetime.datetime.utcnow()
    payload = {
        "sub": user_id,
        "vessel_id": vessel_id,
        "role": role,
        "iat": now,
        "exp": now + datetime.timedelta(days=JWT_EXPIRY_DAYS)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def decode_access_token(token: str) -> Dict[str, Any]:
    """Decodes and verifies a JWT token. Raises HTTPException if invalid, expired, or revoked."""
    if token in REVOKED_TOKENS:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Session has been revoked. Please log in again."
        )
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication token has expired. Please log in again."
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication token."
        )

def get_current_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security),
    db: Session = Depends(get_db)
) -> User:
    """FastAPI dependency that enforces valid JWT authentication and returns the User object."""
    if not credentials or not credentials.credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required. Missing Bearer token."
        )
    payload = decode_access_token(credentials.credentials)
    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Malformed token payload."
        )
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User account no longer exists."
        )
    return user

def get_optional_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security),
    db: Session = Depends(get_db)
) -> Optional[User]:
    """FastAPI dependency for endpoints that can benefit from user context if available."""
    if not credentials or not credentials.credentials:
        return None
    try:
        payload = decode_access_token(credentials.credentials)
        user_id = payload.get("sub")
        if user_id:
            return db.query(User).filter(User.id == user_id).first()
    except Exception:
        pass
    return None

class LoginRequest(BaseModel):
    identifier: str = Field(..., description="Vessel ID or Registered Mobile Number")
    password: str = Field(..., min_length=4, description="Marine PIN or Password")

class RegisterRequest(BaseModel):
    name: str = Field(..., min_length=2, description="Skipper / Vessel Owner Name")
    vessel_id: str = Field(..., min_length=3, description="Vessel Registration Number")
    phone: str = Field(..., min_length=10, description="Mobile Number")
    home_port: str = Field(default="Mumbai (Sassoon Docks)", description="Base Fishing Harbor")
    password: str = Field(..., min_length=4, description="Marine PIN or Password")

class UpdateProfileRequest(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    home_port: Optional[str] = None
    preferred_language: Optional[str] = None

class UserProfile(BaseModel):
    id: str
    name: str
    vessel_id: str
    phone: str
    home_port: str
    role: str = "skipper"
    token: str

def seed_default_users():
    """Ensures verified test skippers exist in the SQLite database."""
    db = SessionLocal()
    try:
        u1 = db.query(User).filter(User.vessel_id == "IND-MH-01-MM-8492").first()
        if not u1:
            h1, s1 = hash_password("marinepassword")
            db.add(User(
                id="usr_ramesh_patil",
                name="Capt. Ramesh Patil",
                vessel_id="IND-MH-01-MM-8492",
                phone="9820145892",
                home_port="Mumbai (Sassoon Docks)",
                hashed_password=h1,
                salt=s1,
                preferred_language="en",
                user_type="fisherman"
            ))

        u2 = db.query(User).filter(User.vessel_id == "IND-TN-04-MM-3105").first()
        if not u2:
            h2, s2 = hash_password("marinepassword")
            db.add(User(
                id="usr_selvam_murugan",
                name="Capt. Selvam Murugan",
                vessel_id="IND-TN-04-MM-3105",
                phone="9443210987",
                home_port="Rameswaram Fishing Jetty",
                hashed_password=h2,
                salt=s2,
                preferred_language="ta",
                user_type="fisherman"
            ))

        db.commit()
    except Exception as e:
        db.rollback()
        print(f"[Auth] Notice seeding default users: {e}")
    finally:
        db.close()

seed_default_users()

@router.post("/login", response_model=UserProfile)
async def login(req: LoginRequest, db: Session = Depends(get_db)):
    clean_id = req.identifier.strip()
    user = db.query(User).filter(
        (User.vessel_id.ilike(clean_id)) | (User.phone == clean_id)
    ).first()

    if not user or not user.hashed_password or not user.salt:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Vessel ID / Mobile Number or Password. Please verify your credentials."
        )

    if not verify_password(req.password, user.salt, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid password. Please check your marine security PIN/password."
        )

    token = create_access_token(user.id, user.vessel_id, user.user_type)
    return UserProfile(
        id=user.id,
        name=user.name,
        vessel_id=user.vessel_id or clean_id,
        phone=user.phone or "",
        home_port=user.home_port or "Mumbai (Sassoon Docks)",
        role=user.user_type,
        token=token
    )

@router.post("/register", response_model=UserProfile)
async def register(req: RegisterRequest, db: Session = Depends(get_db)):
    v_clean = req.vessel_id.strip().upper()
    p_clean = req.phone.strip()
    name_clean = req.name.strip()

    existing = db.query(User).filter(
        (User.vessel_id == v_clean) | (User.phone == p_clean)
    ).first()

    if existing:
        if existing.vessel_id == v_clean:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Vessel Registration ID '{v_clean}' is already registered in the system."
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Mobile number '{p_clean}' is already registered with another vessel."
            )

    pwd_hash, salt = hash_password(req.password)
    user_id = f"usr_{uuid.uuid4().hex[:10]}"

    new_user = User(
        id=user_id,
        name=name_clean,
        vessel_id=v_clean,
        phone=p_clean,
        home_port=req.home_port.strip(),
        hashed_password=pwd_hash,
        salt=salt,
        preferred_language="en",
        user_type="fisherman"
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    token = create_access_token(new_user.id, new_user.vessel_id, new_user.user_type)
    return UserProfile(
        id=new_user.id,
        name=new_user.name,
        vessel_id=new_user.vessel_id,
        phone=new_user.phone,
        home_port=new_user.home_port,
        role=new_user.user_type,
        token=token
    )

@router.post("/guest-access", response_model=UserProfile)
async def guest_access(db: Session = Depends(get_db)):
    user = db.query(User).filter(User.vessel_id == "IND-MH-01-MM-8492").first()
    if not user:
        seed_default_users()
        user = db.query(User).filter(User.vessel_id == "IND-MH-01-MM-8492").first()

    user_id = user.id if user else "usr_ramesh_patil"
    vessel_id = user.vessel_id if user else "IND-MH-01-MM-8492"
    role = user.user_type if user else "fisherman"
    token = create_access_token(user_id, vessel_id, role)

    return UserProfile(
        id=user_id,
        name=user.name if user else "Capt. Ramesh Patil",
        vessel_id=vessel_id,
        phone=user.phone if user else "9820145892",
        home_port=user.home_port if user else "Mumbai (Sassoon Docks)",
        role=role,
        token=token
    )

@router.get("/me", response_model=UserProfile)
async def get_me(user: User = Depends(get_current_user)):
    token = create_access_token(user.id, user.vessel_id, user.user_type)
    return UserProfile(
        id=user.id,
        name=user.name,
        vessel_id=user.vessel_id or "",
        phone=user.phone or "",
        home_port=user.home_port or "",
        role=user.user_type,
        token=token
    )

@router.put("/profile", response_model=UserProfile)
async def update_profile(
    req: UpdateProfileRequest,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if req.name is not None and len(req.name.strip()) >= 2:
        user.name = req.name.strip()
    if req.phone is not None and len(req.phone.strip()) >= 10:
        user.phone = req.phone.strip()
    if req.home_port is not None:
        user.home_port = req.home_port.strip()
    if req.preferred_language is not None:
        user.preferred_language = req.preferred_language.strip()

    db.commit()
    db.refresh(user)

    token = create_access_token(user.id, user.vessel_id, user.user_type)
    return UserProfile(
        id=user.id,
        name=user.name,
        vessel_id=user.vessel_id or "",
        phone=user.phone or "",
        home_port=user.home_port or "",
        role=user.user_type,
        token=token
    )

@router.post("/logout")
async def logout(credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)):
    if credentials and credentials.credentials:
        REVOKED_TOKENS.add(credentials.credentials)
    return {"status": "success", "message": "Logged out successfully and token revoked"}
