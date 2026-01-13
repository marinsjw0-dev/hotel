
import { Hotel } from './types';

export const HOTELS: Hotel[] = [
  {
    id: '1',
    name: 'Suíte Matterhorn Luxury',
    location: 'Vila Capivari, Campos do Jordão',
    description: 'Nossa suíte master com decoração alpina autêntica, lareira privativa e enxoval de fios egípcios. Localizada no coração do Capivari, oferece o máximo em exclusividade.',
    pricePerNight: 1250,
    rating: 5.0,
    reviewsCount: 840,
    images: [
      'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=1200'
    ],
    amenities: ['Lareira', 'Café da Manhã Gourmet', 'Adega Privativa', 'Lençóis Térmicos'],
    category: 'Luxury'
  },
  {
    id: '2',
    name: 'Chalet Edelweiss',
    location: 'Vila Capivari, Campos do Jordão',
    description: 'Um refúgio romântico inspirado nos chalés suíços. Perfeito para casais que buscam privacidade e o conforto térmico da arquitetura enxaimel original.',
    pricePerNight: 890,
    rating: 4.9,
    reviewsCount: 450,
    images: [
      'https://images.unsplash.com/photo-1512918766671-ed6a07be061f?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1200'
    ],
    amenities: ['Arquitetura Enxaimel', 'Vista para o Vale', 'Enxoval Premium', 'Mimos do Chef'],
    category: 'Boutique'
  },
  {
    id: '3',
    name: 'Suíte Fondue Experience',
    location: 'Vila Capivari, Campos do Jordão',
    description: 'Localizada acima do nosso premiado restaurante, esta suíte oferece o melhor do lifestyle Matterhorn com serviço exclusivo do nosso cardápio de fondues no quarto.',
    pricePerNight: 950,
    rating: 4.8,
    reviewsCount: 310,
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200'
    ],
    amenities: ['Jantar Incluso', 'Acesso ao Empório', 'Decoração Clássica', 'Chá da Tarde'],
    category: 'Luxury'
  }
];

export const AMENITIES_LIST = [
  'Restaurante de Fondue', 'Empório de Queijos', 'Adega Climatizada', 'Concierge Especializado', 'Eventos Românticos'
];
