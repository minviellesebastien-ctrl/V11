const STORAGE_KEY = "avenir-comptes-v6";
const LEGACY_STORAGE_KEY = "avenir-comptes-v5";
const UPDATED_KEY = "avenir-derniere-mise-a-jour-v6";
const LEGACY_UPDATED_KEY = "avenir-derniere-mise-a-jour-v5";

const ICONS = {
  "revolut": "./revolut.png",
  "livret-a": "./livret-a.png",
  "ldd": "./ldd.png",
  "lep": "./lep.png",
  "assurance-vie": "./assurance-vie.png",
  "msci": "./msci.png",
  "per": "./per.png"
};

const DEFAULT_ACCOUNTS = [
  { icon: "revolut", name: "REVOLUT", amount: 8446.36 },
  { icon: "livret-a", name: "LCL - Livret A", amount: 26003.44 },
  { icon: "ldd", name: "LCL - LDD", amount: 12747.87 },
  { icon: "lep", name: "LCL - LEP", amount: 10856.51 },
  { icon: "assurance-vie", name: "LINXEA - Fonds", amount: 20334.56 },
  { icon: "msci", name: "LINXEA - MSCI", amount: 5589.54 },
  { icon: "per", name: "LINXEA - PER", amount: 10017.55 }
];

const accountsList = document.getElementById("accountsList");
const totalAmount = document.getElementById("totalAmount");
const lastUpdated = document.getElementById("lastUpdated");
const openSettingsButton = document.getElementById("openSettingsButton");
const closeSettingsButton = document.getElementById("closeSettingsButton");
const settingsOverlay = document.getElementById("settingsOverlay");
const settingsAccounts = document.getElementById("settingsAccounts");
const addAccountButton = document.getElementById("addAccountButton");
const saveSettingsButton = document.getElementById("saveSettingsButton");
const accountCardTemplate = document.getElementById("accountCardTemplate");
const settingsAccountTemplate = document.getElementById("settingsAccountTemplate");
const msciNoteOverlay =
  document.getElementById("msciNoteOverlay");

const msciNoteText =
  document.getElementById("msciNoteText");

const closeMsciNoteButton =
  document.getElementById("closeMsciNoteButton");

const MSCI_NOTE_KEY = "avenir-msci-note";
const MSCI_DETAILS_KEY = "avenir-msci-details-v1";
const DEFAULT_MSCI_DETAILS = {
  openingDate: "02/02/26",
  insurer: "Linxea - Suravenir",
  support: "Amundi MSCI World Swap II UCITS ETF Dist FR0010315770",
  about: "Un support diversifié investi dans de grandes entreprises des pays développés.",
  arbitrages: "À renseigner"
};

function loadMsciDetails() {
  try {
    const saved = JSON.parse(localStorage.getItem(MSCI_DETAILS_KEY) || "null");
    return { ...DEFAULT_MSCI_DETAILS, ...(saved && typeof saved === "object" ? saved : {}) };
  } catch (error) {
    console.error("Erreur de chargement des informations MSCI :", error);
    return { ...DEFAULT_MSCI_DETAILS };
  }
}

function saveMsciDetails(details) {
  localStorage.setItem(MSCI_DETAILS_KEY, JSON.stringify(details));
}

let msciDetails = loadMsciDetails();

const REVOLUT_DETAILS_KEY = "avenir-revolut-details-v1";
const DEFAULT_REVOLUT_DETAILS = {
  accountType: "Compte courant",
  about: "Une réserve disponible pour absorber une grosse dépense, puis reconstituée progressivement."
};

function loadRevolutDetails() {
  try {
    const saved = JSON.parse(localStorage.getItem(REVOLUT_DETAILS_KEY) || "null");
    return {
      ...DEFAULT_REVOLUT_DETAILS,
      ...(saved && typeof saved === "object" ? saved : {})
    };
  } catch (error) {
    console.error("Erreur de chargement des informations Revolut :", error);
    return { ...DEFAULT_REVOLUT_DETAILS };
  }
}

function saveRevolutDetails(details) {
  localStorage.setItem(REVOLUT_DETAILS_KEY, JSON.stringify(details));
}

let revolutDetails = loadRevolutDetails();

const LIVRET_A_DETAILS_KEY = "avenir-livret-a-details-v1";
const DEFAULT_LIVRET_A_DETAILS = {
  interestRate: "1,7%",
  interests: "Calcul annuel",
  ceiling: "22 950 €",
  about: "Une épargne sécurisée, disponible à tout moment et exonérée d’impôt."
};

function loadLivretADetails() {
  try {
    const saved = JSON.parse(localStorage.getItem(LIVRET_A_DETAILS_KEY) || "null");
    return {
      ...DEFAULT_LIVRET_A_DETAILS,
      ...(saved && typeof saved === "object" ? saved : {})
    };
  } catch (error) {
    console.error("Erreur de chargement des informations Livret A :", error);
    return { ...DEFAULT_LIVRET_A_DETAILS };
  }
}

function saveLivretADetails(details) {
  localStorage.setItem(LIVRET_A_DETAILS_KEY, JSON.stringify(details));
}

let livretADetails = loadLivretADetails();

const LDD_DETAILS_KEY = "avenir-ldd-details-v1";
const DEFAULT_LDD_DETAILS = {
  interestRate: "1,7%",
  interests: "Calcul annuel",
  ceiling: "12 000 €",
  about: "Une épargne sécurisée et disponible, complémentaire au Livret A."
};

function loadLddDetails() {
  try {
    const saved = JSON.parse(localStorage.getItem(LDD_DETAILS_KEY) || "null");
    return {
      ...DEFAULT_LDD_DETAILS,
      ...(saved && typeof saved === "object" ? saved : {})
    };
  } catch (error) {
    console.error("Erreur de chargement des informations LDD :", error);
    return { ...DEFAULT_LDD_DETAILS };
  }
}

function saveLddDetails(details) {
  localStorage.setItem(LDD_DETAILS_KEY, JSON.stringify(details));
}

let lddDetails = loadLddDetails();

const FONDS_EURO_DETAILS_KEY = "avenir-fonds-euro-details-v1";
const DEFAULT_FONDS_EURO_DETAILS = {
  openingDate: "02/02/26",
  insurer: "Linxea - Suravenir",
  support: "Fonds euro",
  about: "Un support sécurisé de l’assurance vie, destiné à préserver le capital tout en générant des intérêts. Mensualités 200/mois."
};

