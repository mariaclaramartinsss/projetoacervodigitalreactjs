import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ycoaekqmoyeoohhproiy.supabase.co';
const supabaseKey = 'sb_publishable_lmS8MDPVOMpTDKK4gHNt_g_mLjTX5Um';

export const supabase = createClient(supabaseUrl, supabaseKey)