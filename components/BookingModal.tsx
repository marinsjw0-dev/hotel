
import React, { useState } from 'react';
import { Hotel } from '../types';

interface BookingModalProps {
  hotel: Hotel;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ hotel, onClose }) => {
  const [step, setStep] = useState<'details' | 'success'>('details');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500">
        {step === 'details' ? (
          <div className="flex flex-col lg:flex-row h-full">
            <div className="lg:w-1/2 h-64 lg:h-auto overflow-hidden">
              <img src={hotel.images[1] || hotel.images[0]} className="w-full h-full object-cover" alt={hotel.name} />
            </div>
            
            <div className="flex-grow p-10 lg:p-14">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <span className="text-amber-800 text-[10px] font-bold uppercase tracking-[0.3em] mb-2 block">Matterhorn Exclusive</span>
                  <h2 className="text-4xl font-serif font-bold text-[#4a3728]">{hotel.name}</h2>
                  <p className="text-slate-400 text-sm mt-1">{hotel.location}</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                   <svg className="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>

              <div className="space-y-10">
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Destaques da Suíte</h4>
                  <div className="flex flex-wrap gap-x-6 gap-y-3">
                    {hotel.amenities.map(a => (
                      <div key={a} className="flex items-center gap-2 text-sm text-slate-600">
                        <div className="w-1 h-1 bg-amber-800 rounded-full"></div>
                        {a}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 border-y border-slate-100 py-8">
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">DIÁRIA</span>
                    <span className="text-xl font-serif font-bold text-[#4a3728]">R$ {hotel.pricePerNight}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">ESTADIA</span>
                    <span className="text-xl font-serif font-bold text-[#4a3728]">3 Noites</span>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1 block">VALOR TOTAL ESTIMADO</span>
                      <p className="text-4xl font-serif font-bold text-[#4a3728]">R$ {hotel.pricePerNight * 3}</p>
                    </div>
                    <button 
                      onClick={() => setStep('success')}
                      className="bg-[#4a3728] text-white font-bold uppercase text-xs tracking-[0.2em] px-12 py-5 rounded-sm hover:bg-black transition-all"
                    >
                      Solicitar Reserva
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-24 text-center space-y-8 bg-[#fdfbf7]">
            <div className="w-20 h-20 bg-[#4a3728] text-white rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
            </div>
            <h2 className="text-5xl font-serif font-bold text-[#4a3728]">Tudo Pronto!</h2>
            <p className="text-slate-500 text-lg max-w-md mx-auto leading-relaxed">
              Sua solicitação para a <span className="font-bold text-[#4a3728]">{hotel.name}</span> foi enviada à nossa central de atendimento. Em breve, um de nossos especialistas entrará em contato.
            </p>
            <button 
              onClick={onClose}
              className="px-14 py-4 border border-[#4a3728] text-[#4a3728] font-bold uppercase text-[10px] tracking-widest hover:bg-[#4a3728] hover:text-white transition-all"
            >
              Concluir
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
