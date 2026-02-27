import { supabase } from "./lib/supabaseClient";

async function testDB() {
  const { data, error } = await supabase
    .from("users_profile")
    .select("*");

  if (error) {
    console.log("❌ Database NOT connected:", error.message);
  } else {
    console.log("✅ Database connected!", data);
  }
}

testDB();
