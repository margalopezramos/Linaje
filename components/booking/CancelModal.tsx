'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { site } from '@/lib/site-data';

type CitaEncontrada = {
  id: number;
  servicio: string;
  fecha: string;
  hora: string;
  empleado: string;
};

export default function CancelModal({ onClose }: { onClose: () => void }) {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [buscando, setBuscando] = useState(false);
  const [resultado, setResultado] = useState<CitaEncontrada[] | null>(null);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [cancelando, setCancelando] = useState<number | null>(null);
  const [ok, setOk] = useState(false);

  const buscar = async () => {
    if (!nombre.trim() && !telefono.trim()) {
      setMensaje('Introduce tu nombre o teléfono.');
      return;
    }
    setBuscando(true);
    setMensaje(null);
    setResultado(null);
    const { data, error } = await supabase.rpc('buscar_citas_pendientes_publico', {
      p_nombre: nombre.trim() ? nombre.trim().split(' ')[0] : null,
    });
    setBuscando(false);
    if (error) {
      setMensaje('Error: ' + error.message);
      return;
    }
    if (!data || data.length === 0) {
      setMensaje('No encontramos citas pendientes con esos datos.');
      return;
    }
    setResultado(data);
  };

  const bloqueadaPor8h = (c: CitaEncontrada) => {
    const dt = new Date(`${c.fecha}T${c.hora}:00`);
    return dt.getTime() - Date.now() < 8 * 60 * 60 * 1000;
  };

  const cancelar = async (id: number) => {
    if (!confirm('¿Seguro que quieres cancelar esta cita?')) return;
    setCancelando(id);
    const { error } = await supabase.from('citas').update({ estado: 'cancelada' }).eq('id', id);
    setCancelando(null);
    if (error) {
      setMensaje('Error al cancelar: ' + error.message);
      return;
    }
    setOk(true);
    setResultado(null);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-charcoal-dark/60" onClick={onClose} />
      <div className="relative bg-bone max-w-md w-full p-6 max-h-[85vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <h2 className="font-display text-xl text-ink">Cancelar una reserva</h2>
          <button onClick={onClose} className="text-ink/60 hover:text-ink text-xl">×</button>
        </div>

        {ok ? (
          <div className="text-center py-6">
            <div className="text-3xl mb-2">✓</div>
            <p className="text-ink font-medium">Reserva cancelada correctamente.</p>
            <p className="text-stone text-sm mt-1">Lamentamos no verte. ¡Hasta pronto!</p>
          </div>
        ) : (
          <>
            <p className="text-xs text-stone mb-4">Busca tu cita por nombre o teléfono para cancelarla.</p>
            <div className="space-y-3 mb-4">
              <input
                placeholder="Tu nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full border border-ink/20 px-3 py-2 text-sm"
              />
              <input
                placeholder="Tu teléfono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="w-full border border-ink/20 px-3 py-2 text-sm"
              />
              <button
                onClick={buscar}
                disabled={buscando}
                className="w-full px-4 py-2 text-sm font-medium bg-gold text-charcoal-dark hover:bg-gold-dark disabled:opacity-60"
              >
                {buscando ? 'Buscando…' : 'Buscar mi cita'}
              </button>
            </div>

            {mensaje && <p className="text-xs text-stone text-center py-2">{mensaje}</p>}

            {resultado && (
              <div className="space-y-2">
                {resultado.map((c) => {
                  const bloqueada = bloqueadaPor8h(c);
                  return (
                    <div key={c.id} className="border border-ink/10 p-3">
                      <p className="text-sm font-medium text-ink">{c.servicio}</p>
                      <p className="text-xs text-stone mb-2">{c.fecha} · {c.hora} · {c.empleado}</p>
                      {bloqueada ? (
                        <p className="text-xs text-red-800 bg-red-50 border border-red-200 p-2">
                          No es posible cancelar online — faltan menos de 8 horas. Llámanos al{' '}
                          <a href={`tel:${site.phoneSecondary}`} className="font-medium">{site.phoneSecondaryDisplay}</a> o escríbenos por{' '}
                          <a href={`https://wa.me/${site.whatsappNumber}`} className="font-medium">WhatsApp</a>.
                        </p>
                      ) : (
                        <button
                          onClick={() => cancelar(c.id)}
                          disabled={cancelando === c.id}
                          className="text-xs text-red-800 border border-red-300 px-3 py-1.5 hover:bg-red-50"
                        >
                          {cancelando === c.id ? 'Cancelando…' : 'Cancelar esta cita'}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
