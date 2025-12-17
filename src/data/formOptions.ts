export type SelectOption = {
  value: string
  label: string
}

export const provinciasOptions: SelectOption[] = [
  { value: '', label: 'Selecciona una provincia' },
  { value: 'Azuay', label: 'Azuay' },
  { value: 'Bolívar', label: 'Bolívar' },
  { value: 'Cañar', label: 'Cañar' },
  { value: 'Carchi', label: 'Carchi' },
  { value: 'Chimborazo', label: 'Chimborazo' },
  { value: 'Cotopaxi', label: 'Cotopaxi' },
  { value: 'El Oro', label: 'El Oro' },
  { value: 'Esmeraldas', label: 'Esmeraldas' },
  { value: 'Galápagos', label: 'Galápagos' },
  { value: 'Guayas', label: 'Guayas' },
  { value: 'Imbabura', label: 'Imbabura' },
  { value: 'Loja', label: 'Loja' },
  { value: 'Los Ríos', label: 'Los Ríos' },
  { value: 'Manabí', label: 'Manabí' },
  { value: 'Morona Santiago', label: 'Morona Santiago' },
  { value: 'Napo', label: 'Napo' },
  { value: 'Orellana', label: 'Orellana' },
  { value: 'Pastaza', label: 'Pastaza' },
  { value: 'Pichincha', label: 'Pichincha' },
  { value: 'Santa Elena', label: 'Santa Elena' },
  { value: 'Santo Domingo de los Tsáchilas', label: 'Santo Domingo de los Tsáchilas' },
  { value: 'Sucumbíos', label: 'Sucumbíos' },
  { value: 'Tungurahua', label: 'Tungurahua' },
  { value: 'Zamora Chinchipe', label: 'Zamora Chinchipe' },
]

export const tipoAgresionOptions: SelectOption[] = [
  { value: '', label: 'Selecciona el tipo' },
  { value: 'Acoso en línea', label: 'Acoso en línea' },
  { value: 'Amenazas', label: 'Amenazas' },
  { value: 'Violencia física', label: 'Violencia física' },
  { value: 'Violencia psicológica', label: 'Violencia psicológica' },
  { value: 'Discriminación laboral', label: 'Discriminación laboral' },
  { value: 'Acoso sexual', label: 'Acoso sexual' },
  { value: 'Censura', label: 'Censura' },
  { value: 'Despido injustificado', label: 'Despido injustificado' },
  { value: 'Otro', label: 'Otro' },
]
