export interface Video {
  title: string;
  url: string;
  type: 'direct' | 'playlist';
  playlistIndex?: number;
}

export interface ProvinceData {
  id: string; // SVG id
  name: string;
  alerts: number;
  videos: Video[];
}

export const provincesData: Record<string, ProvinceData> = {
  ECP: {
    id: 'ECP',
    name: 'Pichincha',
    alerts: 45,
    videos: [
      { title: 'Brandon Garcés', url: 'XxBagejkMZc', type: 'direct' },
      { title: 'Fernanda Revelo', url: 'efZTKGiSGLE', type: 'direct' },
    ],
  },
  ECA: {
    id: 'ECA',
    name: 'Azuay',
    alerts: 32,
    videos: [
      { title: 'Ismael Yupa', url: '3lB6tsd7Bog', type: 'direct' },
      { title: 'Domenica Najera', url: 'CfYpjSOkLwE', type: 'direct' },
      { title: 'Doménica Guiracocho', url: 'HDV_zSun0X8', type: 'direct' },
      { title: 'Juan Pablo Cáceres', url: 'HoH6yQztBXQ', type: 'direct' },
      { title: 'Justin Mendez', url: 'cFAbHmR2ENI', type: 'direct' },
      { title: 'Nancy Fernandez', url: 'uSQZotknGCs', type: 'direct' },
    ],
  },
  ECL: {
    id: 'ECL',
    name: 'Loja',
    alerts: 28,
    videos: [
      { title: 'Andrea Leon', url: 'ZVeKtcz1KxA', type: 'direct' },
      { title: 'Ricardo Yunga', url: 'BrRfZ7Woey4', type: 'direct' },
      { title: 'Jorge Vanegas', url: 'CzzA3oWHEEo', type: 'direct' },
      { title: 'Johanna Moreno', url: 'EMYc1gEEZzc', type: 'direct' },
      { title: 'Leyeska Méndez', url: 'IV5DmBrRSNY', type: 'direct' },
      { title: 'Johanna Moreno (2)', url: 'O9FMPTWR3LQ', type: 'direct' },
      { title: 'Irania Angamarca', url: 'PF3rDXNxVkY', type: 'direct' },
      { title: 'Rebeca Valarezo', url: 'ttehkkohbGo', type: 'direct' },
    ],
  },
  ECG: {
    id: 'ECG',
    name: 'Guayas',
    alerts: 56,
    videos: [
      { title: 'Alisson López', url: '1s-4V4gvMAs', type: 'direct' },
      { title: 'Isai Castrillón', url: '8NkeWS_4erI', type: 'direct' },
      { title: 'Allison Sánchez', url: 's7Evxlf79pc', type: 'direct' },
      { title: 'Gema Cobeña', url: '6wGk_NEGfjA', type: 'direct' },
      { title: 'Tanya Zambrano', url: 'Kum4hXOoCis', type: 'direct' },
    ],
  },
  ECO: {
    id: 'ECO',
    name: 'El Oro',
    alerts: 19,
    videos: [
      { title: 'Kristel Loja', url: 'FoOotNt7iTo', type: 'direct' },
      { title: 'Robert Enrique', url: 'ajY0M4FQy7k', type: 'direct' },
      { title: 'Aranzha Matamoros', url: 'oDpOqQHQcOs', type: 'direct' },
    ],
  },
  ECM: {
    id: 'ECM',
    name: 'Manabí',
    alerts: 22,
    videos: [],
  },
  ECX: {
    id: 'ECX', 
    name: 'Cotopaxi',
    alerts: 22,
    videos: [],
  },
  ECT: {
    id: 'ECT',
    name: 'Tungurahua',
    alerts: 31,
    videos: [],
  },
  ECH: {
    id: 'ECH',
    name: 'Chimborazo',
    alerts: 30,
    videos: [],
  },
  ECI: {
    id: 'ECI',
    name: 'Imbabura',
    alerts: 9,
    videos: [],
  },
  ECC: {
    id: 'ECC',
    name: 'Carchi',
    alerts: 1,
    videos: [],
  },
  ECF: {
    id: 'ECF',
    name: 'Cañar',
    alerts: 5,
    videos: [],
  },
  ECB: {
    id: 'ECB',
    name: 'Bolívar', 
    alerts: 42,
    videos: [],
  },

  ECE: {
    id: 'ECE',
    name: 'Esmeraldas',
    alerts: 12,
    videos: [],
  },
  ECR: {
    id: 'ECR',
    name: 'Los Ríos',
    alerts: 22,
    videos: [],
  },
  ECSE: {
    id: 'ECSE',
    name: 'Santa Elena',
    alerts: 4,
    videos: [],
  },
  ECSD: {
    id: 'ECSD',
    name: 'Santo Domingo',
    alerts: 8,
    videos: [],
  },

  ECU: {
    id: 'ECU',
    name: 'Sucumbíos',
    alerts: 16,
    videos: [],
  },
  ECN: {
    id: 'ECN',
    name: 'Napo',
    alerts: 7,
    videos: [],
  },
  ECY: {
    id: 'ECY',
    name: 'Pastaza',
    alerts: 20,
    videos: [],
  },
  ECS: {
    id: 'ECS',
    name: 'Morona Santiago',
    alerts: 23,
    videos: [],
  },
  ECZ: {
    id: 'ECZ',
    name: 'Zamora Chinchipe',
    alerts: 3,
    videos: [],
  },
};
