
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bxigztsmavbbeybpccmv.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4aWd6dHNtYXZiYmV5YnBjY212Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQxNjMxMTYsImV4cCI6MjAzOTczOTExNn0.eu5GWRXY9XvAbOR98gbLfFA89BdgWvmk53-Ss_7R4K8"
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase