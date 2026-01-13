
import { createClient } from 'https://esm.sh/@supabase/supabase-js@^2.45.4';

// ATENÇÃO: Substitua pelos seus dados reais do painel do Supabase (Project Settings > API)
const supabaseUrl = 'https://sua-url-aqui.supabase.co';
const supabaseAnonKey = 'sua-chave-anon-aqui';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
