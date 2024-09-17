import supabase from "../Supabase/Supabase";

type DataType = {
  title: string;
  formation: string;
  chapter: number;
  repeated: boolean;
  repeat_wrong_answer: boolean;
  has_time: boolean;
  time: number;
  has_hearts: boolean;
  num_hearts: number;
};

export async function insertQuiz(
  insertedData: DataType,
  created_by: string,
  icon: string
) {
  const fullData = {
    ...insertedData,
    created_by: created_by,
    icon: icon,
  };

  const { data, error } = await supabase
    .from("quizs")
    .insert([fullData])
    .select();

  if (error) {
    console.error(error);
  }
}
