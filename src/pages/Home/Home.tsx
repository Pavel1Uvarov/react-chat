import Chat from "@/components/Chat/Chat";
import ChatForm from "@/components/ChatForm/ChatForm";

const Home = () => {
  return (
    <div className="flex flex-col h-full gap-4 w-[30rem]">
      <Chat />
      <ChatForm />
    </div>
  );
};

export default Home;
