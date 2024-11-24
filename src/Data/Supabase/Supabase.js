
import { createClient } from '@supabase/supabase-js'

// ... import statement ...
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)  // Also fixed supabaseKey to supabaseAnonKey
// ... export statement ...
export default supabase