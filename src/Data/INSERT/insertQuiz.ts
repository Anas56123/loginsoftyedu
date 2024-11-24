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
  createdBy: string,
  icon: string
) {
  const fullData = {
    ...insertedData,
    created_by: createdBy,
    icon: icon,
  };

  const { data, error } = await supabase
    .from("quizs")
    .insert([fullData])
    .select();

  if (error) {
    console.error(error);
  }

  return data;
}
