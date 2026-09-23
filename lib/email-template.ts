import { site, getBaseUrl } from '@/lib/site-data';

// Plantilla de email compartida, con el estilo carbón/dorado de la web y
// las mismas familias tipográficas (Playfair Display + Montserrat). Los
// clientes de email tienen soporte de CSS muy limitado (nada de
// variables, poco flexbox fiable, y las webfonts son "mejora progresiva":
// donde no carguen, cae a Georgia/Arial), así que todo va con estilos en
// línea y tablas para máxima compatibilidad (Gmail, Outlook, Apple Mail...).

const CHARCOAL = '#241d12';
const GOLD = '#c9a265';
const GOLD_DARK = '#a9863f';
const GOLD_LIGHT = '#efd49f';
const BONE = '#faf7f1';
const INK = '#262626';
const STONE = '#8c7a65';

const FONT_DISPLAY = "'Playfair Display', Georgia, 'Times New Roman', serif";
const FONT_BODY = "'Montserrat', Arial, Helvetica, sans-serif";

export function emailWrapper({
  preheader,
  heading,
  bodyHtml,
  ctaLabel,
  ctaUrl,
}: {
  preheader: string;
  heading: string;
  bodyHtml: string;
  ctaLabel?: string;
  ctaUrl?: string;
}) {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${heading}</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Montserrat:wght@400;500;600&display=swap" rel="stylesheet" />
</head>
<body style="margin:0; padding:0; background-color:${BONE}; font-family: ${FONT_BODY};">
  <span style="display:none; font-size:1px; color:${BONE}; line-height:1px; max-height:0; max-width:0; opacity:0; overflow:hidden;">
    ${preheader}
  </span>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BONE};">
    <tr>
      <td align="center" style="padding: 32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px; background-color:#ffffff; border:1px solid rgba(36,29,18,0.1);">

          <!-- Cabecera carbón -->
          <tr>
            <td style="background-color:${CHARCOAL}; padding:36px 32px 30px; text-align:center;">
              <img src="${getBaseUrl()}/logo.png" alt="${site.name}" width="52" height="46" style="display:block; margin:0 auto 12px;" />
              <div style="color:${GOLD}; font-family: ${FONT_DISPLAY}; font-weight:700; font-size:20px; letter-spacing:6px; text-transform:uppercase;">
                ${site.shortName}
              </div>
              <div style="color:${GOLD_LIGHT}; font-family: ${FONT_BODY}; font-size:10px; letter-spacing:3px; text-transform:uppercase; margin-top:6px;">
                Centro de Estética
              </div>
              <div style="width:44px; height:1px; background-color:${GOLD}; opacity:0.6; margin:16px auto 0;"></div>
            </td>
          </tr>

          <!-- Cuerpo -->
          <tr>
            <td style="padding: 36px 32px;">
              <h1 style="margin:0 0 18px; font-family: ${FONT_DISPLAY}; font-weight:700; font-size:23px; color:${INK};">
                ${heading}
              </h1>
              <div style="font-family: ${FONT_BODY}; font-size:14px; line-height:1.7; color:${INK};">
                ${bodyHtml}
              </div>

              ${
                ctaLabel && ctaUrl
                  ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:26px;">
                <tr>
                  <td style="background-color:${GOLD};">
                    <a href="${ctaUrl}" style="display:inline-block; padding:13px 28px; font-family: ${FONT_BODY}; font-size:13px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:${CHARCOAL}; text-decoration:none;">
                      ${ctaLabel}
                    </a>
                  </td>
                </tr>
              </table>`
                  : ''
              }
            </td>
          </tr>

          <!-- Pie carbón -->
          <tr>
            <td style="background-color:${CHARCOAL}; padding:22px 32px; font-family: ${FONT_BODY}; font-size:11px; color:rgba(250,247,241,0.55); text-align:center; line-height:1.7;">
              ${site.name} · ${site.address.street}, ${site.address.city}<br/>
              ${site.phonePrimaryDisplay} · ${site.email}
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function infoRow(label: string, value: string) {
  return `<tr>
    <td style="padding:4px 12px 4px 0; color:${STONE}; font-size:13px;">${label}</td>
    <td style="padding:4px 0; color:${INK}; font-size:13px; font-weight:bold;">${value}</td>
  </tr>`;
}

export function infoTable(rows: string) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:16px 0; width:100%;">${rows}</table>`;
}

export const emailColors = { CHARCOAL, GOLD, GOLD_DARK, GOLD_LIGHT, BONE, INK, STONE };