function loadFondsEuroDetails() {
  try {
    const saved = JSON.parse(localStorage.getItem(FONDS_EURO_DETAILS_KEY) || "null");
    return {
      ...DEFAULT_FONDS_EURO_DETAILS,
      ...(saved && typeof saved === "object" ? saved : {})
    };
  } catch (error) {
    console.error("Erreur de chargement des informations Fonds euro :", error);
    return { ...DEFAULT_FONDS_EURO_DETAILS };
  }
}

function saveFondsEuroDetails(details) {
  localStorage.setItem(FONDS_EURO_DETAILS_KEY, JSON.stringify(details));
}

let fondsEuroDetails = loadFondsEuroDetails();


const PER_DETAILS_KEY = "avenir-per-details-v1";
const DEFAULT_PER_DETAILS = {
  openingDate: "02/02/26",
  insurer: "Linxea - Suravenir",
  accountType: "PER individuel (Périn)",
  about: "Une épargne à long terme dédiée à la retraite, actuellement orientée vers la sécurité du fonds euro."
};

function loadPerDetails() {
  try {
    const saved = JSON.parse(localStorage.getItem(PER_DETAILS_KEY) || "null");
    return {
      ...DEFAULT_PER_DETAILS,
      ...(saved && typeof saved === "object" ? saved : {})
    };
  } catch (error) {
    console.error("Erreur de chargement des informations PER :", error);
    return { ...DEFAULT_PER_DETAILS };
  }
}

function savePerDetails(details) {
  localStorage.setItem(PER_DETAILS_KEY, JSON.stringify(details));
}

let perDetails = loadPerDetails();

let accounts = loadAccounts();

function cloneDefaults() {
  return DEFAULT_ACCOUNTS.map(account => ({ ...account }));
}

function parseAmount(value) {
  const cleaned = String(value)
    .replace(/\u00a0/g, "")
    .replace(/\s/g, "")
    .replace(/€/g, "")
    .replace(",", ".")
    .replace(/[^0-9.-]/g, "");

  const number = Number.parseFloat(cleaned);
  return Number.isFinite(number) ? number : 0;
}

function formatAmount(value) {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

/* ===== AV€NIR V10.8 : animation fiable des montants ===== */
const amountAnimations = new WeakMap();
const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

function readDisplayedAmount(element) {
  if (!element) return 0;
  return parseAmount(element.textContent || "0");
}

function animateAmount(element, fromValue, toValue, options = {}) {
  if (!element) return;

  const {
    duration = 850,
    suffix = "",
    delay = 0
  } = options;

  const previousAnimation = amountAnimations.get(element);
  if (previousAnimation) {
    cancelAnimationFrame(previousAnimation.frameId);
    window.clearTimeout(previousAnimation.delayId);
  }

  const from = Number.isFinite(fromValue) ? fromValue : 0;
  const to = Number.isFinite(toValue) ? toValue : 0;

  if (prefersReducedMotion || duration <= 0 || Math.abs(to - from) < 0.005) {
    element.textContent = `${formatAmount(to)}${suffix}`;
    amountAnimations.delete(element);
    return;
  }

  element.textContent = `${formatAmount(from)}${suffix}`;

  const state = { frameId: 0, delayId: 0 };
  amountAnimations.set(element, state);

  state.delayId = window.setTimeout(() => {
    let startedAt = null;

    function easeOutQuart(value) {
      return 1 - Math.pow(1 - value, 4);
    }

    function frame(timestamp) {
      if (startedAt === null) startedAt = timestamp;

      const progress = Math.min((timestamp - startedAt) / duration, 1);
      const current = from + (to - from) * easeOutQuart(progress);
      element.textContent = `${formatAmount(current)}${suffix}`;

      if (progress < 1) {
        state.frameId = requestAnimationFrame(frame);
      } else {
        element.textContent = `${formatAmount(to)}${suffix}`;
        amountAnimations.delete(element);
      }
    }

    state.frameId = requestAnimationFrame(frame);
  }, delay);
}

function formatDate(value) {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "short",
    timeStyle: "short"
  }).format(value);
}

function inferIcon(account) {
  if (account.icon && ICONS[account.icon]) return account.icon;

  const name = String(account.name || "").toLowerCase();
  if (name.includes("revolut")) return "revolut";
  if (name.includes("livret a") || name === "livrets") return "livret-a";
  if (name.includes("ldd") || name.includes("ldds")) return "ldd";
  if (name.includes("lep")) return "lep";
  if (name.includes("msci") || name.includes("world")) return "msci";
  if (name.includes("per")) return "per";
  if (name.includes("assurance") || name.includes("fonds euro")) return "assurance-vie";
  return "revolut";
}

function normalizeAccount(account) {
  return {
    icon: inferIcon(account),
    name: account.name || "Compte",
    amount: parseAmount(account.amount)
  };
}

function loadAccounts() {
  const saved = localStorage.getItem(STORAGE_KEY);
  const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
  const source = saved || legacy;

  if (!source) return cloneDefaults();

  try {
    const parsed = JSON.parse(source);
    if (!Array.isArray(parsed)) throw new Error("Format incorrect");

    const normalized = parsed.map(normalizeAccount);

    if (!saved) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    }

    return normalized;
  } catch (error) {
    console.error("Erreur de chargement :", error);
    return cloneDefaults();
  }
}

function saveAccounts() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));

  const now = new Date();
  localStorage.setItem(UPDATED_KEY, now.toISOString());
  lastUpdated.textContent = formatDate(now);
}

function renderLastUpdated() {
  const saved = localStorage.getItem(UPDATED_KEY) || localStorage.getItem(LEGACY_UPDATED_KEY);

  if (!saved) {
    lastUpdated.textContent = formatDate(new Date());
    return;
  }

  const parsed = new Date(saved);
  lastUpdated.textContent = Number.isNaN(parsed.getTime())
    ? formatDate(new Date())
    : formatDate(parsed);
}

function calculateTotal() {
  return accounts.reduce(
    (total, account) => total + parseAmount(account.amount),
    0
  );
}

