export type Tarifa = {
  id: number;
  categoria: string;
  nombre_servicio: string;
  precio: number;
  duracion_minutos: number;
};

export type Cita = {
  id?: number;
  cliente: string;
  servicio: string;
  hora: string; // "HH:MM"
  empleado: string;
  estado: 'pendiente' | 'confirmada' | 'cancelada' | 'cobrada';
  fecha: string; // "YYYY-MM-DD"
  origen: string;
};

export type Bloqueo = {
  empleado: string; // "todas" o nombre de especialista
  fecha_inicio: string;
  fecha_fin: string;
  hora_inicio: string | null;
  hora_fin: string | null;
};

export const ESPECIALISTAS = ['Esteticista 1', 'Esteticista 2', 'Esteticista 3'];
