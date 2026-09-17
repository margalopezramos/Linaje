import { createClient } from '@supabase/supabase-js';

// Misma anon key que ya estaba en producción en el sistema de reservas
// anterior (Netlify) — es una clave pública por diseño, protegida por las
// políticas de RLS ya configuradas en Supabase, no un secreto.
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
