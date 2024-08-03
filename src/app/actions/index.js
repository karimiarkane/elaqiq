
'use server'

import { signIn, signOut } from "../auth";


export async function doLogout() {
  await signOut({ redirectTo: "/" });
}

export async function doCredentialLogin(formData) {
  try {
    const response = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    });
    return response;
  } catch (err) {
    console.log("err catched in doCredentialLogin",err)
    throw err;

  }
}