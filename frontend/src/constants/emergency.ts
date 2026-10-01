// frontend/src/constants/emergency.ts
/**
 * Official Indian Marine Emergency Numbers
 * Verified government search, rescue, and fisheries hotlines.
 * Do NOT alter these numbers.
 */
export const EMERGENCY_CONTACTS = {
  COAST_GUARD_SAR: '1554',           // Indian Coast Guard Toll-Free Search & Rescue
  FISHERIES_HELPLINE: '18001801407',  // National Fisheries Advisory & Information Toll-Free
  DISASTER_CONTROL: '1070',          // State Disaster Management Emergency Control
  POLICE_EMERGENCY: '112'            // National Unified Emergency Service
} as const;