function renderAccounts() {
  const previousCardAmounts = [...accountsList.querySelectorAll(".account-amount")]
    .map(readDisplayedAmount);
  const previousTotal = readDisplayedAmount(totalAmount);
  const firstRender = accountsList.children.length === 0;

  accountsList.innerHTML = "";

  accounts.forEach((account, index) => {
    const fragment = accountCardTemplate.content.cloneNode(true);
    const icon = fragment.querySelector(".account-icon");
    const amountElement = fragment.querySelector(".account-amount");

    icon.src = ICONS[account.icon] || ICONS.revolut;
    icon.alt = account.name;
    fragment.querySelector(".account-name").textContent = account.name;
    amountElement.textContent = "0,00";

    accountsList.appendChild(fragment);

    animateAmount(
      amountElement,
      firstRender ? 0 : (previousCardAmounts[index] ?? 0),
      parseAmount(account.amount),
      {
        duration: firstRender ? 950 : 620,
        delay: firstRender ? index * 55 : 0
      }
    );
  });

  const splashIsVisible = firstRender && document.getElementById("appSplash");

  if (splashIsVisible) {
    // Le splash masque la page pendant environ 1,5 s. On conserve donc
    // le total à zéro et on lance son animation au moment où l'accueil
    // devient réellement visible.
    totalAmount.textContent = "0,00 €";
  } else {
    animateAmount(
      totalAmount,
      firstRender ? 0 : previousTotal,
      calculateTotal(),
      {
        duration: firstRender ? 1100 : 720,
        suffix: " €"
      }
    );
  }
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderSettings() {
  settingsAccounts.innerHTML = "";

  accounts.forEach((account, index) => {
    const fragment = settingsAccountTemplate.content.cloneNode(true);
    const row = fragment.querySelector(".settings-account-row");
    const iconSelect = fragment.querySelector(".icon-select");
    const nameInput = fragment.querySelector(".name-input");
    const amountInput = fragment.querySelector(".amount-input");
    const deleteButton = fragment.querySelector(".delete-account-button");

    iconSelect.value = account.icon;
    nameInput.value = account.name;
    amountInput.value = formatAmount(account.amount);
    row.dataset.index = index;
      row.dataset.custom = account.custom ? "true" : "false";

    if (inferIcon(account) === "revolut" && !account.custom) {
      const details = document.createElement("section");
      details.className = "settings-account-details settings-revolut-details";
      details.innerHTML = `
        <h3>Informations Revolut</h3>
        <label class="settings-detail-field">
          <span>Type de compte</span>
          <input class="revolut-account-type-input" type="text" autocomplete="off" value="${escapeHtml(revolutDetails.accountType)}">
        </label>
        <label class="settings-detail-field">
          <span>À propos</span>
          <textarea class="revolut-about-input" rows="4" autocomplete="off">${escapeHtml(revolutDetails.about)}</textarea>
        </label>`;
      row.appendChild(details);
    }

    if (inferIcon(account) === "livret-a") {
      const details = document.createElement("section");
      details.className = "settings-account-details settings-livret-a-details";
      details.innerHTML = `
        <h3>Informations Livret A</h3>
        <label class="settings-detail-field">
          <span>Taux</span>
          <input class="livret-a-interest-rate-input" type="text" autocomplete="off" value="${escapeHtml(livretADetails.interestRate)}">
        </label>
        <label class="settings-detail-field">
          <span>Intérêts</span>
          <input class="livret-a-interests-input" type="text" autocomplete="off" value="${escapeHtml(livretADetails.interests)}">
        </label>
        <label class="settings-detail-field">
          <span>Plafond</span>
          <input class="livret-a-ceiling-input" type="text" autocomplete="off" value="${escapeHtml(livretADetails.ceiling)}">
        </label>
        <label class="settings-detail-field">
          <span>À propos</span>
          <textarea class="livret-a-about-input" rows="4" autocomplete="off">${escapeHtml(livretADetails.about)}</textarea>
        </label>`;
      row.appendChild(details);
    }

    if (inferIcon(account) === "ldd") {
      const details = document.createElement("section");
      details.className = "settings-account-details settings-ldd-details";
      details.innerHTML = `
        <h3>Informations LDD</h3>
        <label class="settings-detail-field">
          <span>Taux</span>
          <input class="ldd-interest-rate-input" type="text" autocomplete="off" value="${escapeHtml(lddDetails.interestRate)}">
        </label>
        <label class="settings-detail-field">
          <span>Intérêts</span>
          <input class="ldd-interests-input" type="text" autocomplete="off" value="${escapeHtml(lddDetails.interests)}">
        </label>
        <label class="settings-detail-field">
          <span>Plafond</span>
          <input class="ldd-ceiling-input" type="text" autocomplete="off" value="${escapeHtml(lddDetails.ceiling)}">
        </label>
        <label class="settings-detail-field">
          <span>À propos</span>
          <textarea class="ldd-about-input" rows="4" autocomplete="off">${escapeHtml(lddDetails.about)}</textarea>
        </label>`;
      row.appendChild(details);
    }

    if (inferIcon(account) === "assurance-vie") {
      const details = document.createElement("section");
      details.className = "settings-account-details settings-fonds-euro-details";
      details.innerHTML = `
        <h3>Informations Fonds euro</h3>
        <label class="settings-detail-field">
          <span>Date d'ouverture</span>
          <input class="fonds-euro-opening-date-input" type="text" autocomplete="off" value="${escapeHtml(fondsEuroDetails.openingDate)}">
        </label>
        <label class="settings-detail-field">
          <span>Assureur</span>
          <input class="fonds-euro-insurer-input" type="text" autocomplete="off" value="${escapeHtml(fondsEuroDetails.insurer)}">
        </label>
        <label class="settings-detail-field">
          <span>Support</span>
          <input class="fonds-euro-support-input" type="text" autocomplete="off" value="${escapeHtml(fondsEuroDetails.support)}">
        </label>
        <label class="settings-detail-field">
          <span>À propos</span>
          <textarea class="fonds-euro-about-input" rows="4" autocomplete="off">${escapeHtml(fondsEuroDetails.about)}</textarea>
        </label>`;
      row.appendChild(details);
    }

    if (inferIcon(account) === "per") {
      const details = document.createElement("section");
      details.className = "settings-account-details settings-per-details";
      details.innerHTML = `
        <h3>Informations PER</h3>
        <label class="settings-detail-field">
          <span>Date d'ouverture</span>
          <input class="per-opening-date-input" type="text" autocomplete="off" value="${escapeHtml(perDetails.openingDate)}">
        </label>
        <label class="settings-detail-field">
          <span>Assureur</span>
          <input class="per-insurer-input" type="text" autocomplete="off" value="${escapeHtml(perDetails.insurer)}">
        </label>
        <label class="settings-detail-field">
          <span>Type de PER</span>
          <input class="per-account-type-input" type="text" autocomplete="off" value="${escapeHtml(perDetails.accountType)}">
        </label>
        <label class="settings-detail-field">
          <span>À propos</span>
          <textarea class="per-about-input" rows="4" autocomplete="off">${escapeHtml(perDetails.about)}</textarea>
        </label>`;
      row.appendChild(details);
    }

    if (inferIcon(account) === "msci") {
      const details = document.createElement("section");
      details.className = "settings-account-details settings-msci-details";
      details.innerHTML = `
        <h3>Informations MSCI</h3>
        <label class="settings-detail-field">
          <span>Date d'ouverture</span>
          <input class="msci-opening-date-input" type="text" autocomplete="off" value="${escapeHtml(msciDetails.openingDate)}">
        </label>
        <label class="settings-detail-field">
          <span>Assureur</span>
          <input class="msci-insurer-input" type="text" autocomplete="off" value="${escapeHtml(msciDetails.insurer)}">
        </label>
        <label class="settings-detail-field">
          <span>Support</span>
          <input class="msci-support-input" type="text" autocomplete="off" value="${escapeHtml(msciDetails.support)}">
        </label>
        <label class="settings-detail-field">
          <span>À propos</span>
          <textarea class="msci-about-input" rows="4" autocomplete="off">${escapeHtml(msciDetails.about)}</textarea>
        </label>
        <label class="settings-detail-field">
          <span>Arbitrages</span>
          <textarea class="msci-arbitrages-input" rows="4" autocomplete="off">${escapeHtml(msciDetails.arbitrages)}</textarea>
        </label>`;
      row.appendChild(details);
    }

    deleteButton.addEventListener("click", () => {
      const confirmed = window.confirm(`Supprimer le compte « ${account.name} » ?`);
      if (!confirmed) return;

      readSettingsValues();
      accounts.splice(index, 1);
      saveAccounts();
      renderAccounts();
      renderSettings();
    });

    settingsAccounts.appendChild(fragment);
  });
}

function readSettingsValues() {
  const rows = [...settingsAccounts.querySelectorAll(".settings-account-row")];

  accounts = rows.map(row => ({
    icon: row.querySelector(".icon-select").value || "revolut",
    name: row.querySelector(".name-input").value.trim() || "Compte",
    amount: parseAmount(row.querySelector(".amount-input").value),
    custom: row.dataset.custom === "true"
  }));

  const revolutRow = rows.find(row => row.querySelector(".icon-select")?.value === "revolut");
  if (revolutRow) {
    revolutDetails = {
      accountType: revolutRow.querySelector(".revolut-account-type-input")?.value.trim() || "À renseigner",
      about: revolutRow.querySelector(".revolut-about-input")?.value.trim() || "À renseigner"
    };
    saveRevolutDetails(revolutDetails);
  }

  const livretARow = rows.find(row => row.querySelector(".icon-select")?.value === "livret-a");
  if (livretARow) {
    livretADetails = {
      interestRate: livretARow.querySelector(".livret-a-interest-rate-input")?.value.trim() || "À renseigner",
      interests: livretARow.querySelector(".livret-a-interests-input")?.value.trim() || "À renseigner",
      ceiling: livretARow.querySelector(".livret-a-ceiling-input")?.value.trim() || "À renseigner",
      about: livretARow.querySelector(".livret-a-about-input")?.value.trim() || "À renseigner"
    };
    saveLivretADetails(livretADetails);
  }

  const lddRow = rows.find(row => row.querySelector(".icon-select")?.value === "ldd");
  if (lddRow) {
    lddDetails = {
      interestRate: lddRow.querySelector(".ldd-interest-rate-input")?.value.trim() || "À renseigner",
      interests: lddRow.querySelector(".ldd-interests-input")?.value.trim() || "À renseigner",
      ceiling: lddRow.querySelector(".ldd-ceiling-input")?.value.trim() || "À renseigner",
      about: lddRow.querySelector(".ldd-about-input")?.value.trim() || "À renseigner"
    };
    saveLddDetails(lddDetails);
  }

  const fondsEuroRow = rows.find(row => row.querySelector(".icon-select")?.value === "assurance-vie");
  if (fondsEuroRow) {
    fondsEuroDetails = {
      openingDate: fondsEuroRow.querySelector(".fonds-euro-opening-date-input")?.value.trim() || "À renseigner",
      insurer: fondsEuroRow.querySelector(".fonds-euro-insurer-input")?.value.trim() || "À renseigner",
      support: fondsEuroRow.querySelector(".fonds-euro-support-input")?.value.trim() || "À renseigner",
      about: fondsEuroRow.querySelector(".fonds-euro-about-input")?.value.trim() || "À renseigner"
    };
    saveFondsEuroDetails(fondsEuroDetails);
  }

  const perRow = rows.find(row => row.querySelector(".icon-select")?.value === "per");
  if (perRow) {
    perDetails = {
      openingDate: perRow.querySelector(".per-opening-date-input")?.value.trim() || "À renseigner",
      insurer: perRow.querySelector(".per-insurer-input")?.value.trim() || "À renseigner",
      accountType: perRow.querySelector(".per-account-type-input")?.value.trim() || "À renseigner",
      about: perRow.querySelector(".per-about-input")?.value.trim() || "À renseigner"
    };
    savePerDetails(perDetails);
  }

  const msciRow = rows.find(row => row.querySelector(".icon-select")?.value === "msci");
  if (msciRow) {
    msciDetails = {
      openingDate: msciRow.querySelector(".msci-opening-date-input")?.value.trim() || "À renseigner",
      insurer: msciRow.querySelector(".msci-insurer-input")?.value.trim() || "À renseigner",
      support: msciRow.querySelector(".msci-support-input")?.value.trim() || "À renseigner",
      about: msciRow.querySelector(".msci-about-input")?.value.trim() || "À renseigner",
      arbitrages: msciRow.querySelector(".msci-arbitrages-input")?.value.trim() || "À renseigner"
    };
    saveMsciDetails(msciDetails);
  }
}

function saveFromSettings() {
  readSettingsValues();
  saveAccounts();
  renderAccounts();
}

function openSettings() {
  openSettingsButton.classList.add("is-turning");

  window.setTimeout(() => {
    renderSettings();
    settingsOverlay.hidden = false;
    document.body.classList.add("settings-open");

    window.setTimeout(() => {
      openSettingsButton.classList.remove("is-turning");
    }, 250);
  }, 180);
}

function closeSettings() {
  saveFromSettings();
  settingsOverlay.hidden = true;
  document.body.classList.remove("settings-open");
}

function addAccount() {
  readSettingsValues();

  accounts.push({
    icon: "revolut",
    name: "Nouveau compte",
    amount: 0,
    custom: true
  });

  saveAccounts();
  renderAccounts();
  renderSettings();

  const rows = settingsAccounts.querySelectorAll(".settings-account-row");
  const newRow = rows[rows.length - 1];

  if (newRow) {
    newRow.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

let draggedSettingsRow = null;
let draggedPointerId = null;

settingsAccounts.addEventListener("pointerdown", event => {
  const handle = event.target.closest(".drag-handle");

  if (!handle) return;

  const row = handle.closest(".settings-account-row");

  if (!row) return;

  event.preventDefault();

  draggedSettingsRow = row;
  draggedPointerId = event.pointerId;

  row.classList.add("is-dragging");
  document.body.classList.add("account-drag-active");

  if ("vibrate" in navigator) {
    navigator.vibrate(40);
  }
});

document.addEventListener(
  "pointermove",
  event => {
    if (
      !draggedSettingsRow ||
      event.pointerId !== draggedPointerId
    ) {
      return;
    }

    event.preventDefault();

    const elementUnderFinger =
      document.elementFromPoint(
        event.clientX,
        event.clientY
      );

    const targetRow =
      elementUnderFinger?.closest(
        ".settings-account-row"
      );

    if (
      !targetRow ||
      targetRow === draggedSettingsRow ||
      !settingsAccounts.contains(targetRow)
    ) {
      return;
    }

    const targetBox =
      targetRow.getBoundingClientRect();

    const placeBefore =
      event.clientY <
      targetBox.top + targetBox.height / 2;

    if (placeBefore) {
      settingsAccounts.insertBefore(
        draggedSettingsRow,
        targetRow
      );
    } else {
      settingsAccounts.insertBefore(
        draggedSettingsRow,
        targetRow.nextSibling
      );
    }
  },
  { passive: false }
);

function finishAccountDrag(event) {
  if (
    !draggedSettingsRow ||
    event.pointerId !== draggedPointerId
  ) {
    return;
  }

  draggedSettingsRow.classList.remove(
    "is-dragging"
  );

  document.body.classList.remove(
    "account-drag-active"
  );

  draggedSettingsRow = null;
  draggedPointerId = null;

  readSettingsValues();
  saveAccounts();
  renderAccounts();
  renderSettings();
}

document.addEventListener(
  "pointerup",
  finishAccountDrag
);

document.addEventListener(
  "pointercancel",
  finishAccountDrag
);

openSettingsButton.addEventListener("click", openSettings);
closeSettingsButton.addEventListener("click", closeSettings);
saveSettingsButton.addEventListener("click", closeSettings);
addAccountButton.addEventListener("click", addAccount);

settingsOverlay.addEventListener("click", event => {
  if (event.target === settingsOverlay) closeSettings();
});

settingsAccounts.addEventListener("input", () => {
  readSettingsValues();
  saveAccounts();
  renderAccounts();
});

settingsAccounts.addEventListener("change", () => {
  readSettingsValues();
  saveAccounts();
  renderAccounts();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !settingsOverlay.hidden) closeSettings();
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(error => {
      console.error("Erreur du Service Worker :", error);
    });
  });
}

renderAccounts();
renderLastUpdated();
accountsList.addEventListener("pointerdown", event => {
  const card = event.target.closest(".account-card");
  if (card) card.classList.add("pressed");
});

function clearPressedCards() {
  document.querySelectorAll(".account-card.pressed").forEach(card => {
    card.classList.remove("pressed");
  });
}

document.addEventListener("pointerup", clearPressedCards);
document.addEventListener("pointercancel", clearPressedCards);

/* Ancienne page MSCI supprimée en V11 Alpha 5. */


/* ===== AV€NIR v8.1 : fermeture du splash animé ===== */
const appSplash = document.getElementById("appSplash");
let homeTotalRevealAnimated = false;

function animateHomeTotalOnReveal() {
  if (homeTotalRevealAnimated) return;
  homeTotalRevealAnimated = true;

  animateAmount(totalAmount, 0, calculateTotal(), {
    duration: 1150,
    suffix: " €",
    delay: 80
  });
}

function hideAppSplash() {
  if (!appSplash || appSplash.classList.contains("is-hidden")) return;

  appSplash.classList.add("is-hidden");

  // L'animation commence pendant le fondu du splash : elle est visible
  // dès que la première page apparaît, au lieu de se terminer derrière lui.
  animateHomeTotalOnReveal();

  window.setTimeout(() => {
    appSplash.remove();
  }, 500);
}

window.addEventListener("load", () => {
  window.setTimeout(hideAppSplash, 1500);
});

window.setTimeout(hideAppSplash, 2600);

/* ===== AV€NIR V10.5 : graphique animé et interactif ===== */
const openStatsButton = document.getElementById("openStatsButton");
const closeStatsButton = document.getElementById("closeStatsButton");
const statsOverlay = document.getElementById("statsOverlay");
const assetDonutCanvas = document.getElementById("assetDonutCanvas");
const donutTotal = document.getElementById("donutTotal");
const donutLegend = document.getElementById("donutLegend");

const DONUT_COLORS = [
  "#ff4b0b",
  "#ff6425",
  "#ff7b46",
  "#ff9567",
  "#ffb184",
  "#e94309",
  "#c93a08",
  "#a82f06",
  "#842404"
];

let donutAnimationFrame = null;
let donutSelectedIndex = -1;
let donutCurrentItems = [];
let donutCurrentTotal = 0;

function getDonutItems() {
  const items = accounts
    .map(account => ({
      name: account.name,
      amount: parseAmount(account.amount)
    }))
    .filter(account => account.amount > 0);

  const total = items.reduce((sum, item) => sum + item.amount, 0);
  return { items, total };
}

function drawAssetDonut(items, total, progress = 1) {
  if (!assetDonutCanvas) return;

  const context = assetDonutCanvas.getContext("2d");
  const size = assetDonutCanvas.width;
  const center = size / 2;
  const outerRadius = size * 0.40;
  const innerRadius = size * 0.215;
  const gap = Math.PI / 180 * 1.15;

  context.clearRect(0, 0, size, size);

  if (total <= 0 || items.length === 0) {
    context.beginPath();
    context.arc(center, center, outerRadius, 0, Math.PI * 2);
    context.arc(center, center, innerRadius, 0, Math.PI * 2, true);
    context.fillStyle = "#eeeeee";
    context.fill();
    return;
  }

  const visibleAngle = Math.PI * 2 * Math.max(0, Math.min(1, progress));
  let startAngle = -Math.PI / 2;
  let remainingAngle = visibleAngle;

  items.forEach((item, index) => {
    if (remainingAngle <= 0) return;

    const fullAngle = (item.amount / total) * Math.PI * 2;
    const drawnAngle = Math.min(fullAngle, remainingAngle);

    if (drawnAngle > gap) {
      const segmentStart = startAngle + gap / 2;
      const segmentEnd = startAngle + drawnAngle - gap / 2;
      const middleAngle = (segmentStart + segmentEnd) / 2;
      const selected = index === donutSelectedIndex;
      const offset = selected ? size * 0.055 : 0;
      const offsetX = Math.cos(middleAngle) * offset;
      const offsetY = Math.sin(middleAngle) * offset;

      context.save();
      context.translate(offsetX, offsetY);

      if (donutSelectedIndex >= 0 && !selected) {
        context.globalAlpha = 0.38;
      }

      context.beginPath();
      context.arc(center, center, outerRadius, segmentStart, segmentEnd);
      context.arc(center, center, innerRadius, segmentEnd, segmentStart, true);
      context.closePath();

      const gradient = context.createRadialGradient(
        center - outerRadius * 0.25,
        center - outerRadius * 0.3,
        innerRadius,
        center,
        center,
        outerRadius
      );

      gradient.addColorStop(0, DONUT_COLORS[index % DONUT_COLORS.length]);
      gradient.addColorStop(1, DONUT_COLORS[(index + 1) % DONUT_COLORS.length]);

      context.fillStyle = gradient;
      context.shadowColor = selected ? "rgba(255,75,11,.38)" : "transparent";
      context.shadowBlur = selected ? size * 0.045 : 0;
      context.fill();

      if (selected) {
        context.globalAlpha = 1;
        context.lineWidth = size * 0.008;
        context.strokeStyle = "rgba(255,255,255,.98)";
        context.stroke();
      }

      context.restore();
    }

    startAngle += fullAngle;
    remainingAngle -= fullAngle;
  });
}

function updateDonutCenter({ fromZero = false } = {}) {
  const centerCopy = document.querySelector(".donut-center-copy");
  if (!centerCopy || !donutTotal) return;

  const label = centerCopy.querySelector("span");
  const share = centerCopy.querySelector("small");
  const displayedValue = fromZero ? 0 : readDisplayedAmount(donutTotal);

  if (donutSelectedIndex < 0) {
    if (label) label.textContent = "TOTAL";
    animateAmount(donutTotal, displayedValue, donutCurrentTotal, {
      duration: fromZero ? 900 : 520,
      suffix: " €",
      delay: fromZero ? 560 : 0
    });
    if (share) share.textContent = "100 %";
    return;
  }

  const item = donutCurrentItems[donutSelectedIndex];
  if (!item) return;

  const percentage = donutCurrentTotal > 0
    ? (item.amount / donutCurrentTotal) * 100
    : 0;

  if (label) label.textContent = item.name;
  animateAmount(donutTotal, displayedValue, item.amount, {
    duration: 520,
    suffix: " €"
  });
  if (share) share.textContent = `${percentage.toFixed(1)} %`;
}

function updateDonutLegendSelection() {
  donutLegend?.querySelectorAll(".donut-legend-row").forEach((row, index) => {
    row.classList.toggle("is-selected", index === donutSelectedIndex);
    row.classList.toggle(
      "is-muted",
      donutSelectedIndex >= 0 && index !== donutSelectedIndex
    );
  });
}

function selectDonutSegment(index) {
  donutSelectedIndex = donutSelectedIndex === index ? -1 : index;
  drawAssetDonut(donutCurrentItems, donutCurrentTotal, 1);
  updateDonutCenter();
  updateDonutLegendSelection();
}

function buildDonutLegend(items, total) {
  if (!donutLegend) return;

  donutLegend.innerHTML = "";

  items.forEach((item, index) => {
    const percentage = total > 0 ? (item.amount / total) * 100 : 0;

    const row = document.createElement("div");
    row.className = "donut-legend-row";
    row.dataset.donutIndex = String(index);
    row.style.setProperty("--legend-delay", `${760 + index * 70}ms`);
    row.addEventListener("click", () => selectDonutSegment(index));

    const dot = document.createElement("span");
    dot.className = "donut-dot";
    dot.style.background = DONUT_COLORS[index % DONUT_COLORS.length];

    const label = document.createElement("span");
    label.className = "donut-label";
    label.textContent = item.name;

    const value = document.createElement("span");
    value.className = "donut-value";

    const amount = document.createElement("strong");
    amount.textContent = `${formatAmount(item.amount)} €`;

    const share = document.createElement("small");
    share.textContent = `${percentage.toFixed(1)} %`;

    value.append(amount, share);
    row.append(dot, label, value);
    donutLegend.appendChild(row);
  });
}

function getTouchedDonutIndex(event) {
  if (!assetDonutCanvas || donutCurrentTotal <= 0) return -1;

  const rect = assetDonutCanvas.getBoundingClientRect();
  const x = (event.clientX - rect.left) * (assetDonutCanvas.width / rect.width);
  const y = (event.clientY - rect.top) * (assetDonutCanvas.height / rect.height);

  const center = assetDonutCanvas.width / 2;
  const dx = x - center;
  const dy = y - center;
  const distance = Math.hypot(dx, dy);
  const outerRadius = assetDonutCanvas.width * 0.47;
  const innerRadius = assetDonutCanvas.width * 0.17;

  if (distance < innerRadius || distance > outerRadius) return -1;

  let angle = Math.atan2(dy, dx) + Math.PI / 2;
  if (angle < 0) angle += Math.PI * 2;

  let cursor = 0;

  for (let index = 0; index < donutCurrentItems.length; index += 1) {
    const segmentAngle =
      (donutCurrentItems[index].amount / donutCurrentTotal) * Math.PI * 2;

    if (angle >= cursor && angle < cursor + segmentAngle) {
      return index;
    }

    cursor += segmentAngle;
  }

  return -1;
}

function animateDonutOpening(items, total) {
  if (donutAnimationFrame) {
    cancelAnimationFrame(donutAnimationFrame);
  }

  const duration = 520;
  let startedAt = null;

  function easeOutCubic(value) {
    return 1 - Math.pow(1 - value, 3);
  }

  function frame(timestamp) {
    if (startedAt === null) startedAt = timestamp;

    const rawProgress = Math.min((timestamp - startedAt) / duration, 1);
    const easedProgress = easeOutCubic(rawProgress);

    drawAssetDonut(items, total, easedProgress);

    if (rawProgress < 1) {
      donutAnimationFrame = requestAnimationFrame(frame);
    } else {
      donutAnimationFrame = null;
    }
  }

  donutAnimationFrame = requestAnimationFrame(frame);
}

function renderAssetDonut({ animate = false } = {}) {
  if (!donutLegend || !donutTotal) return;

  const { items, total } = getDonutItems();
  donutCurrentItems = items;
  donutCurrentTotal = total;
  donutSelectedIndex = -1;

  buildDonutLegend(items, total);
  updateDonutCenter({ fromZero: animate });
  updateDonutLegendSelection();

  if (animate) {
    drawAssetDonut(items, total, 0);
    requestAnimationFrame(() => animateDonutOpening(items, total));
  } else {
    drawAssetDonut(items, total, 1);
  }
}

function openStats() {
  statsOverlay.hidden = false;
  document.body.classList.add("stats-open");

  const statsPanel = statsOverlay.querySelector(".stats-panel");
  const centerCopy = statsOverlay.querySelector(".donut-center-copy");

  statsPanel?.classList.remove("is-opening");
  centerCopy?.classList.remove("is-sequence-visible");
  void statsPanel?.offsetWidth;

  statsPanel?.classList.add("is-opening");
  renderAssetDonut({ animate: true });

  window.setTimeout(() => {
    centerCopy?.classList.add("is-sequence-visible");
  }, 610);
}

function closeStats() {
  if (donutAnimationFrame) {
    cancelAnimationFrame(donutAnimationFrame);
    donutAnimationFrame = null;
  }

  statsOverlay.hidden = true;
  document.body.classList.remove("stats-open");
}

assetDonutCanvas?.addEventListener("pointerup", event => {
  const index = getTouchedDonutIndex(event);

  if (index >= 0) {
    selectDonutSegment(index);
  } else {
    donutSelectedIndex = -1;
    drawAssetDonut(donutCurrentItems, donutCurrentTotal, 1);
    updateDonutCenter();
    updateDonutLegendSelection();
  }
});

openStatsButton?.addEventListener("click", openStats);
closeStatsButton?.addEventListener("click", closeStats);

statsOverlay?.addEventListener("click", event => {
  if (event.target === statsOverlay) {
    closeStats();
  }
});



/* ===== AV€NIR V11 ALPHA 5 : fiches comptes premium ===== */
const ACCOUNT_DETAIL_META = {
  "assurance-vie": {
    eyebrow: "FONDS EURO",
    subtitle: "Linxea • Assurance vie",
    about: "Un support sécurisé de l’assurance vie, destiné à préserver le capital tout en générant des intérêts.",
    stats: []
  },
  "per": {
    eyebrow: "PLAN ÉPARGNE RETRAITE",
    subtitle: "Linxea • Horizon retraite",
    about: "Une épargne dédiée à la retraite, actuellement orientée vers la sécurité du fonds euro.",
    stats: []
  },
  "msci": {
    eyebrow: "MSCI WORLD",
    subtitle: "Linxea • Exposition internationale",
    about: "Un support diversifié investi dans de grandes entreprises des pays développés.",
    stats: []
  },
  "revolut": {
    eyebrow: "RÉSERVE DISPONIBLE",
    subtitle: "Revolut • Trésorerie flexible",
    about: "Une réserve disponible pour absorber une grosse dépense, puis reconstituée progressivement.",
    stats: [
      ["Disponibilité", "Immédiate"],
      ["Utilisation", "Réserve personnelle"],
      ["Objectif", "Souplesse"]
    ]
  },
  "livret-a": {
    eyebrow: "LIVRET A",
    subtitle: "LCL • Épargne réglementée",
    about: "Une épargne sécurisée, disponible à tout moment et exonérée d’impôt.",
    stats: [["Taux", "À renseigner"], ["Intérêts", "Calcul annuel"], ["Plafond", "22 950 €"]]
  },
  "ldd": {
    eyebrow: "LDDS",
    subtitle: "LCL • Épargne réglementée",
    about: "Une épargne sécurisée et disponible, complémentaire au Livret A.",
    stats: [["Taux", "À renseigner"], ["Intérêts", "Calcul annuel"], ["Plafond", "12 000 €"]]
  },
  "lep": {
    eyebrow: "LEP",
    subtitle: "LCL • Épargne réglementée",
    about: "Un livret sécurisé réservé sous conditions de revenus, avec des intérêts exonérés.",
    stats: [["Taux", "À renseigner"], ["Intérêts", "Calcul annuel"], ["Plafond", "10 000 €"]]
  }
};

function accountDetailIcon(iconKey) {
  return ICONS[iconKey] || ICONS.revolut;
}

function closeAccountDetail() {
  const overlay = document.querySelector('.account-detail-overlay');
  if (!overlay) return;
  overlay.classList.add('is-closing');
  document.body.classList.remove('detail-open');
  window.setTimeout(() => overlay.remove(), 260);
}

function openAccountDetail(account) {
  closeAccountDetail();
  const iconKey = inferIcon(account);
  const meta = ACCOUNT_DETAIL_META[iconKey] || {
    eyebrow: "COMPTE",
    subtitle: "AV€NIR • Vue détaillée",
    about: "Les informations de ce compte sont regroupées ici.",
    stats: [["Type", "Compte personnel"], ["Disponibilité", "À renseigner"], ["Suivi", "Actif"]]
  };

  const overlay = document.createElement('div');
  overlay.className = 'account-detail-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');

  const detailStats = iconKey === 'msci'
    ? [
        ["Date d’ouverture", escapeHtml(msciDetails.openingDate)],
        ["Assureur", escapeHtml(msciDetails.insurer)],
        ["Support", escapeHtml(msciDetails.support)]
      ]
    : iconKey === 'revolut'
      ? [
          ["Type de compte", escapeHtml(revolutDetails.accountType)]
        ]
      : iconKey === 'livret-a'
        ? [
            ["Taux", escapeHtml(livretADetails.interestRate)],
            ["Intérêts", escapeHtml(livretADetails.interests)],
            ["Plafond", escapeHtml(livretADetails.ceiling)]
          ]
        : iconKey === 'ldd'
          ? [
              ["Taux", escapeHtml(lddDetails.interestRate)],
              ["Intérêts", escapeHtml(lddDetails.interests)],
              ["Plafond", escapeHtml(lddDetails.ceiling)]
            ]
          : iconKey === 'assurance-vie'
            ? [
                ["Date d’ouverture", escapeHtml(fondsEuroDetails.openingDate)],
                ["Assureur", escapeHtml(fondsEuroDetails.insurer)],
                ["Support", escapeHtml(fondsEuroDetails.support)]
              ]
            : iconKey === 'per'
              ? [
                  ["Date d’ouverture", escapeHtml(perDetails.openingDate)],
                  ["Assureur", escapeHtml(perDetails.insurer)],
                  ["Type de PER", escapeHtml(perDetails.accountType)]
                ]
              : meta.stats;

  const statsHtml = detailStats.map(([label, value], index) => `
    <article class="premium-info-card" style="--detail-delay:${170 + index * 55}ms">
      <div class="premium-info-icon" aria-hidden="true">${index === 0 ? '◔' : index === 1 ? '◇' : '✓'}</div>
      <div class="premium-info-copy"><span>${label}</span><strong>${value}</strong></div>
    </article>`).join('');

  const msciJournal = iconKey === 'msci' ? `
    <section class="premium-section premium-note-section" style="--detail-delay:300ms">
      <div class="premium-section-heading"><span>Arbitrages</span><small>Sauvegarde automatique</small></div>
      <textarea class="premium-note msci-arbitrages-detail-input" rows="5" autocomplete="off" placeholder="Note tes arbitrages ici…">${escapeHtml(msciDetails.arbitrages)}</textarea>
    </section>` : '';


  overlay.innerHTML = `
    <section class="account-detail-sheet premium-detail-sheet${iconKey === 'msci' ? ' msci-detail-sheet' : iconKey === 'revolut' ? ' revolut-detail-sheet' : iconKey === 'livret-a' ? ' livret-a-detail-sheet' : iconKey === 'ldd' ? ' ldd-detail-sheet' : iconKey === 'assurance-vie' ? ' fonds-euro-detail-sheet' : iconKey === 'per' ? ' per-detail-sheet' : ''}">
      <div class="premium-handle" aria-hidden="true"></div>
      <header class="premium-hero">
        <button class="premium-back" type="button" aria-label="Retour">←</button>
        <div class="premium-account-icon"><img src="${accountDetailIcon(iconKey)}" alt=""></div>
        <p class="premium-eyebrow">${meta.eyebrow}</p>
        <h2>${account.name}</h2>
        <div class="premium-balance">${formatAmount(account.amount)} <span>€</span></div>
        <p class="premium-subtitle">${meta.subtitle}</p>
      </header>
      <div class="premium-detail-body">
        <section class="premium-section" style="--detail-delay:110ms">
          <div class="premium-section-heading"><span>Vue d’ensemble</span><small>Informations principales</small></div>
          <div class="premium-info-grid">${statsHtml}</div>
        </section>
        ${msciJournal}
        <section class="premium-about${iconKey === 'msci' ? ' msci-about' : iconKey === 'revolut' ? ' revolut-about' : iconKey === 'livret-a' ? ' livret-a-about' : iconKey === 'ldd' ? ' ldd-about' : iconKey === 'assurance-vie' ? ' fonds-euro-about' : iconKey === 'per' ? ' per-about' : ''}" style="--detail-delay:350ms">
          <span>À propos</span><p>${iconKey === 'msci' ? escapeHtml(msciDetails.about) : iconKey === 'revolut' ? escapeHtml(revolutDetails.about) : iconKey === 'livret-a' ? escapeHtml(livretADetails.about) : iconKey === 'ldd' ? escapeHtml(lddDetails.about) : iconKey === 'assurance-vie' ? escapeHtml(fondsEuroDetails.about) : iconKey === 'per' ? escapeHtml(perDetails.about) : meta.about}</p>
        </section>
        <div class="premium-safe"><span>●</span> Données enregistrées sur cet appareil</div>
      </div>
    </section>`;

  document.body.appendChild(overlay);
  document.body.classList.add('detail-open');
  requestAnimationFrame(() => overlay.classList.add('is-visible'));

  overlay.querySelector('.premium-back')?.addEventListener('click', closeAccountDetail);
  overlay.addEventListener('click', event => {
    if (event.target === overlay) closeAccountDetail();
  });

  const arbitragesInput = overlay.querySelector('.msci-arbitrages-detail-input');
  arbitragesInput?.addEventListener('input', () => {
    msciDetails = {
      ...msciDetails,
      arbitrages: arbitragesInput.value
    };
    saveMsciDetails(msciDetails);
  });

}

accountsList.addEventListener('click', event => {
  const card = event.target.closest('.account-card');
  if (!card) return;
  const cards = [...accountsList.querySelectorAll('.account-card')];
  const index = cards.indexOf(card);
  if (index < 0 || !accounts[index]) return;
  openAccountDetail(accounts[index]);
}, true);

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && document.querySelector('.account-detail-overlay')) closeAccountDetail();
});
