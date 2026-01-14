import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';

interface AdminPanelProps {
  onClose: () => void;
  onUpdateImage: (newUrl: string) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose, onUpdateImage }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const [msg, setMsg] = useState('');

  // Carregar imagem atual ao abrir (se já estiver logado ou após logar)
  useEffect(() => {
    if (isLoggedIn) {
      fetchCurrentSettings();
    }
  }, [isLoggedIn]);

  const fetchCurrentSettings = async () => {
    const { data } = await supabase.from('site_settings').select('value').eq('key', 'hero_bg').single();
    if (data) setCurrentUrl(data.value);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Verificação simples conforme solicitado
    if (email === 'marinsjw@hotmail.com' && password === '1234') {
      setIsLoggedIn(true);
    } else {
      setMsg('Credenciais inválidas.');
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setMsg('');
    try {
      const { error } = await supabase
        .from('site_settings')
        .update({ value: currentUrl })
        .eq('key', 'hero_bg');

      if (error) throw error;
      
      setMsg('Imagem atualizada com sucesso!');
      onUpdateImage(currentUrl); // Atualiza o site em tempo real
    } catch (err) {
      console.error(err);
      setMsg('Erro ao salvar no banco de dados.');
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
        <div className="bg-white w-full max-w-md p-8 rounded-sm shadow-2xl relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-red-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-serif font-bold text-[#4a3728]">Área Administrativa</h2>
            <p className="text-xs text-slate-400 uppercase tracking-widest mt-2">Acesso Restrito</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#4a3728]">E-mail</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border-b border-slate-200 py-2 focus:outline-none focus:border-[#4a3728]" />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#4a3728]">Senha</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border-b border-slate-200 py-2 focus:outline-none focus:border-[#4a3728]" />
            </div>
            {msg && <p className="text-red-500 text-xs text-center">{msg}</p>}
            <button type="submit" className="w-full bg-[#4a3728] text-white font-bold uppercase text-xs tracking-[0.2em] py-4 hover:bg-black transition-all">
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-2xl p-8 rounded-sm shadow-2xl relative animate-in zoom-in-95">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-red-500">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 space-y-6">
            <div>
              <h2 className="text-2xl font-serif font-bold text-[#4a3728]">Configurações do Site</h2>
              <p className="text-xs text-slate-400 mt-2">Alterar imagem principal (Hero).</p>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#4a3728]">URL da Imagem</label>
              <input 
                type="text" 
                value={currentUrl} 
                onChange={e => setCurrentUrl(e.target.value)} 
                className="w-full border border-slate-200 p-3 text-sm focus:outline-none focus:border-[#4a3728]" 
                placeholder="https://..."
              />
              <p className="text-[9px] text-slate-400">Recomendado: Imagens do Unsplash ou hospedadas.</p>
            </div>

            <button 
              onClick={handleSave} 
              disabled={loading}
              className="w-full bg-[#4a3728] text-white font-bold uppercase text-xs tracking-[0.2em] py-4 hover:bg-black transition-all disabled:opacity-50"
            >
              {loading ? 'Salvando...' : 'Atualizar Site'}
            </button>
            
            {msg && <p className={`text-xs font-bold ${msg.includes('sucesso') ? 'text-green-600' : 'text-red-600'}`}>{msg}</p>}
          </div>

          <div className="md:w-1/2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#4a3728] mb-2">Pré-visualização</p>
            <div className="aspect-[3/4] md:aspect-square bg-slate-100 w-full overflow-hidden rounded border border-slate-200 relative">
              {currentUrl ? (
                <img src={currentUrl} className="w-full h-full object-cover" alt="Preview" onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/400?text=Erro+na+Imagem')} />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-300 text-xs">Sem imagem</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;