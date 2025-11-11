import { useParams } from "react-router-dom";
import ChatTypeRenderer from "../ChatTypeRenderer/ChatTypeRenderer";

function Header() {
  const params = useParams();
  const id = params?.id || "";
  const type = params?.type;
  return (
    <>
      <ChatTypeRenderer id={id} type={type} />
    </>
  );
}
export default Header;
