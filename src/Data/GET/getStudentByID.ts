import supabase from "../Supabase/Supabase";

export async function getStudentByID(id: number) {
  let { data, error } = await supabase
    .from("students").select('*')
    .eq('id', id);

    return data
}
