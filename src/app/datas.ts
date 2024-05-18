import { createClient } from "../../utils/supabase/server";
import { cookies } from "next/headers";

export default async function datas() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: todos } = await supabase.from("races").select();
  return todos;
}
