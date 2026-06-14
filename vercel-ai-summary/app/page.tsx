'use client';

import { useCompletion } from "@ai-sdk/react";

export default function SummaryPage() {
  const {
    completion,        // texte streamé accumulé
    input,             // valeur du textarea
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
  } = useCompletion({
    api: '/api/summarize',
  });

  return (
    <main className="p-8 max-w-2xl mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-4">
        Optimiseur de Lecture – Résumé par IA
      </h1>

      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full h-40 p-3 border rounded mb-4 text-black"
          placeholder="Collez votre long texte ici..."
          value={input}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          disabled={isLoading || !input}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 disabled:bg-gray-400"
        >
          {isLoading ? 'Analyse en cours...' : 'Résumer le texte'}
        </button>
      </form>

      {/* Erreur affichée à l'utilisateur */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-red-700">
          Une erreur est survenue : {error.message}
        </div>
      )}

      {/* Résumé streamé */}
      {completion && (
        <div className="mt-6 p-4 bg-gray-50 border rounded">
          <h2 className="font-semibold mb-2">Résumé généré en streaming :</h2>
          <p className="whitespace-pre-line text-gray-800">{completion}</p>
        </div>
      )}
    </main>
  );
}