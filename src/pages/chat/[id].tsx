import ChatPage from "@components/chat/pages/dweb";
import { useDevice } from "@/providers/device";
import ChatPageMobile from "@components/chat/pages/mweb";

export default function Chat() {
  const isPhone = useDevice();
  return isPhone ? <ChatPageMobile /> : <ChatPage />;
}
