
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HotelCard from './components/HotelCard';
import AIConcierge from './components/AIConcierge';
import BookingModal from './components/BookingModal';
import ReservationForm from './components/ReservationForm';
import { HOTELS } from './constants';
import { Hotel } from './types';

const App: React.FC = () => {
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  return (
    <div className="min-h-screen selection:bg-[#4a3728] selection:text-white bg-[#fdfbf7]">
      <Navbar />

      <main>
        {/* HERO SECTION */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="w-full h-full hero-bg bg-fixed"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-[#fdfbf7]"></div>
          </div>
          
          <div className="relative z-10 text-center px-6 max-w-5xl animate-in fade-in slide-in-from-bottom-12 duration-1000">
            <h1 className="text-8xl md:text-[140px] font-script text-white mb-2 drop-shadow-2xl">
              Matterhorn
            </h1>
            <p className="text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.6em] mb-12 drop-shadow-md opacity-90">
              Restaurante, Empório e Hotel • Campos do Jordão
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a href="#contato" className="bg-white text-[#4a3728] font-bold uppercase text-[10px] tracking-widest px-12 py-5 rounded-full hover:bg-[#4a3728] hover:text-white transition-all duration-500 shadow-2xl">
                Reservar Mesa
              </a>
              <a href="#acomodacoes" className="bg-transparent border border-white/40 text-white font-bold uppercase text-[10px] tracking-widest px-12 py-5 rounded-full hover:bg-white hover:text-[#4a3728] transition-all duration-500">
                Ver Suítes
              </a>
            </div>
          </div>
          
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7-7-7"/></svg>
          </div>
        </section>

        {/* SEÇÃO SOBRE */}
        <section id="sobre" className="py-32 px-6 bg-white">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-24">
            <div className="lg:w-1/2 relative">
              <img 
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1200" 
                className="relative z-10 w-full rounded-sm shadow-2xl grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                alt="Tradição Matterhorn"
              />
              <div className="absolute -bottom-10 -right-10 bg-[#4a3728] p-12 text-white z-20 shadow-2xl">
                <span className="font-serif text-5xl block mb-2 italic">1993</span>
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] leading-relaxed opacity-60">Tradição & Requinte<br/>no Capivari</p>
              </div>
            </div>
            <div className="lg:w-1/2">
              <span className="text-amber-800 text-[10px] font-bold uppercase tracking-[0.5em] mb-6 block">Legado Alpino</span>
              <h2 className="text-5xl md:text-6xl font-serif text-[#4a3728] mb-10 leading-tight">Um pedaço da Suíça na Mantiqueira.</h2>
              <p className="text-slate-500 leading-relaxed text-lg font-light mb-10">
                O Matterhorn é o coração gastronômico de Campos do Jordão. Oferecemos o fondue mais premiado da serra, 
                uma adega com rótulos raros e suítes que transportam você diretamente para os Alpes Suíços.
              </p>
              <button className="group flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.4em] text-[#4a3728]">
                Nossa História 
                <span className="w-16 h-[1px] bg-[#4a3728] group-hover:w-24 transition-all"></span>
              </button>
            </div>
          </div>
        </section>

        {/* SEÇÃO ACOMODAÇÕES */}
        <section id="acomodacoes" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <span className="text-[#4a3728]/40 text-[10px] font-bold uppercase tracking-[0.5em] mb-6 block">Hospedagem Matterhorn</span>
              <h2 className="text-5xl md:text-7xl font-serif text-[#4a3728]">Suítes & Chalés</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
              {HOTELS.map(hotel => (
                <HotelCard 
                  key={hotel.id} 
                  hotel={hotel} 
                  onClick={(h) => setSelectedHotel(h)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* SEÇÃO GASTRONOMIA */}
        <section id="gastronomia" className="relative py-56 px-6 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=2000" 
              className="w-full h-full object-cover brightness-[0.3] scale-110 hover:scale-100 transition-transform duration-[10s]"
              alt="Fondue Experience"
            />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <span className="text-amber-500 text-[10px] font-bold uppercase tracking-[0.5em] mb-8 block">Experiência Gastronômica</span>
            <h2 className="text-6xl md:text-8xl font-serif text-white mb-10">O Fondue Perfeito.</h2>
            <p className="text-white/70 leading-relaxed text-xl font-light mb-14 max-w-2xl mx-auto">
              Queijos suíços selecionados, carnes nobres e chocolate artesanal. Uma jornada de sabores acompanhada por nossa adega exclusiva.
            </p>
            <button className="px-12 py-5 bg-white text-[#4a3728] text-[10px] font-bold uppercase tracking-widest hover:bg-[#4a3728] hover:text-white transition-all shadow-2xl">
              Explorar Cardápio
            </button>
          </div>
        </section>

        {/* SEÇÃO RESERVAS */}
        <section id="contato" className="py-32 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20">
              <span className="text-[#4a3728]/40 text-[10px] font-bold uppercase tracking-[0.5em] mb-4 block">Planeje sua Visita</span>
              <h2 className="text-5xl font-serif text-[#4a3728]">Reservas</h2>
              <div className="w-16 h-[1px] bg-amber-800 mx-auto mt-6"></div>
            </div>
            
            <div className="bg-[#fdfbf7] p-8 md:p-20 rounded-sm shadow-2xl border border-slate-50">
              <ReservationForm />
            </div>

            <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
              <div className="space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-amber-800">Endereço</p>
                <p className="text-slate-600 text-sm font-light leading-relaxed">R. Djalma Forjaz, 93 - Capivari<br/>Campos do Jordão - SP</p>
              </div>
              <div className="space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-amber-800">Atendimento</p>
                <p className="text-[#4a3728] font-bold text-2xl tracking-tighter">(12) 3663-1741</p>
                <p className="text-slate-400 text-[9px] uppercase tracking-widest">Todos os dias das 12h às 00h</p>
              </div>
              <div className="space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-amber-800">Social</p>
                <div className="flex justify-center gap-8">
                  <a href="#" className="text-[#4a3728] font-bold text-[11px] uppercase tracking-widest border-b border-[#4a3728]/20 hover:border-[#4a3728] transition-all">Instagram</a>
                  <a href="#" className="text-[#4a3728] font-bold text-[11px] uppercase tracking-widest border-b border-[#4a3728]/20 hover:border-[#4a3728] transition-all">Facebook</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0f0c0b] text-white py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16">
          <div className="text-center md:text-left">
            <h2 className="text-5xl font-script text-white mb-2">Matterhorn</h2>
            <p className="text-white/20 text-[9px] font-bold uppercase tracking-[0.5em]">Swiss Excellence since 1993</p>
          </div>
          <div className="flex gap-16 text-[10px] font-bold uppercase tracking-widest text-white/30">
             <a href="#" className="hover:text-white transition-colors">Privacidade</a>
             <a href="#" className="hover:text-white transition-colors">Imprensa</a>
             <a href="#" className="hover:text-white transition-colors">Carreiras</a>
          </div>
          <p className="text-white/10 text-[9px] font-mono tracking-tighter">© 2024 Matterhorn Group Brazil.</p>
        </div>
      </footer>

      <AIConcierge />
      
      {selectedHotel && (
        <BookingModal hotel={selectedHotel} onClose={() => setSelectedHotel(null)} />
      )}
    </div>
  );
};

export default App;
