import supabase from "../Supabase/Supabase";

export async function insertQuestions(type: any, idQuiz: string) {
  const fullData = {
    type,
    quiz_id: idQuiz,
  };
  const { data, error } = await supabase
    .from("questions")
    .insert(fullData)
    .select();

  if (error) {
    console.error(error);
  }

  return data;
}
