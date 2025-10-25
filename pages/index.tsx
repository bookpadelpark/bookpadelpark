import { useEffect, useState } from 'react'

export default function Home() {
  const [courts, setCourts] = useState([])
  useEffect(() => {
    fetch('/api/courts').then(r => r.json()).then(d => setCourts(d.courts || []))
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>Padel Court Booking</h1>
      <ul>
        {courts.map((court: any) => (
          <li key={court.id}>{court.name}</li>
        ))}
      </ul>
      <p>Use the API endpoints to register, login, create bookings and create Stripe sessions.</p>
    </div>
  )
}