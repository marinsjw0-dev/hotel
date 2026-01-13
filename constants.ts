
import { Hotel } from './types';

export const HOTELS: Hotel[] = [
  {
    id: '1',
    name: 'Matterhorn Signature Suite',
    location: 'Zermatt, Suíça',
    description: 'A joia da nossa coleção. Uma suíte que oferece a vista mais icônica do mundo diretamente da sua cama king-size, complementada por uma lareira de pedra natural.',
    pricePerNight: 2450,
    rating: 5.0,
    reviewsCount: 1240,
    images: [
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?auto=format&fit=crop&q=80&w=1200'
    ],
    amenities: ['Vista para o Matterhorn', 'Jacuzzi Privativa', 'Serviço de Mordomo', 'Adega Climatizada'],
    category: 'Luxury'
  },
  {
    id: '2',
    name: 'Alpine Chalet Deluxe',
    location: 'Zermatt Village',
    description: 'O equilíbrio perfeito entre o rústico alpino e o minimalismo moderno. Localizado no coração da vila, com acesso exclusivo ao nosso SPA de águas termais.',
    pricePerNight: 1890,
    rating: 4.9,
    reviewsCount: 850,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1200'
    ],
    amenities: ['Lareira Central', 'Acesso ao SPA', 'Terraço Panorâmico', 'Sistema de Som Bang & Olufsen'],
    category: 'Boutique'
  },
  {
    id: '3',
    name: 'Summit View Residence',
    location: 'Higher Zermatt',
    description: 'Para quem busca isolamento e silêncio. Uma residência completa no topo da montanha, acessível por teleférico privativo, com vistas infinitas para as geleiras.',
    pricePerNight: 3200,
    rating: 5.0,
    reviewsCount: 420,
    images: [
      'https://images.unsplash.com/photo-1491555103944-7c647fd857e6?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1518739144867-c6191779d012?auto=format&fit=crop&q=80&w=1200'
    ],
    amenities: ['Teleférico Privativo', 'Cozinha Profissional', 'Cinema Particular', 'Piso Térmico'],
    category: 'Luxury'
  }
];

export const AMENITIES_LIST = [
  'Heliporto', 'Concierge 24h', 'Adega de Vinhos', 'SPA Holístico', 'Gastronomia Michelin', 'Ski Lounge'
];
