import { PDFDocument, PDFPage, PDFFont, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { site } from '@/lib/site-data';
import { LOGO_BASE64 } from '@/lib/logo-base64';
import {
  PLAYFAIR_BOLD_BASE64,
  PLAYFAIR_ITALIC_BASE64,
  MONTSERRAT_REGULAR_BASE64,
  MONTSERRAT_SEMIBOLD_BASE64,
} from '@/lib/pdf-fonts';

export type VoucherItem = { name: string; quantity: number };
export type VoucherTipo = 'bono' | 'tarjeta';

export type VoucherData = {
  code: string;
  tipo: VoucherTipo;
  recipientName?: string;
  buyerEmail: string;
  items: VoucherItem[];
  totalAmount: number; // en euros
  isGift?: boolean;
};

// Colores de marca (mismos valores que tailwind.config.ts)
const CHARCOAL = rgb(0x24 / 255, 0x1d / 255, 0x12 / 255);
const BONE = rgb(0xfa / 255, 0xf7 / 255, 0xf1 / 255);
const GOLD = rgb(0xc9 / 255, 0xa2 / 255, 0x65 / 255);
const GOLD_DARK = rgb(0xa9 / 255, 0x86 / 255, 0x3f / 255);
const GOLD_LIGHT = rgb(0xef / 255, 0xd4 / 255, 0x9f / 255);
const INK = rgb(0x26 / 255, 0x26 / 255, 0x26 / 255);
const STONE = rgb(0x8c / 255, 0x7a / 255, 0x65 / 255);

const W = 595;
const H = 420;
const LEFT_W = 210; // ancho del panel izquierdo (carbón, con el logo)
const PAD_X = LEFT_W + 36; // margen izquierdo del contenido en el panel derecho

// Dibuja texto letra a letra con un espaciado fijo entre caracteres —
// pdf-lib no soporta letter-spacing nativo en drawText, así que lo
// simulamos avanzando el cursor manualmente. Es lo que da el aire de
// mayúsculas "espaciadas" del logotipo (L I N A J E).
function drawTracked(
  page: PDFPage,
  text: string,
  opts: { x: number; y: number; font: PDFFont; size: number; color: ReturnType<typeof rgb>; tracking: number }
) {
  let cursor = opts.x;
  for (const ch of text) {
    page.drawText(ch, { x: cursor, y: opts.y, size: opts.size, font: opts.font, color: opts.color });
    cursor += opts.font.widthOfTextAtSize(ch, opts.size) + opts.tracking;
  }
}

function trackedWidth(text: string, font: PDFFont, size: number, tracking: number) {
  let w = 0;
  for (const ch of text) w += font.widthOfTextAtSize(ch, size) + tracking;
  return w - tracking;
}

export async function generateVoucherPdf(data: VoucherData): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);
  const page = pdfDoc.addPage([W, H]);

  // Fuentes de marca — mismas familias que la web (Playfair Display +
  // Montserrat), incrustadas desde @/lib/pdf-fonts para no depender de red.
  const playfairBold = await pdfDoc.embedFont(Buffer.from(PLAYFAIR_BOLD_BASE64, 'base64'), { subset: true });
  const playfairItalic = await pdfDoc.embedFont(Buffer.from(PLAYFAIR_ITALIC_BASE64, 'base64'), { subset: true });
  const montRegular = await pdfDoc.embedFont(Buffer.from(MONTSERRAT_REGULAR_BASE64, 'base64'), { subset: true });
  const montSemibold = await pdfDoc.embedFont(Buffer.from(MONTSERRAT_SEMIBOLD_BASE64, 'base64'), { subset: true });

  // Fondo: panel izquierdo carbón, resto en crema, separados por una
  // línea dorada — mismo estilo "tarjeta partida" que el resto de la marca.
  page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: BONE });
  page.drawRectangle({ x: 0, y: 0, width: LEFT_W, height: H, color: CHARCOAL });
  page.drawLine({ start: { x: LEFT_W, y: 0 }, end: { x: LEFT_W, y: H }, thickness: 1, color: GOLD, opacity: 0.6 });

  // ——— Panel izquierdo: logo + wordmark + contacto ———
  const cx = LEFT_W / 2;

  try {
    const logoBytes = Uint8Array.from(Buffer.from(LOGO_BASE64, 'base64'));
    const logoImage = await pdfDoc.embedPng(logoBytes);
    const logoDims = logoImage.scale(0.16);
    page.drawImage(logoImage, { x: cx - logoDims.width / 2, y: 258, width: logoDims.width, height: logoDims.height });
  } catch {
    // Si por lo que sea falla, seguimos sin logo — nunca debe romper el PDF.
  }

  const wordmarkW = trackedWidth('LINAJE', playfairBold, 22, 6);
  drawTracked(page, 'LINAJE', { x: cx - wordmarkW / 2, y: 250, font: playfairBold, size: 22, color: GOLD, tracking: 6 });

  const subtitleW = trackedWidth('CENTRO DE ESTÉTICA', montRegular, 7.5, 2.5);
  drawTracked(page, 'CENTRO DE ESTÉTICA', {
    x: cx - subtitleW / 2,
    y: 232,
    font: montRegular,
    size: 7.5,
    color: GOLD_LIGHT,
    tracking: 2.5,
  });

  page.drawLine({ start: { x: cx - 30, y: 218 }, end: { x: cx + 30, y: 218 }, thickness: 0.75, color: GOLD, opacity: 0.6 });

  const contacto = [`${site.address.street}, ${site.address.city}`, site.phonePrimaryDisplay, site.email];
  let cy = 90;
  for (const linea of contacto) {
    const w = montRegular.widthOfTextAtSize(linea, 8);
    page.drawText(linea, { x: cx - w / 2, y: cy, size: 8, font: montRegular, color: BONE, opacity: 0.85 });
    cy -= 14;
  }

  // ——— Panel derecho: título, detalle e importe ———
  let y = 320;

  if (data.tipo === 'tarjeta') {
    drawTracked(page, 'TARJETA', { x: PAD_X, y, font: playfairBold, size: 34, color: GOLD, tracking: 4 });
    y -= 42;
    drawTracked(page, 'REGALO', { x: PAD_X, y, font: playfairBold, size: 34, color: GOLD, tracking: 4 });
    y -= 18;
  } else {
    drawTracked(page, 'BONO', { x: PAD_X, y, font: playfairBold, size: 40, color: GOLD, tracking: 5 });
    y -= 22;
    drawTracked(page, 'DE SESIONES', { x: PAD_X + 2, y, font: montRegular, size: 9, color: STONE, tracking: 3 });
    y -= 18;
  }

  page.drawLine({ start: { x: PAD_X, y }, end: { x: PAD_X + 90, y }, thickness: 1, color: GOLD });
  y -= 25;

  if (data.recipientName) {
    page.drawText(`Para: ${data.recipientName}`, { x: PAD_X, y, size: 13, font: montSemibold, color: INK });
    y -= 30;
  }

  if (data.tipo === 'tarjeta') {
    // Tarjeta regalo: mensaje más emocional, sin listar "servicios".
    page.drawText('El regalo perfecto para que elija su propio', { x: PAD_X, y, size: 11.5, font: playfairItalic, color: GOLD_DARK });
    y -= 20;
    page.drawText('momento de bienestar.', { x: PAD_X, y, size: 11.5, font: playfairItalic, color: GOLD_DARK });
    y -= 35;
  } else {
    for (const item of data.items) {
      page.drawText(`·  ${item.quantity} × ${item.name}`, { x: PAD_X, y, size: 10.5, font: montRegular, color: INK });
      y -= 18;
    }
    y -= 12;
  }

  page.drawText('Importe', { x: PAD_X, y, size: 9, font: montRegular, color: STONE });
  y -= 30;
  page.drawText(`${data.totalAmount.toFixed(2).replace('.', ',')} €`, {
    x: PAD_X,
    y,
    size: 26,
    font: playfairBold,
    color: GOLD_DARK,
  });

  if (data.isGift) {
    page.drawText('¿Es un regalo? Pásate por el centro y te lo preparamos con un', {
      x: PAD_X,
      y: 78,
      size: 8,
      font: montRegular,
      color: GOLD_DARK,
    });
    page.drawText('acabado físico personalizado.', { x: PAD_X, y: 68, size: 8, font: montRegular, color: GOLD_DARK });
  }

  // Código, en una caja de borde dorado
  const codeBoxW = W - PAD_X - 36;
  page.drawRectangle({ x: PAD_X, y: 26, width: codeBoxW, height: 30, color: BONE, borderColor: GOLD, borderWidth: 1 });
  const codeW = trackedWidth(data.code, montSemibold, 13, 2);
  drawTracked(page, data.code, {
    x: PAD_X + codeBoxW / 2 - codeW / 2,
    y: 36,
    font: montSemibold,
    size: 13,
    color: INK,
    tracking: 2,
  });

  return pdfDoc.save();
}

export function generateVoucherCode(): string {
  const random = Math.random().toString(36).slice(2, 7).toUpperCase();
  const timestamp = Date.now().toString(36).slice(-4).toUpperCase();
  return `LINAJE-${random}${timestamp}`;
}
