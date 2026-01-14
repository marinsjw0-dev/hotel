
import { createClient } from '@supabase/supabase-js';

// --- CONFIGURAÇÃO DO SUPABASE ---
// Cole abaixo a URL e a API Key (anon/public) que você pegou no painel do Supabase
// (Project Settings -> API)

const SUPABASE_URL = 'https://vldzlyxuvmjsiwhlqswg.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsZHpseXh1dm1qc2l3aGxxc3dnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzMzIwNjgsImV4cCI6MjA1NjkwODA2OH0.b-2S2m0V7w4_jQjS6b-k8L-r2Q_v7a7-1z5_0-8-5';

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
        select: () => ({ data: [], error: null }) 
      }) 
    } as any;

export const supabaseIsActive = isConfigured;
