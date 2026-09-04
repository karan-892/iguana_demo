(() => {
  "use strict";

  const METHODS = [
    { id: "Portal", label: "Invoice link (portal)", source: "portal", auto: true, group: "online" },
    { id: "Website", label: "Website checkout", source: "website", auto: true, group: "online" },
    { id: "ACH", label: "ACH", source: "ach", auto: true, group: "bank" },
    { id: "Bank transfer", label: "Bank transfer", source: "bank", auto: false, group: "bank" },
    { id: "Zelle", label: "Zelle", source: "zelle", auto: false, group: "bank" },
    { id: "Check", label: "Check — Tom deposits", source: "check", auto: false, group: "external" },
    { id: "Virtual card", label: "Virtual card (commercial processor)", source: "virtual", auto: false, group: "card" },
    { id: "Card", label: "Card in person / terminal", source: "card", auto: false, group: "card" },
    { id: "Cash", label: "Cash at the counter", source: "cash", auto: false, group: "external" },
    { id: "Auto-pay", label: "Saved auto-pay", source: "autopay", auto: true, group: "online" },
  ];

  function find(method) {
    return METHODS.find((m) => m.id === method || m.label === method || m.source === method) || null;
  }

  function sourceOf(method) {
    return find(method)?.source || "external";
  }

  function isAuto(method) {
    return !!(find(method)?.auto);
  }

  function channel(p) {
    return p?.source || sourceOf(p?.method);
  }

  function channelLabel(p) {
    const src = channel(p);
    const map = {
      portal: "Portal · invoice link",
      website: "Website checkout",
      ach: "ACH",
      bank: "Bank transfer",
      zelle: "Zelle",
      check: "Check · Tom deposited",
      virtual: "Virtual card",
      card: "Card",
      cash: "Cash",
      autopay: "Auto-pay",
      external: "External / unmatched",
    };
    return map[src] || p?.method || "Payment";
  }

  function optionsHtml(selected, { publicPage = false } = {}) {
    const list = publicPage
      ? METHODS.filter((m) => ["Portal", "Website", "ACH"].includes(m.id))
      : METHODS.filter((m) => m.id !== "Auto-pay");
    return list.map((m) => `<option value="${m.id}" ${m.id === selected ? "selected" : ""}>${m.label}</option>`).join("");
  }

  window.IguanaPay = { METHODS, find, sourceOf, isAuto, channel, channelLabel, optionsHtml };
})();
