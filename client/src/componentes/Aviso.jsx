// Mensaje de éxito (ok) o error (error).
export default function Aviso({ tipo = 'ok', children }) {
  if (!children) return null;
  return (
    <p className={`aviso aviso-${tipo}`} role={tipo === 'error' ? 'alert' : 'status'}>
      {children}
    </p>
  );
}
