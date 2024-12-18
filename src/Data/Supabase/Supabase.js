
import { createClient } from '@supabase/supabase-js'

// ... import statement ...
const supabaseUrl = 'https://bxigztsmavbbeybpccmv.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4aWd6dHNtYXZiYmV5YnBjY212Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQxNjMxMTYsImV4cCI6MjAzOTczOTExNn0.eu5GWRXY9XvAbOR98gbLfFA89BdgWvmk53-Ss_7R4K8'
const supabase = createClient(supabaseUrl, supabaseAnonKey)  // Also fixed supabaseKey to supabaseAnonKey
// ... export statement ...
export default supabase