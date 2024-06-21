import { Identity } from "./identity.interface"

export interface AppMetadata {
  provider: string
  providers: string[]
}

export interface UserMetadata {}

export interface User {
  id: string
  aud: string
  role: string
  email: string
  email_confirmed_at: string
  phone: string
  last_sign_in_at: string
  app_metadata: AppMetadata
  user_metadata: UserMetadata
  identities: Identity[]
  created_at: string
  updated_at: string
}