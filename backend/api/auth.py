# backend/api/auth.py
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field
from typing import Optional, Dict, Any
import uuid

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

class LoginRequest(BaseModel):
    identifier: str = Field(..., description="Vessel ID or Mobile Number")
    password: str = Field(..., min_length=4)

class RegisterRequest(BaseModel):
    name: str = Field(..., min_length=2, description="Skipper / Vessel Owner Name")
    vessel_id: str = Field(..., min_length=3, description="Vessel Registration Number")
    phone: str = Field(..., min_length=10, description="Mobile Number")
    home_port: str = Field(default="Mumbai (Sassoon Docks)", description="Base Fishing Harbor")
    password: str = Field(..., min_length=4)

class UserProfile(BaseModel):
    id: str
    name: str
    vessel_id: str
    phone: str
    home_port: str
    role: str = "skipper"
    token: str

REGISTERED_USERS: Dict[str, Dict[str, Any]] = {
    "IND-MH-01-MM-8492": {
        "id": "usr_ramesh_patil",
        "name": "Capt. Ramesh Patil",
        "vessel_id": "IND-MH-01-MM-8492",
        "phone": "9820145892",
        "home_port": "Mumbai (Sassoon Docks)",
        "password": "marinepassword"
    },
    "9820145892": {
        "id": "usr_ramesh_patil",
        "name": "Capt. Ramesh Patil",
        "vessel_id": "IND-MH-01-MM-8492",
        "phone": "9820145892",
        "home_port": "Mumbai (Sassoon Docks)",
        "password": "marinepassword"
    },
    "IND-TN-04-MM-3105": {
        "id": "usr_selvam_murugan",
        "name": "Capt. Selvam Murugan",
        "vessel_id": "IND-TN-04-MM-3105",
        "phone": "9443210987",
        "home_port": "Rameswaram Fishing Jetty",
        "password": "marinepassword"
    }
}

@router.post("/login", response_model=UserProfile)
async def login(req: LoginRequest):
    identifier_clean = req.identifier.strip()
    user = REGISTERED_USERS.get(identifier_clean)

    if not user:
        for u in REGISTERED_USERS.values():
            if u["vessel_id"].lower() == identifier_clean.lower() or u["phone"] == identifier_clean:
                user = u
                break

    if not user:
        new_id = f"usr_{uuid.uuid4().hex[:8]}"
        return UserProfile(
            id=new_id,
            name="Vessel Operator",
            vessel_id=identifier_clean.upper() if "-" in identifier_clean else f"IND-MM-{identifier_clean[:4]}",
            phone=identifier_clean if identifier_clean.isdigit() else "9820000000",
            home_port="Mumbai (Sassoon Docks)",
            token=f"mm_token_{uuid.uuid4().hex}"
        )

    return UserProfile(
        id=user["id"],
        name=user["name"],
        vessel_id=user["vessel_id"],
        phone=user["phone"],
        home_port=user["home_port"],
        token=f"mm_token_{uuid.uuid4().hex}"
    )

@router.post("/register", response_model=UserProfile)
async def register(req: RegisterRequest):
    v_clean = req.vessel_id.strip().upper()
    p_clean = req.phone.strip()

    new_user = {
        "id": f"usr_{uuid.uuid4().hex[:8]}",
        "name": req.name.strip(),
        "vessel_id": v_clean,
        "phone": p_clean,
        "home_port": req.home_port.strip(),
        "password": req.password
    }

    REGISTERED_USERS[v_clean] = new_user
    REGISTERED_USERS[p_clean] = new_user

    return UserProfile(
        id=new_user["id"],
        name=new_user["name"],
        vessel_id=new_user["vessel_id"],
        phone=new_user["phone"],
        home_port=new_user["home_port"],
        token=f"mm_token_{uuid.uuid4().hex}"
    )

@router.post("/guest-access", response_model=UserProfile)
async def guest_access():
    return UserProfile(
        id="usr_demo_skipper",
        name="Capt. Ramesh Patil",
        vessel_id="IND-MH-01-MM-8492",
        phone="+91 98201 45892",
        home_port="Mumbai (Sassoon Docks)",
        role="commercial_skipper",
        token=f"mm_token_{uuid.uuid4().hex}"
    )
