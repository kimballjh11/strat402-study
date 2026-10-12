import { NAV } from '../components/Layout'

export function More() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">More</h1>
      <ul className="grid sm:grid-cols-2 gap-2">
        {[...NAV, { to: '/plan', label: 'Study plan', icon: '🗓' }].map((n) => (
          <li key={n.to}>
            <a href={'#' + n.to} className="card p-4 flex items-center gap-3 font-medium">
              <span aria-hidden className="text-xl w-6 text-center">
                {n.icon}
              </span>
              {n.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
