"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type TabKey = "estetici" | "olistici" | "pacchetti";
type GenderKey = "donna" | "uomo";

type ServiceApi = {
  id: string;
  name: string;
  price: number;
  duration: number;
  category?: string | null;
  description?: string | null;
  imageUrl?: string | null;
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
  const [activeGender, setActiveGender] = useState<GenderKey>("donna");

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
          description: s.description ?? null,
          imageUrl: s.imageUrl ?? null,
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

  const esteticiEntries = Object.entries(esteticiGroups);
  const esteticiDonnaEntries = esteticiEntries.filter(([cat]) => cat.toUpperCase() !== "UOMO");
  const esteticiUomoEntries = esteticiEntries.filter(([cat]) => cat.toUpperCase() === "UOMO");

  const featuredTitleByTab: Record<TabKey, string> = {
    estetici: "Trattamenti estetici",
    olistici: "Trattamenti olistici",
    pacchetti: "Pacchetti speciali",
  };

  const heroImageFallback =
    "https://images.pexels.com/photos/3738371/pexels-photo-3738371.jpeg?auto=compress&cs=tinysrgb&w=1200";

  return (
    <div className="services-page">
      <section className="card-soft services-hero mb-4">
        <div className="row g-4 align-items-center">
          <div className="col-lg-6">
            <span className="badge badge-soft services-hero-kicker mb-3">Servizi</span>
            <h1 className="display-5 fw-semibold mb-2">
              Trattamenti & percorsi
              <br />
              per il tuo benessere.
            </h1>
            <p className="text-muted mb-3">
              Una selezione di trattamenti viso, corpo e massaggi olistici pensati per accompagnarti in ogni
              momento dell&apos;anno. Prenota online o contattaci per costruire insieme un percorso su misura.
            </p>
            <div className="d-flex flex-wrap gap-2">
              <Link href="/bookings" className="btn btn-primary btn-lg">
                Prenota un trattamento
              </Link>
              <Link href="#note-importanti" className="btn btn-outline-primary btn-lg">
                Vedi note importanti
              </Link>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="services-hero-image">
              <Image
                src={heroImageFallback}
                alt="Un momento di relax in un centro estetico"
                width={900}
                height={600}
                className="img-fluid w-100"
                style={{ objectFit: "cover", maxHeight: "320px" }}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="services-grid">
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-3">
          <div className="services-grid-intro">
            <h2 className="h4 mb-1">{informazioniSalone.listino}</h2>
            <p className="text-muted mb-0">
              Qui trovi il listino completo dei trattamenti estetici e olistici. Per prenotare usa la sezione
              <span className="fw-semibold"> Prenota</span> o parla direttamente con il centro per valutazioni
              personalizzate.
            </p>
          </div>
          <div className="services-search w-100 w-md-auto">
            <input
              type="search"
              className="form-control form-control-sm"
              placeholder="Cerca trattamento per nome..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="services-filter-cards row g-3 mb-3">
          <div className="col-md-4">
            <button
              type="button"
              className={`services-filter-card ${
                activeTab === "estetici" ? "services-filter-card-active" : ""
              }`}
              onClick={() => setActiveTab("estetici")}
            >
              <span className="services-filter-card-icon">E</span>
              <div>
                <h3 className="h6 mb-1">Trattamenti estetici</h3>
                <p className="text-muted small mb-0">Viso, corpo, epilazione e cura quotidiana.</p>
              </div>
            </button>
          </div>
          <div className="col-md-4">
            <button
              type="button"
              className={`services-filter-card ${
                activeTab === "olistici" ? "services-filter-card-active" : ""
              }`}
              onClick={() => setActiveTab("olistici")}
            >
              <span className="services-filter-card-icon">O</span>
              <div>
                <h3 className="h6 mb-1">Trattamenti olistici</h3>
                <p className="text-muted small mb-0">Massaggi rilassanti e percorsi di equilibrio.</p>
              </div>
            </button>
          </div>
          <div className="col-md-4">
            <button
              type="button"
              className={`services-filter-card ${
                activeTab === "pacchetti" ? "services-filter-card-active" : ""
              }`}
              onClick={() => setActiveTab("pacchetti")}
            >
              <span className="services-filter-card-icon">P</span>
              <div>
                <h3 className="h6 mb-1">Pacchetti speciali</h3>
                <p className="text-muted small mb-0">Percorsi combinati per risultati visibili.</p>
              </div>
            </button>
          </div>
        </div>

        {activeTab === "estetici" && (
          <div className="services-gender-pills d-flex flex-wrap align-items-center gap-2 mb-3">
            <button
              type="button"
              className={`services-gender-pill ${activeGender === "donna" ? "services-gender-pill-active" : ""}`}
              onClick={() => setActiveGender("donna")}
            >
              Per lei
            </button>
            <button
              type="button"
              className={`services-gender-pill ${activeGender === "uomo" ? "services-gender-pill-active" : ""}`}
              onClick={() => setActiveGender("uomo")}
            >
              Per lui
            </button>
          </div>
        )}

        {loading ? (
          <p className="text-muted small mb-0">Caricamento listino...</p>
        ) : error ? (
          <p className="text-danger small mb-0">{error}</p>
        ) : services.length === 0 ? (
          <p className="text-muted small mb-0">Nessun servizio attivo al momento.</p>
        ) : (
          <div>
            {(search.trim() !== "" || activeTab === "estetici") && (
              <>
                {activeGender === "donna" && esteticiDonnaEntries.length > 0 && (
                  <>
                    <h3 className="h6 text-uppercase text-muted mb-2">Per lei</h3>
                    <div className="row g-3 mb-3">
                      {esteticiDonnaEntries.map(([cat, items]) => (
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
                                      <span className="text-muted small ms-1"> · {s.duration} min</span>
                                    ) : null}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {activeGender === "uomo" && esteticiUomoEntries.length > 0 && (
                  <>
                    <h3 className="h6 text-uppercase text-muted mb-2 mt-2">Per lui</h3>
                    <div className="row g-3">
                      {esteticiUomoEntries.map(([cat, items]) => (
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
                                      <span className="text-muted small ms-1"> · {s.duration} min</span>
                                    ) : null}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}

            {(search.trim() !== "" || activeTab === "olistici") && (
              <div className="row g-3 mt-3">
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
                                <span className="text-muted small ms-1"> · {s.duration} min</span>
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
              <div className="row g-3 mt-3">
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
                              <span className="text-muted small ms-1"> · {s.duration} min</span>
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
      </section>

      <section className="card-soft services-cta-banner mt-5 mb-4">
        <div className="row align-items-center g-3">
          <div className="col-lg-8">
            <h2 className="h4 mb-2">Pronta a riconnetterti con te stessa?</h2>
            <p className="mb-0 text-white-50">
              Prenota il tuo prossimo trattamento o chiedi al centro di creare un percorso personalizzato per il tuo
              benessere.
            </p>
          </div>
          <div className="col-lg-4">
            <div className="services-cta-buttons d-flex flex-wrap justify-content-lg-end gap-2">
              <Link href="/bookings" className="btn btn-light btn-sm">
                Prenota un trattamento
              </Link>
              <Link href="/bookings" className="btn btn-outline-light btn-sm">
                Prenota un trattamento
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="note-importanti" className="mt-5">
        <div className="card card-soft border-0 p-3 bg-white">
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
      </section>
    </div>
  );
}
