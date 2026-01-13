
import React, { useState } from 'react';
import { Hotel } from '../types';

interface HotelCardProps {
  hotel: Hotel;
  onClick: (hotel: Hotel) => void;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div 
      className="group bg-transparent cursor-pointer transition-all duration-700"
      onClick={() => onClick(hotel)}
    >
      <div className="relative aspect-[4/5] overflow-hidden mb-8">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-slate-100 animate-pulse flex items-center justify-center">
             <div className="w-6 h-6 border border-[#4a3728]/20 border-t-[#4a3728] rounded-full animate-spin"></div>
          </div>
        )}

        <img 
          src={hotel.images[0]} 
          alt={hotel.name}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500"></div>
        
        <div className="absolute bottom-8 left-8 right-8 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
           <span className="text-[9px] font-bold uppercase tracking-[0.4em] mb-3 block opacity-70">{hotel.location}</span>
           <h3 className="text-3xl font-serif font-bold mb-4">{hotel.name}</h3>
           <div className="w-10 h-[1px] bg-white group-hover:w-full transition-all duration-700"></div>
        </div>
      </div>

      <div className="px-2">
        <p className="text-slate-400 text-xs leading-relaxed mb-6 line-clamp-2 font-light">
          {hotel.description}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-[8px] font-bold uppercase tracking-widest text-slate-300">Reserva desde</span>
            <span className="text-xl font-serif font-bold text-[#4a3728]">R$ {hotel.pricePerNight}</span>
          </div>
          <button className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#4a3728] py-2 border-b border-transparent hover:border-[#4a3728] transition-all">
            Descobrir
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
