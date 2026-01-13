
import { createClient } from '@supabase/supabase-js';

// Verificação de segurança para não quebrar o app se as chaves estiverem vazias
const supabaseUrl = 'https://sua-url-aqui.supabase.co';
const supabaseAnonKey = 'sua-chave-anon-aqui';

const isConfigured = supabaseUrl !== 'https://sua-url-aqui.supabase.co' && supabaseAnonKey !== 'sua-chave-anon-aqui';

export const supabase = isConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : { 
      from: () => ({ 
        insert: async () => ({ error: null, data: null }),
        select: () => ({ data: [], error: null }) 
      }) 
    } as any;

export const supabaseIsActive = isConfigured;
