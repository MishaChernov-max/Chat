import { useParams } from "react-router-dom";

function Header() {
  const params = useParams();
  const id = params?.id || "";
  return <>{/* <ChatTypeRenderer id={id} /> */}</>;
}
export default Header;
