from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, Text, ForeignKey, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    id = Column(String, primary_key=True, index=True)
    name = Column(String, default='Captain')
    preferred_language = Column(String, default='en')
    user_type = Column(String, default='fisherman')  # fisherman, cooperative, coastal_authority, researcher
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    conversations = relationship('Conversation', back_populates='user', cascade='all, delete-orphan')

class Conversation(Base):
    __tablename__ = 'conversations'
    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey('users.id'), nullable=True)
    title = Column(String, default='Marine Consultation')
    last_context = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    user = relationship('User', back_populates='conversations')
    messages = relationship('Message', back_populates='conversation', cascade='all, delete-orphan')

class Message(Base):
    __tablename__ = 'messages'
    id = Column(Integer, primary_key=True, autoincrement=True)
    conversation_id = Column(String, ForeignKey('conversations.id'), index=True)
    role = Column(String)  # user, assistant, system
    content = Column(Text)
    structured_data = Column(JSON, nullable=True)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

    conversation = relationship('Conversation', back_populates='messages')

class MarineLocation(Base):
    __tablename__ = 'marine_locations'
    id = Column(String, primary_key=True)
    name = Column(String, index=True)
    latitude = Column(Float)
    longitude = Column(Float)
    location_type = Column(String)  # harbor, port, landing_center, coastal_town

class PFZRecord(Base):
    __tablename__ = 'pfz_records'
    id = Column(String, primary_key=True)
    name = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    productivity_score = Column(Float)
    sst = Column(Float)
    chlorophyll = Column(Float)
    confidence = Column(Float, default=0.88)
    target_species = Column(JSON, default=list)
    depth_m = Column(Float, default=35.0)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    valid_until = Column(String)

class MarineAdvisory(Base):
    __tablename__ = 'marine_advisories'
    id = Column(String, primary_key=True)
    advisory_type = Column(String)  # Cyclone, High Wave, Lightning, Squall, Border Alert
    severity = Column(String)       # INFO, CAUTION, WARNING, CRITICAL
    region_name = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    radius_km = Column(Float)
    description = Column(Text)
    start_time = Column(String)
    end_time = Column(String)

class GeofenceRecord(Base):
    __tablename__ = 'geofences'
    id = Column(String, primary_key=True)
    name = Column(String)
    category = Column(String)          # International Boundary, Restricted Waters, Marine Protected Area
    restriction_level = Column(String) # STRICT_RESTRICTION, WARNING, PROTECTED
    coordinates_json = Column(JSON)    # list of [lat, lng]
    buffer_km = Column(Float, default=5.0)
    description = Column(Text)

class RiskAssessmentLog(Base):
    __tablename__ = 'risk_assessment_logs'
    id = Column(Integer, primary_key=True, autoincrement=True)
    conversation_id = Column(String, nullable=True)
    latitude = Column(Float)
    longitude = Column(Float)
    weather_risk = Column(Float)
    wave_risk = Column(Float)
    lightning_risk = Column(Float)
    cyclone_risk = Column(Float)
    geofence_risk = Column(Float)
    final_score = Column(Float)
    recommendation = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
