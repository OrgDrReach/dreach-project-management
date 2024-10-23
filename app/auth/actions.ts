"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/auth/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: {
  name: string;
  password: string;
  email: string;
}) {
  const { name, email, password } = formData; // Destructure formData properly

  const supabase = createClient();

  const data = {
    email,
    password,
  };
  console.log(email, password);
  const user = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } }, 
  });

  console.log(user);
  // if (error) {
  //   redirect("/auth/error");
  // }

  // revalidatePath("/", "layout");
  // redirect("/");
}
