'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Tarifa, Cita, Bloqueo } from '@/lib/booking-types';
import { isoFecha, capitalizar, esDomingo, diaCerradoPorBloqueo, calcularSlotsDisponibles, SlotDisponibilidad } from '@/lib/booking-logic';
import { site } from '@/lib/site-data';
import CancelModal from './CancelModal';

const MESES_ES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const DIAS_ES = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'];

type Paso = 1 | 2 | 3 | 4;

export default function BookingWizard() {
  const searchParams = useSearchParams();
  const [paso, setPaso] = useState<Paso>(1);

  // Servicios
  const [tarifas, setTarifas] = useState<Tarifa[]>([]);
  const [cargandoServicios, setCargandoServicios] = useState(true);
  const [categoria, setCategoria] = useState('Todas');
  const [busqueda, setBusqueda] = useState('');
  const [servicio, setServicio] = useState<Tarifa | null>(null);

  // Calendario / horas
  const [calAnio, setCalAnio] = useState(new Date().getFullYear());
  const [calMes, setCalMes] = useState(new Date().getMonth());
  const [citasMes, setCitasMes] = useState<Cita[]>([]);
  const [bloqueosMes, setBloqueosMes] = useState<Bloqueo[]>([]);
  const [fecha, setFecha] = useState<string | null>(null);
  const [slots, setSlots] = useState<SlotDisponibilidad[]>([]);
  const [hora, setHora] = useState<string | null>(null);
  const [especialista, setEspecialista] = useState<string | null>(null);
  const [cargandoHoras, setCargandoHoras] = useState(false);

  // Contacto
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [notas, setNotas] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mostrarCancelar, setMostrarCancelar] = useState(false);

  useEffect(() => {
    const servicioParam = searchParams.get('servicio');
    if (servicioParam) setBusqueda(servicioParam);
  }, [searchParams]);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from('tarifas').select('*').order('categoria');
      if (!error) setTarifas(data || []);
      setCargandoServicios(false);
    })();
  }, []);

  useEffect(() => {
    if (paso !== 2) return;
    (async () => {
      const desde = isoFecha(new Date(calAnio, calMes, 1));
      const hasta = isoFecha(new Date(calAnio, calMes + 1, 0));
      const { data: citas } = await supabase.from('citas').select('fecha,hora,empleado,servicio').gte('fecha', desde).lte('fecha', hasta);
      setCitasMes((citas as Cita[]) || []);
      const { data: bq } = await supabase.from('bloqueos').select('*').lte('fecha_inicio', hasta).gte('fecha_fin', desde);
      setBloqueosMes((bq as Bloqueo[]) || []);
    })();
  }, [paso, calAnio, calMes]);

  const seleccionarDia = async (iso: string) => {
    setFecha(iso);
    setHora(null);
    setEspecialista(null);
    setCargandoHoras(true);
    const citasDia = citasMes.filter((c) => (c as any).fecha === iso);
    const bloqueosDia = bloqueosMes.filter((b) => b.fecha_inicio <= iso && iso <= b.fecha_fin);
    const resultado = calcularSlotsDisponibles({
      iso,
      duracionMin: servicio?.duracion_minutos ?? 60,
      citasDia,
      bloqueosDia,
      todasTarifas: tarifas,
    });
    setSlots(resultado);
    setCargandoHoras(false);
  };

  const seleccionarHora = (h: string, libres: string[]) => {
    setHora(h);
    setEspecialista(libres[0] ?? null);
  };

  const confirmarReserva = async () => {
    setError(null);
    if (!nombre.trim()) return setError('Escribe tu nombre.');
    if (!telefono.trim()) return setError('Escribe tu teléfono.');
    if (!servicio || !fecha || !hora) return setError('Falta seleccionar servicio, fecha u hora.');

    setEnviando(true);
    const nombreCap = capitalizar(nombre.trim());
    const empleadoFinal = especialista ?? 'Esteticista 1';

    // Ficha de cliente — mejor esfuerzo, identificado por teléfono (nunca
    // por nombre, puede haber varias personas con el mismo nombre). Si
    // falla, la reserva sigue adelante igualmente: nunca debe bloquear.
    try {
      const { data: byPhoneRows } = await supabase.rpc('buscar_cliente_por_telefono', { p_telefono: telefono.trim() });
      const byPhone = byPhoneRows && byPhoneRows.length ? byPhoneRows[0] : null;

      if (byPhone) {
        await supabase.from('clientes').update({ nombre: nombreCap, ...(email ? { email } : {}) }).eq('id', byPhone.id);
      } else {
        await supabase.from('clientes').insert([{ nombre: nombreCap, telefono: telefono.trim(), email, notas_tecnicas: notas }]);
      }
    } catch (errFicha) {
      console.error('No se pudo guardar la ficha del cliente (la reserva continúa igualmente):', errFicha);
    }

    // Inserción de la cita — esto es lo único imprescindible.
    const payload: Cita = {
      cliente: nombreCap,
      servicio: servicio.nombre_servicio,
      hora,
      empleado: empleadoFinal,
      estado: 'pendiente',
      fecha,
      origen: 'web',
    };
    const { error: eCita } = await supabase.from('citas').insert([payload]);

    if (eCita) {
      setError('No hemos podido completar la reserva: ' + eCita.message);
      setEnviando(false);
      return;
    }

    setEspecialista(empleadoFinal);

    // Email de confirmación — "mejor esfuerzo": si falla, la reserva ya
    // está guardada y no bloqueamos el éxito por esto.
    try {
      await fetch('/api/booking-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: email.trim() || undefined,
          nombre: nombreCap,
          servicio: servicio.nombre_servicio,
          fecha,
          hora,
          especialista: empleadoFinal,
          precio: Number(servicio.precio),
        }),
      });
    } catch (errEmail) {
      console.error('No se pudo enviar el email de confirmación (la reserva ya está guardada):', errEmail);
    }

    setEnviando(false);
    setPaso(4);
  };

  const nuevaReserva = () => {
    setServicio(null);
    setFecha(null);
    setHora(null);
    setEspecialista(null);
    setNombre('');
    setTelefono('');
    setEmail('');
    setNotas('');
    setPaso(1);
  };

  // La pantalla de reservas no debe mostrar bonos (se compran en /tienda,
  // no se "reservan" como una cita) ni la categoría "Venta Productos".
  // OJO: para el cálculo de huecos ocupados seguimos usando `tarifas`
  // completo (sin filtrar), porque una cita ya existente puede tener un
  // servicio que aquí no se ofrezca reservar, y necesitamos su duración
  // real para no pisar ese hueco.
  const tarifasReservables = tarifas.filter(
    (t) => t.categoria !== 'Venta Productos' && !t.nombre_servicio.toLowerCase().includes('bono')
  );

  const categorias = ['Todas', ...Array.from(new Set(tarifasReservables.map((t) => t.categoria))).sort((a, b) => a.localeCompare(b, 'es'))];
  const serviciosFiltrados = tarifasReservables.filter((t) => {
    const okCat = categoria === 'Todas' || t.categoria === categoria;
    const okBusqueda = !busqueda || t.nombre_servicio.toLowerCase().includes(busqueda.toLowerCase());
    return okCat && okBusqueda;
  });

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16 pb-28">
      <p className="text-gold-dark text-sm mb-3">Argüelles, Madrid</p>
      <h1 className="font-display text-3xl sm:text-4xl text-ink mb-2">Reservar Cita</h1>
      <p className="text-stone text-sm mb-2">{site.name}</p>
      <button onClick={() => setMostrarCancelar(true)} className="text-xs text-stone hover:text-gold-dark underline mb-8">
        ¿Ya tienes una reserva y quieres cancelarla?
      </button>

      {mostrarCancelar && <CancelModal onClose={() => setMostrarCancelar(false)} />}

      {/* Stepper */}
      <div className="flex items-center gap-2 mb-10 text-xs">
        {(['Servicio', 'Fecha y hora', 'Tus datos'] as const).map((label, i) => {
          const n = (i + 1) as Paso;
          const activo = paso === n;
          const hecho = paso > n;
          return (
            <div key={label} className="flex items-center gap-2 flex-1">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border ${
                  hecho ? 'bg-gold border-gold text-charcoal-dark' : activo ? 'border-gold-dark text-gold-dark' : 'border-ink/20 text-stone'
                }`}
              >
                {hecho ? '✓' : n}
              </span>
              <span className={activo ? 'text-ink font-medium' : 'text-stone'}>{label}</span>
              {i < 2 && <span className="flex-1 h-px bg-ink/10" />}
            </div>
          );
        })}
      </div>

      {/* Paso 1: servicio */}
      {paso === 1 && (
        <div>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="w-full border border-ink/20 px-3 py-2 text-sm mb-3 bg-bone"
          >
            {categorias.map((c) => (
              <option key={c} value={c}>
                {c === 'Todas' ? 'Todas las categorías' : c}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Buscar servicio…"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full border border-ink/20 px-3 py-2 text-sm mb-6"
          />

          {cargandoServicios ? (
            <p className="text-stone text-sm">Cargando servicios…</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-3">
              {serviciosFiltrados.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setServicio(t)}
                  className={`text-left border-2 p-4 transition-colors ${
                    servicio?.id === t.id ? 'border-gold bg-gold/10' : 'border-ink/10 hover:border-gold/50'
                  }`}
                >
                  <p className="text-[10px] uppercase tracking-wide text-stone mb-1">{t.categoria}</p>
                  <p className="text-sm font-medium text-ink mb-2">{t.nombre_servicio}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-display text-gold-dark">{Number(t.precio).toFixed(2)} €</span>
                    <span className="text-[11px] text-stone bg-sand px-2 py-0.5">{t.duracion_minutos} min</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          <div className="fixed inset-x-0 bottom-0 bg-bone border-t border-gold/30 p-4">
            <button
              disabled={!servicio}
              onClick={() => setPaso(2)}
              className="max-w-3xl mx-auto block w-full px-4 py-3 text-sm font-medium bg-gold text-charcoal-dark hover:bg-gold-dark disabled:opacity-40 transition-colors"
            >
              Continuar →
            </button>
          </div>
        </div>
      )}

      {/* Paso 2: fecha y hora */}
      {paso === 2 && (
        <div>
          <button onClick={() => setPaso(1)} className="text-xs text-stone hover:text-gold-dark mb-4">
            ← Cambiar servicio
          </button>

          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => (calMes === 0 ? (setCalMes(11), setCalAnio((a) => a - 1)) : setCalMes((m) => m - 1))}
              className="w-8 h-8 border border-ink/20 hover:border-gold-dark"
            >
              ‹
            </button>
            <p className="font-display text-lg flex-1">{MESES_ES[calMes]} {calAnio}</p>
            <button
              onClick={() => (calMes === 11 ? (setCalMes(0), setCalAnio((a) => a + 1)) : setCalMes((m) => m + 1))}
              className="w-8 h-8 border border-ink/20 hover:border-gold-dark"
            >
              ›
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-6 text-center text-xs">
            {DIAS_ES.map((d) => (
              <div key={d} className="text-stone py-1">{d}</div>
            ))}
            {(() => {
              const primerDia = new Date(calAnio, calMes, 1);
              const diasMes = new Date(calAnio, calMes + 1, 0).getDate();
              const offset = (primerDia.getDay() + 6) % 7;
              const hoy = new Date();
              hoy.setHours(0, 0, 0, 0);
              const celdas = [];
              for (let i = 0; i < offset; i++) celdas.push(<div key={`e${i}`} />);
              for (let d = 1; d <= diasMes; d++) {
                const fechaDia = new Date(calAnio, calMes, d);
                const iso = isoFecha(fechaDia);
                const pasado = fechaDia < hoy;
                const cerrado = esDomingo(iso) || diaCerradoPorBloqueo(iso, bloqueosMes);
                const seleccionado = fecha === iso;
                celdas.push(
                  <button
                    key={iso}
                    disabled={pasado || cerrado}
                    onClick={() => seleccionarDia(iso)}
                    className={`aspect-square text-sm ${
                      seleccionado
                        ? 'bg-gold text-charcoal-dark font-medium'
                        : pasado || cerrado
                          ? 'text-ink/20 cursor-not-allowed'
                          : 'hover:bg-gold/10 text-ink'
                    }`}
                  >
                    {d}
                  </button>
                );
              }
              return celdas;
            })()}
          </div>

          {fecha && (
            <div>
              <p className="text-sm text-ink font-medium mb-3">Horas disponibles</p>
              {cargandoHoras ? (
                <p className="text-stone text-sm">Cargando…</p>
              ) : !slots.some((s) => s.libres.length > 0) ? (
                <p className="text-stone text-sm">No hay disponibilidad este día. Prueba con otro.</p>
              ) : (
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mb-24">
                  {slots.map(({ hora: h, libres }) => (
                    <button
                      key={h}
                      disabled={libres.length === 0}
                      onClick={() => seleccionarHora(h, libres)}
                      className={`py-2 text-xs border ${
                        hora === h
                          ? 'bg-gold border-gold text-charcoal-dark font-medium'
                          : libres.length === 0
                            ? 'border-ink/10 text-ink/20 cursor-not-allowed'
                            : 'border-ink/20 hover:border-gold text-ink'
                      }`}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="fixed inset-x-0 bottom-0 bg-bone border-t border-gold/30 p-4">
            <button
              disabled={!fecha || !hora}
              onClick={() => setPaso(3)}
              className="max-w-3xl mx-auto block w-full px-4 py-3 text-sm font-medium bg-gold text-charcoal-dark hover:bg-gold-dark disabled:opacity-40 transition-colors"
            >
              Continuar →
            </button>
          </div>
        </div>
      )}

      {/* Paso 3: datos de contacto + resumen */}
      {paso === 3 && (
        <div>
          <button onClick={() => setPaso(2)} className="text-xs text-stone hover:text-gold-dark mb-4">
            ← Cambiar fecha/hora
          </button>

          <div className="bg-sand/40 border border-ink/10 p-4 mb-6 text-sm space-y-1">
            <p><span className="text-stone">Servicio: </span>{servicio?.nombre_servicio}</p>
            <p><span className="text-stone">Fecha: </span>{fecha}</p>
            <p><span className="text-stone">Hora: </span>{hora}</p>
            <p><span className="text-stone">Precio: </span>{Number(servicio?.precio ?? 0).toFixed(2)} €</p>
          </div>

          <div className="space-y-4 mb-24">
            <div>
              <label className="block text-xs text-stone mb-1">Nombre *</label>
              <input value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full border border-ink/20 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs text-stone mb-1">Teléfono *</label>
              <input value={telefono} onChange={(e) => setTelefono(e.target.value)} className="w-full border border-ink/20 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs text-stone mb-1">Email (opcional)</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-ink/20 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs text-stone mb-1">Notas (opcional)</label>
              <textarea value={notas} onChange={(e) => setNotas(e.target.value)} className="w-full border border-ink/20 px-3 py-2 text-sm" rows={2} />
            </div>
            {error && <p className="text-sm text-red-800 bg-red-50 border border-red-200 p-2">{error}</p>}
          </div>

          <div className="fixed inset-x-0 bottom-0 bg-bone border-t border-gold/30 p-4">
            <button
              disabled={enviando}
              onClick={confirmarReserva}
              className="max-w-3xl mx-auto block w-full px-4 py-3 text-sm font-medium bg-gold text-charcoal-dark hover:bg-gold-dark disabled:opacity-60 transition-colors"
            >
              {enviando ? 'Reservando…' : '✨ Confirmar reserva'}
            </button>
          </div>
        </div>
      )}

      {/* Paso 4: éxito */}
      {paso === 4 && (
        <div className="text-center py-10">
          <div className="w-16 h-16 rounded-full bg-gold text-charcoal-dark text-2xl flex items-center justify-center mx-auto mb-6">✓</div>
          <h2 className="font-display text-2xl text-ink mb-4">¡Reserva realizada!</h2>
          <div className="bg-sand/40 border border-gold/30 p-4 mb-6 text-sm space-y-1 text-left max-w-sm mx-auto">
            <p><span className="text-stone">Servicio: </span>{servicio?.nombre_servicio}</p>
            <p><span className="text-stone">Especialista: </span>{especialista}</p>
            <p><span className="text-stone">Fecha: </span>{fecha}</p>
            <p><span className="text-stone">Hora: </span>{hora}</p>
          </div>
          <p className="text-stone text-sm mb-6">
            Tu cita queda pendiente de confirmación por nuestro equipo. Te
            contactaremos si hay cualquier cambio.
          </p>
          <button onClick={nuevaReserva} className="text-sm text-gold-dark hover:underline">
            Hacer otra reserva
          </button>
        </div>
      )}
    </div>
  );
}
