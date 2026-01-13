
import React, { useEffect, useState } from 'react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4 ${
      scrolled ? 'bg-white shadow-md' : 'bg-transparent text-white'
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-serif text-xl font-bold transition-colors ${
            scrolled ? 'bg-[#4a3728] text-white' : 'bg-white text-[#4a3728]'
          }`}>M</div>
          <span className={`text-2xl font-serif font-bold tracking-widest uppercase ${
            scrolled ? 'text-[#4a3728]' : 'text-white'
          }`}>Matterhorn</span>
        </div>
        
        <div className="hidden lg:flex items-center gap-10 text-xs font-bold uppercase tracking-[0.2em]">
          <a href="#sobre" className="hover:opacity-60 transition-opacity">O Grupo</a>
          <a href="#acomodacoes" className="hover:opacity-60 transition-opacity">Acomodações</a>
          <a href="#gastronomia" className="hover:opacity-60 transition-opacity">Gastronomia</a>
          <a href="#contato" className="hover:opacity-60 transition-opacity">Contato</a>
        </div>

        <button className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${
          scrolled 
            ? 'bg-[#4a3728] text-white border-[#4a3728] hover:bg-transparent hover:text-[#4a3728]' 
            : 'bg-white text-[#4a3728] border-white hover:bg-transparent hover:text-white'
        }`}>
          Reservar Agora
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
