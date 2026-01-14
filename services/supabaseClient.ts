
import { createClient } from '@supabase/supabase-js';

// --- CONFIGURAÇÃO DO SUPABASE ---
// Cole abaixo a URL e a API Key (anon/public) que você pegou no painel do Supabase
// (Project Settings -> API)

const SUPABASE_URL = 'https://rcezuzynosmrelsrgoaj.supabase.co'; 
const SUPABASE_ANON_KEY = 'sb_publishable_Z_SUQoMSJSZA1b6se1e5Uw_0KbW7T99';

// --------------------------------

const isConfigured = 
  // Simplified check: if it starts with http, it's not the default placeholder.
  SUPABASE_URL.startsWith('http') &&
  !SUPABASE_ANON_KEY.includes('COLE_SUA_CHAVE');

export const supabase = isConfigured 
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : { 
      // Mock para o app não quebrar se as chaves não estiverem preenchidas
      from: () => ({ 
        insert: async () => {
          console.warn("Supabase não configurado. Os dados não foram salvos no banco, apenas enviados por e-mail (se configurado).");
          return { error: null, data: null };
        },
        select: () => ({ data: [], error: null }),
        update: () => ({ eq: () => ({ error: null }) })
      }) 
    } as any;

export const supabaseIsActive = isConfigured;
