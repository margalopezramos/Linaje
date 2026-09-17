export type Treatment = {
  title: string;
  href: string;
  desc: string;
  img: string;
};

export const treatments: Treatment[] = [
  { title: 'INDIBA', href: '/indiba', desc: 'Radiofrecuencia regenerativa facial y corporal.', img: '/images/indiba-corporal.jpg' },
  { title: 'Tratamientos faciales', href: '/facial-arguelles', desc: 'Limpieza, hidratación, antiedad y más.', img: '/images/facial.jpg' },
  { title: 'Dermapen', href: '/dermapen', desc: 'Microagujas para regenerar la piel.', img: '/images/dermapen.jpg' },
  { title: 'Corporal', href: '/tratamientos-corporales-arguelles', desc: 'Cavitación, presoterapia, maderoterapia, drenaje.', img: '/images/corporal.jpg' },
  { title: 'Cejas y pestañas', href: '/cejas-y-pestanas-arguelles', desc: 'Laminado, lifting, tinte, extensiones.', img: '/images/cejas-pestanas.jpg' },
  { title: 'Depilación láser', href: '/depilacion-laser', desc: 'Tecnología SHR, indolora y eficaz.', img: '/images/depilacion-laser.jpg' },
  { title: 'Depilación', href: '/depilacion-facial-corporal', desc: 'Con hilo y con cera, facial y corporal.', img: '/images/depilacion.jpg' },
  { title: 'Microblading', href: '/microblading', desc: 'Cejas perfectas cada día.', img: '/images/microblading.jpg' },
  { title: 'Uñas', href: '/unas', desc: 'Manicura y pedicura de lujo.', img: '/images/unas.jpg' },
];
