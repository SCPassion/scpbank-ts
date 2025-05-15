import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://azytlcnvulfcholmsizm.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6eXRsY252dWxmY2hvbG1zaXptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczMzM3NzcsImV4cCI6MjA2MjkwOTc3N30.3Z8yQHf1QM8VHscVJq0LzSyBRT8Sn4d4WmIpjVu2yhE"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
