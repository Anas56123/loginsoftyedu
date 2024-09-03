import supabase from "../Supabase/Supabase";

export async function deleteStudent(ids: number[]) {
  console.log({ ids });
  if (ids.length == 1) {
    const { error } = await supabase.from("students").delete().eq("id", ids[0]);
    if (error) {
      console.error(error);
    }
  } else {
    const { error } = await supabase.from("students").delete().in("id", ids);
    if (error) {
      console.error(error);
    }
  }
}
