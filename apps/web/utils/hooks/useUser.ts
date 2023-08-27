import { useContext } from "react";
import AuthCtx from "../context/AuthCtx";

export default function useUser() {
  const authCtx = useContext(AuthCtx);

  return authCtx?.user;
}
