// Etiqueta de color según el estado.
import { ETIQUETA_ESTADO } from '../formato.js';

export default function InsigniaEstado({ estado }) {
  return <span className={`insignia insignia-${estado}`}>{ETIQUETA_ESTADO[estado] ?? estado}</span>;
}
