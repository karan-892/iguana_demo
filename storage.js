(() => {
  "use strict";

  const DATA_KEY = "iguana-crm-data-v5";
  const SESSION_KEY = "iguana-crm-session-v2";

  function load(seedFn) {
    const base = seedFn();
    try {
      const raw = localStorage.getItem(DATA_KEY);
      if (!raw) return base;
      const saved = JSON.parse(raw);
      return {
        ...base,
        ...saved,
        settings: { ...base.settings, ...(saved.settings || {}) },
        templates: { ...base.templates, ...(saved.templates || {}) },
        integrations: { ...base.integrations, ...(saved.integrations || {}) },
        inbound: Array.isArray(saved.inbound) ? saved.inbound : (base.inbound || []),
      };
    } catch {
      return base;
    }
  }

  function save(data) {
    try {
      localStorage.setItem(DATA_KEY, JSON.stringify(data));
    } catch (_) { /* quota / private mode */ }
  }

  function loadSession() {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY) || "null") || {};
    } catch {
      return {};
    }
  }

  function saveSession(session) {
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } catch (_) { /* ignore */ }
  }

  function reset() {
    try {
      localStorage.removeItem(DATA_KEY);
      localStorage.removeItem(SESSION_KEY);
    } catch (_) { /* ignore */ }
  }

  window.IguanaStore = { DATA_KEY, load, save, loadSession, saveSession, reset };
})();
