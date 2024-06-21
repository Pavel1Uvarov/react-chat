import { IIdentity } from "./identity.interface"

export interface IAppMetadata {
  provider: string
  providers: string[]
}

export interface IUserMetadata {}

export interface IUser {
  id: string
  aud: string
  role: string
  username: string
  email: string
  email_confirmed_at: string
  phone: string
  last_sign_in_at: string
  app_metadata: IAppMetadata
  user_metadata: IUserMetadata
  identities: IIdentity[]
  created_at: string
  updated_at: string
}