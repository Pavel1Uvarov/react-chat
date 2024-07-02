import { IMessage } from "@/types/message.interface";

const ChatMessages: IMessage[] = [
  {
    id: "111",
    username: "Anonymous",
    text: "Text Test",
    user_id: "1",
    timestamp: "2024-06-26T18:51:08.251717+00:00",
    user_email: "test1@test.com",
  },
  {
    id: "122",
    username: "Anonymous",
    text: "Text Test 2",
    user_id: "2",
    timestamp: "2024-06-26T18:51:19.019747+00:00",
    user_email: "test@test.com",
  },
  {
    id: "133",
    username: "Anonymous",
    text: "Text Test 3",
    user_id: "1",
    timestamp: "2024-06-26T18:51:23.797842+00:00",
    user_email: "test2@test.com",
  },
];

export default ChatMessages;
