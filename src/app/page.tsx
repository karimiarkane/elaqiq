
import Login from "./components/Login"
import { auth } from "./auth";
import { redirect } from "next/navigation";

const Auth =async () => {
  const session = await auth()
if(session){
    redirect("/home")
}
  return (
 <Login/>
  );
};

export default Auth;

