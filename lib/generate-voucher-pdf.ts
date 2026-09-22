import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { site } from '@/lib/site-data';
import { LOGO_BASE64 } from '@/lib/logo-base64';

export type VoucherItem = { name: string; quantity: number };
export type VoucherTipo = 'bono' | 'tarjeta';

export type VoucherData = {
  code: string;
  tipo: VoucherTipo;
  recipientName?: string;
  buyerEmail: string;
  items: VoucherItem[];
  totalAmount: number; // en euros
  entrega?: 'email' | 'recogida';
};

// Colores de marca (mismos valores que tailwind.config.ts)
const CHARCOAL = rgb(0x24 / 255, 0x1d / 255, 0x12 / 255);
const CHARCOAL_MID = rgb(0x3d / 255, 0x2b / 255, 0x1c / 255);
const GOLD = rgb(0xc9 / 255, 0xa2 / 255, 0x65 / 255);
const GOLD_LIGHT = rgb(0xef / 255, 0xd4 / 255, 0x9f / 255);
const BONE = rgb(0xfa / 255, 0xf7 / 255, 0xf1 / 255);
const STONE = rgb(0x8c / 255, 0x7a / 255, 0x65 / 255);

export async function generateVoucherPdf(data: VoucherData): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 420]);
  const { width, height } = page.getSize();

  const titleFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const titleItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);
  const bodyFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bodyBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Fondo con degradado simulado (varias franjas horizontales) para dar
  // algo más de profundidad que un color plano.
  page.drawRectangle({ x: 0, y: 0, width, height, color: CHARCOAL });
  page.drawRectangle({ x: 0, y: 0, width, height: height * 0.5, color: CHARCOAL_MID, opacity: 0.35 });

  // Doble marco dorado, como en la web
  page.drawRectangle({ x: 14, y: 14, width: width - 28, height: height - 28, borderColor: GOLD, borderWidth: 1.5 });
  page.drawRectangle({ x: 20, y: 20, width: width - 40, height: height - 40, borderColor: GOLD, borderWidth: 0.5, opacity: 0.5 });

  // Logo incrustado (base64, no depende de red ni de que el dominio esté publicado)
  try {
    const logoBytes = Uint8Array.from(Buffer.from(LOGO_BASE64, 'base64'));
    const logoImage = await pdfDoc.embedPng(logoBytes);
    const logoDims = logoImage.scale(0.14);
    page.drawImage(logoImage, { x: width / 2 - logoDims.width / 2, y: height - 100, width: logoDims.width, height: logoDims.height });
  } catch {
    // Si por lo que sea falla, seguimos sin logo — nunca debe romper el PDF.
  }

  const tituloPrincipal = data.tipo === 'tarjeta' ? 'TARJETA REGALO' : 'BONO DE SESIONES';
  page.drawText(tituloPrincipal, {
    x: width / 2 - titleFont.widthOfTextAtSize(tituloPrincipal, 24) / 2,
    y: height - 140,
    size: 24,
    font: titleFont,
    color: BONE,
  });

  page.drawText(site.name, {
    x: width / 2 - bodyFont.widthOfTextAtSize(site.name, 11) / 2,
    y: height - 160,
    size: 11,
    font: bodyFont,
    color: GOLD,
  });

  // Línea decorativa
  page.drawLine({ start: { x: width / 2 - 60, y: height - 172 }, end: { x: width / 2 + 60, y: height - 172 }, thickness: 0.75, color: GOLD, opacity: 0.6 });

  let y = height - 205;

  if (data.recipientName) {
    page.drawText(`Para: ${data.recipientName}`, { x: 50, y, size: 13, font: bodyBold, color: BONE });
    y -= 22;
  }

  if (data.tipo === 'tarjeta') {
    // Tarjeta regalo: mensaje más emocional, sin listar "servicios".
    const frase = 'El regalo perfecto para que elija su propio momento de bienestar.';
    page.drawText(frase, { x: 50, y, size: 11, font: titleItalic, color: GOLD_LIGHT });
    y -= 28;
    page.drawText(`Importe: ${data.totalAmount.toFixed(2).replace('.', ',')} €`, { x: 50, y, size: 16, font: bodyBold, color: GOLD });
    y -= 24;
  } else {
    for (const item of data.items) {
      page.drawText(`· ${item.quantity} × ${item.name}`, { x: 50, y, size: 11, font: bodyFont, color: BONE });
      y -= 18;
    }
    page.drawText(`Importe: ${data.totalAmount.toFixed(2).replace('.', ',')} €`, { x: 50, y: y - 8, size: 13, font: bodyBold, color: GOLD });
    y -= 30;
  }

  if (data.entrega === 'recogida') {
    page.drawText('Recogida gratuita en el centro — no es necesario imprimir.', {
      x: 50,
      y: 78,
      size: 9,
      font: bodyFont,
      color: GOLD_LIGHT,
    });
  }

  // Código, destacado en tarjeta clara
  page.drawRectangle({ x: 50, y: 46, width: width - 100, height: 34, color: BONE });
  page.drawText(data.code, {
    x: width / 2 - bodyBold.widthOfTextAtSize(data.code, 16) / 2,
    y: 56,
    size: 16,
    font: bodyBold,
    color: CHARCOAL,
  });

  page.drawText(
    `Presenta este código en ${site.name} · ${site.address.street}, ${site.address.city} · ${site.phonePrimaryDisplay}`,
    { x: 50, y: 26, size: 8, font: bodyFont, color: STONE }
  );

  return pdfDoc.save();
}

export function generateVoucherCode(): string {
  const random = Math.random().toString(36).slice(2, 7).toUpperCase();
  const timestamp = Date.now().toString(36).slice(-4).toUpperCase();
  return `LINAJE-${random}${timestamp}`;
}
