/**
 * Datos del titular de la web y prestador del servicio Forjia (art. 10 LSSI-CE).
 * Los usan el Aviso Legal (/aviso-legal) y las Condiciones del Servicio
 * (/condiciones), así que se cambian solo aquí.
 *
 * Son los mismos datos que el pie de protección de datos de las cartas de la
 * campaña (titular autónomo; Naveosoft es el nombre comercial).
 *
 * Las dos páginas legales presentan al titular con la misma frase:
 * «{razonSocial}, {condicion}, que opera con el nombre comercial {marca}».
 *
 * OJO: si cambia la dirección, revisa también `partidoJudicial` (los juzgados
 * que se citan en el apartado de jurisdicción dependen del municipio).
 */
export const titular = {
  // Nombre comercial (no es una sociedad ni una marca registrada).
  marca: 'Naveosoft',
  razonSocial: 'Zakaria Rafik Msalek',
  // Forma en que actúa el titular: persona física, autónomo.
  condicion: 'autónomo',
  nif: '55418187D',
  direccion: 'Av. Sierra Espadán, 5, 2.º N, 12527 Artana (Castellón)',
  // Partido judicial del municipio de la dirección (Artana → Nules),
  // comprobado el 04-10-2026 en la sede de la Generalitat Valenciana y en Wikipedia.
  partidoJudicial: 'Nules (Castellón)',
  email: 'info@forjia.es',
};
