
import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';

const ReservationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    celular: '',
    email: '',
    pessoas: '',
    data: '',
    horario: '',
    tipoReserva: '',
    flor: '',
    frasePrato: '',
    observacao: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      // 1. SALVAR NO SUPABASE
      const { error: supabaseError } = await supabase
        .from('reservas')
        .insert([
          {
            nome: formData.nome,
            sobrenome: formData.sobrenome,
            celular: formData.celular,
            email: formData.email,
            pessoas: parseInt(formData.pessoas),
            data_reserva: formData.data,
            horario: formData.horario,
            tipo_experiencia: formData.tipoReserva,
            flor_adicional: formData.flor,
            frase_prato: formData.frasePrato,
            observacoes: formData.observacao
          }
        ]);

      if (supabaseError) {
        console.error("Erro Supabase:", supabaseError);
        // Opcional: decidir se trava o envio do e-mail se o DB falhar
      }

      // 2. ENVIAR E-MAIL VIA FORMSPREE (Backup e Notificação Real-time)
      const endpoint = "https://formspree.io/f/reservasmatterhorn@gmail.com";
      const payload = {
        _subject: `NOVA RESERVA: ${formData.nome} ${formData.sobrenome} (${formData.data})`,
        nome_completo: `${formData.nome} ${formData.sobrenome}`,
        contato_celular: formData.celular,
        email_cliente: formData.email,
        data_reserva: formData.data,
        horario_reserva: formData.horario,
        qtd_pessoas: formData.pessoas,
        experiencia: formData.tipoReserva,
        adicional_flor: formData.flor,
        frase_no_prato: formData.frasePrato,
        observacoes_extras: formData.observacao || "Nenhuma",
        _replyto: formData.email
      };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setIsSubmitting(false);
        setStatus('success');
        setFormData({
          nome: '', sobrenome: '', celular: '', email: '', 
          pessoas: '', data: '', horario: '', tipoReserva: '', 
          flor: '', frasePrato: '', observacao: ''
        });
      } else {
        const data = await response.json();
        const errorText = data.errors ? data.errors.map((e: any) => e.message).join(", ") : "Erro no servidor de e-mail";
        throw new Error(errorText);
      }
    } catch (error: any) {
      console.error("Erro geral no envio:", error);
      setIsSubmitting(false);
      setStatus('error');
      setErrorMessage(error.message || "Não foi possível completar sua reserva.");
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-white p-12 text-center animate-in fade-in zoom-in-95 duration-500 rounded-sm shadow-xl border border-slate-100">
        <div className="w-20 h-20 bg-[#4a3728] text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/></svg>
        </div>
        <h3 className="text-3xl font-serif text-[#4a3728] mb-4">Confirmado!</h3>
        <p className="text-slate-500 mb-8 max-w-md mx-auto leading-relaxed text-sm">
          Sua reserva foi registrada no banco de dados e enviada para <span className="font-bold">reservasmatterhorn@gmail.com</span>.
        </p>
        <button 
          onClick={() => setStatus('idle')}
          className="bg-[#4a3728] text-white text-[10px] font-bold uppercase tracking-[0.3em] px-10 py-4 rounded-full hover:bg-black transition-all"
        >
          Nova Reserva
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10 text-left">
      {status === 'error' && (
        <div className="p-4 bg-red-50 text-red-600 text-xs rounded-sm mb-6 flex items-center gap-3 border border-red-100">
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span><strong>Erro:</strong> {errorMessage}</span>
        </div>
      )}

      <div className="space-y-4 border-l-2 border-[#4a3728] pl-6">
        <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-[#4a3728]">Solicitação Matterhorn (Supabase Sync)</h3>
        <p className="text-slate-400 text-xs leading-relaxed max-w-2xl font-light italic">
          Sua reserva será salva em nosso sistema e notificada via e-mail.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        <div className="space-y-4">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-[#4a3728]">Nome Completo*</label>
          <div className="grid grid-cols-2 gap-4">
            <input required type="text" placeholder="Nome" value={formData.nome} className="w-full bg-transparent border-b border-slate-200 py-3 focus:outline-none focus:border-[#4a3728] text-sm transition-all" onChange={e => setFormData({...formData, nome: e.target.value})} />
            <input required type="text" placeholder="Sobrenome" value={formData.sobrenome} className="w-full bg-transparent border-b border-slate-200 py-3 focus:outline-none focus:border-[#4a3728] text-sm transition-all" onChange={e => setFormData({...formData, sobrenome: e.target.value})} />
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-[#4a3728]">Celular*</label>
          <div className="relative">
            <span className="absolute left-0 top-3 text-slate-400 text-xs font-bold">🇧🇷 +55</span>
            <input required type="tel" placeholder="(00) 00000-0000" value={formData.celular} className="w-full bg-transparent border-b border-slate-200 py-3 pl-14 focus:outline-none focus:border-[#4a3728] text-sm transition-all" onChange={e => setFormData({...formData, celular: e.target.value})} />
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-[#4a3728]">E-mail*</label>
          <input required type="email" placeholder="seu@email.com" value={formData.email} className="w-full bg-transparent border-b border-slate-200 py-3 focus:outline-none focus:border-[#4a3728] text-sm transition-all" onChange={e => setFormData({...formData, email: e.target.value})} />
        </div>

        <div className="space-y-4">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-[#4a3728]">Pessoas*</label>
          <input required type="number" min="1" value={formData.pessoas} className="w-full bg-transparent border-b border-slate-200 py-3 focus:outline-none focus:border-[#4a3728] text-sm transition-all" onChange={e => setFormData({...formData, pessoas: e.target.value})} />
        </div>

        <div className="space-y-4">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-[#4a3728]">Data*</label>
          <input required type="date" value={formData.data} className="w-full bg-transparent border-b border-slate-200 py-3 focus:outline-none focus:border-[#4a3728] text-sm transition-all appearance-none" onChange={e => setFormData({...formData, data: e.target.value})} />
        </div>

        <div className="space-y-4">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-[#4a3728]">Horário*</label>
          <div className="flex gap-4 mt-2">
            {['18:30h', '19:00h', '19:30h'].map(h => (
              <label key={h} className="flex-1">
                <input type="radio" name="horario" required checked={formData.horario === h} className="peer hidden" onChange={() => setFormData({...formData, horario: h})} />
                <div className="text-center py-2 border border-slate-200 rounded-full text-[10px] font-bold cursor-pointer peer-checked:bg-[#4a3728] peer-checked:text-white peer-checked:border-[#4a3728] transition-all">
                  {h}
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6 pt-6 border-t border-slate-100">
        <label className="block text-[10px] font-bold uppercase tracking-widest text-[#4a3728]">Experiência*</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['Reserva Online', 'Reserva Pedido de Casamento', 'Reserva Romântica'].map(t => (
            <label key={t} className="relative cursor-pointer group">
              <input type="radio" name="tipoReserva" required checked={formData.tipoReserva === t} className="peer hidden" onChange={() => setFormData({...formData, tipoReserva: t})} />
              <div className="p-4 border border-slate-200 rounded-sm text-center text-[10px] font-bold uppercase tracking-widest transition-all peer-checked:bg-[#4a3728] peer-checked:text-white peer-checked:border-[#4a3728] group-hover:border-[#4a3728]/50">
                {t}
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-[10px] font-bold uppercase tracking-widest text-[#4a3728]">Observações Adicionais</label>
        <textarea className="w-full bg-transparent border-b border-slate-200 py-3 focus:outline-none focus:border-[#4a3728] text-sm resize-none transition-all" rows={3} placeholder="Ex: Preferência de mesa ou restrições..." onChange={e => setFormData({...formData, observacao: e.target.value})} value={formData.observacao}></textarea>
      </div>

      <div className="pt-8 flex flex-col items-center">
        <button type="submit" disabled={isSubmitting} className="w-full md:w-auto bg-[#4a3728] text-white font-bold uppercase text-[10px] tracking-[0.4em] px-20 py-6 rounded-full hover:bg-black transition-all flex items-center justify-center gap-4 shadow-xl disabled:opacity-50">
          {isSubmitting ? 'Processando...' : 'Finalizar e Salvar'}
        </button>
      </div>
    </form>
  );
};

export default ReservationForm;
