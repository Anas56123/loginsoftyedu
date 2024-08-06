import supabase from "../Supabase/Supabase";

export async function insertAccount(isertedData: {
  email: string;
  password: string;
  full_name: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email: isertedData.email,
    password: isertedData.password,
    options: {
      data: {
        full_name: isertedData.full_name,
      },
    },
  });
}
