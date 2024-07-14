import { User } from "@supabase/supabase-js";

const testUser: User = {
  user_metadata: {},
  id: "1",
  aud: "test",
  role: "test",
  email: "test@test.com",
  email_confirmed_at: new Date().toString(),
  phone: "12312333",
  last_sign_in_at: new Date().toString(),
  app_metadata: {
    provider: "",
    providers: [],
  },
  identities: [],
  created_at: new Date().toString(),
  updated_at: new Date().toString()
};

export default testUser;
