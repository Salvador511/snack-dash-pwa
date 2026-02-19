export default function OfflinePage() {
  return (
    <main style={{ padding: 16 }}>
      <h1>Sin conexión</h1>
      <p>
        No hay internet y esta pantalla no estaba en caché. Vuelve a conectarte y
        reintenta.
      </p>
      <p>
        Tip: abre la app al menos una vez con internet para que el service worker
        pueda guardar recursos.
      </p>
    </main>
  )
}
