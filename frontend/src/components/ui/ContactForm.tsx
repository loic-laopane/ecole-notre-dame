'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    // TODO: connecter à l'API Symfony /api/contact
    await new Promise((r) => setTimeout(r, 800))
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <div className="text-4xl mb-3">✅</div>
        <h3 className="font-display text-xl text-navy mb-2">Message envoyé !</h3>
        <p className="text-muted text-[.88rem]">
          Nous avons bien reçu votre message et vous répondrons dans les meilleurs délais.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-4 text-sky text-[.82rem] underline hover:text-navy transition-colors"
        >
          Envoyer un autre message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[.8rem] font-medium text-navy mb-1">Prénom *</label>
          <input
            type="text" required
            className="w-full border border-border rounded-lg px-4 py-3 text-[.88rem]
                       focus:border-gold focus:outline-none transition-colors"
            placeholder="Marie"
          />
        </div>
        <div>
          <label className="block text-[.8rem] font-medium text-navy mb-1">Nom *</label>
          <input
            type="text" required
            className="w-full border border-border rounded-lg px-4 py-3 text-[.88rem]
                       focus:border-gold focus:outline-none transition-colors"
            placeholder="Dupont"
          />
        </div>
      </div>

      <div>
        <label className="block text-[.8rem] font-medium text-navy mb-1">E-mail *</label>
        <input
          type="email" required
          className="w-full border border-border rounded-lg px-4 py-3 text-[.88rem]
                     focus:border-gold focus:outline-none transition-colors"
          placeholder="marie.dupont@email.fr"
        />
      </div>

      <div>
        <label className="block text-[.8rem] font-medium text-navy mb-1">
          Établissement concerné
        </label>
        <select
          className="w-full border border-border rounded-lg px-4 py-3 text-[.88rem]
                     focus:border-gold focus:outline-none bg-white transition-colors"
        >
          <option>Collège & Lycée Notre-Dame (Mantes-la-Jolie)</option>
          <option>École Notre-Dame (Mantes-la-Jolie)</option>
          <option>Lycée Professionnel (Mantes-la-Jolie)</option>
          <option>École & Collège Saint-Louis (Bonnières)</option>
        </select>
      </div>

      <div>
        <label className="block text-[.8rem] font-medium text-navy mb-1">Sujet *</label>
        <input
          type="text" required
          className="w-full border border-border rounded-lg px-4 py-3 text-[.88rem]
                     focus:border-gold focus:outline-none transition-colors"
          placeholder="Demande d'information..."
        />
      </div>

      <div>
        <label className="block text-[.8rem] font-medium text-navy mb-1">Message *</label>
        <textarea
          rows={5} required
          className="w-full border border-border rounded-lg px-4 py-3 text-[.88rem]
                     focus:border-gold focus:outline-none resize-none transition-colors"
          placeholder="Votre message..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-dark w-full text-center disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? 'Envoi en cours...' : 'Envoyer le message'}
      </button>
    </form>
  )
}
