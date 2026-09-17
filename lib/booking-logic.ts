import { Cita, Bloqueo, Tarifa, ESPECIALISTAS } from './booking-types';

export function isoFecha(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function capitalizar(t: string): string {
  if (!t) return '';
  return t
    .trim()
    .toLowerCase()
    .split(' ')
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(' ');
}

export function esSabado(iso: string): boolean {
  return new Date(iso + 'T12:00:00').getDay() === 6;
}
export function esDomingo(iso: string): boolean {
  return new Date(iso + 'T12:00:00').getDay() === 0;
}

// Horario: lun-vie 10-20 cada 15min, sábado 10-14, domingo cerrado.
function generarHoras(inicio: number, fin: number): string[] {
  const horas: string[] = [];
  for (let h = inicio; h < fin; h++) {
    horas.push(`${String(h).padStart(2, '0')}:00`);
    horas.push(`${String(h).padStart(2, '0')}:15`);
    horas.push(`${String(h).padStart(2, '0')}:30`);
    horas.push(`${String(h).padStart(2, '0')}:45`);
  }
  return horas;
}
const HORAS_SEMANA = generarHoras(10, 20);
const HORAS_SABADO = generarHoras(10, 14);

export function horasParaDia(iso: string): string[] {
  if (esDomingo(iso)) return [];
  if (esSabado(iso)) return HORAS_SABADO;
  return HORAS_SEMANA;
}

function toMin(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

// ¿Está el día `iso` cerrado para TODO el personal (bloqueo de día completo)?
export function diaCerradoPorBloqueo(iso: string, bloqueosMes: Bloqueo[]): boolean {
  return bloqueosMes.some((b) => {
    if (b.empleado !== 'todas') return false;
    if (b.hora_inicio || b.hora_fin) return false; // bloqueo parcial, no cierra el día entero
    return b.fecha_inicio <= iso && iso <= b.fecha_fin;
  });
}

export type SlotDisponibilidad = { hora: string; libres: string[] };

// Para un día y servicio dados, calcula qué horas tienen al menos una
// especialista libre (mismo algoritmo que el sistema anterior: comprueba
// solapes de duración por especialista, y bloqueos parciales/totales).
export function calcularSlotsDisponibles(params: {
  iso: string;
  duracionMin: number;
  citasDia: Cita[];
  bloqueosDia: Bloqueo[];
  todasTarifas: Tarifa[];
}): SlotDisponibilidad[] {
  const { iso, duracionMin, citasDia, bloqueosDia, todasTarifas } = params;
  const horas = horasParaDia(iso);

  const bloqueado = (esp: string, slotMin: number): boolean => {
    return bloqueosDia.some((b) => {
      if (b.empleado !== 'todas' && b.empleado.toLowerCase() !== esp.toLowerCase()) return false;
      if (!b.hora_inicio && !b.hora_fin) return true;
      const bIni = b.hora_inicio ? toMin(b.hora_inicio) : 0;
      const bFin = b.hora_fin ? toMin(b.hora_fin) : 24 * 60;
      return bIni < slotMin + duracionMin && slotMin < bFin;
    });
  };

  return horas.map((slotHora) => {
    const slotMin = toMin(slotHora);
    const libres = ESPECIALISTAS.filter((esp) => {
      if (bloqueado(esp, slotMin)) return false;
      return !citasDia.some((c) => {
        if ((c.empleado || '').toLowerCase() !== esp.toLowerCase()) return false;
        const citaMin = toMin(c.hora);
        const tRef = todasTarifas.find((t) => t.nombre_servicio === c.servicio);
        const citaDur = tRef ? tRef.duracion_minutos : 60;
        return citaMin < slotMin + duracionMin && slotMin < citaMin + citaDur;
      });
    });
    return { hora: slotHora, libres };
  });
}
