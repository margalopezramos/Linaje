import { site } from '@/lib/site-data';

export default function WhatsAppButton() {
  const message = encodeURIComponent('Hola, me gustaría reservar una cita.');

  return (
    <a
      href={`https://wa.me/${site.whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105"
    >
      <svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor" aria-hidden="true">
        <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.25.62 4.354 1.7 6.156L4 29l8.02-1.652A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.75a9.7 9.7 0 0 1-4.95-1.356l-.355-.21-4.76.981.99-4.64-.232-.37A9.71 9.71 0 0 1 5.25 15c0-5.93 4.823-10.75 10.754-10.75S26.75 9.07 26.75 15 21.935 24.75 16.004 24.75Zm5.63-7.36c-.31-.155-1.83-.903-2.113-1.006-.283-.104-.49-.155-.696.155-.207.31-.8 1.006-.98 1.213-.18.207-.362.233-.672.078-.31-.155-1.31-.483-2.494-1.54-.922-.822-1.544-1.837-1.725-2.147-.18-.31-.02-.478.136-.632.14-.14.31-.362.465-.543.155-.18.207-.31.31-.517.104-.207.052-.388-.026-.543-.078-.155-.696-1.68-.955-2.3-.252-.605-.508-.523-.696-.533l-.593-.01c-.207 0-.543.078-.827.388-.284.31-1.084 1.06-1.084 2.583 0 1.523 1.11 2.996 1.264 3.203.155.207 2.185 3.337 5.293 4.68.74.32 1.318.51 1.768.653.743.236 1.42.203 1.955.123.596-.089 1.83-.748 2.088-1.47.258-.723.258-1.343.18-1.47-.077-.129-.284-.207-.594-.362Z" />
      </svg>
    </a>
  );
}
