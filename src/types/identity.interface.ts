export interface Identity {
  identity_id: string
  id: string
  user_id: string
  identity_data: IdentityData
  provider: string
  last_sign_in_at: string
  created_at: string
  updated_at: string
  email: string
}

export interface IdentityData {
  email: string
  email_verified: boolean
  phone_verified: boolean
  sub: string
}