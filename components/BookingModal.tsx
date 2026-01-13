
import React, { useState } from 'react';
import { Hotel } from '../types';
import { supabase, supabaseIsActive } from '../services/supabaseClient';

interface BookingModalProps {
  hotel: Hotel;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ hotel, onClose }) => {
  // Passos: details (ver infos), form (preencher dados), success (concluido)
  const [step, setStep] = useState<'details' | 'form' | 'success'>('details');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    celular: '',
    obs: ''
  });

  const encode = (data: any) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  }

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const bookingData = {
      ...formData,
      tipo: `Reserva de Suíte: ${hotel.name}`, // Identifica qual hotel foi escolhido
      pax: '2', // Padrão para suítes, ajustável na obs
      data: new Date().toLocaleDateString(), // Data do pedido
      horario: 'Check-in',
      'form-name': 'reservas-matterhorn' // Usa a mesma configuração do Netlify do form principal
    };

    try {
      // 1. Salva no Supabase
      if (supabaseIsActive) {
        await supabase.from('reservas').insert([{
          nome: formData.nome,
          celular: formData.celular,
          email: formData.email,
          pessoas: 2,
          tipo_experiencia: `Hotel: ${hotel.name}`,
          observacoes: `Valor: R$ ${hotel.pricePerNight * 3} (Est. 3 noites). Obs: ${formData.obs}`
        }]);
      }

      // 2. Envia para o Netlify Forms (Email)
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(bookingData)
      });

      setStep('success');
    } catch (error) {
      console.error("Erro ao reservar:", error);
      alert("Houve um erro ao processar. Por favor, tente novamente ou contate via WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500 flex flex-col lg:flex-row h-auto max-h-[90vh]">
        
        {/* Imagem Lateral (Visível apenas em Desktop ou quando não for sucesso) */}
        {step !== 'success' && (
          <div className="lg:w-1/2 h-48 lg:h-auto overflow-hidden relative">
            <div className="absolute inset-0 bg-black/20 z-10"></div>
            <img src={hotel.images[1] || hotel.images[0]} className="w-full h-full object-cover" alt={hotel.name} />
            <div className="absolute bottom-6 left-6 z-20 text-white">
              <p className="text-[9px] font-bold uppercase tracking-widest mb-1">Selecionado</p>
              <h3 className="text-2xl font-serif font-bold">{hotel.name}</h3>
            </div>
          </div>
        )}

        <div className={`flex-grow p-8 lg:p-12 overflow-y-auto ${step === 'success' ? 'w-full text-center' : 'lg:w-1/2'}`}>
          
          {/* Botão Fechar */}
          <div className={`flex ${step === 'success' ? 'justify-end' : 'justify-end'} mb-4`}>
             <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                <svg className="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
             </button>
          </div>

          {step === 'details' && (
            <div className="space-y-8 animate-in slide-in-from-right-8 duration-300">
              <div>
                <span className="text-amber-800 text-[10px] font-bold uppercase tracking-[0.3em] mb-2 block">Detalhes da Estadia</span>
                <p className="text-slate-500 text-sm font-light leading-relaxed">{hotel.description}</p>
              </div>

              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Incluso na Diária</h4>
                <div className="flex flex-wrap gap-2">
                  {hotel.amenities.map(a => (
                    <span key={a} className="px-3 py-1 bg-slate-50 text-slate-600 text-[10px] uppercase tracking-wider font-bold rounded-sm border border-slate-100">
                      {a}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-100 pt-6 mt-6">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <span className="text-slate-400 text-[9px] font-bold uppercase tracking-widest block">Investimento por noite</span>
                    <span className="text-2xl font-serif font-bold text-[#4a3728]">R$ {hotel.pricePerNight}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setStep('form')}
                  className="w-full bg-[#4a3728] text-white font-bold uppercase text-xs tracking-[0.2em] py-5 rounded-sm hover:bg-black transition-all shadow-xl"
                >
                  Continuar Reserva
                </button>
              </div>
            </div>
          )}

          {step === 'form' && (
            <form onSubmit={handleConfirmBooking} className="space-y-6 animate-in slide-in-from-right-8 duration-300">
              <div className="mb-6">
                <h3 className="text-2xl font-serif text-[#4a3728] mb-2">Finalizar Solicitação</h3>
                <p className="text-xs text-slate-400">Informe seus dados para checarmos a disponibilidade desta suíte.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-[#4a3728]">Nome Completo</label>
                  <input required type="text" value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} className="w-full bg-slate-50 border-b border-slate-200 px-3 py-3 focus:outline-none focus:border-[#4a3728] text-sm transition-colors" placeholder="Seu nome" />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-[#4a3728]">WhatsApp</label>
                  <input required type="tel" value={formData.celular} onChange={e => setFormData({...formData, celular: e.target.value})} className="w-full bg-slate-50 border-b border-slate-200 px-3 py-3 focus:outline-none focus:border-[#4a3728] text-sm transition-colors" placeholder="(00) 00000-0000" />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-[#4a3728]">E-mail</label>
                  <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-slate-50 border-b border-slate-200 px-3 py-3 focus:outline-none focus:border-[#4a3728] text-sm transition-colors" placeholder="seu@email.com" />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-[#4a3728]">Data ou Pedido Especial</label>
                  <textarea value={formData.obs} onChange={e => setFormData({...formData, obs: e.target.value})} className="w-full bg-slate-50 border-b border-slate-200 px-3 py-3 focus:outline-none focus:border-[#4a3728] text-sm resize-none transition-colors" rows={2} placeholder="Ex: Entrada dia 10/12, Jantar romântico..." />
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#4a3728] text-white font-bold uppercase text-xs tracking-[0.2em] py-5 rounded-sm hover:bg-black transition-all shadow-xl disabled:opacity-70 flex justify-center items-center gap-2"
                >
                  {isSubmitting ? 'Processando...' : 'Confirmar Interesse'}
                </button>
                <button 
                  type="button"
                  onClick={() => setStep('details')}
                  className="w-full mt-3 text-[9px] font-bold uppercase tracking-widest text-slate-400 hover:text-[#4a3728] transition-colors"
                >
                  Voltar
                </button>
              </div>
            </form>
          )}

          {step === 'success' && (
            <div className="flex flex-col items-center justify-center h-full py-10 animate-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-[#4a3728] text-white rounded-full flex items-center justify-center mb-6 shadow-xl">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
              </div>
              <h2 className="text-4xl font-serif font-bold text-[#4a3728] mb-4">Solicitação Recebida!</h2>
              <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed mb-8">
                Recebemos seu interesse na <span className="font-bold text-[#4a3728]">{hotel.name}</span>. <br/>
                Nossa equipe verificará a disponibilidade e entrará em contato via WhatsApp/E-mail em breve.
              </p>
              <button 
                onClick={onClose}
                className="px-12 py-4 border border-[#4a3728] text-[#4a3728] font-bold uppercase text-[10px] tracking-widest hover:bg-[#4a3728] hover:text-white transition-all rounded-full"
              >
                Fechar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
