#!/usr/bin/env python3
"""
scripts/seed_demo.py
====================
Creates a fresh MarineMind AI demo database with:
  - Demo user accounts (skippers)
  - Geofence zones
  - Sample PFZ records
  - Sample advisories

Usage:
  JWT_SECRET=<your-secret> python -m scripts.seed_demo
  
Or from repo root:
  JWT_SECRET=<your-secret> python scripts/seed_demo.py
"""

import sys
import os

# Ensure backend is importable
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

def main():
    print("[Seed] Initializing MarineMind AI demo database...")
    
    # Validate JWT_SECRET is set before importing anything that loads it
    if not os.environ.get("JWT_SECRET"):
        print(
            "[ERROR] JWT_SECRET environment variable must be set before seeding.\n"
            "  Generate one: python -c \"import secrets; print(secrets.token_hex(32))\"\n"
            "  Then: JWT_SECRET=<value> python scripts/seed_demo.py"
        )
        sys.exit(1)
    
    from backend.models.database import init_db, SessionLocal
    from backend.models.db_models import User, Geofence, PFZRecord
    from backend.api.auth import hash_password
    from backend.data.seed_data import SEED_GEOFENCES
    import datetime

    # Initialize schema
    init_db()
    db = SessionLocal()

    try:
        # ── Seed Demo Users ────────────────────────────────────────────
        demo_users = [
            {
                "id": "usr_demo_ramesh",
                "name": "Capt. Ramesh Patil",
                "vessel_id": "IND-MH-01-MM-8492",
                "phone": "9820145892",
                "home_port": "Mumbai (Sassoon Docks)",
                "password": "marinemind2024",
                "preferred_language": "en",
                "user_type": "fisherman"
            },
            {
                "id": "usr_demo_selvam",
                "name": "Capt. Selvam Murugan",
                "vessel_id": "IND-TN-04-MM-3105",
                "phone": "9443210987",
                "home_port": "Rameswaram Fishing Jetty",
                "password": "marinemind2024",
                "preferred_language": "ta",
                "user_type": "fisherman"
            },
            {
                "id": "usr_demo_priya",
                "name": "Capt. Priya Sharma",
                "vessel_id": "IND-GJ-09-MM-5521",
                "phone": "9712345678",
                "home_port": "Veraval Fishing Harbour",
                "password": "marinemind2024",
                "preferred_language": "hi",
                "user_type": "fisherman"
            }
        ]

        for u in demo_users:
            existing = db.query(User).filter(User.vessel_id == u["vessel_id"]).first()
            if not existing:
                hashed, salt = hash_password(u["password"])
                db.add(User(
                    id=u["id"],
                    name=u["name"],
                    vessel_id=u["vessel_id"],
                    phone=u["phone"],
                    home_port=u["home_port"],
                    hashed_password=hashed,
                    salt=salt,
                    preferred_language=u["preferred_language"],
                    user_type=u["user_type"]
                ))
                print(f"[Seed]   Created user: {u['name']} ({u['vessel_id']})")
            else:
                print(f"[Seed]   User exists: {u['vessel_id']} — skipping")

        # ── Seed Geofences ─────────────────────────────────────────────
        for gf in SEED_GEOFENCES:
            existing = db.query(Geofence).filter(Geofence.id == gf["id"]).first()
            if not existing:
                db.add(Geofence(
                    id=gf["id"],
                    name=gf["name"],
                    category=gf["category"],
                    restriction_level=gf["restriction_level"],
                    coordinates=gf["coordinates"],
                    description=gf.get("description", ""),
                    buffer_km=gf.get("buffer_km", 5.0)
                ))
                print(f"[Seed]   Created geofence: {gf['name']}")

        db.commit()
        print("\n[Seed] ✅ Demo database seeded successfully.")
        print("[Seed] Demo login credentials:")
        print("  Vessel ID: IND-MH-01-MM-8492  |  Password: marinemind2024")
        print("  Vessel ID: IND-TN-04-MM-3105  |  Password: marinemind2024")
        print("  Vessel ID: IND-GJ-09-MM-5521  |  Password: marinemind2024")
        print("\n[IMPORTANT] These are DEMO credentials. Change passwords in production.")

    except Exception as e:
        db.rollback()
        print(f"[Seed] ❌ Error during seeding: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
    finally:
        db.close()


if __name__ == "__main__":
    main()
