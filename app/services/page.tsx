"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type TabKey = "estetici" | "olistici" | "pacchetti";

type ServiceApi = {
  id: string;
  name: string;
  price: number;
  duration: number;
  category?: string | null;
};

const informazioniSalone = {
  nome: "Valentina beauty space",
  listino: "LISTINO PREZZI 2025",
};

const noteImportanti: string[] = [
  "Nota: I trattamenti laser ed Endosphere richiedono una valutazione personalizzata.",
  "I prezzi possono variare in base alla durata e alla personalizzazione dei trattamenti.",
  "Si consiglia la prenotazione anticipata.",
  "Sono disponibili sconti per pacchetti e abbonamenti.",
  "Pagamenti accettati: contanti, carte. Rateizzazione possibile con Pagodil a tasso 0.",
];

function mapCategoryToTab(category?: string | null): TabKey {
  const c = (category || "").toUpperCase();
  if (["VISO", "PIEDI", "EPILAZIONE", "UOMO", "CORPO"].includes(c)) return "estetici";
  if (["MASSAGGI", "OLISTICO"].includes(c)) return "olistici";
  if (["PACCHETTO", "PACCHETTI"].includes(c)) return "pacchetti";
  return "estetici";
}

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceApi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("estetici");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/services");
        if (!res.ok) {
          throw new Error("Errore nel caricamento dei servizi");
        }
        const json = await res.json();
        const mapped = (json as any[]).map((s) => ({
          id: s.id,
          name: s.name,
          price: s.price,
          duration: s.duration,
          category: s.category ?? null,
        })) as ServiceApi[];
        setServices(mapped);
      } catch (e) {
        setError("Errore nel caricamento del listino.");
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  const esteticiGroups = useMemo(() => {
    const groups: Record<string, ServiceApi[]> = {};
    const q = search.trim().toLowerCase();
    services
      .filter((s) => mapCategoryToTab(s.category) === "estetici")
      .filter((s) => !q || s.name.toLowerCase().includes(q))
      .forEach((s) => {
        const key = s.category || "Altri trattamenti";
        if (!groups[key]) groups[key] = [];
        groups[key].push(s);
      });
    return groups;
  }, [services, search]);

  const olisticiGroups = useMemo(() => {
    const groups: Record<string, ServiceApi[]> = {};
    const q = search.trim().toLowerCase();
    services
      .filter((s) => mapCategoryToTab(s.category) === "olistici")
      .filter((s) => !q || s.name.toLowerCase().includes(q))
      .forEach((s) => {
        const key = s.category || "Massaggi";
        if (!groups[key]) groups[key] = [];
        groups[key].push(s);
      });
    return groups;
  }, [services, search]);

  const pacchetti = useMemo(
    () => {
      const q = search.trim().toLowerCase();
      return services.filter(
        (s) => mapCategoryToTab(s.category) === "pacchetti" && (!q || s.name.toLowerCase().includes(q)),
      );
    },
    [services, search],
  );

  return (
    <div className="mt-4">
      <div className="row g-4 align-items-center mb-4">
        <div className="col-lg-6">
          <h1 className="h3 mb-1">{informazioniSalone.nome}</h1>
          <p className="text-muted mb-3">{informazioniSalone.listino}</p>
          <p className="text-muted small mb-0">
            Una selezione di trattamenti viso, corpo e massaggi olistici pensati per accompagnarti in
            ogni momento dell&apos;anno. Puoi prenotare online o contattarci per percorsi personalizzati.
          </p>
        </div>
        <div className="col-lg-6">
          <div className="card card-soft border-0 p-0 overflow-hidden">
            <Image
              src="https://images.pexels.com/photos/3738371/pexels-photo-3738371.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Donne sorridenti in un centro estetico"
              width={900}
              height={600}
              className="img-fluid w-100"
              style={{ objectFit: "cover", maxHeight: "260px" }}
              priority
            />
          </div>
        </div>
      </div>

      <p className="text-muted small mb-4">
        Qui trovi il listino completo dei trattamenti estetici e olistici. Per prenotare usa la sezione
        <span className="fw-semibold"> Prenota</span> o parla direttamente con il centro per valutazioni
        personalizzate.
      </p>

      <ul className="nav nav-tabs small mb-3" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            type="button"
            className={`nav-link ${activeTab === "estetici" ? "active" : ""}`}
            onClick={() => setActiveTab("estetici")}
          >
            Trattamenti estetici
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            type="button"
            className={`nav-link ${activeTab === "olistici" ? "active" : ""}`}
            onClick={() => setActiveTab("olistici")}
          >
            Trattamenti olistici
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            type="button"
            className={`nav-link ${activeTab === "pacchetti" ? "active" : ""}`}
            onClick={() => setActiveTab("pacchetti")}
          >
            Pacchetti speciali
          </button>
        </li>
      </ul>

      <div className="mb-3">
        <input
          type="search"
          className="form-control form-control-sm"
          placeholder="Cerca trattamento per nome..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="text-muted small mb-0">Caricamento listino...</p>
      ) : error ? (
        <p className="text-danger small mb-0">{error}</p>
      ) : services.length === 0 ? (
        <p className="text-muted small mb-0">Nessun servizio attivo al momento.</p>
      ) : (
        <div>
          {(search.trim() !== "" || activeTab === "estetici") && (
            <div className="row g-3">
              {Object.entries(esteticiGroups).map(([cat, items]) => (
                <div key={cat} className="col-md-6">
                  <div className="card card-soft border-0 p-3 bg-white h-100">
                    <h2 className="h6 mb-2">{cat}</h2>
                    <ul className="list-unstyled mb-0 small">
                      {items.map((s) => (
                        <li
                          key={s.id}
                          className="d-flex justify-content-between align-items-baseline py-1 border-bottom border-light-subtle"
                        >
                          <span>
                            <Link
                              href={`/bookings?serviceId=${encodeURIComponent(s.id)}`}
                              className="link-underline link-underline-opacity-0"
                            >
                              {s.name}
                            </Link>
                          </span>
                          <span className="fw-semibold ms-2">
                            {s.price.toFixed(2)} €
                            {s.duration ? (
                              <span className="text-muted small ms-1">· {s.duration} min</span>
                            ) : null}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}

          {(search.trim() !== "" || activeTab === "olistici") && (
            <div className="row g-3">
              {Object.entries(olisticiGroups).map(([cat, items]) => (
                <div key={cat} className="col-md-6">
                  <div className="card card-soft border-0 p-3 bg-white h-100">
                    <h2 className="h6 mb-2">{cat}</h2>
                    <ul className="list-unstyled mb-0 small">
                      {items.map((s) => (
                        <li
                          key={s.id}
                          className="d-flex justify-content-between align-items-baseline py-1 border-bottom border-light-subtle"
                        >
                          <span>
                            <Link
                              href={`/bookings?serviceId=${encodeURIComponent(s.id)}`}
                              className="link-underline link-underline-opacity-0"
                            >
                              {s.name}
                            </Link>
                          </span>
                          <span className="fw-semibold ms-2">
                            {s.price.toFixed(2)} €
                            {s.duration ? (
                              <span className="text-muted small ms-1">· {s.duration} min</span>
                            ) : null}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}

          {(search.trim() !== "" || activeTab === "pacchetti") && (
            <div className="row g-3">
              <div className="col-md-8">
                <div className="card card-soft border-0 p-3 bg-white h-100">
                  <h2 className="h6 mb-2">Pacchetti speciali</h2>
                  <ul className="list-unstyled mb-0 small">
                    {pacchetti.map((s) => (
                      <li
                        key={s.id}
                        className="d-flex justify-content-between align-items-baseline py-1 border-bottom border-light-subtle"
                      >
                        <span>
                          <Link
                            href={`/bookings?serviceId=${encodeURIComponent(s.id)}`}
                            className="link-underline link-underline-opacity-0"
                          >
                            {s.name}
                          </Link>
                        </span>
                        <span className="fw-semibold ms-2">
                          {s.price.toFixed(2)} €
                          {s.duration ? (
                            <span className="text-muted small ms-1">· {s.duration} min</span>
                          ) : null}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="card card-soft border-0 p-3 bg-white mt-4">
        <h2 className="h6 mb-2">Note importanti</h2>
        <ul className="small mb-0">
          {noteImportanti.map((n) => (
            <li key={n} className="mb-1">
              {n}
            </li>
          ))}
        </ul>
        <div className="small text-muted mt-3">
          Indirizzo: Via Cuneo, 3, 04022 Fondi LT · Tel: +39 3758218542
        </div>
      </div>
    </div>
  );
}
