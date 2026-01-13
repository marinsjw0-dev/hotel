
import React, { useState, useEffect } from 'react';
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
    <div className="min-h-screen selection:bg-[#4a3728] selection:text-white">
      <Navbar />

      <main>
        {/* HERO SECTION - INSPIRADA NA IMAGEM ENVIADA (CAMPOS DO JORDÃO) */}
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="w-full h-full hero-bg"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#fdfbf7] via-transparent to-black/40"></div>
          </div>
          
          <div className="relative z-10 text-center px-6 max-w-5xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h1 className="text-7xl md:text-[120px] font-script text-white mb-2 drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
              Matterhorn
            </h1>
            <p className="text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mb-12 drop-shadow-md">
              Restaurante e Empório Campos do Jordão
            </p>
            
            <a href="#contato" className="bg-white text-[#4a3728] font-bold uppercase text-[10px] tracking-widest px-12 py-5 rounded-full hover:bg-[#4a3728] hover:text-white transition-all duration-500 shadow-2xl">
              Solicitar Reserva Online
            </a>
          </div>
          
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <button className="w-12 h-12 flex items-center justify-center text-white/30 hover:text-white transition-colors">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 19l-7-7 7-7"/></svg>
            </button>
          </div>
          <div className="absolute inset-y-0 right-6 flex items-center pointer-events-none">
            <button className="w-12 h-12 flex items-center justify-center text-white/30 hover:text-white transition-colors">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </section>

        {/* SEÇÃO O GRUPO */}
        <section id="sobre" className="py-32 px-6 bg-white">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2 relative">
              <img 
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1200" 
                className="relative z-10 w-full rounded-sm shadow-2xl"
                alt="Herança Matterhorn"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#4a3728] px-8 py-10 text-white z-20">
                <span className="font-serif text-4xl block mb-2 italic">Luxo</span>
                <p className="text-[9px] font-bold uppercase tracking-widest leading-relaxed">Referência em <br/>Campos do Jordão</p>
              </div>
            </div>
            <div className="lg:w-1/2">
              <span className="text-[#4a3728]/40 text-[10px] font-bold uppercase tracking-[0.4em] mb-6 block">Nossa Essência</span>
              <h2 className="text-5xl md:text-6xl font-serif text-[#4a3728] mb-10 leading-tight">Um pedaço da Suíça <br/>na Serra da Mantiqueira.</h2>
              <p className="text-slate-500 leading-relaxed text-lg font-light mb-8">
                O Matterhorn é mais que um restaurante; é um destino sensorial. Localizado no coração da Vila Capivari, 
                oferecemos uma curadoria exclusiva de queijos, vinhos e o fondue mais premiado da região.
              </p>
              <button className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#4a3728]">
                Descobrir o Empório 
                <span className="w-12 h-[1px] bg-[#4a3728] group-hover:w-20 transition-all"></span>
              </button>
            </div>
          </div>
        </section>

        {/* SEÇÃO ACOMODAÇÕES */}
        <section id="acomodacoes" className="bg-[#fdfbf7] py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <span className="text-[#4a3728]/40 text-[10px] font-bold uppercase tracking-[0.4em] mb-6 block">Hospedagem Matterhorn</span>
              <h2 className="text-5xl md:text-7xl font-serif text-[#4a3728]">Suítes Exclusivas</h2>
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
        <section id="gastronomia" className="relative py-48 px-6 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1574966739982-2b783cb1f5f9?auto=format&fit=crop&q=80&w=2000" 
              className="w-full h-full object-cover brightness-[0.4]"
              alt="Dining Experience"
            />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2">
              <span className="text-amber-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-6 block">Fondue & Wine Bar</span>
              <h2 className="text-5xl md:text-7xl font-serif text-white mb-10 leading-tight">O Sabor da <br/>Tradição Alpinista.</h2>
              <p className="text-white/60 leading-relaxed text-xl font-light mb-12">
                Especialistas em Fondue, Raclette e uma carta de vinhos selecionada com os melhores rótulos do velho e novo mundo.
              </p>
              <button className="px-10 py-4 bg-white text-[#4a3728] text-[10px] font-bold uppercase tracking-widest hover:bg-[#4a3728] hover:text-white transition-all">
                Ver Cardápio
              </button>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
               <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=600" className="rounded-sm w-full h-80 object-cover mt-12 shadow-2xl" alt="Wine" />
               <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=600" className="rounded-sm w-full h-80 object-cover shadow-2xl" alt="Dish" />
            </div>
          </div>
        </section>

        {/* SEÇÃO RESERVAS / CONTATO - NOVA IMPLEMENTAÇÃO CONFORME IMAGEM */}
        <section id="contato" className="py-32 px-6 bg-white border-b border-slate-100">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif text-[#4a3728] mb-4">Reservas</h2>
              <div className="w-12 h-[1px] bg-[#4a3728]/20 mx-auto"></div>
            </div>
            
            <div className="bg-[#fdfbf7] p-8 md:p-16 rounded-sm shadow-sm border border-slate-50">
              <ReservationForm />
            </div>

            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-300 mb-2">Endereço</p>
                <p className="text-slate-600 text-sm font-light">R. Djalma Forjaz, 93 - Capivari<br/>Campos do Jordão - SP</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-300 mb-2">Telefone</p>
                <p className="text-[#4a3728] font-bold text-lg">(12) 3663-1741</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-300 mb-2">Social</p>
                <div className="flex justify-center gap-6">
                  <a href="#" className="text-[#4a3728] hover:opacity-50 transition-opacity">Instagram</a>
                  <a href="#" className="text-[#4a3728] hover:opacity-50 transition-opacity">Facebook</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0f0c0b] text-white py-24 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
          <div>
            <h2 className="text-4xl font-script text-white mb-2">Matterhorn</h2>
            <p className="text-white/20 text-[9px] font-bold uppercase tracking-[0.4em]">Restaurante, Empório e Hotel</p>
          </div>
          <p className="text-white/20 text-[10px] max-w-xs leading-relaxed">
            Uma tradição de sabor e requinte no coração de Campos do Jordão desde 1993.
          </p>
          <p className="text-white/20 text-[10px]">© 2024 Matterhorn. Todos os direitos reservados.</p>
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
