"use client";
import {doCredentialLogin} from "../actions/index"
import { useState } from "react";
import { useRouter } from "next/navigation";
const Login = () => {


  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [userCredentials, setUserCredentials] = useState({});
  const router = useRouter();
  const hundleChange = ( e  : any) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  };

  const hundleSubmit = async (e : any) => {
    setErrorMsg("");
  setSuccessMsg("");
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);

       await doCredentialLogin(formData) 
      setSuccessMsg("vous etes connecter")
        router.push("/home");
  //  }
   
    } catch (err) {
      setErrorMsg("incorrectes informations");
      console.error(err);

    }
  };

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
    <div className="max-w-sm w-full text-gray-600">
      <form  onSubmit={hundleSubmit} className="mt-8 space-y-5">
        <div>
          <label className="font-medium" htmlFor="username">
          username
          </label>
          <input
        
            onChange={hundleChange}
            name="username"
            id="username"
            placeholder="nom  prenom"
            type="text"
            required
            autoComplete="off"
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
        </div>
        <div>
          <label className="font-medium" htmlFor="password">
            mot de passe
          </label>
          <input
        
            id="password"
            name="password"
            onChange={hundleChange}
            placeholder="mot de passe"
            type="password"
            required
            autoComplete="off"
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
        </div>
        <input type="submit" className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
          value='se connecter'
        />
          {errorMsg && <p className="text-red-500">{errorMsg}</p>}
          {successMsg && <p className="text-green-500">{successMsg}</p>}
      </form>
    </div>
  </main>
  )
}

export default Login