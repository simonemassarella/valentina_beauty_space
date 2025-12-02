# valentina_beauty_space
 
 # Centro Estetico Valentina – Beauty Space
 
 Applicazione web per il **Centro Estetico Valentina**, sviluppata con **Next.js 14**, **TypeScript** e **Prisma**.
 Il progetto gestisce la presenza online del centro (presentazione, servizi, contatti) e integra una base dati tramite Prisma e script dedicati alla gestione dei servizi.
 
 ---
 
 ## Descrizione
 
 **Centro Estetico Valentina** è un sito/applicazione web che permette di:
 
 - presentare **servizi e trattamenti** offerti dal centro;
 - raccontare la **storia**, i **valori** e la **filosofia** di Valentina;
 - mostrare eventuali **listini**, pacchetti e promozioni;
 - fornire **contatti chiari** per prenotazioni o richieste informazioni.
 
 L’obiettivo è creare un’esperienza:
 
 - **moderna** (Next.js 14 + React 18),
 - **tipizzata** (TypeScript),
 - **scalabile** (Prisma + database),
 - **responsive** (layout ottimizzato per mobile e desktop).
 
 ---
 
 ## Indice
 
 - **Descrizione**
 - **Funzionalità principali**
 - **Stack tecnico**
 - **Prerequisiti**
 - **Installazione**
 - **Script disponibili**
 - **Struttura del progetto**
 - **Database & Prisma**
 - **Import dei servizi**
 - **Configurazione**
 - **Deployment**
 - **Contributi**
 - **Licenza**
 
 ---
 
 ## Funzionalità principali
 
 - Home con panoramica del centro e servizi in evidenza
 - Pagina About con storia e filosofia di Valentina
 - Sezione Servizi / Trattamenti gestita via database (Prisma)
 - Sezione Contatti con recapiti, eventuale form e integrazioni
 - Eventuale area riservata / autenticazione tramite `next-auth`
 
 *(Adatta/arricchisci in base alle sezioni effettivamente presenti nell’app.)*
 
 ---
 
 ## Stack tecnico
 
 - **Framework**: Next.js `14.1.0` (App Router)
 - **Linguaggio**: TypeScript `5.6.2`
 - **React**: `18.2.0`
 - **Database ORM**: Prisma `5.8.0` + `@prisma/client`
 - **Autenticazione**: `next-auth` `4.24.5` (se usata)
 - **Email**: `nodemailer` `6.9.5`
 - **Styling/UI**:
   - `bootstrap` `5.3.3`
   - `classnames` per la gestione dinamica delle classi CSS
 - **Date & Time**:
   - `date-fns`, `date-fns-tz`
 - **Validazione**:
   - `zod` `3.23.0`
 - **Altro**:
   - `googleapis` per eventuali integrazioni con servizi Google
   - `bcryptjs` per hashing password (se presente login custom)
 
 Gestione pacchetti: **npm**
 
 ---
 
 ## Prerequisiti
 
 - **Node.js** ≥ 18.x
 - **npm** ≥ 9.x (consigliato)
 
 Verifica l’installazione con:
 
 ```bash
 node -v
 npm -v
 ```
 
 È richiesto un **database** compatibile con Prisma (es. PostgreSQL, MySQL, SQLite, ecc.) e la relativa `DATABASE_URL` configurata.
 
 ---
 
 ## Installazione
 
 1. Clona il repository
 
    ```bash
    git clone <URL_DEL_REPOSITORY>
    cd valentina
    ```
 
 2. Installa le dipendenze
 
    ```bash
    npm install
    ```
 
 3. Configura le variabili d’ambiente (vedi sezione Configurazione)
 
 4. Genera il client Prisma
 
    ```bash
    npm run prisma:generate
    ```
 
 5. Esegui le migration del database (sviluppo)
 
    ```bash
    npm run prisma:migrate
    ```
 
 6. Avvia l’ambiente di sviluppo
 
    ```bash
    npm run dev
    ```
 
 L’applicazione sarà disponibile di default su `http://localhost:3000`.
 
 ---
 
 ## Script disponibili
 
 Gli script principali definiti in `package.json` sono:
 
 - **Sviluppo**
 
   ```bash
   npm run dev
   ```
 
   Avvia Next.js in modalità sviluppo.
 
 - **Build di produzione**
 
   ```bash
   npm run build
   ```
 
   Esegue prima la generazione del client Prisma e poi la build:
 
   ```bash
   npm run prisma:generate && next build
   ```
 
 - **Avvio in produzione**
 
   ```bash
   npm start
   ```
 
   Avvia il server Next.js sulla build compilata.
 
 - **Lint**
 
   ```bash
   npm run lint
   ```
 
   Esegue ESLint con la configurazione `eslint-config-next`.
 
 - **Prisma: generate**
 
   ```bash
   npm run prisma:generate
   ```
 
   Genera il client Prisma a partire da `prisma/schema.prisma`.
 
 - **Prisma: migrate (dev)**
 
   ```bash
   npm run prisma:migrate
   ```
 
   Esegue `prisma migrate dev` per applicare le migration in ambiente di sviluppo.
 
 - **Import servizi**
 
   ```bash
   npm run import:services
   ```
 
   Esegue `node scripts/importServicesFromJson.js` per importare i servizi da un file JSON nel database.
 
 - **Cleanup servizi duplicati**
 
   ```bash
   npm run cleanup:services
   ```
 
   Esegue `node scripts/cleanupDuplicateServices.js` per rimuovere/normalizzare eventuali servizi duplicati.
 
 ---
 
 ## Struttura del progetto
 
 Struttura indicativa (adattare alla struttura reale):
 
 ```bash
 valentina/
 ├─ app/
 │  ├─ page.tsx              # Home page
 │  ├─ about/
 │  │  └─ page.tsx           # Pagina About
 │  ├─ api/                  # Route API (auth, servizi, ecc.)
 │  ├─ layout.tsx            # Layout root dell'app
 │  └─ ...                   # Altre pagine/segmenti
 ├─ prisma/
 │  ├─ schema.prisma         # Definizione del modello dati
 │  └─ migrations/           # Migration generate da Prisma
 ├─ scripts/
 │  ├─ importServicesFromJson.js
 │  └─ cleanupDuplicateServices.js
 ├─ public/                  # Immagini, favicon, asset statici
 ├─ styles/                  # Stili globali / override Bootstrap
 ├─ next.config.mjs          # Configurazione Next.js (se presente)
 ├─ tsconfig.json            # Configurazione TypeScript
 ├─ package.json
 └─ README.md
 ```
 
 ---
 
 ## Database & Prisma
 
 1. Configura `DATABASE_URL` in `.env.local`:
 
    ```bash
    DATABASE_URL="postgresql://user:password@host:port/dbname?schema=public"
    ```
 
    (Adatta la stringa al database effettivamente utilizzato.)
 
 2. Definisci i modelli in `prisma/schema.prisma`.
 
 3. Applica le migration in sviluppo:
 
    ```bash
    npm run prisma:migrate
    ```
 
 4. Rigenera il client Prisma ogni volta che cambi lo schema:
 
    ```bash
    npm run prisma:generate
    ```
 
 ---
 
 ## Import dei servizi
 
 Il progetto include script dedicati alla gestione dei servizi:
 
 - **Import da JSON**
 
   ```bash
   npm run import:services
   ```
 
   Importa i servizi da un file JSON nel database.
 
 - **Cleanup servizi duplicati**
 
   ```bash
   npm run cleanup:services
   ```
 
   Analizza i servizi esistenti ed esegue una pulizia dei duplicati secondo la logica implementata in `scripts/cleanupDuplicateServices.js`.
 
 *(Puoi documentare qui il formato del JSON e i criteri di deduplicazione, se necessario.)*
 
 ---
 
 ## Configurazione
 
 Crea un file `.env.local` nella root del progetto per le variabili d’ambiente (non va committato).
 
 Esempio di variabili possibili:
 
 ```bash
 # Database
 DATABASE_URL=...
 
 # NextAuth (se utilizzato)
 NEXTAUTH_URL=http://localhost:3000
 NEXTAUTH_SECRET=...
 
 # Email (Nodemailer)
 EMAIL_SERVER_HOST=...
 EMAIL_SERVER_PORT=...
 EMAIL_SERVER_USER=...
 EMAIL_SERVER_PASSWORD=...
 EMAIL_FROM="Centro Estetico Valentina <no-reply@example.com>"
 
 # Google APIs (se usi googleapis)
 GOOGLE_CLIENT_ID=...
 GOOGLE_CLIENT_SECRET=...
 GOOGLE_REFRESH_TOKEN=...
 GOOGLE_REDIRECT_URI=...
 ```
 
 Adatta la lista alle integrazioni effettivamente utilizzate nel progetto.
 
 ---
 
 ## Deployment
 
 Il progetto è compatibile con piattaforme che supportano **Next.js 14**, come:
 
 - **Vercel** (consigliato)
 - **Netlify** (con adattatore Next)
 - Server Node.js dedicati
 
 Passi generali:
 
 1. Assicurati che tutte le variabili d’ambiente siano configurate (inclusa `DATABASE_URL`).
 2. Esegui la build di produzione:
 
    ```bash
    npm run build
    ```
 
 3. Avvia l’app:
 
    ```bash
    npm start
    ```
 
 Su **Vercel**:
 
 - Build Command: `npm run build`
 - Install Command: `npm install` (o automatico)
 - Runtime: Node 18
 - Configura le environment variables dalla dashboard Vercel.
 
 ---
 
 ## Contributi
 
 - Esegui un fork del repository.
 - Crea un branch per la tua feature/bugfix:
 
   ```bash
   git checkout -b feature/nome-feature
   ```
 
 - Effettua le modifiche (con test e lint dove possibile).
 - Apri una Pull Request descrivendo chiaramente:
   - cosa è stato modificato;
   - come testare le modifiche.
 
 ---
 
 ## Licenza
 
 Specifica qui il tipo di licenza, ad esempio:
 
 - MIT
 - Proprietaria / uso interno
 
 ```text
 2025 Centro Estetico Valentina. Tutti i diritti riservati.
