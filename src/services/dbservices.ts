import { supabase } from "../lib/supabaseClient";

export async function saveCodingResult(result:any) {
  await supabase.from("coding_results").insert(result);
}
