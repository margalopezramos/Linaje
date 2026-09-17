import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { site } from '@/lib/site-data';

export type VoucherItem = { name: string; quantity: number };

export type VoucherData = {
  code: string;
  recipientName?: string;
  buyerEmail: string;
  items: VoucherItem[];
  totalAmount: number; // en euros
};

// Colores de marca (mismos valores que tailwind.config.ts)
const CHARCOAL = rgb(0x24 / 255, 0x1d / 255, 0x12 / 255); // charcoal-dark
const GOLD = rgb(0xc9 / 255, 0xa2 / 255, 0x65 / 255);
const BONE = rgb(0xfa / 255, 0xf7 / 255, 0xf1 / 255);
const STONE = rgb(0x8c / 255, 0x7a / 255, 0x65 / 255);

export async function generateVoucherPdf(data: VoucherData): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 400]); // A5 apaisado aprox.
  const { width, height } = page.getSize();

  const titleFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const bodyFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bodyBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Fondo carbón
  page.drawRectangle({ x: 0, y: 0, width, height, color: CHARCOAL });
  // Marco dorado, como en la web
  page.drawRectangle({
    x: 16,
    y: 16,
    width: width - 32,
    height: height - 32,
    borderColor: GOLD,
    borderWidth: 1.5,
  });

  // Logo (se pide por HTTP a tu propio dominio público — más fiable en
  // hosting serverless que leerlo del disco, donde "public/" puede no
  // estar incluido en el paquete de la función).
  try {
    const logoRes = await fetch(`${site.url}/logo.png`);
    if (logoRes.ok) {
      const logoBytes = new Uint8Array(await logoRes.arrayBuffer());
      const logoImage = await pdfDoc.embedPng(logoBytes);
      const logoDims = logoImage.scale(0.12);
      page.drawImage(logoImage, {
        x: width / 2 - logoDims.width / 2,
        y: height - 90,
        width: logoDims.width,
        height: logoDims.height,
      });
    }
  } catch {
    // Si no se puede cargar el logo, seguimos sin él — no debe romper el PDF.
  }

  page.drawText('BONO REGALO', {
    x: width / 2 - titleFont.widthOfTextAtSize('BONO REGALO', 22) / 2,
    y: height - 130,
    size: 22,
    font: titleFont,
    color: BONE,
  });

  page.drawText(site.name, {
    x: width / 2 - bodyFont.widthOfTextAtSize(site.name, 11) / 2,
    y: height - 150,
    size: 11,
    font: bodyFont,
    color: GOLD,
  });

  if (data.recipientName) {
    page.drawText(`Para: ${data.recipientName}`, {
      x: 50,
      y: height - 195,
      size: 13,
      font: bodyBold,
      color: BONE,
    });
  }

  let y = height - (data.recipientName ? 220 : 195);
  for (const item of data.items) {
    const line = `· ${item.quantity} × ${item.name}`;
    page.drawText(line, { x: 50, y, size: 11, font: bodyFont, color: BONE });
    y -= 18;
  }

  page.drawText(`Importe: ${data.totalAmount.toFixed(2).replace('.', ',')} €`, {
    x: 50,
    y: y - 10,
    size: 11,
    font: bodyBold,
    color: GOLD,
  });

  // Código del bono, destacado
  page.drawRectangle({ x: 50, y: 48, width: width - 100, height: 34, color: BONE });
  page.drawText(data.code, {
    x: width / 2 - bodyBold.widthOfTextAtSize(data.code, 16) / 2,
    y: 58,
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
