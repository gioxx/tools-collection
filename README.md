# 🔧 Online Tools Collection

Una collezione completa di strumenti online COPIATA PARI PARI da Andrea Draghetti per l'elaborazione di testo, generazione di contenuti, estrazione dati e sicurezza informatica. Applicazione web moderna costruita con HTML5, CSS3 e JavaScript vanilla.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)

## 📋 Indice

- [Panoramica](#panoramica)
- [Caratteristiche](#caratteristiche)
- [Strumenti Disponibili](#strumenti-disponibili)
- [Installazione](#installazione)
- [Utilizzo](#utilizzo)
- [Struttura del Progetto](#struttura-del-progetto)
- [Architettura](#architettura)
- [Personalizzazione](#personalizzazione)
- [Contribuire](#contribuire)
- [Roadmap](#roadmap)
- [Licenza](#licenza)
- [Autori](#autori)

## 🎯 Panoramica

Online Tools Collection è un'applicazione web single-page che fornisce una suite di strumenti utili per sviluppatori, content creator e professionisti della sicurezza. L'interfaccia è intuitiva, responsiva e supporta sia la modalità chiara che quella scura.

### Perché questo progetto?

- **Nessuna dipendenza esterna**: Costruito con JavaScript vanilla per prestazioni ottimali
- **Privacy-first**: Tutti gli strumenti funzionano localmente nel browser, nessun dato viene inviato a server esterni
- **Interfaccia moderna**: Design pulito e moderno con supporto per tema scuro
- **Completamente responsive**: Funziona perfettamente su desktop, tablet e dispositivi mobili
- **Open source**: Liberamente modificabile e personalizzabile

## ✨ Caratteristiche

### 🎨 Design e UX
- **Tema Dinamico**: Switch immediato tra modalità chiara e scura
- **Interfaccia Intuitiva**: Sidebar organizzata per categorie con ricerca integrata
- **Design Responsivo**: Layout adattivo per tutti i dispositivi
- **Feedback Visivo**: Animazioni fluide e feedback immediato alle azioni

### 🚀 Performance
- **Caricamento Veloce**: Nessuna libreria esterna da caricare
- **Elaborazione Client-Side**: Tutti i calcoli avvengono nel browser
- **Ottimizzazione Memoria**: Gestione efficiente delle risorse

### 🔒 Privacy e Sicurezza
- **Zero Tracking**: Nessun analytics o tracking dell'utente
- **Dati Locali**: Nessun dato lascia il tuo browser
- **Codice Aperto**: Completamente ispezionabile e verificabile

## 🛠️ Strumenti Disponibili

### 📝 Elaborazione Testo

#### 📋 List Generator
Converte testo semplice in diversi formati di lista.
- **Funzionalità**: 
  - Lista numerata
  - Lista puntata
  - Separazione con virgole
  - Separazione con pipe (|)
- **Uso**: Ideale per formattare rapidamente liste per documentazione o presentazioni

#### ✏️ Aggiungi Testo alle Righe
Aggiunge prefissi o suffissi a ogni riga del testo.
- **Funzionalità**:
  - Aggiunta all'inizio della riga
  - Aggiunta alla fine della riga
  - Supporto per qualsiasi carattere o stringa
- **Uso**: Perfetto per aggiungere bullet points, citazioni o formattazione markdown

#### 🔠 Converti Maiuscole/Minuscole
Trasforma il testo in diversi formati di case.
- **Formati supportati**:
  - MAIUSCOLO
  - minuscolo
  - Title Case
  - camelCase
  - snake_case
  - CONSTANT_CASE
- **Uso**: Essenziale per sviluppatori e content writer

#### ❌ Rimuovi Righe Duplicate
Elimina le righe duplicate da una lista.
- **Opzioni**:
  - Mantieni ordine originale
  - Case sensitive/insensitive
- **Uso**: Pulizia di dataset e liste

#### 📏 Rimuovi Interruzioni di Riga
Unisce il testo su una singola riga.
- **Opzioni di sostituzione**:
  - Spazio
  - Nessun carattere
  - Carattere personalizzato
- **Uso**: Formattazione di testi copiati da PDF o altre fonti

#### 🚫 Rimuovi Righe che Contengono
Filtra le righe che contengono parole specifiche.
- **Funzionalità**:
  - Ricerca multipla (virgole separate)
  - Case sensitive/insensitive
  - Conteggio righe rimosse
- **Uso**: Filtraggio log, pulizia dataset

### 🎲 Generatori

#### 🔑 Password Generator
Genera password sicure e casuali.
- **Opzioni**:
  - Lunghezza personalizzabile (8-50 caratteri)
  - Maiuscole (A-Z)
  - Minuscole (a-z)
  - Numeri (0-9)
  - Simboli speciali (!@#$%^&*)
- **Sicurezza**: Utilizza crypto API del browser per vera casualità

#### 👤 Username Generator
Crea username unici e memorabili.
- **Stili disponibili**:
  - Random Words (parole casuali combinate)
  - Tech Style (termini tecnologici)
  - Fantasy (nomi fantastici)
  - Cool (combinazioni moderne)
- **Opzioni**: Genera fino a 20 username simultaneamente

### 🔍 Estrazione

#### 🌐 Estrattore Domini
Estrae domini da una lista di URL.
- **Funzionalità**:
  - Estrazione domini principali
  - Opzione per includere/escludere sottodomini
  - Rimozione duplicati automatica
- **Uso**: Analisi link, creazione whitelist/blacklist

#### 📧 Estrattore Email
Trova tutte le email in un testo.
- **Funzionalità**:
  - Riconoscimento pattern email complessi
  - Rimozione duplicati opzionale
  - Conteggio email trovate
- **Uso**: Estrazione contatti da testi, pulizia database

### 📊 Analisi

#### 🔢 Conta Duplicati
Analizza e conta le occorrenze duplicate.
- **Funzionalità**:
  - Conteggio occorrenze per ogni elemento
  - Ordinamento per frequenza
  - Case sensitive/insensitive
  - Visualizzazione percentuali
- **Uso**: Analisi frequenza parole, identificazione pattern

### 🔐 Sicurezza

#### 🧪 Curl to Burp Converter
Converte comandi curl in formato HTTP per Burp Suite.
- **Supporto per**:
  - Headers personalizzati
  - Metodi HTTP (GET, POST, PUT, DELETE, etc.)
  - Body delle richieste
  - Parametri URL
- **Uso**: Testing sicurezza web, analisi API

#### 🛡️ IoC Escape Tool
Escape/unescape di Indicatori di Compromissione (IoC).
- **Tipi supportati**:
  - Indirizzi IP (IPv4/IPv6)
  - Domini e URL
  - Hash (MD5, SHA1, SHA256)
  - Email
- **Funzionalità**:
  - Escape: example.com → example[.]com
  - Unescape: example[.]com → example.com
- **Uso**: Condivisione sicura di IoC in report di sicurezza

### 😎 Convertitori

#### 😊 Emoji Shortcode Converter
Converte tra emoji e shortcode.
- **Direzioni**:
  - Shortcode → Emoji (:smile: → 😄)
  - Emoji → Shortcode (😄 → :smile:)
- **Database**: Supporta centinaia di emoji comuni
- **Uso**: Scrittura per piattaforme che usano shortcode (Slack, Discord)

## 💻 Installazione

### Prerequisiti
- Un web server locale (opzionale per sviluppo)
- Un browser moderno (Chrome, Firefox, Safari, Edge)

### Installazione Locale

1. **Clona il repository**
```bash
git clone https://github.com/amargiovanni/tools-collection.git
cd tools-collection
```

2. **Apri direttamente nel browser**
```bash
# Su macOS
open index.html

# Su Linux
xdg-open index.html

# Su Windows
start index.html
```

3. **Oppure usa un server locale** (consigliato per sviluppo)
```bash
# Con Python 3
python -m http.server 8000

# Con Node.js
npx serve

# Con PHP
php -S localhost:8000
```

4. **Accedi all'applicazione**
   - Apri il browser su `http://localhost:8000`

## 📖 Utilizzo

### Navigazione Base

1. **Seleziona uno strumento** dalla sidebar a sinistra
2. **Inserisci il testo** nell'area di input
3. **Configura le opzioni** se disponibili
4. **Clicca sul pulsante** per elaborare
5. **Copia il risultato** con il pulsante "Copia"

### Funzionalità Avanzate

#### 🔍 Ricerca Strumenti
- Usa la barra di ricerca nella sidebar per trovare rapidamente gli strumenti
- La ricerca filtra in tempo reale mentre digiti

#### 🌓 Cambio Tema
- Clicca sull'icona luna/sole per alternare tra tema chiaro e scuro
- La preferenza viene salvata localmente

#### ⌨️ Scorciatoie Tastiera
- `Ctrl/Cmd + K`: Focus sulla ricerca
- `Esc`: Chiudi dialoghi o resetta ricerca

## 📁 Struttura del Progetto

```
tools-collection/
│
├── index.html          # File HTML principale con struttura e strumenti
├── style.css          # Stili CSS con supporto per temi
├── app.js             # Logica JavaScript per tutti gli strumenti
└── README.md          # Documentazione del progetto
```

### Dettaglio File

#### `index.html`
- Struttura semantica HTML5
- Container per ogni strumento
- Sidebar di navigazione
- Meta tag per SEO e responsive

#### `style.css`
- Variabili CSS per temi
- Layout responsive con flexbox/grid
- Animazioni e transizioni
- Stili componenti riutilizzabili

#### `app.js`
- Classe principale `OnlineToolsApp`
- Moduli per ogni strumento
- Gestione eventi e DOM
- Utility functions condivise

## 🏗️ Architettura

### Design Pattern
L'applicazione utilizza un pattern MVC leggero:

```javascript
// Model - Dati e logica business
class ToolModel {
    processData(input, options) { }
}

// View - Interfaccia utente
class ToolView {
    render(data) { }
    bindEvents(handler) { }
}

// Controller - Coordinamento
class ToolController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }
}
```

### Flusso Dati
1. **Input utente** → Event Handler
2. **Validazione** → Controllo parametri
3. **Elaborazione** → Logica strumento
4. **Output** → Aggiornamento DOM
5. **Feedback** → Notifiche utente

### Gestione Stato
- Stato locale per ogni strumento
- Nessuno stato globale condiviso
- Event-driven updates

## 🎨 Personalizzazione

### Aggiungere un Nuovo Strumento

1. **Aggiungi HTML** in `index.html`:
```html
<div id="nuovo-strumento" class="tool-container">
    <div class="tool-header">
        <h2>🆕 Nuovo Strumento</h2>
        <p>Descrizione strumento</p>
    </div>
    <div class="tool-content">
        <!-- Contenuto strumento -->
    </div>
</div>
```

2. **Aggiungi link** nella sidebar:
```html
<li>
    <a href="#" data-tool="nuovo-strumento" class="tool-link">
        🆕 Nuovo Strumento
    </a>
</li>
```

3. **Implementa logica** in `app.js`:
```javascript
initNuovoStrumento() {
    const btn = document.getElementById('nuovoStrumentoBtn');
    btn?.addEventListener('click', () => {
        // Logica strumento
    });
}
```

### Personalizzare i Temi

Modifica le variabili CSS in `style.css`:

```css
:root {
    /* Colori tema chiaro */
    --bg-primary: #ffffff;
    --text-primary: #1a1a1a;
    --accent: #007bff;
}

[data-color-scheme="dark"] {
    /* Colori tema scuro */
    --bg-primary: #1a1a1a;
    --text-primary: #ffffff;
    --accent: #4dabf7;
}
```

### Modificare Layout

Il layout utilizza CSS Grid e Flexbox:

```css
.app-container {
    display: grid;
    grid-template-columns: 280px 1fr; /* Sidebar + Content */
}
```

## 🤝 Contribuire

Contribuzioni sono benvenute! Ecco come puoi aiutare:

### 1. Fork & Clone
```bash
# Fork su GitHub, poi:
git clone https://github.com/amargiovanni/tools-collection.git
cd tools-collection
git checkout -b feature/nuovo-strumento
```

### 2. Sviluppa
- Segui lo stile di codice esistente
- Testa su diversi browser
- Assicurati che sia responsive

### 3. Commit
```bash
git add .
git commit -m "feat: aggiunto nuovo strumento X"
```

### 4. Push & PR
```bash
git push origin feature/nuovo-strumento
# Crea Pull Request su GitHub
```

### Linee Guida
- **Codice pulito**: Commenti dove necessario
- **Nomi descrittivi**: Variabili e funzioni autoesplicative
- **Test manuale**: Verifica tutti i casi d'uso
- **Documentazione**: Aggiorna README se necessario

## 🗺️ Roadmap

### Versione 1.1 (Q3 2025)
- [ ] Base64 Encoder/Decoder
- [ ] URL Encoder/Decoder
- [ ] JSON Formatter/Validator
- [ ] Diff Checker

### Versione 1.2 (Q3 2025)
- [ ] Regex Tester
- [ ] Color Picker/Converter
- [ ] Timestamp Converter
- [ ] Hash Generator

### Versione 2.0 (Q4 2025)
- [ ] PWA Support
- [ ] Offline functionality
- [ ] Import/Export settings
- [ ] Keyboard shortcuts panel

### Idee Future
- Integrazione API esterne
- Estensione browser
- Versione desktop (Electron)
- Supporto multilingua

## 📄 Licenza

Questo progetto è rilasciato sotto licenza MIT. Vedi il file [LICENSE](LICENSE) per i dettagli.

```
MIT License

Copyright (c) 2024 Andrea M.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

## 👥 Autori

- **Andrea Margiovanni** - *Sviluppatore principale* - [@amargiovanni](https://github.com/amargiovanni)

### Ringraziamenti

- Icone emoji native per un'interfaccia amichevole
- Andrea Draghetti da cui ho copiato tutto
- Tutti i contributori e tester (no, dai, ha fatto tutto Perplexity)

---

<div align="center">
    <p>Fatto con ❤️ dalla AI per gli sviluppatori</p>
    <p>
        <a href="https://github.com/amargiovanni/tools-collection/issues">Segnala un Bug</a>
        ·
        <a href="https://github.com/amargiovanni/tools-collection/issues">Richiedi una Feature</a>
    </p>
</div>
