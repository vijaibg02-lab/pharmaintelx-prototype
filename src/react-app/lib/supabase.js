import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
"YOUR_SUPABASE_URL",
"YOUR_SUPABASE_API_KEY"
)

export default supabase