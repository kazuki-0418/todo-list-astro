import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string = "https://uzjypqfcezoqmpnktvjf.supabase.co";
const supabaseKey: string =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6anlwcWZjZXpvcW1wbmt0dmpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzNzMyMDAsImV4cCI6MjA1NTk0OTIwMH0.HPbXEzcI1B5sFsea-0l92C03_vUWSe0HuPyHUxM3GYA";
export const supabase = createClient(supabaseUrl, supabaseKey);
