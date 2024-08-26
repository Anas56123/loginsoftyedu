import supabase from "../Supabase/Supabase";

type DataType = {
  id: number;
  name: string | null;
  email: string | null;
  phone_number: string | null;
  address: string | null;
  nationality: string | null;
  job_title: string | null;
};

export async function insertStudents(insertedData: DataType) {
  const { data, error } = await supabase
    .from("students")
    .insert([insertedData])
    .select();
}
