import { IUser } from "@/types/user.interface";

const testUser: IUser = {
  id: "1",
  aud: "test",
  role: "test",
  username: "test",
  email: "test@test.com",
  email_confirmed_at: new Date().toString(),
  phone: "12312333",
  last_sign_in_at: new Date().toString(),
  app_metadata: {
    provider: "",
    providers: [],
  },
  user_metadata: "",
  identities: [],
  created_at: new Date().toString(),
  updated_at: new Date().toString(),
};

export default testUser;
