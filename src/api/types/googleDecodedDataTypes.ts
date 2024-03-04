/* eslint-disable */

export interface GoogleDecodedData {
    aud: string
    exp: number
    iat: number
    iss: string
    sub: string
    email: string
    phone: string
    app_metadata: AppMetadata
    user_metadata: UserMetadata
    role: string
    aal: string
    amr: Amr[]
    session_id: string
  }
  
  interface AppMetadata {
    provider: string
    providers: string[]
  }
  
  interface UserMetadata {
    avatar_url: string
    email: string
    email_verified: boolean
    full_name: string
    iss: string
    name: string
    phone_verified: boolean
    picture: string
    provider_id: string
    sub: string
  }
  
  interface Amr {
    method: string
    timestamp: number
  }
  