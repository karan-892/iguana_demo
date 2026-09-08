(() => {
  "use strict";

  const TODAY = "2026-08-27";
  const DAY_PATTERNS = [
    { id: "Mon/Wed", days: ["Mon", "Wed"] },
    { id: "Tue/Thu", days: ["Tue", "Thu"] },
    { id: "Mon/Thu", days: ["Mon", "Thu"] },
    { id: "Wed/Fri", days: ["Wed", "Fri"] },
    { id: "Fri", days: ["Fri"] },
  ];
  const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const DAY_DATES = {
    Mon: "2026-08-24",
    Tue: "2026-08-25",
    Wed: "2026-08-26",
    Thu: "2026-08-27",
    Fri: "2026-08-28",
  };

  function svg(paths) {
    return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths.map((d) => `<path d="${d}"/>`).join("")}</svg>`;
  }
  const ICONS = {
    home: svg(["M3 10.5 12 3l9 7.5V21H3z", "M9 21v-8h6v8"]),
    people: svg(["M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", "M9 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8"]),
    cal: svg(["M4 6h16v14H4z", "M4 10h16", "M8 3v4", "M16 3v4"]),
    map: svg(["M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z"]),
    bolt: svg(["M13 2 4 14h7l-1 8 9-12h-7z"]),
    alert: svg(["M12 3 2 21h20z", "M12 9v5", "M12 17h.01"]),
    clock: svg(["M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18", "M12 7v5l3 2"]),
    route: svg(["M4 6h7", "M17 18h3", "M8 6v12"]),
    bill: svg(["M6 3h12v18H6z", "M9 8h6", "M9 12h6", "M9 16h4"]),
    pay: svg(["M3 7h18v12H3z", "M3 11h18"]),
    renew: svg(["M3 12a9 9 0 0 1 15-6l3 2", "M21 12a9 9 0 0 1-15 6l-3-2"]),
    star: svg(["M12 3l2.4 5.2L20 9.2l-4 3.8.9 5.5L12 16.2 7.1 18.5 8 13 4 9.2l5.6-1z"]),
    file: svg(["M7 3h7l5 5v13H7z"]),
    chat: svg(["M4 5h16v10H8l-4 4z"]),
    memo: svg(["M5 4h10l4 4v12H5z", "M9 12h6"]),
    chart: svg(["M4 20V4", "M4 20h16", "M8 16v-5", "M12 16V8", "M16 16v-8"]),
    users: svg(["M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2", "M9 10a4 4 0 1 0 0 8 4 4 0 0 0 0-8"]),
    list: svg(["M8 6h13", "M8 12h13", "M8 18h13", "M4 6v.01", "M4 12v.01", "M4 18v.01"]),
    trap: svg(["M12 3v4", "M8 21h8", "M7 11h10l-1 10H8z", "M9 11V8a3 3 0 0 1 6 0v3"]),
    mail: svg(["M3 6h18v12H3z", "M3 6l9 7 9-7"]),
    cog: svg(["M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6", "M4 12h2", "M18 12h2", "M12 4v2", "M12 18v2"]),
    phone: svg(["M7 2h10v20H7z", "M11 18h2"]),
    plus: svg(["M12 5v14", "M5 12h14"]),
    eye: svg(["M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z", "M12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6"]),
  };

  const ROLES = {
    owner: {
      id: "owner",
      name: "Tom",
      title: "Owner",
      initials: "TM",
      color: "#c4a24a",
      access: "You can open everything. Christy still posts payments day to day; Rick still runs the routes.",
      chips: ["All modules", "Can edit", "Reports & lists"],
    },
    ops: {
      id: "ops",
      name: "Rick Torgerson",
      title: "Operations / Dispatcher",
      initials: "RT",
      color: "#2d6a4c",
      access: "Register shows who paid. Create the service, put it on the map, click a trapper’s home for their book. No commission or payroll here.",
      chips: ["Register", "Create service", "Assign on map"],
    },
    admin: {
      id: "admin",
      name: "Christy Brown",
      title: "Administration Director",
      initials: "CB",
      color: "#1d6a75",
      access: "AutoPay runs overnight. You fix declines and match anything that hits the register by hand. Renewals: pick, check, send.",
      chips: ["AutoPay exceptions", "Allocate", "Renewals"],
    },
    // Sales (Rocco) and technician mobile (Johnny) hidden from demo login / switcher for now
    // sales: {
    //   id: "sales",
    //   name: "Rocco",
    //   title: "Sales / Intake",
    //   initials: "RC",
    //   color: "#b4532a",
    //   access: "A call or message comes in. Add the customer on the location form — name, address, instructions, and whether they accept messages. Then the client exists.",
    //   chips: ["Incoming call", "Add customer"],
    // },
    // tech: {
    //   id: "tech",
    //   name: "Johnny",
    //   title: "Technician (Trapper)",
    //   initials: "JN",
    //   color: "#40916c",
    //   techId: "johnny",
    //   access: "Mobile app only. Route, check-in, removals, photos, Memo to Office. No pricing or payments.",
    //   chips: ["Field app", "No pricing"],
    // },
    sysadmin: {
      id: "sysadmin",
      name: "Avery Cole",
      title: "System Administrator",
      initials: "AC",
      color: "#163528",
      access: "Users, lists, email templates, API keys, company defaults.",
      chips: ["Users", "Lists", "Settings"],
    },
  };

  const NAV_GROUP_ORDER = ["Home", "Customers", "Operations", "Billing", "Workspace", "Reports", "System"];

  const NAV = [
    { id: "dashboard", label: "Dashboard", group: "Home", icon: "home", roles: ["owner", "ops", "admin", "sales", "sysadmin"] },

    { id: "customers", label: "Customers", group: "Customers", icon: "people", roles: ["owner", "ops", "admin", "sales"] },
    { id: "locations", label: "Locations / Properties", group: "Customers", icon: "map", roles: ["owner", "ops", "admin", "sales"] },
    { id: "quotes", label: "Quotes", group: "Customers", icon: "mail", roles: ["sales", "owner", "admin"] },

    { id: "schedule", label: "Schedule", group: "Operations", icon: "cal", roles: ["owner", "ops"] },
    { id: "optimizer", label: "Multi-Day Optimizer", group: "Operations", icon: "route", roles: ["owner", "ops"] },
    { id: "map", label: "Map & routing", group: "Operations", icon: "map", roles: ["owner", "ops"] },
    { id: "trappers", label: "Trappers", group: "Operations", icon: "people", roles: ["owner", "ops", "admin"] },
    { id: "oneoffs", label: "One-off jobs", group: "Operations", icon: "bolt", roles: ["owner", "ops"] },
    { id: "traps", label: "Trap assets", group: "Operations", icon: "trap", roles: ["owner", "ops"] },
    { id: "noshows", label: "No-shows", group: "Operations", icon: "alert", roles: ["owner", "ops"] },
    { id: "workload", label: "Route workload", group: "Operations", icon: "route", roles: ["owner", "ops"] },

    { id: "payments", label: "Payment register", group: "Billing", icon: "pay", roles: ["ops", "owner", "admin"] },
    { id: "invoices", label: "Invoices", group: "Billing", icon: "bill", roles: ["owner", "admin"] },
    { id: "renewals", label: "Renewal report", group: "Billing", icon: "renew", roles: ["owner", "admin"] },
    { id: "commission", label: "Commission", group: "Billing", icon: "star", roles: ["owner", "admin"] },

    { id: "documents", label: "Documents", group: "Workspace", icon: "file", roles: ["owner", "ops", "admin"] },
    { id: "comms", label: "Communication log", group: "Workspace", icon: "chat", roles: ["owner", "ops", "admin"] },
    { id: "mtos", label: "Memo to Office", group: "Workspace", icon: "memo", roles: ["owner", "ops", "admin"] },
    { id: "tasks", label: "Tasks", group: "Workspace", icon: "list", roles: ["owner", "ops", "admin"] },

    { id: "duration", label: "Duration report", group: "Reports", icon: "clock", roles: ["owner", "ops", "admin"] },
    { id: "removals", label: "Removal report", group: "Reports", icon: "list", roles: ["owner", "ops"] },
    { id: "reports", label: "Reports hub", group: "Reports", icon: "chart", roles: ["owner", "ops", "admin"] },

    { id: "users", label: "Users", group: "System", icon: "users", roles: ["sysadmin", "owner"] },
    { id: "lists", label: "Configurable lists", group: "System", icon: "list", roles: ["sysadmin", "owner"] },
    { id: "templates", label: "Templates", group: "System", icon: "mail", roles: ["sysadmin", "admin", "owner"] },
    { id: "settings", label: "Company settings", group: "System", icon: "cog", roles: ["sysadmin", "owner"] },
    { id: "integrations", label: "Integrations", group: "System", icon: "cog", roles: ["sysadmin", "owner"] },

    // { id: "mobile", label: "Today's route", group: "Field", icon: "phone", roles: ["tech"] },
  ];

  const WRITE = {
    "customer.create": ["sales", "admin"],
    "customer.edit": ["sales", "admin", "ops", "owner"],
    "quote.send": ["sales", "admin"],
    "invoice.create": ["admin"],
    "invoice.send": ["admin"],
    "payment.post": ["admin"],
    "payment.viewAmount": ["admin", "owner", "ops"],
    "renewal.send": ["admin"],
    "commission.enter": ["admin"],
    "schedule.assign": ["ops"],
    "schedule.reassign": ["ops"],
    "schedule.generate": ["ops"],
    "schedule.optimize": ["ops"],
    "service.create": ["ops"],
    "service.edit": ["ops", "owner"],
    "service.stop": ["ops", "owner"],
    "trap.update": ["ops"],
    "location.add": ["admin", "sales", "ops"],
    "location.request": ["admin", "ops"],
    "oneoff.insert": ["ops"],
    "noshow.mark": ["ops"],
    "blackout.edit": ["ops", "sysadmin"],
    "docs.upload": ["admin", "ops"],
    "mto.reply": ["ops", "admin"],
    "task.create": ["owner", "ops", "admin"],
    "task.complete": ["owner", "ops", "admin"],
    "users.manage": ["sysadmin", "owner"],
    "lists.edit": ["sysadmin", "owner"],
    "settings.edit": ["sysadmin", "owner"],
    "template.edit": ["sysadmin", "admin", "owner"],
    "mobile.act": ["tech", "trapper"],
  };

  /** Roles Avery can assign on Users — includes Trapper (not on the login switcher). */
  const USER_ROLE_OPTIONS = [
    { id: "owner", title: "Owner" },
    { id: "ops", title: "Operations / Dispatcher" },
    { id: "admin", title: "Administration" },
    { id: "sales", title: "Sales / Intake" },
    { id: "trapper", title: "Trapper" },
    { id: "sysadmin", title: "System Administrator" },
  ];
  function userRoleTitle(roleId) {
    if (roleId === "tech") return "Trapper";
    return USER_ROLE_OPTIONS.find((r) => r.id === roleId)?.title
      || ROLES[roleId]?.title
      || roleId
      || "—";
  }

  const TECHS = [
    { id: "johnny", name: "Johnny", home: "Deerfield Beach", color: "#2d6a4c", x: "28%", y: "42%" },
    { id: "bobby", name: "Bobby", home: "Fort Lauderdale", color: "#1d6a75", x: "32%", y: "52%" },
    { id: "pedro", name: "Pedro", home: "West Palm Beach", color: "#c4a24a", x: "38%", y: "28%" },
    { id: "miguel", name: "Miguel", home: "Tampa", color: "#b4532a", x: "12%", y: "36%" },
    { id: "alejo", name: "Alejo", home: "Naples", color: "#40916c", x: "18%", y: "72%" },
  ];

  const SERVICE_TYPES = [
    { id: "1mon-res", code: "1 - 1 MON RES", label: "1-month residential", desc: "Monitoring — 1 month — Residential (<½ acre)", type: "res", duration: 10, months: 1, price: 300, freq: "WEEKLY" },
    { id: "3mon-res", code: "3 - 3 MON RES", label: "3-month residential", desc: "Monitoring — 3 months — Residential", type: "res", duration: 15, months: 3, price: 800, freq: "WEEKLY" },
    { id: "6mon-res", code: "6 - 6 MON RES", label: "6-month residential", desc: "Monitoring — 6 months — Residential", type: "res", duration: 20, months: 6, price: 1200, freq: "BI-WEEKLY" },
    { id: "12mon-res", code: "12 - 12 MON RES", label: "12-month residential", desc: "Monitoring — 1 year — Residential", type: "res", duration: 20, months: 12, price: 2000, freq: "BI-WEEKLY" },
    { id: "1mon-com", code: "1 - 1 MON COM", label: "1-month commercial", desc: "Monitoring — 1 month — Commercial", type: "com", duration: 20, months: 1, price: 450, freq: "WEEKLY" },
    { id: "12mon-com", code: "12 - 1YR COM", label: "12-month commercial", desc: "Monitoring — 1 year — Commercial", type: "com", duration: 30, months: 12, price: 3600, freq: "BI-WEEKLY" },
    { id: "hoa-2wk", code: "HOA 2 WK", label: "HOA / 2-week (4 visits)", desc: "HOA / community — every 2 weeks · 4 visits", type: "hoa", duration: 45, months: 0.5, price: 180, freq: "EVERY 2 WEEKS" },
    { id: "muni", code: "MUNI PARK", label: "Municipal / park", desc: "Municipal / park monitoring", type: "muni", duration: 180, months: 12, price: 0, freq: "WEEKLY" },
    { id: "callback", code: "CALLBACK", label: "Callback / one-off", desc: "One-off callback visit", type: "callback", duration: 10, months: 0, price: 0, freq: "ONE-TIME" },
  ];
  const SERVICE_SCHEDULES = [
    { id: "WK-MOWE", label: "WK - MO WE", days: "Mon/Wed" },
    { id: "WK-TUTH", label: "WK - TU TH", days: "Tue/Thu" },
    { id: "WK-MOTH", label: "WK - MO TH", days: "Mon/Thu" },
    { id: "WK-WEFR", label: "WK - WE FR", days: "Wed/Fri" },
    { id: "WK-FR", label: "WK - FR", days: "Fri" },
  ];
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const TARGETS = ["IGUANA", "TEGU", "IGUANA / TEGU"];
  const CHARGE_MODES = ["Production", "Flat", "Recurring"];
  const TASK_TYPES = [
    { id: "toilet", label: "Iguana in toilet / bathroom", duration: 25 },
    { id: "garage", label: "Animal in garage", duration: 25 },
    { id: "closet", label: "In closet / inside house", duration: 30 },
    { id: "office", label: "Office / commercial call-in", duration: 35 },
    { id: "yard", label: "Yard / pool cage", duration: 20 },
    { id: "inspect", label: "Inspection", duration: 20 },
    { id: "meeting", label: "Client meeting", duration: 30 },
    { id: "other", label: "Other live call", duration: 25 },
  ];

  const PROGRAMS = [
    { id: "12pre", name: "12-month prepaid", months: 12, list: 2400, prepaid: 2000, freeMonths: 2, freq: "Bi-weekly" },
    { id: "12mo", name: "12-month monthly", months: 12, list: 2400, prepaid: null, freeMonths: 0, freq: "Bi-weekly" },
    { id: "6mo", name: "6-month", months: 6, list: 1400, prepaid: 1200, freeMonths: 0, freq: "Bi-weekly" },
    { id: "3mo", name: "3-month", months: 3, list: 800, prepaid: null, freeMonths: 0, freq: "Weekly" },
    { id: "1mo", name: "1-month", months: 1, list: 300, prepaid: null, freeMonths: 0, freq: "Weekly" },
    { id: "hoa2", name: "HOA 2-week", months: 0.5, list: 180, prepaid: null, freeMonths: 0, freq: "Every 2 weeks" },
  ];

  function programById(id) { return allPrograms().find((p) => p.id === id); }
  function extraProgramsSafe() {
    try { return state.data?.settings?.extraPrograms || []; } catch (_) { return []; }
  }
  function extraServiceTypesSafe() {
    try { return state.data?.settings?.extraServiceTypes || []; } catch (_) { return []; }
  }
  function customTemplatesSafe() {
    try { return state.data?.settings?.customTemplates || []; } catch (_) { return []; }
  }
  function allPrograms() {
    return PROGRAMS.concat(extraProgramsSafe());
  }
  function allServiceTypes() {
    return SERVICE_TYPES.concat(extraServiceTypesSafe());
  }
  function allTemplates() {
    const built = [
      { key: "proposal", label: "Proposal / quote" },
      { key: "invoice", label: "Invoice" },
      { key: "renewal", label: "Renewal notice" },
      { key: "visit", label: "Visit reminder (2 days before, no-reply)" },
    ];
    const custom = customTemplatesSafe().map((t) => ({
      key: t.key, label: t.label || t.key, custom: true,
    }));
    return built.concat(custom);
  }
  function normalizeDemoData() {
    if (!state.data.settings) state.data.settings = {};
    const s = state.data.settings;
    if (!Array.isArray(s.extraReasons)) s.extraReasons = [];
    if (!Array.isArray(s.extraPrograms)) s.extraPrograms = [];
    if (!Array.isArray(s.extraServiceTypes)) s.extraServiceTypes = [];
    if (!Array.isArray(s.customTemplates)) s.customTemplates = [];
    if (!Array.isArray(state.data.optimizerRuns)) state.data.optimizerRuns = [];
    if (!state.data.templates) state.data.templates = {};
    if (!state.data.integrations) state.data.integrations = { mapsKey: "", processor: "", sendgrid: "", notes: "" };
    (state.data.users || []).forEach((u) => {
      if (u.role === "tech") u.role = "trapper";
    });
  }
  function programBillAmount(p) {
    if (!p) return 0;
    if (p.id === "12mo") return Math.round(p.list / Math.max(1, p.months));
    return p.prepaid != null ? p.prepaid : p.list;
  }
  function buildCommitment(programId, startDate) {
    const p = programById(programId) || PROGRAMS[0];
    const monthly = p.id === "12mo";
    const periods = monthly ? Math.max(1, Math.round(p.months)) : 1;
    const installmentAmount = programBillAmount(p);
    return {
      programId: p.id,
      termMonths: p.months,
      totalValue: p.list,
      billingFrequency: monthly ? "monthly" : "upfront",
      installmentAmount,
      periods,
      autoPay: monthly,
      committedOn: startDate || TODAY,
    };
  }
  function buildBillingPeriods(commitment, startDate, firstInvoiceId) {
    const start = startDate || TODAY;
    const n = commitment.periods || 1;
    const periods = [];
    for (let i = 1; i <= n; i++) {
      const dueOffset = commitment.billingFrequency === "monthly" ? i - 1 : 0;
      periods.push({
        id: `BP-${i}`,
        n: i,
        amount: commitment.installmentAmount,
        status: i === 1 && firstInvoiceId ? "invoiced" : (i === 1 && !firstInvoiceId ? "upcoming" : "upcoming"),
        invoiceId: i === 1 ? (firstInvoiceId || null) : null,
        dueDate: addMonths(start, dueOffset),
      });
    }
    if (firstInvoiceId && periods[0]) {
      periods[0].status = "invoiced";
      periods[0].invoiceId = firstInvoiceId;
    }
    return periods;
  }
  function seedLocBilling(programId, start, invId, lifecycle, paid) {
    const commitment = buildCommitment(programId, start);
    const billingPeriods = buildBillingPeriods(commitment, start, invId || null);
    if (paid && billingPeriods[0]) {
      billingPeriods[0].status = "paid";
      billingPeriods[0].invoiceId = invId || billingPeriods[0].invoiceId;
    }
    return {
      programId,
      amount: commitment.installmentAmount,
      start,
      expires: addMonths(start, commitment.termMonths),
      paid: !!paid,
      autoPay: !!commitment.autoPay,
      lifecycle: lifecycle || (paid ? "active" : (invId ? "waiting_payment" : "inquiry")),
      commitment,
      billingPeriods,
    };
  }

  const REASONS = [
    { id: "mechanical", label: "Mechanical failure", fault: "company" },
    { id: "sick", label: "Technician illness", fault: "company" },
    { id: "weather", label: "Weather", fault: "company" },
    { id: "gate", label: "Gated — no answer", fault: "customer" },
    { id: "nothome", label: "Not home / no access", fault: "customer" },
    { id: "dog", label: "Aggressive dog / unsafe", fault: "customer" },
  ];

  function seed() {
    return {
      customers: [
        {
          id: "C-1042",
          name: "Diane Walsh",
          phone: "(561) 555-0142",
          email: "diane.walsh@email.com",
          type: "residential",
          billTo: "Diane Walsh",
          status: "active",
          programId: "12pre",
          amount: 2000,
          start: "2026-03-01",
          expires: "2027-03-01",
          paid: true,
          autoPay: false,
          municipal: false,
          techId: "johnny",
          backupId: "bobby",
          days: "Mon/Wed",
          durationMin: 20,
          locations: [
            { id: "L-1042a", name: "Residence", address: "418 NE 4th St, Boca Raton, FL", x: "30%", y: "40%", covered: true, techId: "johnny", days: "Mon/Wed", gps: "26.3587, -80.0831", ...seedLocBilling("12pre", "2026-03-01", "INV-4419", "active", true) },
            { id: "L-1042b", name: "Rental", address: "902 NE 20th Ave, Fort Lauderdale, FL", x: "32%", y: "50%", covered: true, requestService: true, requestedAt: 2, techId: "johnny", days: "Mon/Wed", ...seedLocBilling("6mo", "2026-08-01", "INV-4420", "active", true) },
          ],
          notes: "Gate code 4419. Dogs in backyard — use side path. Client asked to catch iguanas at the Fort Lauderdale rental too. Two properties, two plans, two invoices — Diane is the only Bill-To.",
          opsNote: "Customer asked to skip the week of Labor Day if possible.",
        },
        {
          id: "C-1108",
          name: "Palm Cove HOA",
          phone: "(954) 555-2201",
          email: "board@palmcovehoa.org",
          type: "hoa",
          billTo: "Palm Cove HOA Board",
          status: "active",
          programId: "hoa2",
          amount: 2100,
          start: "2026-01-15",
          expires: "2026-10-15",
          paid: true,
          autoPay: false,
          municipal: false,
          techId: "bobby",
          backupId: "johnny",
          days: "Tue/Thu",
          durationMin: 90,
          locations: [
            { id: "L-1108a", name: "Clubhouse", address: "12 Palm Cove Dr, Fort Lauderdale, FL", x: "33%", y: "54%", covered: true, techId: "bobby", days: "Tue/Thu" },
            { id: "L-1108b", name: "Lot 14", address: "14 Palm Cove Dr, Fort Lauderdale, FL", x: "34%", y: "55%", covered: true, techId: "bobby", days: "Tue/Thu" },
            { id: "L-1108c", name: "Lot 22", address: "22 Palm Cove Dr, Fort Lauderdale, FL", x: "35%", y: "53%", covered: true, techId: "bobby", days: "Tue/Thu" },
            { id: "L-1108d", name: "Lot 31", address: "31 Palm Cove Dr, Fort Lauderdale, FL", x: "36%", y: "56%", covered: false },
            ...Array.from({ length: 18 }, (_, i) => ({
              id: `L-1108n${i + 40}`,
              name: `Lot ${i + 40}`,
              address: `${i + 40} Palm Cove Dr, Fort Lauderdale, FL`,
              x: `${32.2 + (i % 6) * 0.85}%`,
              y: `${51.5 + Math.floor(i / 6) * 1.6 + (i % 2) * 0.35}%`,
              covered: true,
              techId: "bobby",
              days: "Tue/Thu",
            })),
          ],
          notes: "Bill-To covers the community this term. Lot 31 unpaid. Dense HOA — all lots stay visible on the map (no 20-stop cutoff).",
          opsNote: "Split 90 min across Bobby (Tue) if volume spikes.",
        },
        {
          id: "C-1112",
          name: "Cypress Commons",
          phone: "(954) 555-6112",
          email: "ops@cypresscommons.org",
          type: "hoa",
          billTo: "Cypress Commons HOA",
          status: "active",
          programId: "hoa2",
          amount: 1576,
          start: "2026-02-01",
          expires: "2026-10-10",
          paid: true,
          autoPay: false,
          municipal: false,
          techId: "johnny",
          backupId: "bobby",
          days: "Mon/Wed",
          durationMin: 180,
          locations: [{
            id: "L-1112a",
            name: "Canal & preserve",
            address: "Cypress Commons preserve (manual pin), Fort Lauderdale, FL",
            x: "34%",
            y: "47%",
            covered: true,
            shared: true,
            gps: "26.1358, -80.1412",
            manualPin: true,
          }],
          notes: "Six hours a week on one property — split across two trappers on different days. Gray pin on the map.",
          opsNote: "Johnny Mon 3 hrs · Bobby Wed 3 hrs. Do not copy the stop — each trapper has their own service.",
        },
        {
          id: "C-1091",
          name: "Sarah Chen",
          phone: "(561) 555-0881",
          email: "sarah.chen@email.com",
          type: "residential",
          billTo: "Sarah Chen",
          status: "renewal",
          programId: "12pre",
          amount: 2000,
          start: "2025-09-24",
          expires: "2026-09-24",
          paid: true,
          autoPay: false,
          municipal: false,
          techId: "pedro",
          backupId: "johnny",
          days: "Mon/Wed",
          durationMin: 25,
          locations: [{ id: "L-1091a", name: "Residence", address: "880 Northlake Blvd, West Palm Beach, FL", x: "40%", y: "26%", ...seedLocBilling("12pre", "2025-09-24", "INV-4510", "waiting_payment", false) }],
          notes: "Standard prepaid rate. Review and send.",
          opsNote: "",
        },
        {
          id: "C-1066",
          name: "Harbor Oaks",
          phone: "(813) 555-4410",
          email: "mgr@harboroaks.com",
          type: "commercial",
          billTo: "Harbor Oaks Management",
          status: "past_due",
          programId: "12mo",
          amount: 200,
          start: "2026-04-01",
          expires: "2027-04-01",
          paid: false,
          autoPay: true,
          municipal: false,
          failedPayment: true,
          techId: "miguel",
          backupId: "alejo",
          days: "Tue/Thu",
          durationMin: 40,
          locations: [{
            id: "L-1066a",
            name: "Campus",
            address: "210 Harbor Oaks Rd, Tampa, FL",
            x: "14%",
            y: "38%",
            covered: true,
            techId: "miguel",
            days: "Tue/Thu",
            gps: "27.9506, -82.4572",
            ...seedLocBilling("12mo", "2026-04-01", "INV-4488", "past_due", false),
          }],
          notes: "12-month monthly AutoPay. Service set up once in April — do not recreate each month. Months 1–4 paid. August installment declined.",
          opsNote: "Card declined Aug 26 — leave off route. Call them; stop service if they cannot pay.",
        },
        {
          id: "C-1020",
          name: "Coastal Municipal Parks",
          phone: "(239) 555-1000",
          email: "ap@coastalparks.gov",
          type: "municipal",
          billTo: "City of Coastal Parks",
          status: "active",
          programId: "12mo",
          amount: 0,
          start: "2026-01-01",
          expires: "2026-12-31",
          paid: false,
          autoPay: false,
          municipal: true,
          billTiming: "after",
          billPeriod: "preceding",
          hourlyRate: 85,
          po: "PO-4481",
          poCapHours: 120,
          hoursUsed: 86,
          poCapAmount: 10200,
          techId: "alejo",
          backupId: "miguel",
          days: "Fri",
          durationMin: 180,
          locations: [{ id: "L-1020a", name: "Riverside Park", address: "Riverside Park (manual pin), Naples, FL", x: "20%", y: "74%", gps: "26.1420, -81.7948", manualPin: true }],
          notes: "Municipal PO — schedule without waiting for payment. Invoice after the service period. PO hours are the hard limit.",
          opsNote: "Pin is GPS-overridden; techs must tap-to-navigate.",
        },
        {
          id: "C-1180",
          name: "Elena Vasquez",
          phone: "(954) 555-0199",
          email: "elena.v@email.com",
          type: "residential",
          billTo: "Elena Vasquez",
          status: "inquiry",
          programId: null,
          amount: 0,
          start: null,
          expires: null,
          paid: false,
          autoPay: false,
          municipal: false,
          techId: null,
          backupId: null,
          days: null,
          durationMin: 20,
          locations: [{ id: "L-1180a", name: "Residence", address: "55 SE 2nd Ave, Fort Lauderdale, FL", x: "31%", y: "50%", lifecycle: "quoted" }],
          notes: "Quote sent with plan options. Waiting for Elena to say which program she wants — then Christy creates and sends the invoice.",
          opsNote: "",
        },
        {
          id: "C-1188",
          name: "Nina Patel",
          phone: "(954) 555-0288",
          email: "nina.patel@email.com",
          type: "residential",
          billTo: "Nina Patel",
          status: "waiting_payment",
          programId: "6mo",
          amount: 3200,
          start: "2026-08-27",
          expires: "2027-02-27",
          paid: false,
          autoPay: false,
          municipal: false,
          techId: null,
          backupId: null,
          days: null,
          durationMin: 20,
          handedToOps: false,
          handedAt: 0,
          createdBy: "admin",
          locations: [
            { id: "L-1188a", name: "Residence", address: "210 SE 3rd Ave, Fort Lauderdale, FL", x: "31%", y: "51%", covered: true, requestService: true, requestedAt: 1, ...seedLocBilling("6mo", "2026-08-27", "INV-4688", "waiting_payment", false) },
            { id: "L-1188b", name: "Canal house", address: "44 SE 10th St, Deerfield Beach, FL", x: "29%", y: "43%", covered: true, requestService: true, requestedAt: 3, ...seedLocBilling("12pre", "2026-08-27", "INV-4689", "waiting_payment", false) },
          ],
          notes: "Commitment + invoices sent. Waiting for payment on each property before Rick creates service.",
          opsNote: "Do not create service until Christy marks each property paid.",
        },
        {
          id: "C-1210",
          name: "Jony Morales",
          firstName: "Jony",
          lastName: "Morales",
          phone: "(954) 555-1210",
          email: "jony.morales@email.com",
          type: "residential",
          billTo: "Jony Morales",
          status: "active",
          programId: "12pre",
          amount: 3200,
          start: "2026-08-20",
          expires: "2027-02-20",
          paid: true,
          autoPay: false,
          municipal: false,
          techId: "johnny",
          backupId: "bobby",
          days: "Mon/Wed",
          durationMin: 20,
          handedToOps: true,
          handedAt: 4,
          createdBy: "sales",
          locations: [
            { id: "L-1210a", name: "Boca house", address: "610 NE 3rd Ave, Boca Raton, FL", x: "29%", y: "41%", covered: true, techId: "johnny", days: "Mon/Wed", gps: "26.3591, -80.0822", ...seedLocBilling("12pre", "2026-08-20", "INV-4710", "active", true) },
            { id: "L-1210b", name: "Deerfield rental", address: "88 SE 8th St, Deerfield Beach, FL", x: "28%", y: "44%", covered: true, techId: "bobby", days: "Tue/Thu", ...seedLocBilling("6mo", "2026-08-20", "INV-4711", "active", true) },
          ],
          notes: "Jony called for two properties. Bill-To is only Jony. Boca house is 12-month prepaid; the rental is 6-month. Two invoices, two services.",
          opsNote: "Do not merge these into one job. Each address has its own trapper and invoice.",
        },
        {
          id: "C-1077",
          name: "Rita Gomez",
          phone: "(561) 555-0177",
          email: "rita.gomez@email.com",
          type: "residential",
          billTo: "Rita Gomez",
          status: "renewal",
          programId: "1mo",
          amount: 300,
          start: "2026-08-22",
          expires: "2026-09-22",
          paid: true,
          autoPay: false,
          municipal: false,
          techId: "johnny",
          backupId: "bobby",
          days: "Thu",
          durationMin: 25,
          locations: [{ id: "L-1077a", name: "Residence", address: "900 E Camino Real, Boca Raton, FL", x: "27%", y: "44%", gps: "26.3502, -80.0849", ...seedLocBilling("1mo", "2026-08-22", "INV-4531", "active", true) }],
          notes: "Short-term 1-month. Do not send another 1-month as the renewal — offer a 6- or 12-month rollover.",
          opsNote: "Prefers morning window before 9:30.",
        },
        {
          id: "C-1004",
          name: "Martin Ruiz",
          phone: "(561) 555-3002",
          email: "m.ruiz@email.com",
          type: "residential",
          billTo: "Martin Ruiz",
          status: "lapsed",
          programId: "12pre",
          amount: 2000,
          start: "2025-07-01",
          expires: "2026-07-01",
          paid: false,
          autoPay: false,
          municipal: false,
          techId: "johnny",
          backupId: "bobby",
          days: null,
          durationMin: 15,
          locations: [{ id: "L-1004a", name: "Residence", address: "1901 N Federal Hwy, Boca Raton, FL", x: "29%", y: "38%" }],
          notes: "Did not renew. Off active routing. Trap IC-208 is still in the field — retrieve it.",
          opsNote: "",
        },
      ],
      quotes: [
        { id: "Q-2201", customerId: "C-1180", locationIds: ["L-1180a"], locationId: "L-1180a", programId: null, optionsSent: true, sent: true, previewed: true, date: "2026-08-26" },
      ],
      invoices: [
        { id: "INV-4419", customerId: "C-1042", locationId: "L-1042a", contractId: "CON-1042a", amount: 2000, status: "sent", sent: "2026-02-20", paidOn: "2026-02-21", kind: "initial" },
        { id: "INV-4420", customerId: "C-1042", locationId: "L-1042b", contractId: "CON-1042b", amount: 1200, status: "sent", sent: "2026-08-01", paidOn: "2026-08-02", kind: "initial" },
        { id: "INV-4502", customerId: "C-1108", locationId: "L-1108a", amount: 2100, status: "sent", sent: "2026-07-01", paidOn: "2026-07-03", kind: "renewal" },
        { id: "INV-4510", customerId: "C-1091", locationId: "L-1091a", contractId: "CON-1091a", amount: 2000, status: "sent", sent: "2026-08-20", paidOn: null, kind: "renewal" },
        { id: "INV-4531", customerId: "C-1077", locationId: "L-1077a", contractId: "CON-1077a", amount: 300, status: "sent", sent: "2026-08-20", paidOn: "2026-08-26", kind: "initial" },
        { id: "INV-4601", customerId: "C-1020", locationId: "L-1020a", amount: 0, status: "draft", sent: null, paidOn: null, kind: "municipal", period: "August 2026", po: "PO-4481" },
        { id: "INV-4484", customerId: "C-1066", locationId: "L-1066a", contractId: "CON-1066a", amount: 200, status: "sent", sent: "2026-04-01", paidOn: "2026-04-02", kind: "autopay", periodN: 1, description: "12-month monthly — Billing Period 1" },
        { id: "INV-4485", customerId: "C-1066", locationId: "L-1066a", contractId: "CON-1066a", amount: 200, status: "sent", sent: "2026-05-01", paidOn: "2026-05-02", kind: "autopay", periodN: 2, description: "12-month monthly — Billing Period 2" },
        { id: "INV-4486", customerId: "C-1066", locationId: "L-1066a", contractId: "CON-1066a", amount: 200, status: "sent", sent: "2026-06-01", paidOn: "2026-06-02", kind: "autopay", periodN: 3, description: "12-month monthly — Billing Period 3" },
        { id: "INV-4487", customerId: "C-1066", locationId: "L-1066a", contractId: "CON-1066a", amount: 200, status: "sent", sent: "2026-07-01", paidOn: "2026-07-02", kind: "autopay", periodN: 4, description: "12-month monthly — Billing Period 4" },
        { id: "INV-4488", customerId: "C-1066", locationId: "L-1066a", contractId: "CON-1066a", amount: 200, status: "sent", sent: "2026-08-01", paidOn: null, kind: "autopay", periodN: 5, description: "12-month monthly — Billing Period 5" },
        { id: "INV-4301", customerId: "C-1004", locationId: "L-1004a", amount: 2000, status: "sent", sent: "2025-06-20", paidOn: "2025-06-22", kind: "initial" },
        { id: "INV-4688", customerId: "C-1188", locationId: "L-1188a", contractId: "CON-1188a", amount: 1200, status: "sent", sent: "2026-08-27", paidOn: null, kind: "initial" },
        { id: "INV-4689", customerId: "C-1188", locationId: "L-1188b", contractId: "CON-1188b", amount: 2000, status: "sent", sent: "2026-08-27", paidOn: null, kind: "initial" },
        { id: "INV-4710", customerId: "C-1210", locationId: "L-1210a", contractId: "CON-1210a", amount: 2000, status: "sent", sent: "2026-08-20", paidOn: "2026-08-21", kind: "initial" },
        { id: "INV-4711", customerId: "C-1210", locationId: "L-1210b", contractId: "CON-1210b", amount: 1200, status: "sent", sent: "2026-08-20", paidOn: "2026-08-21", kind: "initial" },
      ],
      payments: [
        { id: "P-9001", invoiceId: "INV-4419", customerId: "C-1042", locationId: "L-1042a", amount: 2000, method: "Card", last4: "4419", source: "portal", date: "2026-02-21", memo: "Portal · Visa 4419 · Diane Walsh · Residence", invoiceMarked: true, linkPay: true },
        { id: "P-9002", invoiceId: "INV-4420", customerId: "C-1042", locationId: "L-1042b", amount: 1200, method: "ACH", last4: "", source: "ach", date: "2026-08-02", memo: "ACH · Diane Walsh · Rental 6-month", invoiceMarked: true, linkPay: true },
        { id: "P-9114", invoiceId: "INV-4502", customerId: "C-1108", locationId: "L-1108a", amount: 2100, method: "ACH", last4: "", source: "ach", date: "2026-07-03", memo: "Palm Cove HOA · July · team entered on register", invoiceMarked: true, linkPay: false },
        { id: "P-9115", invoiceId: "INV-4502", customerId: "C-1108", locationId: "L-1108b", amount: 2100, method: "Zelle", last4: "", source: "zelle", date: "2026-07-29", memo: "Zelle · team entered on register · Palm Cove", invoiceMarked: true, linkPay: false },
        { id: "P-9116", invoiceId: "INV-4419", customerId: "C-1042", locationId: "L-1042a", amount: 200, method: "Check", last4: "2201", source: "check", date: "2026-07-30", memo: "Check #2201 · team entered · Diane", invoiceMarked: true, linkPay: false },
        { id: "P-9176", invoiceId: "INV-4484", customerId: "C-1066", locationId: "L-1066a", amount: 200, method: "Auto-pay", last4: "3301", source: "autopay", date: "2026-04-02", memo: "AutoPay · Harbor Oaks · month 1 · service already live", invoiceMarked: true, linkPay: true, posted: true, appliedAuto: true },
        { id: "P-9177", invoiceId: "INV-4485", customerId: "C-1066", locationId: "L-1066a", amount: 200, method: "Auto-pay", last4: "3301", source: "autopay", date: "2026-05-02", memo: "AutoPay · Harbor Oaks · month 2 · no new service", invoiceMarked: true, linkPay: true, posted: true, appliedAuto: true },
        { id: "P-9178", invoiceId: "INV-4486", customerId: "C-1066", locationId: "L-1066a", amount: 200, method: "Auto-pay", last4: "3301", source: "autopay", date: "2026-06-02", memo: "AutoPay · Harbor Oaks · month 3 · no new service", invoiceMarked: true, linkPay: true, posted: true, appliedAuto: true },
        { id: "P-9179", invoiceId: "INV-4487", customerId: "C-1066", locationId: "L-1066a", amount: 200, method: "Auto-pay", last4: "3301", source: "autopay", date: "2026-07-02", memo: "AutoPay · Harbor Oaks · month 4 · no new service", invoiceMarked: true, linkPay: true, posted: true, appliedAuto: true },
        { id: "P-9180", invoiceId: "INV-4488", customerId: "C-1066", locationId: "L-1066a", amount: 200, method: "Auto-pay", last4: "3301", source: "autopay", date: "2026-08-26", memo: "Declined — Harbor Oaks monthly installment 5", invoiceMarked: false, failed: true, linkPay: true, posted: true, status: "FAILED" },
        { id: "P-9260", invoiceId: "INV-4419", customerId: "C-1042", locationId: "L-1042a", amount: 2000, method: "Website", last4: "2291", source: "website", date: "2026-02-22", memo: "Website checkout · Diane Walsh", invoiceMarked: true, linkPay: true },
        { id: "P-9230", invoiceId: "INV-4531", customerId: "C-1077", locationId: "L-1077a", amount: 300, method: "Card", last4: "7712", source: "portal", date: "2026-08-26", memo: "Portal link · Rita Gomez — Christy marked paid", invoiceMarked: true, linkPay: true },
        { id: "P-9231", invoiceId: "INV-4510", customerId: "C-1091", locationId: "L-1091a", amount: 2000, method: "Card", last4: "1091", source: "portal", date: "2026-08-27", memo: "Portal renewal link · Sarah Chen — on register, post payment", invoiceMarked: false, linkPay: true },
        { id: "P-9288", invoiceId: "INV-4688", customerId: "C-1188", locationId: "L-1188a", amount: 1200, method: "Portal", last4: "1188", source: "portal", date: "2026-08-27", memo: "Portal link · Nina Patel Residence — on register, post payment", invoiceMarked: false, linkPay: true },
        { id: "P-9289", invoiceId: "INV-4689", customerId: "C-1188", locationId: "L-1188b", amount: 2000, method: "Check", last4: "9901", source: "check", date: "2026-08-27", memo: "Check #9901 · team entered · Nina Canal house — post payment", invoiceMarked: false, linkPay: false },
        { id: "P-9310", invoiceId: "INV-4710", customerId: "C-1210", locationId: "L-1210a", amount: 2000, method: "Card", last4: "1210", source: "portal", date: "2026-08-21", memo: "Portal · Jony Morales Boca — marked paid", invoiceMarked: true, linkPay: true },
        { id: "P-9311", invoiceId: "INV-4711", customerId: "C-1210", locationId: "L-1210b", amount: 1200, method: "ACH", last4: "", source: "ach", date: "2026-08-21", memo: "ACH · Jony Morales Deerfield — marked paid", invoiceMarked: true, linkPay: true },
        { id: "P-9340", invoiceId: "INV-4488", customerId: "C-1066", locationId: "L-1066a", amount: 200, method: "Zelle", last4: "", source: "EXTERNAL", date: "2026-08-27", memo: "Zelle replacement · Harbor Oaks month 5 — awaiting allocation", invoiceMarked: false, linkPay: false, status: "POSTED" },
      ],
      contracts: [
        { id: "CON-1042a", customerId: "C-1042", locationId: "L-1042a", programId: "12pre", program: "12-month prepaid", termMonths: 12, totalValue: 2400, startDate: "2026-03-01", endDate: "2027-03-01", status: "ACTIVE" },
        { id: "CON-1042b", customerId: "C-1042", locationId: "L-1042b", programId: "6mo", program: "6-month", termMonths: 6, totalValue: 1400, startDate: "2026-08-01", endDate: "2027-02-01", status: "ACTIVE" },
        { id: "CON-1091a", customerId: "C-1091", locationId: "L-1091a", programId: "12pre", program: "12-month prepaid", termMonths: 12, totalValue: 2400, startDate: "2025-09-24", endDate: "2026-09-24", status: "PENDING PAYMENT" },
        { id: "CON-1066a", customerId: "C-1066", locationId: "L-1066a", programId: "12mo", program: "12-month monthly", termMonths: 12, totalValue: 2400, startDate: "2026-04-01", endDate: "2027-04-01", status: "ACTIVE", paymentStatus: "PAST DUE" },
        { id: "CON-1188a", customerId: "C-1188", locationId: "L-1188a", programId: "6mo", program: "6-month", termMonths: 6, totalValue: 1400, startDate: "2026-08-27", endDate: "2027-02-27", status: "PENDING PAYMENT", paymentStatus: "AWAITING PAYMENT" },
        { id: "CON-1188b", customerId: "C-1188", locationId: "L-1188b", programId: "12pre", program: "12-month prepaid", termMonths: 12, totalValue: 2400, startDate: "2026-08-27", endDate: "2027-08-27", status: "PENDING PAYMENT", paymentStatus: "AWAITING PAYMENT" },
        { id: "CON-1210a", customerId: "C-1210", locationId: "L-1210a", programId: "12pre", program: "12-month prepaid", termMonths: 12, totalValue: 2400, startDate: "2026-08-20", endDate: "2027-08-20", status: "ACTIVE" },
        { id: "CON-1210b", customerId: "C-1210", locationId: "L-1210b", programId: "6mo", program: "6-month", termMonths: 6, totalValue: 1400, startDate: "2026-08-20", endDate: "2027-02-20", status: "ACTIVE" },
        { id: "CON-1077a", customerId: "C-1077", locationId: "L-1077a", programId: "1mo", program: "1-month", termMonths: 1, totalValue: 300, startDate: "2026-08-22", endDate: "2026-09-22", status: "ACTIVE" },
      ],
      billingPlans: [
        { id: "BPL-1042a", contractId: "CON-1042a", frequency: "annual", installmentAmount: 2000, installments: 1, autopay: false, status: "ACTIVE" },
        { id: "BPL-1042b", contractId: "CON-1042b", frequency: "annual", installmentAmount: 1200, installments: 1, autopay: false, status: "ACTIVE" },
        { id: "BPL-1091a", contractId: "CON-1091a", frequency: "annual", installmentAmount: 2000, installments: 1, autopay: false, status: "ACTIVE" },
        { id: "BPL-1066a", contractId: "CON-1066a", frequency: "monthly", installmentAmount: 200, installments: 12, autopay: true, status: "ACTIVE" },
        { id: "BPL-1188a", contractId: "CON-1188a", frequency: "annual", installmentAmount: 1200, installments: 1, autopay: false, status: "ACTIVE" },
        { id: "BPL-1188b", contractId: "CON-1188b", frequency: "annual", installmentAmount: 2000, installments: 1, autopay: false, status: "ACTIVE" },
        { id: "BPL-1210a", contractId: "CON-1210a", frequency: "annual", installmentAmount: 2000, installments: 1, autopay: false, status: "ACTIVE" },
        { id: "BPL-1210b", contractId: "CON-1210b", frequency: "annual", installmentAmount: 1200, installments: 1, autopay: false, status: "ACTIVE" },
        { id: "BPL-1077a", contractId: "CON-1077a", frequency: "annual", installmentAmount: 300, installments: 1, autopay: false, status: "ACTIVE" },
      ],
      billingPeriods: [
        { id: "PER-1042a-1", contractId: "CON-1042a", sequence: 1, periodStart: "2026-03-01", periodEnd: "2027-03-01", amount: 2000, status: "PAID", invoiceId: "INV-4419" },
        { id: "PER-1042b-1", contractId: "CON-1042b", sequence: 1, periodStart: "2026-08-01", periodEnd: "2027-02-01", amount: 1200, status: "PAID", invoiceId: "INV-4420" },
        { id: "PER-1091a-1", contractId: "CON-1091a", sequence: 1, periodStart: "2025-09-24", periodEnd: "2026-09-24", amount: 2000, status: "DUE", invoiceId: "INV-4510" },
        { id: "PER-1066a-1", contractId: "CON-1066a", sequence: 1, periodStart: "2026-04-01", periodEnd: "2026-05-01", amount: 200, status: "PAID", invoiceId: "INV-4484" },
        { id: "PER-1066a-2", contractId: "CON-1066a", sequence: 2, periodStart: "2026-05-01", periodEnd: "2026-06-01", amount: 200, status: "PAID", invoiceId: "INV-4485" },
        { id: "PER-1066a-3", contractId: "CON-1066a", sequence: 3, periodStart: "2026-06-01", periodEnd: "2026-07-01", amount: 200, status: "PAID", invoiceId: "INV-4486" },
        { id: "PER-1066a-4", contractId: "CON-1066a", sequence: 4, periodStart: "2026-07-01", periodEnd: "2026-08-01", amount: 200, status: "PAID", invoiceId: "INV-4487" },
        { id: "PER-1066a-5", contractId: "CON-1066a", sequence: 5, periodStart: "2026-08-01", periodEnd: "2026-09-01", amount: 200, status: "DUE", invoiceId: "INV-4488" },
        { id: "PER-1188a-1", contractId: "CON-1188a", sequence: 1, periodStart: "2026-08-27", periodEnd: "2027-02-27", amount: 1200, status: "DUE", invoiceId: "INV-4688" },
        { id: "PER-1188b-1", contractId: "CON-1188b", sequence: 1, periodStart: "2026-08-27", periodEnd: "2027-08-27", amount: 2000, status: "DUE", invoiceId: "INV-4689" },
        { id: "PER-1210a-1", contractId: "CON-1210a", sequence: 1, periodStart: "2026-08-20", periodEnd: "2027-08-20", amount: 2000, status: "PAID", invoiceId: "INV-4710" },
        { id: "PER-1210b-1", contractId: "CON-1210b", sequence: 1, periodStart: "2026-08-20", periodEnd: "2027-02-20", amount: 1200, status: "PAID", invoiceId: "INV-4711" },
        { id: "PER-1077a-1", contractId: "CON-1077a", sequence: 1, periodStart: "2026-08-22", periodEnd: "2026-09-22", amount: 300, status: "PAID", invoiceId: "INV-4531" },
      ],
      paymentAllocations: [
        { id: "ALLOC-9001", paymentId: "P-9001", invoiceId: "INV-4419", amount: 2000 },
        { id: "ALLOC-9002", paymentId: "P-9002", invoiceId: "INV-4420", amount: 1200 },
        { id: "ALLOC-9114", paymentId: "P-9114", invoiceId: "INV-4502", amount: 2100 },
        { id: "ALLOC-9230", paymentId: "P-9230", invoiceId: "INV-4531", amount: 300 },
        { id: "ALLOC-9176", paymentId: "P-9176", invoiceId: "INV-4484", amount: 200 },
        { id: "ALLOC-9177", paymentId: "P-9177", invoiceId: "INV-4485", amount: 200 },
        { id: "ALLOC-9178", paymentId: "P-9178", invoiceId: "INV-4486", amount: 200 },
        { id: "ALLOC-9179", paymentId: "P-9179", invoiceId: "INV-4487", amount: 200 },
        { id: "ALLOC-9310", paymentId: "P-9310", invoiceId: "INV-4710", amount: 2000 },
        { id: "ALLOC-9311", paymentId: "P-9311", invoiceId: "INV-4711", amount: 1200 },
      ],
      autopayAuthorizations: [
        { id: "APA-1066", contractId: "CON-1066a", customerId: "C-1066", locationId: "L-1066a", status: "FAILED", method: "Credit Card", last4: "3301", failureCode: "CARD_DECLINED", failedAt: "2026-08-26T12:00:00" },
      ],
      renewals: [],
      optimizerRuns: [
        {
          id: "OPT-1",
          createdAt: "2026-08-25 16:40",
          createdBy: "Rick Torgerson",
          startDate: "2026-08-25",
          endDate: "2026-08-26",
          techIds: ["bobby", "johnny"],
          stopCount: 6,
          routeCount: 2,
          beforeDrive: 72,
          afterDrive: 42,
          unreachable: 0,
          committed: true,
        },
      ],
      notifications: [
        { id: "N-1", type: "AUTOPAY_FAILED", severity: "alert", title: "AutoPay declined", text: "Harbor Oaks · Campus · CARD_DECLINED ····3301. Monthly plan — service already exists. Contact customer; Rick can stop service if they will not pay.", customerId: "C-1066", locationId: "L-1066a", invoiceId: "INV-4488", date: "2026-08-26", read: false },
      ],
      tasks: [
        { id: "TSK-1", customerId: "C-1066", locationId: "L-1066a", title: "Call Harbor Oaks about declined AutoPay", notes: "Month 5 declined. Service is already live — do not recreate. Ask for Zelle/check, allocate, or have Rick stop service.", createdBy: "admin", assignee: "admin", due: "2026-08-27", priority: "high", status: "open", createdAt: "2026-08-26" },
        { id: "TSK-1b", customerId: "C-1066", locationId: "L-1066a", title: "Hold / stop Harbor Oaks if unpaid", notes: "After you talk to them: if they cannot pay, stop the service on the customer record. Do not create a new service.", createdBy: "admin", assignee: "ops", due: "2026-08-27", priority: "high", status: "open", createdAt: "2026-08-26" },
        { id: "TSK-2", customerId: "C-1188", locationId: "L-1188a", title: "Allocate Nina residence payment", notes: "Portal payment is on the register — allocate so Rick can create service on that property only.", createdBy: "owner", assignee: "admin", due: "2026-08-27", priority: "high", status: "open", createdAt: "2026-08-27" },
        { id: "TSK-3", customerId: "C-1188", locationId: "L-1188a", title: "Create service after Nina Residence is paid", notes: "Wait for Christy to allocate. Then create service and assign on the map.", createdBy: "admin", assignee: "ops", due: "2026-08-28", priority: "normal", status: "open", createdAt: "2026-08-27" },
        { id: "TSK-4", customerId: "C-1091", locationId: "L-1091a", title: "Review Sarah Chen renewal amount", notes: "Odd / confirm prepaid vs monthly before send.", createdBy: "admin", assignee: "owner", due: "2026-08-28", priority: "normal", status: "open", createdAt: "2026-08-20" },
        { id: "TSK-5", customerId: "C-1042", locationId: "L-1042b", title: "Confirm Labor Day skip for Diane rental", notes: "Ops note on account — confirm with Diane and update schedule if needed.", createdBy: "ops", assignee: "ops", due: "2026-08-29", priority: "normal", status: "done", createdAt: "2026-08-18", completedAt: "2026-08-19" },
      ],
      mail: [],
      services: [
        { id: "SVC-1042a", customerId: "C-1042", locationId: "L-1042a", type: "12mon-res", status: "live", techId: "johnny", days: "Mon/Wed", durationMin: 20, generated: true, schedule: "WK-MOWE", target: "IGUANA", charge: "Production", start: "2026-03-01", expires: "2027-03-01", renewal: "2027-03-01" },
        { id: "SVC-1091a", customerId: "C-1091", locationId: "L-1091a", type: "12mon-res", status: "live", techId: "pedro", days: "Mon/Wed", durationMin: 25, generated: true, schedule: "WK-MOWE", target: "IGUANA", charge: "Production", start: "2025-09-24", expires: "2026-09-24", renewal: "2026-09-24" },
        { id: "SVC-1108a", customerId: "C-1108", locationId: "L-1108a", type: "hoa-2wk", status: "live", techId: "bobby", days: "Tue/Thu", durationMin: 45, generated: true, schedule: "WK-TUTH", target: "IGUANA", charge: "Production", start: "2026-01-15", expires: "2026-10-15", renewal: "2026-10-15" },
        { id: "SVC-1108b", customerId: "C-1108", locationId: "L-1108b", type: "hoa-2wk", status: "live", techId: "bobby", days: "Tue/Thu", durationMin: 45, generated: true, schedule: "WK-TUTH", target: "IGUANA", charge: "Production", start: "2026-01-15", expires: "2026-10-15", renewal: "2026-10-15" },
        { id: "SVC-1066a", customerId: "C-1066", locationId: "L-1066a", type: "12mon-com", status: "live", techId: "miguel", days: "Tue/Thu", durationMin: 40, generated: true, schedule: "WK-TUTH", target: "IGUANA", charge: "Production", start: "2026-04-01", expires: "2027-04-01", renewal: "2027-04-01", contractId: "CON-1066a" },
        { id: "SVC-1020a", customerId: "C-1020", locationId: "L-1020a", type: "muni", status: "live", techId: "alejo", days: "Fri", durationMin: 180, generated: true, schedule: "WK-FR", target: "IGUANA", charge: "Production", start: "2026-01-01", expires: "2026-12-31", renewal: "2026-12-31", po: "PO-4481" },
        { id: "SVC-1077a", customerId: "C-1077", locationId: "L-1077a", type: "6mon-res", status: "live", techId: "johnny", days: "Thu", durationMin: 25, generated: true, schedule: "WK-FR", target: "IGUANA", charge: "Production", start: "2026-05-01", expires: "2026-11-01", renewal: "2026-11-01" },
        { id: "SVC-1112a", customerId: "C-1112", locationId: "L-1112a", type: "hoa-2wk", status: "live", techId: "johnny", days: "Mon", durationMin: 180, generated: true, schedule: "WK-MOWE", target: "IGUANA", charge: "Production", start: "2026-02-01", expires: "2026-11-01", renewal: "2026-11-01" },
        { id: "SVC-1112b", customerId: "C-1112", locationId: "L-1112a", type: "hoa-2wk", status: "live", techId: "bobby", days: "Wed", durationMin: 180, generated: true, schedule: "WK-MOWE", target: "IGUANA", charge: "Production", start: "2026-02-01", expires: "2026-11-01", renewal: "2026-11-01" },
        { id: "SVC-1210a", customerId: "C-1210", locationId: "L-1210a", type: "12mon-res", status: "live", techId: "johnny", days: "Mon/Wed", durationMin: 20, generated: true, schedule: "WK-MOWE", target: "IGUANA", charge: "Production", start: "2026-08-20", expires: "2027-08-20", renewal: "2027-08-20" },
        { id: "SVC-1210b", customerId: "C-1210", locationId: "L-1210b", type: "6mon-res", status: "live", techId: "bobby", days: "Tue/Thu", durationMin: 25, generated: true, schedule: "WK-TUTH", target: "IGUANA", charge: "Production", start: "2026-08-20", expires: "2027-02-20", renewal: "2027-02-20" },
      ],
      commissions: [
        { id: "B-12", paymentId: "P-9114", customerId: "C-1108", amount: 42, splits: [{ techId: "bobby", pct: 60, dollars: 25.2 }, { techId: "johnny", pct: 40, dollars: 16.8 }], period: "2026-07" },
      ],
      stops: [
        { id: "S-1", customerId: "C-1042", locationId: "L-1042a", techId: "johnny", day: "Mon", time: "08:10", durationMin: 20, type: "service", status: "complete", actualMin: 18, removals: { count: 2, weight: 7.1 } },
        { id: "S-2", customerId: "C-1091", locationId: "L-1091a", techId: "pedro", day: "Mon", time: "09:00", durationMin: 25, type: "service", status: "complete", actualMin: 24, removals: { count: 0, weight: 0 } },
        { id: "S-3", customerId: "C-1042", locationId: "L-1042a", techId: "johnny", day: "Wed", time: "08:15", durationMin: 20, type: "service", status: "scheduled", actualMin: null, removals: null },
        { id: "S-4", customerId: "C-1091", locationId: "L-1091a", techId: "pedro", day: "Wed", time: "09:10", durationMin: 25, type: "service", status: "scheduled", actualMin: null, removals: null },
        { id: "S-5", customerId: "C-1108", locationId: "L-1108a", techId: "bobby", day: "Tue", time: "08:00", durationMin: 45, type: "service", status: "complete", actualMin: 41, removals: { count: 3, weight: 11.4 } },
        { id: "S-6", customerId: "C-1108", locationId: "L-1108b", techId: "bobby", day: "Thu", time: "08:00", durationMin: 45, type: "service", status: "scheduled", actualMin: null, removals: null },
        { id: "S-7", customerId: "C-1066", locationId: "L-1066a", techId: "miguel", day: "Tue", time: "10:30", durationMin: 40, type: "service", status: "blocked", actualMin: null, removals: null },
        { id: "S-8", customerId: "C-1020", locationId: "L-1020a", techId: "alejo", day: "Fri", time: "07:30", durationMin: 180, type: "service", status: "scheduled", actualMin: null, removals: null },
        { id: "S-9", customerId: null, locationId: null, techId: "johnny", day: "Thu", time: "11:40", durationMin: 25, type: "oneoff", status: "unassigned_done", actualMin: null, removals: null, label: "Iguana in garage — walk-up, Boca", address: "Near Mizner Park", pending: true, taskType: "garage", x: "29%", y: "41%" },
        { id: "S-10", customerId: "C-1077", locationId: "L-1077a", techId: "johnny", day: "Thu", time: "08:20", durationMin: 25, type: "service", status: "scheduled", actualMin: null, removals: null },
        { id: "S-11", customerId: "C-1112", locationId: "L-1112a", techId: "johnny", day: "Mon", time: "13:00", durationMin: 180, type: "service", status: "scheduled", actualMin: null, removals: null },
        { id: "S-12", customerId: "C-1112", locationId: "L-1112a", techId: "bobby", day: "Wed", time: "13:00", durationMin: 180, type: "service", status: "scheduled", actualMin: null, removals: null },
        { id: "S-13", customerId: "C-1210", locationId: "L-1210a", techId: "johnny", day: "Mon", time: "10:20", durationMin: 20, type: "service", status: "scheduled", actualMin: null, removals: null },
        { id: "S-14", customerId: "C-1210", locationId: "L-1210b", techId: "bobby", day: "Tue", time: "11:00", durationMin: 25, type: "service", status: "scheduled", actualMin: null, removals: null },
        { id: "S-15", customerId: null, locationId: null, techId: "bobby", day: "Wed", time: "08:10", durationMin: 20, type: "oneoff", status: "scheduled", actualMin: null, removals: null, label: "Lakeview canal call-in", address: "Lakeview Dr, West Palm Beach", x: "50%", y: "25%" },
        { id: "S-16", customerId: null, locationId: null, techId: "bobby", day: "Wed", time: "09:00", durationMin: 20, type: "oneoff", status: "scheduled", actualMin: null, removals: null, label: "Marina iguana pickup", address: "South Marina, Fort Lauderdale", x: "20%", y: "75%" },
        { id: "S-17", customerId: null, locationId: null, techId: "bobby", day: "Wed", time: "10:00", durationMin: 20, type: "oneoff", status: "scheduled", actualMin: null, removals: null, label: "Northlake backyard visit", address: "Northlake Blvd, Palm Beach Gardens", x: "48%", y: "28%" },
      ],
      mtos: [
        { id: "M-1", from: "johnny", dept: "ops", customerId: "C-1042", text: "Gate keypad sticking. Side path still works. Property issue, not billing.", date: "2026-08-24 08:32", read: false },
        { id: "M-2", from: "bobby", dept: "admin", customerId: "C-1108", text: "HOA manager asked whether Lot 31 is covered this term — they think they paid for all four.", date: "2026-08-25 08:51", read: false },
        { id: "M-3", from: "alejo", dept: "ops", customerId: "C-1020", text: "Park pin is correct. Native maps launch from the coordinate now.", date: "2026-08-22 16:10", read: true },
      ],
      comms: [
        { id: "CM-1", customerId: "C-1091", who: "Christy Brown", channel: "Email", date: "2026-08-20", text: "Previewed renewal notice. Holding send until she confirms prepaid vs monthly." },
        { id: "CM-2", customerId: "C-1066", who: "Christy Brown", channel: "Call", date: "2026-08-26", text: "Left voicemail: auto-pay declined. Service paused until they pay." },
        { id: "CM-3", customerId: "C-1042", who: "Rick Torgerson", channel: "Call", date: "2026-08-18", text: "Diane asked to pause the Labor Day week. Noted on the account." },
        { id: "CM-4", customerId: "C-1180", who: "Rocco", channel: "Web form", date: "2026-08-26", text: "Inquiry: 12-month program for a Boca/Fort Lauderdale residence." },
      ],
      documents: [
        { id: "D-1", customerId: "C-1020", locationId: "L-1020a", kind: "coi", name: "COI — Coastal Parks 2026.pdf", by: "Christy Brown", date: "2026-01-06", note: "Sent to city AP for PO-4481." },
        { id: "D-2", customerId: "C-1020", locationId: "L-1020a", kind: "contract", name: "Municipal service agreement 2026.pdf", by: "Tom Portuallo", date: "2026-01-02", note: "Signed park monitoring agreement." },
        { id: "D-3", customerId: "C-1020", locationId: "L-1020a", kind: "photo", name: "Riverside Park — trap line.jpg", by: "Alejo", date: "2026-08-15", note: "Field photo after Friday run." },
        { id: "D-4", customerId: "C-1108", locationId: "L-1108a", kind: "contract", name: "HOA board approval.pdf", by: "Michelle", date: "2026-01-12", note: "Board OK for community program." },
        { id: "D-5", customerId: "C-1108", locationId: "L-1108a", kind: "photo", name: "Clubhouse pond access.jpg", by: "Bobby", date: "2026-08-20", note: "Gate code on the photo note." },
        { id: "D-6", customerId: "C-1042", locationId: "L-1042a", kind: "photo", name: "Gate / canal access.jpg", by: "Johnny", date: "2026-08-24", note: "How to reach the back canal." },
        { id: "D-7", customerId: "C-1042", locationId: "L-1042a", kind: "other", name: "Customer site instructions.pdf", by: "Christy Brown", date: "2026-03-10", note: "Diane’s written access notes." },
        { id: "D-8", customerId: "C-1066", locationId: "L-1066a", kind: "police", name: "Vehicle incident report — Aug 2026.pdf", by: "Christy Brown", date: "2026-08-12", note: "Admin file — not Ops-only." },
        { id: "D-9", customerId: "C-1066", locationId: "L-1066a", kind: "coi", name: "COI — commercial account.pdf", by: "Michelle", date: "2026-04-01", note: "On file for property manager." },
        { id: "D-10", customerId: "C-1112", locationId: "L-1112a", kind: "photo", name: "Preserve pin location.jpg", by: "Johnny", date: "2026-08-10", note: "Before trap IC-330 went missing." },
        { id: "D-11", customerId: "C-1091", locationId: "L-1091a", kind: "contract", name: "Signed 12-month program.pdf", by: "Rocco", date: "2025-09-24", note: "Original acceptance scan." },
        { id: "D-12", customerId: "C-1020", locationId: "L-1020a", kind: "other", name: "July hours timesheet export.pdf", by: "Rick Torgerson", date: "2026-08-02", note: "Confirmed hours for Christy’s invoice." },
      ],
      traps: [
        { id: "T-441", serial: "IC-441", customerId: "C-1042", locationId: "L-1042a", status: "deployed", value: 80, lastSeen: "2026-08-24", note: "Back canal. Johnny confirmed on Mon." },
        { id: "T-208", serial: "IC-208", customerId: "C-1004", locationId: "L-1004a", status: "out", value: 80, lastSeen: "2026-07-01", note: "Contract ended — still in the field. Retrieve." },
        { id: "T-119", serial: "IC-119", customerId: "C-1020", locationId: "L-1020a", status: "retrieved", value: 80, lastSeen: "2026-08-22", note: "Pulled after the Friday park run." },
        { id: "T-330", serial: "IC-330", customerId: "C-1112", locationId: "L-1112a", status: "missing", value: 80, lastSeen: "2026-08-10", note: "Preserve pin. Not at last GPS." },
        { id: "T-512", serial: "IC-512", customerId: "C-1108", locationId: "L-1108a", status: "deployed", value: 80, lastSeen: "2026-08-25", note: "Clubhouse pond." },
      ],
      users: [
        { id: "u1", name: "Tom", role: "owner", active: true },
        { id: "u2", name: "Rick Torgerson", role: "ops", active: true },
        { id: "u3", name: "Christy Brown", role: "admin", active: true },
        { id: "u4", name: "Michelle", role: "admin", active: true },
        { id: "u5", name: "Rocco", role: "sales", active: true },
        { id: "u6", name: "Johnny", role: "trapper", active: true },
        { id: "u7", name: "Bobby", role: "trapper", active: true },
        { id: "u8", name: "Pedro", role: "trapper", active: true },
        { id: "u9", name: "Miguel", role: "trapper", active: true },
        { id: "u10", name: "Alejo", role: "trapper", active: true },
        { id: "u11", name: "Avery Cole", role: "sysadmin", active: true },
      ],
      holidays: ["2026-09-07", "2026-11-26", "2026-12-25", "2027-01-01", "2027-07-04"],
      blackout: [],
      settings: {
        commissionPct: 2,
        renewalWindow: 60,
        reminder: "email",
        extraReasons: [],
        extraPrograms: [],
        extraServiceTypes: [],
        customTemplates: [],
      },
      templates: {
        proposal: "Hello {customer_name},\nAccount {account_id}.\nYour iguana removal program quote is ready.",
        invoice: "Hello {customer_name},\nInvoice {invoice_or_quote} is due.\nPay by invoice link, website, ACH, or bank transfer.",
        renewal: "Hello {customer_name},\nAccount {account_id} is in the renewal window.\nSame terms unless Administration notes otherwise.",
        visit: "Hi {customer_name}, a technician is scheduled in two days. This is an automated message — you cannot reply.",
      },
      integrations: { mapsKey: "", processor: "", sendgrid: "", notes: "" },
      inbound: [
        { id: "IN-1", channel: "Call", firstName: "Maria", lastName: "Lopez", phone: "(954) 555-0199", city: "Deerfield Beach", note: "Iguanas on the canal behind the house. Gate on the left. Dogs in the yard — go around the side.", time: "8:14 AM", used: false },
        { id: "IN-2", channel: "Text", firstName: "James", lastName: "Ortiz", phone: "(561) 555-4410", city: "Boca Raton", note: "Saw the truck. Wants someone to look at the backyard. Park on the street, not the driveway.", time: "8:41 AM", used: false },
        { id: "IN-3", channel: "Voicemail", company: "Lakeside HOA", firstName: "", lastName: "", phone: "(954) 555-7702", city: "Fort Lauderdale", locationType: "hoa", note: "Board called. Meet at the clubhouse. Ask for the manager. Canal lots behind building B.", time: "Yesterday", used: false },
      ],
      seq: 100,
    };
  }

  const session = window.IguanaStore ? IguanaStore.loadSession() : {};
  const state = {
    role: session.role || null,
    page: session.page || "dashboard",
    selectedCustomer: session.selectedCustomer || null,
    selectedLocation: session.selectedLocation || null,
    selectedStop: null,
    toast: null,
    modal: null,
    data: window.IguanaStore ? IguanaStore.load(seed) : seed(),
    mapDay: null,
    mapTech: null,
    mapClient: null,
    mapLoc: null,
    mapColorBy: "tech",
    mapSelect: [],
    mapLasso: false,
    mapPin: null,
    mapSched: null,
    mapCompare: [],
    assignId: null,
    assignLocId: null,
    assignFocus: null,
    assignDays: "Mon/Wed",
    setupId: null,
    setupLocId: null,
    setupDraft: null,
    oneoffDraft: null,
    oneoffDay: null,
    renewPick: [],
    payFilter: "all",
    paySrcFilter: "all",
    payFocusId: null,
    payInvoice: null,
    publicPay: false,
    payView: false,
    inboundId: session.inboundId || null,
    taskFilter: "mine",
    mobileStop: null,
    schedView: "week",
    navOpen: {},
    locCount: 1,
    optimizerPreview: null,
    optimizerAnchors: {},
  };
  normalizeDemoData();
  if (state.page === "location" && !locBy(state.selectedCustomer, state.selectedLocation)) {
    state.selectedLocation = custBy(state.selectedCustomer)?.locations?.[0]?.id || null;
    if (!state.selectedLocation) state.page = "customers";
  }

  const $app = document.getElementById("app");

  function esc(s) {
    return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function role() { return ROLES[state.role] || null; }
  function can(action) {
    if (state.role === "owner") return true;
    return (WRITE[action] || []).includes(state.role);
  }
  function canPage(id) {
    if (state.role === "owner") {
      return NAV.some((n) => n.id === id) || isRecordPage(id) || id === "assign";
    }
    return NAV.some((n) => n.id === id && (n.roles || []).includes(state.role));
  }
  function isRecordPage(id) {
    return id === "customer" || id === "location" || id === "add-customer" || id === "create-service" || id === "create-oneoff";
  }
  function resolveWho(id) {
    if (ROLES[id]) return id;
    const raw = String(id || "").trim().toLowerCase();
    if (raw.includes("christy") || raw === "admin") return "admin";
    // if (raw.includes("rocco") || raw.includes("sales")) return "sales";
    if (raw.includes("rick") || raw === "ops") return "ops";
    // if (raw.includes("johnny") || raw === "tech") return "tech";
    if (raw.includes("avery") || raw.includes("sys")) return "sysadmin";
    if (raw.includes("tom") || raw.includes("owner")) return "owner";
    return null;
  }
  function enterAs(id) {
    const who = resolveWho(id);
    if (!who || !ROLES[who]) return;
    state.role = who;
    state.payView = false;
    state.modal = null;
    state.mobileStop = null;
    state.inboundId = null;
    state.selectedCustomer = null;
    state.locCount = 1;
    state.page = who === "admin" ? "payments" : "dashboard";
    state.payFilter = "month";
    state.payFocusId = null;
    render();
  }
  function ensureData() {
    if (!state.data) state.data = seed();
    const d = state.data;
    ["customers", "quotes", "invoices", "payments", "stops", "comms", "mtos", "mail", "documents", "users", "holidays", "commissions", "traps", "inbound", "services", "contracts", "billingPlans", "billingPeriods", "paymentAllocations", "autopayAuthorizations", "renewals", "notifications", "tasks"].forEach((k) => {
      if (!Array.isArray(d[k])) d[k] = [];
    });
    if (!d.settings) d.settings = { commissionPct: 2, renewalWindow: 60, reminder: "email", extraReasons: [] };
    if (!d.templates) d.templates = {};
    if (!d.integrations) d.integrations = {};
    d.customers.forEach((c) => {
      if (!Array.isArray(c.locations)) c.locations = [];
      const anyLocProgram = c.locations.some((l) => l.programId);
      c.locations.forEach((l) => {
        if (l.programId || !c.programId) return;
        const hasBilling = !!(l.paid || l.amount != null || l.start || (d.invoices || []).some((i) => i.customerId === c.id && i.locationId === l.id));
        const legacyAllEmpty = !anyLocProgram && c.status !== "inquiry";
        if (!(hasBilling || legacyAllEmpty)) return;
        l.programId = c.programId;
        if (l.amount == null) l.amount = c.amount;
        if (!l.start) l.start = c.start;
        if (!l.expires) l.expires = c.expires;
        if (l.paid == null) l.paid = !!c.paid;
      });
      syncCustomerFromLocations(c);
    });
    d.invoices.forEach((inv) => {
      if (inv.locationId) return;
      const c = d.customers.find((x) => x.id === inv.customerId);
      if (c?.locations?.[0]) inv.locationId = c.locations[0].id;
    });
    (d.contracts || []).forEach((ct) => {
      const loc = locBy(ct.customerId, ct.locationId);
      if (loc && !loc.contractId) loc.contractId = ct.id;
    });
    d.quotes.forEach((q) => {
      if (!Array.isArray(q.locationIds) || !q.locationIds.length) {
        if (q.locationId) q.locationIds = [q.locationId];
        else {
          const c = d.customers.find((x) => x.id === q.customerId);
          if (c?.locations?.[0]) q.locationIds = [c.locations[0].id];
        }
      }
      if (q.locationId) return;
      if (q.locationIds?.[0]) q.locationId = q.locationIds[0];
    });
    if (!Array.isArray(state.renewPick)) state.renewPick = [];
    if (!Array.isArray(state.mapSelect)) state.mapSelect = [];
  }
  function custBtn(id, label) {
    if (!id) return esc(label || "—");
    return `<button class="btn btn-ghost linkish" data-act="open-customer" data-id="${esc(id)}">${esc(label || id)}</button>`;
  }
  function techBy(id) { return TECHS.find((t) => t.id === id); }
  function techName(id) { return techBy(id)?.name || "—"; }
  function custBy(id) { return state.data.customers.find((c) => c.id === id); }
  function progBy(id) { return allPrograms().find((p) => p.id === id); }
  function programAmount(p) { return programBillAmount(p); }
  function addMonths(iso, months) {
    const d = new Date(iso + "T12:00:00");
    const whole = Math.floor(months);
    const extraDays = Math.round((months - whole) * 30);
    d.setMonth(d.getMonth() + whole);
    d.setDate(d.getDate() + extraDays);
    return d.toISOString().slice(0, 10);
  }
  function programOptionLabel(p) {
    const now = programAmount(p);
    if (p.id === "12mo") return `${p.name} — ${money(now)}/mo × ${p.months} (term ${money(p.list)})`;
    const promo = p.prepaid != null ? ` · billed ${money(now)}` : "";
    const free = p.freeMonths ? ` · ${p.freeMonths} mo promotional` : "";
    return `${p.name} — list ${money(p.list)}${promo}${free}`;
  }
  function locBy(cid, lid) {
    const c = custBy(cid);
    return c?.locations?.find((l) => l.id === lid);
  }
  function locPlan(c, l) {
    if (!c) return { programId: null, amount: 0, start: null, expires: null, paid: false, autoPay: false };
    const loc = l || null;
    return {
      programId: loc?.programId || null,
      amount: loc?.amount != null && loc.amount !== "" ? Number(loc.amount) : 0,
      start: loc?.start || null,
      expires: loc?.expires || null,
      paid: loc?.paid != null ? !!loc.paid : false,
      autoPay: loc?.autoPay != null ? !!loc.autoPay : !!c.autoPay,
    };
  }
  function locInvoices(cid, lid) {
    return (state.data.invoices || []).filter((i) => i.customerId === cid && (!lid || i.locationId === lid));
  }
  function locPaid(c, l) {
    if (!c || !l) return false;
    if (isMunicipal(c)) return true; // pay after service — Ops may schedule before invoice
    if (l.paid) return true;
    const ct = contractForLoc(c.id, l.id);
    if (ct && ct.status === "ACTIVE") return true;
    return locInvoices(c.id, l.id).some((i) => invoiceFinStatus(i) === "PAID");
  }
  function isMunicipal(c) {
    return !!(c && (c.municipal || c.type === "municipal"));
  }
  function muniPoCapHours(c) {
    return Number(c?.poCapHours) || 0;
  }
  function muniHoursUsed(c) {
    return Number(c?.hoursUsed) || 0;
  }
  function muniHoursRemaining(c) {
    const cap = muniPoCapHours(c);
    if (!cap) return null;
    return Math.max(0, cap - muniHoursUsed(c));
  }
  function muniNearLimit(c) {
    const cap = muniPoCapHours(c);
    if (!cap) return false;
    return muniHoursUsed(c) / cap >= 0.85;
  }
  function muniClockedHours(c, lid) {
    if (!c) return 0;
    const ss = (state.data.stops || []).filter((s) => s.customerId === c.id && (!lid || s.locationId === lid) && s.actualMin != null && !s.pending);
    return +(ss.reduce((a, s) => a + (s.actualMin || 0), 0) / 60).toFixed(2);
  }
  function muniSuggestPeriod(c) {
    // Demo date is Aug 27 2026 — preceding month = July; current = August
    const preceding = (c?.billPeriod || "preceding") === "preceding";
    return preceding ? "July 2026" : "August 2026";
  }
  function muniHourlyRate(c) {
    return Number(c?.hourlyRate) || 0;
  }
  function contractForLoc(cid, lid) {
    if (!lid) return null;
    return (state.data.contracts || []).find((x) => x.locationId === lid && (!cid || x.customerId === cid)) || null;
  }
  function planForContract(contractId) {
    return (state.data.billingPlans || []).find((x) => x.contractId === contractId);
  }
  function periodsForContract(contractId) {
    return (state.data.billingPeriods || []).filter((x) => x.contractId === contractId).sort((a, b) => a.sequence - b.sequence);
  }
  function allocated(invoiceId) {
    return (state.data.paymentAllocations || []).filter((x) => x.invoiceId === invoiceId).reduce((s, x) => s + Number(x.amount || 0), 0);
  }
  function paymentAllocatedAmount(paymentId) {
    return (state.data.paymentAllocations || []).filter((x) => x.paymentId === paymentId).reduce((s, x) => s + Number(x.amount || 0), 0);
  }
  function invoiceFinStatus(inv) {
    if (!inv) return "OPEN";
    if (inv.failed || inv.status === "failed") return "FAILED";
    if (inv.status === "draft") return "DRAFT";
    const paid = allocated(inv.id);
    const amt = Number(inv.amount || 0);
    if (paid <= 0 && inv.status === "paid") return "PAID"; // legacy
    if (paid <= 0) return "OPEN";
    if (paid + 0.001 < amt) return "PARTIAL";
    return "PAID";
  }
  function invoiceBalance(inv) {
    return Math.max(0, Number(inv?.amount || 0) - allocated(inv?.id));
  }
  function unpaidInvoices() {
    return (state.data.invoices || []).filter((i) => {
      const st = invoiceFinStatus(i);
      return st === "OPEN" || st === "PARTIAL" || st === "FAILED";
    });
  }
  function invProperty(inv) {
    if (!inv) return "—";
    const loc = inv.locationId ? locBy(inv.customerId, inv.locationId) : null;
    return loc ? loc.name : "—";
  }
  function invOptionLabel(i) {
    const c = custBy(i.customerId);
    const loc = i.locationId ? locBy(i.customerId, i.locationId) : null;
    const who = c?.billTo || c?.name || "";
    const prop = loc ? ` · ${loc.name}` : "";
    return `${i.id} · ${who}${prop} · ${money(i.amount)}`;
  }
  function applyPlanToLocation(l, programId, startDate) {
    const p = progBy(programId) || PROGRAMS[0];
    const start = startDate || l.start || TODAY;
    l.programId = p.id;
    l.amount = programAmount(p);
    l.start = start;
    l.expires = addMonths(start, p.months);
    if (p.id === "12mo") l.autoPay = true;
    return p;
  }
  function commitLocationPlan(loc, programId, startDate, invoiceId, customerId) {
    applyPlanToLocation(loc, programId, startDate);
    const commitment = buildCommitment(programId, startDate || TODAY);
    loc.commitment = commitment;
    loc.billingPeriods = buildBillingPeriods(commitment, startDate || TODAY, invoiceId || null);
    if (invoiceId) loc.lifecycle = "waiting_payment";
    if (commitment.autoPay) loc.autoPay = true;

    const cid = customerId || state.selectedCustomer;
    const start = startDate || TODAY;
    let ct = contractForLoc(cid, loc.id);
    if (!ct) {
      ct = {
        id: nid("CON"), customerId: cid, locationId: loc.id, programId: commitment.programId,
        program: progBy(commitment.programId)?.name || commitment.programId,
        termMonths: commitment.termMonths, totalValue: commitment.totalValue,
        startDate: start, endDate: addMonths(start, commitment.termMonths),
        status: invoiceId ? "PENDING PAYMENT" : "DRAFT", paymentStatus: invoiceId ? "AWAITING PAYMENT" : null,
      };
      state.data.contracts.push(ct);
    } else {
      ct.programId = commitment.programId;
      ct.program = progBy(commitment.programId)?.name || ct.program;
      ct.termMonths = commitment.termMonths;
      ct.totalValue = commitment.totalValue;
      ct.startDate = start;
      ct.endDate = addMonths(start, commitment.termMonths);
      if (invoiceId && ct.status !== "ACTIVE") {
        ct.status = "PENDING PAYMENT";
        ct.paymentStatus = "AWAITING PAYMENT";
      }
    }
    loc.contractId = ct.id;

    let bp = planForContract(ct.id);
    if (!bp) {
      bp = {
        id: nid("BPL"), contractId: ct.id,
        frequency: commitment.billingFrequency === "monthly" ? "monthly" : "annual",
        installmentAmount: commitment.installmentAmount,
        installments: commitment.periods,
        autopay: !!commitment.autoPay,
        status: "ACTIVE",
      };
      state.data.billingPlans.push(bp);
    } else {
      bp.frequency = commitment.billingFrequency === "monthly" ? "monthly" : "annual";
      bp.installmentAmount = commitment.installmentAmount;
      bp.installments = commitment.periods;
      bp.autopay = !!commitment.autoPay;
    }

    let period = (state.data.billingPeriods || []).find((p) => p.contractId === ct.id && p.sequence === 1);
    const months = bp.frequency === "monthly" ? 1 : ct.termMonths;
    if (!period) {
      period = {
        id: nid("PER"), contractId: ct.id, sequence: 1,
        periodStart: start, periodEnd: addMonths(start, months),
        amount: bp.installmentAmount, status: invoiceId ? "DUE" : "UPCOMING", invoiceId: invoiceId || null,
      };
      state.data.billingPeriods.push(period);
    } else if (invoiceId) {
      period.invoiceId = invoiceId;
      period.status = "DUE";
      period.amount = bp.installmentAmount;
    }
    if (invoiceId) {
      const inv = (state.data.invoices || []).find((i) => i.id === invoiceId);
      if (inv) {
        inv.contractId = ct.id;
        inv.billingPeriodId = period.id;
        inv.amount = bp.installmentAmount;
      }
    }
    return { commitment, contract: ct, billingPlan: bp, period };
  }
  function generateNextBillingPeriod(customerId, locationId, opts) {
    const silent = !!(opts && opts.silent);
    const loc = locBy(customerId, locationId);
    const ct = contractForLoc(customerId, locationId);
    const bp = ct && planForContract(ct.id);
    if (!ct || !bp) {
      if (!silent) toast("No billing plan on this property.");
      return null;
    }
    if (bp.frequency !== "monthly") {
      if (!silent) toast("Only monthly plans generate the next billing period.");
      return null;
    }
    const count = periodsForContract(ct.id).length;
    if (count >= bp.installments) {
      if (!silent) toast("All billing periods for this contract are already generated.");
      return null;
    }
    const start = addMonths(ct.startDate, count);
    const period = {
      id: nid("PER"), contractId: ct.id, sequence: count + 1,
      periodStart: start, periodEnd: addMonths(ct.startDate, count + 1),
      amount: bp.installmentAmount, status: "DUE", invoiceId: null,
    };
    const inv = {
      id: nid("INV"), customerId, locationId, contractId: ct.id, billingPeriodId: period.id,
      amount: bp.installmentAmount, status: "sent", sent: TODAY, paidOn: null,
      kind: bp.autopay ? "autopay" : "recurring", periodN: count + 1,
      description: `${ct.program} — Billing Period ${count + 1}`,
    };
    period.invoiceId = inv.id;
    state.data.billingPeriods.push(period);
    state.data.invoices.push(inv);
    if (loc) loc.lifecycle = loc.lifecycle === "active" ? "active" : "waiting_payment";
    if (!silent) {
      toast(`Period ${count + 1} invoice ${inv.id} created (${money(inv.amount)}).`);
      render();
    }
    return inv;
  }

  function pushNotify(n) {
    if (!Array.isArray(state.data.notifications)) state.data.notifications = [];
    state.data.notifications.unshift({
      id: nid("N"),
      date: TODAY,
      read: false,
      severity: n.severity || "info",
      type: n.type || "INFO",
      title: n.title || "Notice",
      text: n.text || "",
      customerId: n.customerId || null,
      locationId: n.locationId || null,
      invoiceId: n.invoiceId || null,
    });
  }

  function unreadNotifications() {
    return (state.data.notifications || []).filter((n) => !n.read);
  }

  const TASK_ASSIGNEES = [
    { id: "owner", label: "Tom (Owner)" },
    { id: "ops", label: "Rick (Operations)" },
    { id: "admin", label: "Christy (Administration)" },
  ];

  function taskAssigneeLabel(id) {
    return TASK_ASSIGNEES.find((a) => a.id === id)?.label || id || "—";
  }

  function taskPriorityBadge(p) {
    if (p === "urgent") return `<span class="badge badge-bad">Urgent</span>`;
    if (p === "high") return `<span class="badge badge-warn">High</span>`;
    return `<span class="badge badge-mute">Normal</span>`;
  }

  function tasksForCustomer(cid) {
    return (state.data.tasks || [])
      .filter((t) => t.customerId === cid)
      .slice()
      .sort((a, b) => {
        if (a.status !== b.status) return a.status === "open" ? -1 : 1;
        return String(a.due || "").localeCompare(String(b.due || ""));
      });
  }

  function myOpenTasks() {
    const me = state.role;
    return (state.data.tasks || [])
      .filter((t) => t.status === "open" && t.assignee === me)
      .slice()
      .sort((a, b) => String(a.due || "").localeCompare(String(b.due || "")));
  }

  function openCreateTask(customerId, locationId) {
    if (!can("task.create")) {
      toast("Only Tom, Rick, or Christy can create tasks.");
      return;
    }
    const customers = (state.data.customers || []).filter((c) => c.status !== "lapsed");
    const selected = customerId || state.selectedCustomer || customers[0]?.id || "";
    const c = custBy(selected);
    const locs = c?.locations || [];
    const defaultAssignee = state.role === "admin" ? "ops" : state.role === "ops" ? "admin" : "admin";
    const locationLocked = !!locationId;
    const selectedLoc = locationId ? locs.find((l) => l.id === locationId) : null;
    state.modal = {
      html: `
        <h3>Create task</h3>
        ${locationLocked ? `
          <div class="task-location-context">
            <div><span>Bill-To</span><strong>${esc(c?.billTo || c?.name || selected)}</strong></div>
            <div><span>Location</span><strong>${esc(selectedLoc?.name || "Location")}</strong><small>${esc(selectedLoc?.address || "No address")}</small></div>
          </div>
          <input id="tk-cust" type="hidden" value="${esc(selected)}">
          <input id="tk-loc" type="hidden" value="${esc(locationId)}">
        ` : `
          <p>Assign work to Tom, Rick, or Christy.</p>
          <div class="field"><label>Customer (Bill-To)</label>
            <select id="tk-cust" data-act="task-cust-change">${customers.map((x) => `<option value="${x.id}" ${x.id === selected ? "selected" : ""}>${esc(x.billTo || x.name)} · ${esc(x.id)}</option>`).join("")}</select>
          </div>
          <div class="field"><label>Property (optional)</label>
            <select id="tk-loc"><option value="">Whole Bill-To</option>${locs.map((l) => `<option value="${l.id}">${esc(l.name)}</option>`).join("")}</select>
          </div>
        `}
        <div class="field"><label>Assign to</label>
          <select id="tk-assignee">${TASK_ASSIGNEES.map((a) => `<option value="${a.id}" ${a.id === defaultAssignee ? "selected" : ""}>${esc(a.label)}</option>`).join("")}</select>
        </div>
        <div class="field"><label>Title</label><input id="tk-title" placeholder="e.g. Call about declined AutoPay"></div>
        <div class="field"><label>Notes</label><textarea id="tk-notes" rows="3" placeholder="What they need to do"></textarea></div>
        <div class="field"><label>Due</label><input id="tk-due" type="date" value="${TODAY}"></div>
        <div class="field"><label>Priority</label>
          <select id="tk-priority"><option value="normal">Normal</option><option value="high">High</option><option value="urgent">Urgent</option></select>
        </div>
        <div class="actions">
          <button class="btn btn-ghost" data-act="close-modal">Cancel</button>
          <button class="btn btn-primary" data-act="save-task">Create task</button>
        </div>
      `,
    };
    render();
  }

  function refreshTaskLocOptions() {
    const cid = val("tk-cust");
    const c = custBy(cid);
    const sel = document.getElementById("tk-loc");
    if (!sel) return;
    const locs = c?.locations || [];
    sel.innerHTML = `<option value="">Whole Bill-To</option>${locs.map((l) => `<option value="${l.id}">${esc(l.name)}</option>`).join("")}`;
  }

  function saveTask() {
    if (!can("task.create")) return;
    const customerId = val("tk-cust");
    const title = (val("tk-title") || "").trim();
    if (!customerId || !title) {
      toast("Pick a customer and enter a title.");
      return;
    }
    const assignee = val("tk-assignee") || "admin";
    const task = {
      id: nid("TSK"),
      customerId,
      locationId: val("tk-loc") || null,
      title,
      notes: (val("tk-notes") || "").trim(),
      createdBy: state.role,
      assignee,
      due: val("tk-due") || TODAY,
      priority: val("tk-priority") || "normal",
      status: "open",
      createdAt: TODAY,
      completedAt: null,
    };
    if (!Array.isArray(state.data.tasks)) state.data.tasks = [];
    state.data.tasks.unshift(task);
    pushNotify({
      type: "TASK",
      severity: "info",
      title: `Task for ${taskAssigneeLabel(assignee)}`,
      text: `${title} · ${custBy(customerId)?.billTo || customerId} · due ${task.due}`,
      customerId,
      locationId: task.locationId,
    });
    state.modal = null;
    toast(`Task created for ${taskAssigneeLabel(assignee)}.`);
    render();
  }

  function completeTask(id) {
    if (!can("task.complete")) return;
    const t = (state.data.tasks || []).find((x) => x.id === id);
    if (!t) return;
    if (t.assignee !== state.role) {
      toast(`Only ${taskAssigneeLabel(t.assignee)} can mark this task done.`);
      return;
    }
    t.status = "done";
    t.completedAt = TODAY;
    toast("Task marked done.");
    render();
  }

  function reopenTask(id) {
    if (!can("task.complete")) return;
    const t = (state.data.tasks || []).find((x) => x.id === id);
    if (!t) return;
    if (t.assignee !== state.role) {
      toast(`Only ${taskAssigneeLabel(t.assignee)} can reopen this task.`);
      return;
    }
    t.status = "open";
    t.completedAt = null;
    toast("Task reopened.");
    render();
  }

  function canManageTaskRecord(t) {
    return !!(t && can("task.create") && (t.createdBy === state.role || state.role === "owner"));
  }

  function openEditTask(id) {
    const t = (state.data.tasks || []).find((x) => x.id === id);
    if (!canManageTaskRecord(t)) {
      toast("Only the task creator can edit this task.");
      return;
    }
    const c = custBy(t.customerId);
    const loc = t.locationId ? locBy(t.customerId, t.locationId) : null;
    state.modal = {
      html: `
        <h3>Edit task</h3>
        <div class="task-location-context">
          <div><span>Bill-To</span><strong>${esc(c?.billTo || c?.name || "—")}</strong></div>
          <div><span>Location</span><strong>${esc(loc?.name || "Whole Bill-To")}</strong>${loc ? `<small>${esc(loc.address || "No address")}</small>` : ""}</div>
        </div>
        <div class="field"><label>Assign to</label>
          <select id="et-assignee">${TASK_ASSIGNEES.map((a) => `<option value="${a.id}" ${a.id === t.assignee ? "selected" : ""}>${esc(a.label)}</option>`).join("")}</select>
        </div>
        <div class="field"><label>Title</label><input id="et-title" value="${esc(t.title || "")}"></div>
        <div class="field"><label>Notes</label><textarea id="et-notes" rows="3">${esc(t.notes || "")}</textarea></div>
        <div class="field"><label>Due</label><input id="et-due" type="date" value="${esc(t.due || TODAY)}"></div>
        <div class="field"><label>Priority</label>
          <select id="et-priority">
            <option value="normal" ${t.priority === "normal" ? "selected" : ""}>Normal</option>
            <option value="high" ${t.priority === "high" ? "selected" : ""}>High</option>
            <option value="urgent" ${t.priority === "urgent" ? "selected" : ""}>Urgent</option>
          </select>
        </div>
        <div class="actions">
          <button class="btn btn-ghost" data-act="close-modal">Cancel</button>
          <button class="btn btn-primary" data-act="save-task-edit" data-id="${t.id}">Save changes</button>
        </div>
      `,
    };
    render();
  }

  function saveTaskEdit(id) {
    const t = (state.data.tasks || []).find((x) => x.id === id);
    if (!canManageTaskRecord(t)) return;
    const title = (val("et-title") || "").trim();
    if (!title) {
      toast("Enter a task title.");
      return;
    }
    t.assignee = val("et-assignee") || t.assignee;
    t.title = title;
    t.notes = (val("et-notes") || "").trim();
    t.due = val("et-due") || TODAY;
    t.priority = val("et-priority") || "normal";
    state.modal = null;
    toast("Task updated.");
    render();
  }

  function openRemoveTask(id) {
    const t = (state.data.tasks || []).find((x) => x.id === id);
    if (!canManageTaskRecord(t)) {
      toast("Only the task creator can remove this task.");
      return;
    }
    state.modal = {
      html: `
        <h3>Remove task?</h3>
        <p><strong>${esc(t.title)}</strong> will be removed from this location.</p>
        <div class="actions">
          <button class="btn btn-ghost" data-act="close-modal">Cancel</button>
          <button class="btn btn-primary" data-act="confirm-remove-task" data-id="${t.id}">Remove task</button>
        </div>
      `,
    };
    render();
  }

  function removeTask(id) {
    const t = (state.data.tasks || []).find((x) => x.id === id);
    if (!canManageTaskRecord(t)) return;
    state.data.tasks = state.data.tasks.filter((x) => x.id !== id);
    state.modal = null;
    toast("Task removed.");
    render();
  }

  function taskRowActions(t) {
    if (!can("task.complete") || t.assignee !== state.role) return "";
    if (t.status === "open") {
      return `<button class="btn btn-sun" data-act="complete-task" data-id="${t.id}">Done</button>`;
    }
    return `<button class="btn btn-ghost" data-act="reopen-task" data-id="${t.id}">Reopen</button>`;
  }

  function taskListHtml(list, emptyMsg, options = {}) {
    if (!list.length) return `<p class="muted">${esc(emptyMsg || "No tasks.")}</p>`;
    return list.map((t) => {
      const c = custBy(t.customerId);
      const loc = t.locationId ? locBy(t.customerId, t.locationId) : null;
      const canManage = options.manage && canManageTaskRecord(t);
      const doneBadge = t.status === "done" ? `<span class="badge badge-ok">Done</span>` : `<span class="badge badge-sea">Open</span>`;
      return `<div class="fit-row ${t.status === "open" && (t.priority === "high" || t.priority === "urgent") ? "queue-new" : ""}">
        <div>
          ${doneBadge}
          ${taskPriorityBadge(t.priority)}
          <strong>${esc(t.title)}</strong>
          <div class="tiny">
            ${options.hideCustomer ? "" : `${c ? `<button class="btn btn-ghost linkish" data-act="open-customer" data-id="${c.id}">${esc(c.billTo || c.name)}</button>` : "—"}${loc ? ` · ${esc(loc.name)}` : ""} · `}
            Due ${esc(t.due || "—")} · To ${esc(taskAssigneeLabel(t.assignee))} · From ${esc(taskAssigneeLabel(t.createdBy))}
          </div>
          ${t.notes ? `<div class="tiny">${esc(t.notes)}</div>` : ""}
        </div>
        <div class="actions">
          ${!options.hideCustomer && c ? `<button class="btn btn-ghost" data-act="open-customer" data-id="${c.id}">Customer</button>` : ""}
          ${canManage ? `<button class="btn btn-ghost" data-act="edit-task" data-id="${t.id}">Edit</button><button class="btn btn-ghost" data-act="remove-task" data-id="${t.id}">Remove</button>` : ""}
          ${taskRowActions(t)}
        </div>
      </div>`;
    }).join("");
  }

  function clearAutopayException(customerId, locationId, invoiceId) {
    (state.data.autopayAuthorizations || []).forEach((a) => {
      if (a.status !== "FAILED") return;
      if (customerId && a.customerId !== customerId) return;
      if (locationId && a.locationId && a.locationId !== locationId) return;
      a.status = "CLEARED";
      a.clearedAt = TODAY;
      a.clearedInvoiceId = invoiceId || null;
    });
  }

  function locHasAutopay(c, l) {
    const ct = contractForLoc(c?.id, l?.id);
    const bp = ct && planForContract(ct.id);
    if (bp) return !!bp.autopay;
    return !!(l?.autoPay || c?.autoPay || locPlan(c, l).autoPay);
  }

  function openAutopayInvoice(c, l) {
    return locInvoices(c.id, l.id).find((i) => {
      const st = invoiceFinStatus(i);
      return st === "OPEN" || st === "PARTIAL" || st === "FAILED";
    }) || null;
  }

  /** AutoPay posts + allocates itself. Christy only intervenes on decline. */
  function runAutopayCharge(customerId, locationId, opts) {
    const succeed = !opts || opts.succeed !== false;
    const createIfMissing = !opts || opts.createIfMissing !== false;
    const c = custBy(customerId);
    const loc = locBy(customerId, locationId);
    const ct = contractForLoc(customerId, locationId);
    const bp = ct && planForContract(ct.id);
    if (!c || !loc || !ct || !bp) {
      toast("No AutoPay billing plan on this property.");
      return;
    }
    if (!bp.autopay) {
      toast("AutoPay is off for this billing plan.");
      return;
    }
    let inv = openAutopayInvoice(c, loc);
    if (!inv && createIfMissing && bp.frequency === "monthly") {
      inv = generateNextBillingPeriod(customerId, locationId, { silent: true });
    }
    if (!inv || invoiceFinStatus(inv) === "PAID") {
      toast("No open invoice for AutoPay to charge.");
      render();
      return;
    }

    const last4 = opts?.last4 || "4242";
    if (!succeed) {
      const failCode = opts?.failureCode || "CARD_DECLINED";
      state.data.payments.push({
        id: nid("P"), invoiceId: inv.id, customerId, locationId, amount: inv.amount,
        method: "Auto-pay", last4, source: "AUTOPAY", date: TODAY,
        memo: `AutoPay declined · ${failCode} · ${loc.name}`,
        invoiceMarked: false, failed: true, linkPay: true, status: "FAILED", posted: true,
      });
      state.data.autopayAuthorizations.push({
        id: nid("APA"), contractId: ct.id, customerId, locationId,
        status: "FAILED", method: "Credit Card", last4, failureCode: failCode, failedAt: `${TODAY}T12:00:00`,
      });
      loc.lifecycle = "past_due";
      c.failedPayment = true;
      c.status = "past_due";
      state.data.stops.filter((s) =>
        s.customerId === customerId && s.locationId === locationId
        && s.status === "scheduled" && !s.pending
      ).forEach((s) => { s.status = "blocked"; });
      pushNotify({
        type: "AUTOPAY_FAILED",
        severity: "alert",
        title: "AutoPay declined",
        text: `${c.billTo || c.name} · ${loc.name} · ${failCode} ····${last4}. Monthly plan — service already exists. Contact the customer. Rick can stop service if they will not pay.`,
        customerId, locationId, invoiceId: inv.id,
      });
      const hasOpsTask = (state.data.tasks || []).some((t) =>
        t.status === "open" && t.assignee === "ops" && t.customerId === customerId && t.locationId === locationId
      );
      if (!hasOpsTask) {
        state.data.tasks.push({
          id: nid("TSK"), customerId, locationId,
          title: `Hold / stop ${c.billTo || c.name} if unpaid`,
          notes: `AutoPay failed on ${inv.id}. Service is live — do not recreate. Call them, then stop service if they cannot pay.`,
          createdBy: "admin", assignee: "ops", due: TODAY, priority: "high", status: "open", createdAt: TODAY,
        });
      }
      state.data.comms.push({
        id: nid("CM"), customerId, who: "AutoPay", channel: "System", date: TODAY,
        text: `AutoPay FAILED on ${inv.id} (${failCode}). Route held. Rick may stop service if customer will not pay.`,
      });
      toast(`AutoPay declined on ${inv.id}. Route blocked — Rick can stop service.`);
      render();
      return;
    }

    const p = {
      id: nid("P"), invoiceId: inv.id, customerId, locationId, amount: invoiceBalance(inv) || inv.amount,
      method: "Auto-pay", last4, source: "AUTOPAY", date: TODAY,
      memo: `AutoPay charged · ${loc.name} · allocated automatically`,
      invoiceMarked: true, failed: false, linkPay: true, status: "POSTED", posted: true, appliedAuto: true,
    };
    state.data.payments.push(p);
    allocatePaymentToInvoice(p, inv, p.amount);
    clearAutopayException(customerId, locationId, inv.id);
    c.failedPayment = false;
    if (c.status === "past_due") syncCustomerLifecycle(c);

    let nextInv = null;
    if (bp.frequency === "monthly") {
      nextInv = generateNextBillingPeriod(customerId, locationId, { silent: true });
    }

    pushNotify({
      type: "AUTOPAY_PAID",
      severity: "ok",
      title: "AutoPay paid",
      text: `${c.billTo || c.name} · ${loc.name} · ${inv.id} paid ${money(p.amount)} automatically.`
        + (nextInv ? ` Next period invoice ${nextInv.id} created — no register mark needed.` : " No further periods to generate."),
      customerId, locationId, invoiceId: inv.id,
    });
    state.data.comms.push({
      id: nid("CM"), customerId, who: "AutoPay", channel: "System", date: TODAY,
      text: `AutoPay SUCCESS on ${inv.id} (${money(p.amount)}). Allocated automatically.`
        + (nextInv ? ` Generated ${nextInv.id} for the next period.` : ""),
    });
    toast(`AutoPay paid ${inv.id}${nextInv ? ` · next period ${nextInv.id}` : ""}. Christy does not mark the register.`);
    render();
  }

  function runOvernightAutopay() {
    if (!can("payment.post") && state.role !== "owner") {
      toast("Only Administration runs the AutoPay cycle.");
      return;
    }
    let charged = 0;
    let skipped = 0;
    (state.data.billingPlans || []).filter((bp) => bp.autopay && bp.status !== "INACTIVE").forEach((bp) => {
      const ct = (state.data.contracts || []).find((x) => x.id === bp.contractId);
      if (!ct || ct.status === "CANCELLED") return;
      const c = custBy(ct.customerId);
      const loc = locBy(ct.customerId, ct.locationId);
      if (!c || !loc) return;
      const failedOpen = (state.data.autopayAuthorizations || []).some((a) => a.contractId === ct.id && a.status === "FAILED");
      if (failedOpen) {
        skipped += 1;
        return;
      }
      const open = openAutopayInvoice(c, loc);
      if (!open) {
        skipped += 1;
        return;
      }
      // Charge existing due invoice only (createIfMissing false). Success path auto-creates the next period.
      runAutopayCharge(ct.customerId, ct.locationId, { succeed: true, last4: "1001", createIfMissing: false });
      charged += 1;
    });
    if (!charged) toast(skipped ? `Overnight AutoPay: nothing due (${skipped} plan(s) skipped / waiting / exception).` : "No AutoPay plans due.");
    else toast(`Overnight AutoPay finished · ${charged} automatic charge(s). See notifications.`);
  }
  function markLocationPeriodPaid(loc, inv) {
    if (!loc) return;
    loc.paid = true;
    loc.lifecycle = "active";
    if (!Array.isArray(loc.billingPeriods)) return;
    const bp = loc.billingPeriods.find((p) => p.invoiceId === inv?.id)
      || loc.billingPeriods.find((p) => p.status === "invoiced")
      || loc.billingPeriods[0];
    if (bp) {
      bp.status = "paid";
      if (inv?.id) bp.invoiceId = inv.id;
    }
  }
  function syncCustomerLifecycle(c) {
    if (!c || c.status === "lapsed" || c.status === "renewal") return;
    if (c.failedPayment) {
      c.status = "past_due";
      return;
    }
    const locs = (c.locations || []).filter((l) => l.covered !== false);
    if (!locs.length) return;
    if (locs.some((l) => l.lifecycle === "past_due")) {
      c.status = "past_due";
      return;
    }
    if (locs.some((l) => l.lifecycle === "waiting_payment")) {
      c.status = "waiting_payment";
      return;
    }
    if (locs.every((l) => l.lifecycle === "active" || locPaid(c, l))) {
      c.status = "active";
    }
  }
  function billingPlanLabel(loc) {
    const ct = loc?.contractId ? (state.data.contracts || []).find((x) => x.id === loc.contractId) : null;
    const bp = ct ? planForContract(ct.id) : null;
    if (bp) {
      if (bp.frequency === "monthly") return `${ct.program || "Monthly"} · ${money(bp.installmentAmount)} × ${bp.installments}`;
      return `${ct.program || "Upfront"} · ${money(bp.installmentAmount)} × 1`;
    }
    const cmt = loc?.commitment;
    if (!cmt) {
      const p = progBy(loc?.programId);
      return p ? p.name : "No billing plan";
    }
    if (cmt.billingFrequency === "monthly") {
      return `${progBy(cmt.programId)?.name || "Monthly"} · ${money(cmt.installmentAmount)} × ${cmt.periods}`;
    }
    return `${progBy(cmt.programId)?.name || "Upfront"} · ${money(cmt.installmentAmount)} × 1`;
  }
  function billingPeriodLabel(loc) {
    const ct = contractForLoc(null, loc?.id) || (loc?.contractId ? (state.data.contracts || []).find((x) => x.id === loc.contractId) : null);
    const top = ct ? periodsForContract(ct.id) : [];
    if (top.length) {
      const cur = top.find((p) => p.status === "DUE") || top.find((p) => p.status === "PAID") || top[0];
      const paidN = top.filter((p) => p.status === "PAID").length;
      return `Period ${cur.sequence} of ${top.length} · ${cur.status}${top.length > 1 ? ` · ${paidN}/${top.length} paid` : ""}`;
    }
    const periods = loc?.billingPeriods || [];
    if (!periods.length) return "";
    const cur = periods.find((p) => p.status === "invoiced") || periods.find((p) => p.status === "paid") || periods[0];
    const paidN = periods.filter((p) => p.status === "paid").length;
    return `Period ${cur.n} of ${periods.length} · ${cur.status}${periods.length > 1 ? ` · ${paidN}/${periods.length} paid` : ""}`;
  }
  function lifecycleBadge(lifecycle) {
    const map = {
      inquiry: ["badge-mute", "Inquiry"],
      quoted: ["badge-sea", "Quoted"],
      waiting_payment: ["badge-warn", "Waiting for payment"],
      active: ["badge-ok", "Active"],
      past_due: ["badge-bad", "Past due"],
    };
    const [cls, label] = map[lifecycle] || ["badge-mute", lifecycle || "—"];
    return `<span class="badge ${cls}">${esc(label)}</span>`;
  }
  function syncCustomerFromLocations(c) {
    if (!c) return;
    const locs = (c.locations || []).filter((l) => l.covered !== false);
    if (!locs.length) return;
    const plans = locs.map((l) => locPlan(c, l));
    const dates = plans.map((p) => p.expires).filter(Boolean).sort();
    if (dates[0]) c.expires = dates[0];
    c.amount = plans.reduce((a, p) => a + Number(p.amount || 0), 0);
    c.paid = locs.every((l) => locPaid(c, l));
    if (plans[0].programId) c.programId = plans[0].programId;
    if (plans[0].start) c.start = plans[0].start;
  }
  function markLocPaidFromInvoice(inv) {
    activateContractFromInvoice(inv);
  }
  function locNeedsInvoice(c, l) {
    if (!c || !l || l.covered === false) return false;
    return !locInvoices(c.id, l.id).length;
  }
  function canInvoiceLocation(c, l) {
    if (!c || !l || l.covered === false || locPaid(c, l)) return false;
    const invs = locInvoices(c.id, l.id);
    if (invs.some((i) => i.status === "paid" || i.status === "draft" || i.status === "sent" || i.status === "failed")) return false;
    return true;
  }
  function quotesForCustomer(cid) {
    return (state.data.quotes || []).filter((q) => q.customerId === cid);
  }
  function quoteCoversLoc(q, lid) {
    if (!q || !lid) return false;
    if (Array.isArray(q.locationIds) && q.locationIds.includes(lid)) return true;
    return q.locationId === lid;
  }
  function locQuote(cid, lid) {
    const list = quotesForCustomer(cid);
    return list.find((q) => q.sent && quoteCoversLoc(q, lid)) || list.find((q) => quoteCoversLoc(q, lid));
  }
  function locNeedsQuote(c, l) {
    if (!c || !l || l.covered === false) return false;
    // Already paid, invoiced, or plan chosen — no quote
    if (locPaid(c, l)) return false;
    if (locInvoices(c.id, l.id).length) return false;
    if (l.programId) return false;
    const q = locQuote(c.id, l.id);
    return !(q && q.sent);
  }
  function payNeedsMark(p) {
    if (!p || p.failed) return false;
    if (!p.invoiceId) return false;
    const inv = (state.data.invoices || []).find((i) => i.id === p.invoiceId);
    if (!inv) return false;
    if (invoiceFinStatus(inv) === "PAID") return false;
    return paymentAllocatedAmount(p.id) + 0.001 < Number(p.amount || 0);
  }
  function locPaymentAwaitingMark(c, l) {
    if (!c || !l) return null;
    return (state.data.payments || []).find((p) => {
      if (p.customerId !== c.id || !payNeedsMark(p)) return false;
      if (p.locationId === l.id) return true;
      if (!p.invoiceId) return false;
      const inv = (state.data.invoices || []).find((i) => i.id === p.invoiceId);
      return !!(inv && inv.locationId === l.id);
    }) || null;
  }
  function locInvoiceForMark(c, l, pay) {
    if (pay?.invoiceId) {
      const inv = (state.data.invoices || []).find((i) => i.id === pay.invoiceId);
      if (inv && inv.status !== "paid") return inv;
    }
    return locInvoices(c.id, l.id).find((i) => i.status === "sent" || i.status === "failed") || null;
  }
  function payIsLink(p) {
    return !!(p?.linkPay || p?.appliedAuto || ["portal", "website", "ach", "autopay"].includes(p?.source));
  }
  function quotePropertyLabel(q) {
    const ids = Array.isArray(q.locationIds) && q.locationIds.length
      ? q.locationIds
      : (q.locationId ? [q.locationId] : []);
    if (!ids.length) return "All properties";
    if (ids.length === 1) {
      const loc = locBy(q.customerId, ids[0]);
      return loc?.name || "1 property";
    }
    return `${ids.length} properties`;
  }
  function programOptions(selected) {
    return allPrograms().map((x) => `<option value="${x.id}" ${x.id === selected ? "selected" : ""}>${esc(x.name)}</option>`).join("");
  }
  function pct(v) { return parseFloat(String(v || "0")) || 0; }
  const FL_PLACES = [
    { k: ["deerfield"], x: 28, y: 42, place: "Deerfield Beach", zip: "33441" },
    { k: ["west palm", "northlake"], x: 38, y: 28, place: "West Palm Beach", zip: "33401" },
    { k: ["palm beach"], x: 36, y: 30, place: "Palm Beach", zip: "33480" },
    { k: ["fort lauderdale", "ft. lauderdale", "ft lauderdale", "lauderdale"], x: 32, y: 52, place: "Fort Lauderdale", zip: "33301" },
    { k: ["boca"], x: 29, y: 40, place: "Boca Raton", zip: "33432" },
    { k: ["tampa", "harbor oaks"], x: 12, y: 36, place: "Tampa", zip: "33602" },
    { k: ["naples"], x: 18, y: 72, place: "Naples", zip: "34102" },
    { k: ["miami"], x: 34, y: 68, place: "Miami", zip: "33101" },
    { k: ["orlando"], x: 28, y: 22, place: "Orlando", zip: "32801" },
    { k: ["jacksonville", "jax"], x: 36, y: 8, place: "Jacksonville", zip: "32202" },
    { k: ["sarasota"], x: 14, y: 48, place: "Sarasota", zip: "34236" },
    { k: ["hollywood"], x: 33, y: 58, place: "Hollywood", zip: "33019" },
    { k: ["pompano"], x: 31, y: 46, place: "Pompano Beach", zip: "33060" },
    { k: ["delray"], x: 30, y: 36, place: "Delray Beach", zip: "33444" },
  ];
  function pinFromAddress(addr, fallback) {
    const a = String(addr || "").toLowerCase();
    const hit = FL_PLACES.find((c) => c.k.some((k) => a.includes(k)));
    if (hit) return { x: hit.x + "%", y: hit.y + "%", place: hit.place, zip: hit.zip };
    if (fallback) return { x: fallback.x, y: fallback.y, place: fallback.place || "Florida", zip: fallback.zip || "" };
    return { x: "32%", y: "50%", place: addr ? "Florida" : "Type a city or drop a pin", zip: "" };
  }
  function placeFromPin(xPct, yPct) {
    let best = FL_PLACES[0];
    let bestD = Infinity;
    FL_PLACES.forEach((c) => {
      const d = (c.x - xPct) * (c.x - xPct) + (c.y - yPct) * (c.y - yPct);
      if (d < bestD) { bestD = d; best = c; }
    });
    return best;
  }
  function miniMapHtml({ existing = [], preview = [], caption, drag = false, mapId = "mini-map", title = "Map preview", showHomes = true, selectedLabel = "" } = {}) {
    const homes = showHomes ? TECHS.map((t) => `<div class="pin home-pin mini" style="left:${t.x};top:${t.y}" title="${esc(t.name)} home"><div class="pin-dot" style="background:${t.color}"></div></div>`) : [];
    const pinAction = (p) => p.action ? `data-act="${esc(p.action)}" data-id="${esc(p.customerId || "")}" data-loc="${esc(p.locationId || "")}" role="button" tabindex="0" aria-label="Select ${esc(p.label || "location")}"` : "";
    const old = existing.map((p) => `<div class="pin mini ${p.action ? "map-selectable-pin" : ""}" ${pinAction(p)} style="left:${p.x};top:${p.y}"><div class="pin-dot" style="background:${p.color || "#8a8680"}"></div><span>${esc(p.label || "")}</span></div>`);
    const next = preview.map((p) => `<div class="pin mini client ${p.elId || "preview"} ${p.elId === "mini-preview2" ? "ghost" : ""} ${p.action ? "map-selectable-pin is-selected" : ""}" id="${p.elId || "mini-preview"}" ${pinAction(p)} ${drag ? `data-drag-mini="1" data-x="${p.xId || "al-x"}" data-y="${p.yId || "al-y"}" data-fill-city="${p.fillCity || ""}" data-fill-street="${p.fillStreet || ""}" data-fill-zip="${p.fillZip || ""}" data-fill-lat="${p.fillLat || ""}" data-fill-lng="${p.fillLng || ""}" data-cap="${p.capId || "mini-cap"}"${p.keepLabel ? ' data-keep-label="1"' : ""}` : ""} style="left:${p.x};top:${p.y}"><div class="pin-dot"></div><span>${esc(p.label || "New location")}</span></div>`);
    const capId = preview[0]?.capId || "mini-cap";
    return `
      <div class="mini-map-box">
        <h3>${esc(title)}</h3>
        <div class="mini-map" id="${esc(mapId)}">
          <div class="map-bg"></div>
          <div class="map-label" style="left:6%;top:16%">Gulf</div>
          <div class="map-label" style="left:58%;top:16%">East</div>
          ${homes.join("")}
          ${old.join("")}
          ${next.join("")}
        </div>
        <p class="tiny map-location-caption" id="${esc(capId)}">${selectedLabel ? `<span class="badge badge-sea">Selected</span> <strong>${esc(selectedLabel)}</strong>${caption ? " · " : ""}` : ""}${esc(caption || (selectedLabel ? "" : "Type a city to move the pin. Drag or click the map to place it."))}</p>
      </div>`;
  }
  function distMiles(ax, ay, bx, by) {
    const dx = pct(ax) - pct(bx);
    const dy = pct(ay) - pct(by);
    return +(Math.sqrt(dx * dx + dy * dy) * 0.62).toFixed(1);
  }
  function patternDays(id) {
    const p = DAY_PATTERNS.find((x) => x.id === id);
    if (p) return p.days;
    if (DAYS.includes(id)) return [id];
    return String(id || "").split("/").map((d) => d.trim()).filter((d) => DAYS.includes(d));
  }
  function svcFor(cid, lid) {
    return svcsFor(cid, lid).find(svcIsContinuing) || svcsFor(cid, lid)[0];
  }
  function svcsFor(cid, lid) {
    return (state.data.services || []).filter((s) => s.customerId === cid && s.locationId === lid && s.status !== "cancelled");
  }
  function servicesForCustomer(cid) {
    return (state.data.services || [])
      .filter((s) => s.customerId === cid)
      .slice()
      .sort((a, b) => {
        const aLive = svcIsContinuing(a) ? 0 : 1;
        const bLive = svcIsContinuing(b) ? 0 : 1;
        if (aLive !== bLive) return aLive - bLive;
        return String(b.start || "").localeCompare(String(a.start || ""));
      });
  }
  function svcIsContinuing(s) {
    if (!s || s.status === "cancelled" || s.status === "ended" || s.cancelDate) return false;
    return ["live", "new", "active"].includes(s.status) || (!s.status && !s.cancelDate);
  }
  function svcStatusBadge(s) {
    if (!s) return "";
    if (s.status === "cancelled" || s.cancelDate) return `<span class="badge badge-bad">Cancelled</span>`;
    if (s.status === "ended") return `<span class="badge badge-mute">Ended</span>`;
    if (!s.techId) return `<span class="badge badge-warn">Needs trapper</span>`;
    if (s.status === "new") return `<span class="badge badge-sea">New</span>`;
    return `<span class="badge badge-ok">Continuing</span>`;
  }
  function canEditService() {
    return can("service.edit") || can("service.create") || can("schedule.reassign") || can("schedule.assign");
  }
  function svcTypeLabel(id) {
    const t = allServiceTypes().find((x) => x.id === id);
    return t ? `${t.code} · ${t.label}` : id || "Service";
  }
  function defaultServiceCode(c, l) {
    if (c.type === "hoa") return "hoa-2wk";
    if (c.type === "municipal") return "muni";
    if (c.type === "commercial") return "1mon-com";
    const pid = locPlan(c, l).programId;
    if (pid === "12pre" || pid === "12mo") return "12mon-res";
    if (pid === "6mo") return "6mon-res";
    if (pid === "3mo") return "3mon-res";
    return "1mon-res";
  }
  function fmtDur(min) {
    const n = Number(min) || 0;
    return `${String(Math.floor(n / 60)).padStart(2, "0")}:${String(n % 60).padStart(2, "0")}`;
  }
  function parseDur(s) {
    const m = String(s || "").match(/(\d+)\s*:\s*(\d+)/);
    if (m) return Number(m[1]) * 60 + Number(m[2]);
    const n = Number(s);
    return Number.isFinite(n) ? n : 10;
  }
  function checked(id) {
    return !!document.getElementById(id)?.checked;
  }
  function opsGenerateQueue() {
    return (state.data.services || []).filter((s) => s.techId && s.days && !s.generated && s.status !== "cancelled");
  }
  function locPinColor(c, l) {
    if (locNeedsTech(c, l) || locNeedsService(c, l)) return "#c4a24a";
    if (l.shared || svcsFor(c.id, l.id).length > 1) return "#8a8680";
    if (l.covered === false) return "#b8b0a4";
    const t = techBy(l.techId || svcsFor(c.id, l.id)[0]?.techId || c.techId);
    return t?.color || "#888";
  }
  function todayDay() {
    return "Thu";
  }
  function locOnDay(c, l, day) {
    if (!day) return true;
    if (locNeedsTech(c, l) || locNeedsService(c, l)) return true;
    if (state.data.stops.some((s) => s.customerId === c.id && s.locationId === l.id && s.day === day && !s.pending)) return true;
    const days = svcsFor(c.id, l.id).flatMap((s) => patternDays(s.days)).concat(patternDays(l.days || c.days));
    return days.includes(day);
  }
  function overnightPaid() {
    return state.data.payments.filter((p) => p.posted && !p.failed).slice(-4).reverse();
  }
  function locNeedsService(c, l) {
    if (!c || !l || c.status === "lapsed" || l.covered === false) return false;
    // Monthly installments keep the same live service — never re-queue setup
    if (svcsFor(c.id, l.id).some(svcIsContinuing)) return false;
    if (!(locPaid(c, l) || c.municipal)) return false;
    return !!(c.handedToOps || l.requestService);
  }
  function locNeedsTech(c, l) {
    const s = svcFor(c?.id, l?.id);
    return !!(s && !s.techId && svcIsContinuing(s));
  }
  function locIsMonthlyPlan(c, l) {
    if (!c || !l) return false;
    const plan = locPlan(c, l);
    if (plan.programId === "12mo" || plan.autoPay) return true;
    const ct = contractForLoc(c.id, l.id);
    const bp = ct && planForContract(ct.id);
    return bp?.frequency === "monthly";
  }
  function invoiceIsInstallment(inv) {
    if (!inv) return false;
    if (["autopay", "recurring", "installment"].includes(inv.kind)) return true;
    if (inv.periodN && inv.periodN > 1) return true;
    const ct = inv.contractId
      ? (state.data.contracts || []).find((x) => x.id === inv.contractId)
      : contractForLoc(inv.customerId, inv.locationId);
    const bp = ct && planForContract(ct.id);
    return bp?.frequency === "monthly";
  }
  function paymentIsMonthlyInstallment(p) {
    if (!p) return false;
    const inv = p.invoiceId ? (state.data.invoices || []).find((i) => i.id === p.invoiceId) : null;
    if (invoiceIsInstallment(inv)) return true;
    const c = p.customerId ? custBy(p.customerId) : null;
    const loc = p.locationId ? locBy(p.customerId, p.locationId) : c?.locations?.[0];
    return !!(c && loc && locIsMonthlyPlan(c, loc) && svcFor(c.id, loc.id));
  }
  function opsFailedMonthlyQueue() {
    const rows = [];
    const seen = new Set();
    state.data.customers.forEach((c) => {
      (c.locations || []).forEach((l) => {
        const svc = svcFor(c.id, l.id);
        if (!svc || !svcIsContinuing(svc)) return;
        const apaFail = (state.data.autopayAuthorizations || []).some((a) => a.status === "FAILED" && a.customerId === c.id && a.locationId === l.id);
        const payFail = (state.data.payments || []).some((p) => p.failed && p.customerId === c.id && p.locationId === l.id);
        if (!(c.failedPayment || apaFail || payFail || l.lifecycle === "past_due")) return;
        const key = `${c.id}:${l.id}`;
        if (seen.has(key)) return;
        seen.add(key);
        rows.push({ c, l, svc });
      });
    });
    return rows;
  }
  function opsServiceQueue() {
    const rows = [];
    state.data.customers.forEach((c) => {
      if (c.status === "lapsed") return;
      (c.locations || []).forEach((l) => {
        if (locNeedsService(c, l)) rows.push({ c, l, handedAt: l.requestedAt || c.handedAt || 0 });
      });
    });
    return rows.sort((a, b) => b.handedAt - a.handedAt);
  }
  function opsAssignQueue() {
    const rows = [];
    state.data.customers.forEach((c) => {
      if (c.status === "lapsed") return;
      (c.locations || []).forEach((l) => {
        if (locNeedsTech(c, l)) {
          rows.push({ c, l, handedAt: l.requestedAt || c.handedAt || 0 });
        }
      });
    });
    return rows.sort((a, b) => b.handedAt - a.handedAt);
  }
  function opsNewClients() {
    const seen = new Set();
    return opsAssignQueue().map((r) => r.c).filter((c) => {
      if (seen.has(c.id)) return false;
      seen.add(c.id);
      return true;
    });
  }
  function locSummary(c) {
    const n = c.locations?.length || 0;
    const a = c.locations?.[0]?.address || "—";
    return n > 1 ? `${a} · ${n} properties` : a;
  }
  function stopLabel(s) {
    const c = s.customerId ? custBy(s.customerId) : null;
    const loc = s.locationId ? locBy(s.customerId, s.locationId) : null;
    const name = c ? c.name : s.label || "One-off";
    if (c && c.locations.length > 1 && loc) return `${name} · ${loc.name}`;
    return name;
  }
  function nextSlot(techId, day) {
    const ss = state.data.stops
      .filter((s) => s.techId === techId && s.day === day && !s.pending)
      .slice()
      .sort((a, b) => String(a.time).localeCompare(String(b.time)));
    if (!ss.length) return "08:00";
    const [h, m] = ss[ss.length - 1].time.split(":").map(Number);
    const add = (ss[ss.length - 1].durationMin || 20) + 18;
    const tot = h * 60 + m + add;
    const hh = Math.min(16, Math.floor(tot / 60));
    const mm = tot % 60;
    return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
  }
  function timeToMin(t) {
    const [h, m] = String(t || "08:00").split(":").map(Number);
    return (h || 0) * 60 + (m || 0);
  }
  function minToTime(n) {
    const hh = Math.min(17, Math.max(7, Math.floor(n / 60)));
    const mm = Math.max(0, n % 60);
    return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
  }
  function stopCoords(s) {
    if (s.x != null && s.y != null) return { x: s.x, y: s.y };
    const loc = s.locationId ? locBy(s.customerId, s.locationId) : null;
    if (loc) return { x: loc.x, y: loc.y };
    const t = techBy(s.techId);
    return { x: t?.x || "50%", y: t?.y || "50%" };
  }
  function findInsertSlot(techId, day, durationMin) {
    const need = (Number(durationMin) || 25) + 15;
    const ss = state.data.stops
      .filter((s) => s.techId === techId && s.day === day && !s.pending)
      .slice()
      .sort((a, b) => String(a.time).localeCompare(String(b.time)));
    if (!ss.length) return { time: "09:00", gap: true, after: null, before: null, loadMin: 0 };
    for (let i = 0; i < ss.length - 1; i++) {
      const end = timeToMin(ss[i].time) + (ss[i].durationMin || 20);
      const next = timeToMin(ss[i + 1].time);
      if (next - end >= need) {
        return { time: minToTime(end + 5), gap: true, after: ss[i], before: ss[i + 1], loadMin: ss.reduce((a, s) => a + (s.durationMin || 0), 0) };
      }
    }
    const last = ss[ss.length - 1];
    const t = timeToMin(last.time) + (last.durationMin || 20) + 18;
    return {
      time: minToTime(t),
      gap: t <= 16 * 60,
      after: last,
      before: null,
      loadMin: ss.reduce((a, s) => a + (s.durationMin || 0), 0),
      late: t > 16 * 60,
    };
  }
  function oneoffRankTechs(x, y, day, durationMin) {
    return TECHS.map((t) => {
      const homeMiles = distMiles(x, y, t.x, t.y);
      const stops = state.data.stops
        .filter((s) => s.techId === t.id && s.day === day && !s.pending)
        .slice()
        .sort((a, b) => String(a.time).localeCompare(String(b.time)));
      let routeMiles = homeMiles;
      let nearStop = null;
      stops.forEach((s) => {
        const c = stopCoords(s);
        const m = distMiles(x, y, c.x, c.y);
        if (m < routeMiles) {
          routeMiles = m;
          nearStop = s;
        }
      });
      const slot = findInsertSlot(t.id, day, durationMin);
      const driveMin = Math.max(0, Math.round(routeMiles * 2.3));
      const loadMin = stops.reduce((a, s) => a + (s.durationMin || 0), 0);
      const heavy = loadMin >= 360;
      const conflict = slot.late || (loadMin + (Number(durationMin) || 25) > 420);
      return {
        t, homeMiles, routeMiles, driveMin, nearStop, stops, slot,
        loadMin, stopCount: stops.length, heavy, conflict,
        score: routeMiles + (conflict ? 20 : 0) + (heavy ? 8 : 0),
      };
    }).sort((a, b) => a.score - b.score || a.homeMiles - b.homeMiles);
  }

  function optimizerDates(startDate, endDate) {
    const start = startDate || DAY_DATES.Tue;
    const end = endDate || DAY_DATES.Wed;
    return Object.entries(DAY_DATES)
      .map(([day, date]) => ({ day, date }))
      .filter((x) => x.date >= start && x.date <= end)
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  function optimizerDriveMinutes(techId, stops) {
    const tech = techBy(techId);
    if (!tech || !stops.length) return 0;
    let prev = { x: tech.x, y: tech.y };
    let miles = 0;
    stops.forEach((s) => {
      const point = stopCoords(s);
      miles += distMiles(prev.x, prev.y, point.x, point.y);
      prev = point;
    });
    miles += distMiles(prev.x, prev.y, tech.x, tech.y);
    return Math.round(miles * 2.3);
  }

  function optimizerProduction(s) {
    if (!s?.customerId) return 0;
    const c = custBy(s.customerId);
    const loc = s.locationId ? locBy(s.customerId, s.locationId) : null;
    const plan = locPlan(c, loc);
    if (Number(plan.amount) > 0) return Number(plan.amount);
    const svc = s.locationId ? svcFor(s.customerId, s.locationId) : null;
    const type = svc ? allServiceTypes().find((t) => t.id === svc.type) : null;
    return Number(type?.price || c?.amount || 0);
  }

  function optimizerNearestOrder(techId, stops, anchorId) {
    if (!stops.length) return [];
    const tech = techBy(techId);
    const remaining = stops.slice();
    const ordered = [];
    let prev = { x: tech?.x || "50%", y: tech?.y || "50%" };
    if (anchorId) {
      const index = remaining.findIndex((s) => s.id === anchorId);
      if (index >= 0) {
        const [anchor] = remaining.splice(index, 1);
        ordered.push(anchor);
        prev = stopCoords(anchor);
      }
    }
    while (remaining.length) {
      let bestIndex = 0;
      let bestMiles = Infinity;
      remaining.forEach((s, i) => {
        const p = stopCoords(s);
        const miles = distMiles(prev.x, prev.y, p.x, p.y);
        if (miles < bestMiles) {
          bestMiles = miles;
          bestIndex = i;
        }
      });
      const [next] = remaining.splice(bestIndex, 1);
      ordered.push(next);
      prev = stopCoords(next);
    }
    return ordered;
  }

  function optimizerTimes(techId, stops) {
    const tech = techBy(techId);
    let prev = { x: tech?.x || "50%", y: tech?.y || "50%" };
    let cursor = 8 * 60;
    return stops.map((s) => {
      const p = stopCoords(s);
      const drive = Math.round(distMiles(prev.x, prev.y, p.x, p.y) * 2.3);
      const arrival = cursor + drive;
      cursor = arrival + Number(s.durationMin || 20);
      prev = p;
      return { id: s.id, time: minToTime(arrival) };
    });
  }

  function optimizerCapValue(config, key) {
    const n = Number(config?.limits?.[key]);
    return Number.isFinite(n) && n > 0 ? n : null;
  }

  function optimizerApplyCaps(techId, ordered, config) {
    const reachable = [];
    const unreachable = [];
    const maxJobs = optimizerCapValue(config, "maxJobs");
    const maxService = optimizerCapValue(config, "maxService");
    const maxWorkingInput = optimizerCapValue(config, "maxWorking");
    const maxDrive = optimizerCapValue(config, "maxDrive");
    const maxProduction = optimizerCapValue(config, "maxProduction");
    const leaveOpen = optimizerCapValue(config, "leaveOpen") || 0;
    const maxWorking = Math.min(maxWorkingInput || Infinity, Math.max(0, 600 - leaveOpen));
    ordered.forEach((s) => {
      const proposed = reachable.concat(s);
      const service = proposed.reduce((n, x) => n + Number(x.durationMin || 0), 0);
      const drive = optimizerDriveMinutes(techId, proposed);
      const working = service + drive;
      const production = proposed.reduce((n, x) => n + optimizerProduction(x), 0);
      const cannotFit =
        (maxJobs && proposed.length > maxJobs)
        || (maxService && service > maxService)
        || (Number.isFinite(maxWorking) && working > maxWorking)
        || (maxDrive && drive > maxDrive)
        || (maxProduction && production > maxProduction);
      (cannotFit ? unreachable : reachable).push(s);
    });
    const serviceMin = reachable.reduce((n, s) => n + Number(s.durationMin || 0), 0);
    const driveMin = optimizerDriveMinutes(techId, reachable);
    const production = reachable.reduce((n, s) => n + optimizerProduction(s), 0);
    const warnings = [];
    const minJobs = optimizerCapValue(config, "minJobs");
    const minProduction = optimizerCapValue(config, "minProduction");
    if (minJobs && reachable.length < minJobs) warnings.push(`Below minimum jobs (${reachable.length}/${minJobs})`);
    if (minProduction && production < minProduction) warnings.push(`Below minimum production (${money(production)}/${money(minProduction)})`);
    return {
      reachable,
      unreachable,
      serviceMin,
      driveMin,
      workingMin: serviceMin + driveMin,
      production,
      warnings,
    };
  }

  function optimizerIncrementalScore(techId, bucket, stop) {
    const before = optimizerDriveMinutes(techId, bucket);
    const after = optimizerDriveMinutes(techId, bucket.concat(stop));
    return after - before + bucket.reduce((n, s) => n + Number(s.durationMin || 0), 0) / 240;
  }

  function buildOptimizerPreview(config) {
    const dates = optimizerDates(config.startDate, config.endDate);
    const techIds = config.techId && config.techId !== "all" ? [config.techId] : TECHS.map((t) => t.id);
    const daySet = new Set(dates.map((d) => d.day));
    const techSet = new Set(techIds);
    const source = state.data.stops
      .filter((s) =>
        daySet.has(s.day)
        && techSet.has(s.techId)
        && !s.pending
        && s.status === "scheduled"
      )
      .slice();
    const originalById = Object.fromEntries(source.map((s) => [s.id, {
      techId: s.techId,
      day: s.day,
      time: s.time,
    }]));
    const buckets = {};
    dates.forEach(({ day, date }) => {
      techIds.forEach((techId) => {
        buckets[`${date}:${techId}`] = { date, day, techId, stops: [] };
      });
    });
    source.slice().sort((a, b) => String(a.time || "").localeCompare(String(b.time || ""))).forEach((s) => {
      const loc = s.locationId ? locBy(s.customerId, s.locationId) : null;
      const c = s.customerId ? custBy(s.customerId) : null;
      const shared = !!(c && loc && locIsShared(c, loc));
      const candidateDates = config.keepDate ? dates.filter((d) => d.day === s.day) : dates;
      const candidateTechs = (config.keepTech || shared) ? techIds.filter((id) => id === s.techId) : techIds;
      const candidates = [];
      candidateDates.forEach(({ date }) => candidateTechs.forEach((techId) => {
        const bucket = buckets[`${date}:${techId}`];
        if (bucket) candidates.push(bucket);
      }));
      const best = candidates.sort((a, b) =>
        optimizerIncrementalScore(a.techId, a.stops, s) - optimizerIncrementalScore(b.techId, b.stops, s)
        || a.stops.length - b.stops.length
      )[0];
      if (best) best.stops.push(s);
    });
    const originalGroups = {};
    source.forEach((s) => {
      const date = DAY_DATES[s.day];
      const key = `${date}:${s.techId}`;
      if (!originalGroups[key]) originalGroups[key] = [];
      originalGroups[key].push(s);
    });
    Object.values(originalGroups).forEach((list) => list.sort((a, b) => String(a.time || "").localeCompare(String(b.time || ""))));
    const routes = Object.values(buckets)
      .filter((b) => b.stops.length)
      .sort((a, b) => a.date.localeCompare(b.date) || techName(a.techId).localeCompare(techName(b.techId)))
      .map((bucket) => {
        const original = (originalGroups[`${bucket.date}:${bucket.techId}`] || []).slice();
        const anchorId = state.optimizerAnchors?.[`${bucket.date}:${bucket.techId}`] || null;
        const ordered = optimizerNearestOrder(bucket.techId, bucket.stops, anchorId);
        const capped = optimizerApplyCaps(bucket.techId, ordered, config);
        return {
          date: bucket.date,
          day: bucket.day,
          techId: bucket.techId,
          anchorId,
          originalStopIds: original.map((s) => s.id),
          optimized: optimizerTimes(bucket.techId, capped.reachable),
          unreachableIds: capped.unreachable.map((s) => s.id),
          beforeDrive: optimizerDriveMinutes(bucket.techId, original),
          afterDrive: capped.driveMin,
          serviceMin: capped.serviceMin,
          workingMin: capped.workingMin,
          production: capped.production,
          warnings: capped.warnings,
        };
      });
    const beforeDrive = Object.entries(originalGroups).reduce((sum, [key, list]) => {
      const techId = key.slice(key.lastIndexOf(":") + 1);
      return sum + optimizerDriveMinutes(techId, list);
    }, 0);
    const afterDrive = routes.reduce((n, r) => n + r.afterDrive, 0);
    const unreachable = routes.reduce((n, r) => n + r.unreachableIds.length, 0);
    return {
      id: nid("OPT"),
      config: { ...config, techIds },
      originalById,
      routes,
      stopCount: source.length,
      routeCount: routes.length,
      beforeDrive,
      afterDrive,
      unreachable,
      committed: false,
      createdAt: `${TODAY} ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
      createdBy: role()?.name || "Rick Torgerson",
    };
  }

  function expiryFrom(start, typeId) {
    const t = allServiceTypes().find((x) => x.id === typeId);
    if (!start || t == null || !t.months) return start || "";
    return addMonths(start, t.months);
  }
  function bestFitFor(c, loc, dayId) {
    loc = loc || c?.locations[0];
    if (!loc) return [];
    const days = patternDays(dayId || state.assignDays);
    return TECHS.map((t) => {
      const homeMiles = distMiles(loc.x, loc.y, t.x, t.y);
      let extraMiles = homeMiles;
      let extraMin = Math.max(7, Math.round(homeMiles * 2.3 + 5));
      let already = false;
      const route = days.flatMap((d) => {
        const stops = state.data.stops
          .filter((s) => s.techId === t.id && s.day === d && !s.pending)
          .sort((a, b) => String(a.time).localeCompare(String(b.time)));
        stops.forEach((s) => {
          const sl = s.locationId ? locBy(s.customerId, s.locationId) : null;
          const m = distMiles(loc.x, loc.y, sl?.x || t.x, sl?.y || t.y);
          if (m < extraMiles) {
            extraMiles = m;
            extraMin = Math.max(0, Math.round(m * 2.3));
            already = m < 0.5;
          }
        });
        return stops.map((s) => {
          const sl = s.locationId ? locBy(s.customerId, s.locationId) : null;
          return { day: d, time: s.time, name: stopLabel(s), x: sl?.x || t.x, y: sl?.y || t.y };
        });
      });
      return { t, miles: extraMiles, homeMiles, mins: extraMin, already, route };
    }).sort((a, b) => a.miles - b.miles || a.homeMiles - b.homeMiles);
  }
  function fitCardsHtml(ranked, picked, target) {
    const pick = picked || ranked[0]?.t.id;
    const tgt = target ? ` data-target="${esc(target)}"` : "";
    return ranked.map((r, i) => `
      <button class="bestfit-card ${r.t.id === pick ? "pick" : ""}" type="button" data-act="sv-pick-fit" data-tech="${r.t.id}"${tgt}>
        <strong>${i === 0 ? "Suggested · " : ""}${esc(r.t.name)}</strong> · ${esc(r.t.home)}
        <div class="tiny">${r.already ? "Already in this pocket · 0 extra min" : `${r.miles} mi extra · ~${r.mins} min drive from nearest stop`} · ${r.homeMiles} mi from home</div>
        ${r.route.length ? `<div class="tiny">${r.route.map((s) => `${s.day} ${s.time} ${s.name}`).join(" → ")}</div>` : `<div class="tiny">Open day on this pattern.</div>`}
      </button>
    `).join("");
  }
  function fillSetupDates() {
    const start = val("sv-start") || val("sv-idate");
    const exp = expiryFrom(start, val("sv-type"));
    const el = document.getElementById("sv-expires");
    const hid = document.getElementById("sv-renewal");
    if (el) el.value = exp;
    if (hid) hid.value = exp;
  }
  function applyServiceTypeDefaults() {
    const t = allServiceTypes().find((x) => x.id === val("sv-type"));
    if (!t) return;
    setInput("sv-dur", fmtDur(t.duration));
    setInput("sv-idur", fmtDur(t.duration));
    setInput("sv-price", Number(t.price || 0).toFixed(2));
    setInput("sv-iprice", Number(t.price || 0).toFixed(2));
    const desc = document.getElementById("sv-desc");
    if (desc) desc.value = t.desc || t.label;
    const freq = document.getElementById("sv-freq");
    if (freq) freq.value = t.freq || "WEEKLY";
    fillSetupDates();
  }
  function syncSetupLocFromPin(x, y) {
    const c = custBy(state.setupId);
    const locId = val("sv-loc") || state.setupLocId;
    const loc = c?.locations.find((l) => l.id === locId) || locBy(state.setupId, locId);
    if (!loc || !Number.isFinite(x) || !Number.isFinite(y)) return;
    loc.x = `${x.toFixed(1)}%`;
    loc.y = `${y.toFixed(1)}%`;
    const coords = latLngFromXy(x, y);
    loc.lat = coords.lat;
    loc.lng = coords.lng;
    loc.gps = `${coords.lat}, ${coords.lng}`;
  }

  function refreshSetupFit() {
    const c = custBy(state.setupId);
    const loc = c?.locations.find((l) => l.id === val("sv-loc")) || locBy(state.setupId, state.setupLocId);
    if (!c || !loc) return;
    const sched = SERVICE_SCHEDULES.find((s) => s.id === val("sv-sched")) || SERVICE_SCHEDULES[0];
    state.assignDays = sched.days;
    state.setupLocId = loc.id;
    const ranked = bestFitFor(c, loc, sched.days);
    const box = document.getElementById("sv-fit");
    if (box) {
      box.innerHTML = fitCardsHtml(
        ranked,
        val("sv-trapper") || val("sv-initial") || ranked[0]?.t.id,
        "standing"
      );
    }
    const pin = document.getElementById("sv-pin");
    if (pin && loc) {
      pin.style.left = loc.x;
      pin.style.top = loc.y;
      const span = pin.querySelector("span");
      if (span) span.textContent = loc.name;
    }
    setInput("sv-x", String(loc.x || "").replace("%", "") || "50");
    setInput("sv-y", String(loc.y || "").replace("%", "") || "50");
    if (loc.lat != null) setInput("sv-lat", loc.lat);
    if (loc.lng != null) setInput("sv-lng", loc.lng);
    const cap = document.getElementById("sv-map-cap");
    if (cap && loc) {
      const gps = loc.lat != null ? `${Number(loc.lat).toFixed(4)}, ${Number(loc.lng).toFixed(4)}` : (loc.gps || "");
      cap.textContent = `${loc.address}${gps ? " · " + gps : ""} · drag the pin to adjust`;
    }
  }
  function captureCreateServiceDraft() {
    if (state.page !== "create-service") return state.setupDraft || null;
    if (!document.getElementById("sv-type") && !document.getElementById("sv-loc")) return state.setupDraft || null;
    state.setupDraft = {
      loc: val("sv-loc") || state.setupLocId,
      type: val("sv-type"),
      desc: val("sv-desc"),
      qty: val("sv-qty"),
      price: val("sv-price"),
      // tax: checked("sv-tax"),
      createInitial: document.getElementById("sv-create-initial") ? checked("sv-create-initial") : true,
      idate: val("sv-idate"),
      freq: val("sv-freq"),
      itime: val("sv-itime"),
      ampm: val("sv-ampm"),
      idur: val("sv-idur"),
      iprice: val("sv-iprice"),
      initial: val("sv-initial"),
      sched: val("sv-sched"),
      dur: val("sv-dur"),
      start: val("sv-start"),
      expires: val("sv-expires"),
      target: val("sv-target"),
      trapper: val("sv-trapper"),
      notes: val("sv-notes"),
      notifyEmail: document.getElementById("sv-notify-email") ? checked("sv-notify-email") : true,
      notifyText: document.getElementById("sv-notify-text") ? checked("sv-notify-text") : true,
    };
    return state.setupDraft;
  }
  function pickSetupTrapper(techId, target) {
    captureCreateServiceDraft();
    if (!state.setupDraft) state.setupDraft = {};
    const which = target || state.bestFitTarget || "";
    if (which === "initial") state.setupDraft.initial = techId;
    else if (which === "standing") {
      state.setupDraft.trapper = techId;
      if (!state.setupDraft.initial) state.setupDraft.initial = techId;
    } else {
      state.setupDraft.initial = techId;
      state.setupDraft.trapper = techId;
    }
    state.modal = null;
    state.bestFitTarget = null;
    const t = techBy(techId);
    const label = which === "initial" ? "initial trapper" : which === "standing" ? "standing trapper" : "trapper";
    const msg = t ? `${t.name} · ${label}` : "Trapper selected";
    state.toast = msg;
    render();
    setTimeout(() => {
      if (state.toast === msg) {
        state.toast = null;
        render();
      }
    }, 2800);
  }
  function openSetupBestFit(target) {
    captureCreateServiceDraft();
    state.bestFitTarget = target || "standing";
    const c = custBy(state.setupId || state.selectedCustomer);
    const locId = state.setupDraft?.loc || val("sv-loc") || state.setupLocId;
    const loc = c?.locations.find((l) => l.id === locId) || locBy(state.setupId, state.setupLocId);
    if (!c || !loc) {
      toast("Pick a property first.");
      return;
    }
    const schedId = state.setupDraft?.sched || val("sv-sched");
    const sched = SERVICE_SCHEDULES.find((s) => s.id === schedId) || SERVICE_SCHEDULES[0];
    state.assignDays = sched?.days || state.assignDays;
    const ranked = bestFitFor(c, loc, sched?.days || state.assignDays);
    const current = state.bestFitTarget === "initial"
      ? (state.setupDraft?.initial || "")
      : (state.setupDraft?.trapper || "");
    const label = state.bestFitTarget === "initial" ? "Initial trapper" : "Standing trapper";
    state.modal = {
      html: `
        <h3>Best fit · ${esc(label)}</h3>
        <p>${esc(loc.name)} · ${esc(sched?.label || loc.days || "")}. Closest by extra miles and drive time — pick one.</p>
        <div class="bestfit" id="sv-fit">${fitCardsHtml(ranked, current || ranked[0]?.t.id, state.bestFitTarget)}</div>
        <div class="actions" style="margin-top:12px">
          <button class="btn btn-ghost" data-act="close-modal">Cancel</button>
        </div>
      `,
    };
    render();
  }
  function pushLiveStops(svc, c, loc) {
    const days = patternDays(svc.days);
    const initial = svc.initialTechId && svc.initialTechId !== svc.techId ? svc.initialTechId : null;
    days.forEach((d, i) => {
      const tech = i === 0 && initial ? initial : svc.techId;
      state.data.stops.push({
        id: nid("S"), customerId: c.id, locationId: loc.id,
        techId: tech, day: d, time: nextSlot(tech, d),
        durationMin: svc.durationMin, type: "service",
        status: "scheduled", actualMin: null, removals: null,
      });
    });
    svc.generated = true;
    svc.status = "live";
  }
  function handOffToOps(c) {
    c.handedToOps = true;
    c.handedAt = Date.now();
    c.createdBy = c.createdBy || state.role;
  }
  function money(n) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n || 0);
  }
  function money2(n) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n || 0);
  }
  function toast(msg) {
    // Don't re-read the form while a modal is open — that would wipe draft picks.
    if (!state.modal) {
      captureCreateServiceDraft();
      captureOneoffDraft();
    }
    state.toast = msg;
    render();
    setTimeout(() => {
      if (state.toast === msg) {
        state.toast = null;
        render();
      }
    }, 2800);
  }
  function nid(prefix) {
    state.data.seq += 1;
    return `${prefix}-${state.data.seq}`;
  }
  function persist() {
    if (window.IguanaStore) IguanaStore.save(state.data);
  }
  function persistSession() {
    if (window.IguanaStore) {
      IguanaStore.saveSession({
        role: state.role,
        page: state.page,
        selectedCustomer: state.selectedCustomer,
        selectedLocation: state.selectedLocation,
        inboundId: state.inboundId,
      });
    }
  }
  function allReasons() {
    return REASONS.concat(state.data.settings.extraReasons || []);
  }
  function pay() {
    return window.IguanaPay || {
      METHODS: [],
      sourceOf: (m) => (m === "Virtual card" ? "virtual" : m === "Auto-pay" ? "autopay" : "external"),
      isAuto: (m) => m === "Portal" || m === "Website" || m === "ACH",
      channel: (p) => p?.source || "external",
      channelLabel: (p) => p?.method || "Payment",
      optionsHtml: (sel) => `<option ${!sel || sel === "Check" ? "selected" : ""}>Check</option><option>Cash</option><option>Card</option><option>ACH</option><option>Virtual card</option>`,
    };
  }
  function canEditField(field) {
    if (!state.role || state.role === "tech" || state.role === "trapper") return false;
    if (field === "opsNote" && state.role === "sales") return false;
    if (["amount", "programId"].includes(field) && state.role === "ops") return false;
    return can("customer.edit") || state.role === "owner" || state.role === "admin" || state.role === "sales" || state.role === "ops";
  }
  function inline(kind, field, value, extra = "", type = "text") {
    const ro = !canEditField(field);
    const v = value == null ? "" : value;
    if (type === "textarea") {
      return `<textarea class="inline-edit" data-edit="${kind}" data-field="${field}" ${extra} rows="3" ${ro ? "disabled" : ""}>${esc(v)}</textarea>`;
    }
    return `<input class="inline-edit" type="${type}" data-edit="${kind}" data-field="${field}" ${extra} value="${esc(v)}" ${ro ? "disabled" : ""}>`;
  }
  function applyInlineEdit(el) {
    const kind = el.dataset.edit;
    const field = el.dataset.field;
    let value = el.type === "checkbox" ? el.checked : el.value;
    if (el.type === "number") value = value === "" ? "" : Number(value);
    if (kind === "customer") {
      const c = custBy(el.dataset.id);
      if (!c || !canEditField(field)) return;
      c[field] = value;
      if (field === "type") c.municipal = value === "municipal";
    } else if (kind === "invoice") {
      const inv = state.data.invoices.find((x) => x.id === el.dataset.id);
      if (!inv || !(can("invoice.send") || can("payment.post") || state.role === "owner")) return;
      inv[field] = value;
    } else if (kind === "quote") {
      const q = state.data.quotes.find((x) => x.id === el.dataset.id);
      if (!q || !can("quote.send") || q.sent) return;
      q[field] = value;
    } else if (kind === "payment") {
      const p = state.data.payments.find((x) => x.id === el.dataset.id);
      if (!p || !can("payment.post")) return;
      p[field] = value;
    } else if (kind === "mto") {
      const m = state.data.mtos.find((x) => x.id === el.dataset.id);
      if (!m || !can("mto.reply")) return;
      m[field] = value;
    } else if (kind === "location") {
      const loc = locBy(el.dataset.cid, el.dataset.lid);
      if (!loc || !canEditField(field)) return;
      loc[field] = value;
      if (field === "programId") {
        const p = progBy(value);
        if (p) loc.amount = programAmount(p);
      }
      if (field === "address") {
        const pos = pinFromAddress(value, { x: loc.x, y: loc.y });
        loc.x = pos.x;
        loc.y = pos.y;
      }
      const cust = custBy(el.dataset.cid);
      if (cust) syncCustomerFromLocations(cust);
    } else if (kind === "user") {
      const u = state.data.users.find((x) => x.id === el.dataset.id);
      if (u && can("users.manage")) u[field] = value;
    } else if (kind === "settings") {
      if (!(can("settings.edit") || state.role === "owner")) return;
      state.data.settings[field] = (field === "commissionPct" || field === "renewalWindow") ? Number(value) : value;
    } else if (kind === "template") {
      if (!state.data.templates) state.data.templates = {};
      state.data.templates[field] = value;
    } else if (kind === "integration") {
      if (!state.data.integrations) state.data.integrations = {};
      state.data.integrations[field] = value;
    }
    persist();
  }
  function mailWaiting() {
    return (state.data.mail || []).filter((m) => !m.posted);
  }
  function payerLooksLike(payer, customerName) {
    const a = String(payer || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    return String(customerName || "").toLowerCase().split(/\s+/).some((p) => p.length > 2 && a.includes(p.replace(/[^a-z0-9]/g, "")));
  }
  function activateContractFromInvoice(inv) {
    if (!inv) return;
    const ct = inv.contractId
      ? (state.data.contracts || []).find((x) => x.id === inv.contractId)
      : contractForLoc(inv.customerId, inv.locationId);
    if (ct) {
      ct.status = "ACTIVE";
      ct.paymentStatus = "PAID";
    }
    const period = (state.data.billingPeriods || []).find((p) => p.invoiceId === inv.id);
    if (period) period.status = "PAID";
    const c = custBy(inv.customerId);
    const loc = inv.locationId ? locBy(inv.customerId, inv.locationId) : null;
    if (loc) {
      loc.paid = true;
      loc.lifecycle = "active";
      loc.contractId = ct?.id || loc.contractId;
    }
    const existingSvc = loc ? svcFor(inv.customerId, loc.id) : null;
    const installment = invoiceIsInstallment(inv) || (existingSvc && locIsMonthlyPlan(c, loc));
    if (c) {
      c.failedPayment = false;
      syncCustomerFromLocations(c);
      syncCustomerLifecycle(c);
      // First payment only — monthly installments keep the same service / trapper
      if (!existingSvc) {
        handOffToOps(c);
        if (loc && !loc.requestService) {
          loc.requestService = true;
          loc.requestedAt = Date.now();
        }
      } else if (loc) {
        loc.requestService = false;
      }
    }
    if (installment && existingSvc) {
      pushNotify({
        type: "MONTHLY_PAID",
        severity: "ok",
        title: "Monthly installment paid",
        text: `${c?.billTo || c?.name || ""} · ${loc?.name || ""} · ${inv.id}. Service already live — no new setup or trapper assign.`,
        customerId: inv.customerId, locationId: inv.locationId, invoiceId: inv.id,
      });
    }
    state.data.stops.filter((s) => s.customerId === inv.customerId && (!inv.locationId || s.locationId === inv.locationId) && s.status === "blocked").forEach((s) => { s.status = "scheduled"; });
  }
  function allocatePaymentToInvoice(payment, inv, amount) {
    if (!payment || !inv) return false;
    const amt = Math.min(Number(amount || payment.amount || 0), invoiceBalance(inv) || Number(inv.amount || 0));
    if (amt <= 0 && invoiceFinStatus(inv) === "PAID") return true;
    if (amt <= 0) return false;
    state.data.paymentAllocations.push({
      id: nid("ALLOC"), paymentId: payment.id, invoiceId: inv.id, amount: amt,
    });
    payment.invoiceMarked = true;
    payment.posted = true;
    payment.status = "POSTED";
    payment.invoiceId = inv.id;
    if (invoiceFinStatus(inv) === "PAID") {
      inv.paidOn = TODAY;
      activateContractFromInvoice(inv);
      const hadFail = (state.data.autopayAuthorizations || []).some((a) => a.status === "FAILED" && a.customerId === inv.customerId && (!a.locationId || a.locationId === inv.locationId));
      clearAutopayException(inv.customerId, inv.locationId, inv.id);
      if (hadFail) {
        const c = custBy(inv.customerId);
        const loc = inv.locationId ? locBy(inv.customerId, inv.locationId) : null;
        const bp = inv.contractId ? planForContract(inv.contractId) : null;
        pushNotify({
          type: "AUTOPAY_RECOVERED",
          severity: "ok",
          title: "External payment recovered AutoPay fail",
          text: `${c?.billTo || c?.name || ""} · ${loc?.name || ""} · ${inv.id} allocated.`
            + (bp?.frequency === "monthly" ? " Generate the next billing period manually — AutoPay will not until the exception is clear." : ""),
          customerId: inv.customerId, locationId: inv.locationId, invoiceId: inv.id,
        });
      }
    }
    return true;
  }
  function applyInvoicePayment(inv, method, memo, checkNo, amountOverride) {
    if (!can("payment.post") || !inv) return false;
    if (invoiceFinStatus(inv) === "PAID") return false;
    const src = pay().sourceOf(method);
    const bal = invoiceBalance(inv) || Number(inv.amount || 0);
    const payAmt = amountOverride != null ? Number(amountOverride) : bal;
    let existing = (state.data.payments || []).find((p) =>
      !p.failed && (p.id === state.payFocusId || p.invoiceId === inv.id) && payNeedsMark(p)
    );
    if (!existing) {
      existing = {
        id: nid("P"), invoiceId: inv.id, customerId: inv.customerId, locationId: inv.locationId || null,
        amount: payAmt, method, date: TODAY, checkNo: checkNo || "", last4: String(checkNo || "").slice(-4),
        source: src === "check" || src === "zelle" || src === "wire" ? "EXTERNAL" : (src === "autopay" ? "AUTOPAY" : "ONLINE"),
        linkPay: pay().isAuto(method), invoiceMarked: false, posted: true, status: "POSTED",
        memo: memo || `${method}${checkNo ? " #" + checkNo : ""} · posted to ${inv.id}`,
      };
      state.data.payments.push(existing);
    } else {
      if (method) existing.method = method;
      if (checkNo) {
        existing.checkNo = checkNo;
        existing.last4 = String(checkNo).slice(-4);
      }
      if (memo) existing.memo = memo;
      existing.source = existing.source || src;
    }
    const ok = allocatePaymentToInvoice(existing, inv, Math.min(payAmt, existing.amount || payAmt));
    state.payFocusId = null;
    if (ok) {
      state.data.comms.push({
        id: nid("CM"), customerId: inv.customerId, who: role().name, channel: "Office", date: TODAY,
        text: `Payment allocated to ${inv.id} (${method}${checkNo ? " #" + checkNo : ""}). Balance ${money(invoiceBalance(inv))}. ${invoiceFinStatus(inv) === "PAID" ? "Contract active — Rick can create service." : "Partial — Ops still blocked."}`,
      });
    }
    return ok;
  }
  function eligibleToSchedule(c) {
    if (!c) return false;
    if (c.municipal) return true;
    if (c.status === "lapsed" || c.status === "inquiry") return false;
    return (c.locations || []).some((l) => locPaid(c, l));
  }
  function statusBadge(status) {
    const map = {
      active: ["badge-ok", "Active"],
      renewal: ["badge-warn", "Renewal window"],
      past_due: ["badge-bad", "Past due"],
      inquiry: ["badge-sea", "Inquiry"],
      waiting_payment: ["badge-warn", "Waiting for payment"],
      lapsed: ["badge-mute", "Non-renewed"],
      paid: ["badge-ok", "Paid"],
      draft: ["badge-mute", "Draft"],
      failed: ["badge-bad", "Failed"],
      scheduled: ["badge-sea", "Scheduled"],
      in_progress: ["badge-sea", "In progress"],
      complete: ["badge-ok", "Complete"],
      missed: ["badge-bad", "Missed"],
      noshow: ["badge-warn", "No-show"],
      blocked: ["badge-bad", "Held — unpaid"],
      blocked_off: ["badge-mute", "Company day off"],
      pending: ["badge-warn", "Unassigned"],
      sent: ["badge-sea", "Sent"],
      OPEN: ["badge-warn", "Open"],
      PARTIAL: ["badge-warn", "Partial"],
      PAID: ["badge-ok", "Paid"],
      "PENDING PAYMENT": ["badge-warn", "Pending payment"],
      ACTIVE: ["badge-ok", "Active"],
      FAILED: ["badge-bad", "Failed"],
      DRAFT: ["badge-mute", "Draft"],
      unassigned_done: ["badge-warn", "Waiting to drop"],
      not_covered: ["badge-mute", "Not covered"],
    };
    const [cls, label] = map[status] || ["badge-mute", status];
    return `<span class="badge ${cls}">${esc(label)}</span>`;
  }

  function captureUiScroll() {
    const out = {};
    document.querySelectorAll("[data-keep-scroll]").forEach((el) => {
      const key = el.getAttribute("data-keep-scroll");
      if (key) out[key] = el.scrollTop;
    });
    return out;
  }

  function restoreUiScroll(pos) {
    if (!pos) return;
    const apply = () => {
      Object.keys(pos).forEach((key) => {
        const el = document.querySelector(`[data-keep-scroll="${key}"]`);
        if (el) el.scrollTop = pos[key];
      });
    };
    apply();
    requestAnimationFrame(() => {
      apply();
      requestAnimationFrame(apply);
    });
  }

  function renderPageKey() {
    if (state.payView) return "pay";
    if (!state.role) return "login";
    if (state.role === "tech") return "tech:" + (state.mobileStop || state.page || "");
    return String(state.page || "dashboard");
  }

  function render() {
    ensureData();
    if (state.role && !ROLES[state.role]) state.role = null;
    if (state.role && state.role !== "tech" && !canPage(state.page) && !isRecordPage(state.page)) state.page = "dashboard";
    const pageKey = renderPageKey();
    const samePage = state._pageKey === pageKey;
    const scroll = samePage ? captureUiScroll() : null;
    if (document.activeElement && $app.contains(document.activeElement)) {
      try { document.activeElement.blur(); } catch (_) { /* ignore */ }
    }
    try {
      if (state.payView) {
        $app.innerHTML = renderPublicPay() + renderToast();
      } else if (!state.role) {
        $app.innerHTML = renderLogin();
      } else if (state.role === "tech") {
        $app.innerHTML = renderMobile() + renderModal() + renderToast();
      } else {
        $app.innerHTML = renderShell() + renderModal() + renderToast();
      }
    } catch (err) {
      console.error(err);
      $app.innerHTML = `<div class="login-main" style="padding:40px"><h2>Could not open this screen</h2><p class="lede">${esc(err && err.message)}</p><div class="who-switch">${peopleButtons()}</div></div>`;
    }
    bind();
    if (samePage) restoreUiScroll(scroll);
    state._pageKey = pageKey;
    persist();
    persistSession();
  }

  function peopleButtons() {
    return Object.values(ROLES).map((x) =>
      `<button type="button" class="who-btn ${x.id === state.role ? "on" : ""}" data-act="enter" data-who="${x.id}">${esc(x.name)}</button>`
    ).join("");
  }

  function renderLogin() {
    const cards = Object.values(ROLES).map((r) => `
      <button class="role-card" type="button" data-act="enter" data-who="${r.id}">
        <div class="who">
          <div class="avatar" style="background:${r.color}">${r.initials}</div>
          <div>
            <h3>${esc(r.name)}</h3>
            <div class="title">${esc(r.title)}</div>
          </div>
        </div>
        <div class="access">${esc(r.access)}</div>
        <div class="chips">${r.chips.map((c) => `<span class="chip on">${esc(c)}</span>`).join("")}</div>
      </button>
    `).join("");
    return `
      <div class="login">
        <aside class="login-brand">
          <div>
            <div class="mark">
              <div class="mark-badge">IC</div>
              <span>Iguana Control</span>
            </div>
            <h1>Iguana Control</h1>
            <p class="login-brand-copy">Customers, routes, payments, renewals — the same book we use every day.</p>
          </div>
          <div class="login-meta">Office + field</div>
        </aside>
        <main class="login-main">
          <div class="demo-flag">Click a person to enter — no password</div>
          <h2>Who is signing in?</h2>
          <div class="who-switch" style="margin:12px 0 18px">${peopleButtons()}</div>
          <p class="lede">Click <strong>Christy</strong> for Administration. You can switch people any time from the names in the top bar.</p>
          <div class="role-grid">${cards}</div>
          <p class="login-roles-note">Owner can read and edit. Ops cannot post payments. Admin cannot schedule.</p>
          <p class="login-roles-note"><button class="btn btn-ghost" data-act="open-pay">Preview public payment page</button> (invoice link, website, or ACH — names stay on the register)</p>
          <p class="login-roles-note"><button class="btn btn-ghost" data-act="reset-demo">Reset saved demo data</button></p>
        </main>
      </div>
    `;
  }

  function navForRole() {
    return NAV.filter((n) => (n.roles || []).includes(state.role));
  }

  function navGroupsForRole() {
    const by = {};
    navForRole().forEach((n) => {
      if (!by[n.group]) by[n.group] = [];
      by[n.group].push(n);
    });
    return NAV_GROUP_ORDER.filter((g) => by[g]?.length).map((label) => ({ label, items: by[label] }));
  }

  function navGroupKey(label) {
    return String(label || "").toLowerCase().replace(/\s+/g, "-");
  }

  function isNavGroupOpen(label, hasActive) {
    if (!state.navOpen || typeof state.navOpen !== "object") state.navOpen = {};
    const key = navGroupKey(label);
    if (Object.prototype.hasOwnProperty.call(state.navOpen, key)) return !!state.navOpen[key];
    // Default: keep the active section open; Home stays open
    return hasActive || label === "Home";
  }

  function ensureNavGroupOpenForPage(pageId) {
    const item = NAV.find((n) => n.id === pageId);
    if (!item) return;
    if (!state.navOpen || typeof state.navOpen !== "object") state.navOpen = {};
    state.navOpen[navGroupKey(item.group)] = true;
  }

  function toggleNavGroup(label) {
    if (!label) return;
    if (!state.navOpen || typeof state.navOpen !== "object") state.navOpen = {};
    const key = navGroupKey(label);
    const groups = navGroupsForRole();
    const g = groups.find((x) => x.label === label);
    const hasActive = !!(g && g.items.some((n) => n.id === state.page));
    const open = isNavGroupOpen(label, hasActive);
    state.navOpen[key] = !open;
    render();
  }

  function renderShell() {
    const r = role();
    if (!r) {
      return renderLogin();
    }
    const groups = navGroupsForRole();
    const nav = groups.map((g) => {
      const hasActive = g.items.some((n) => n.id === state.page);
      const open = isNavGroupOpen(g.label, hasActive);
      return `
      <div class="nav-group ${open ? "open" : ""} ${hasActive ? "has-active" : ""}">
        <button type="button" class="nav-group-toggle" data-act="nav-toggle" data-group="${esc(g.label)}" aria-expanded="${open ? "true" : "false"}">
          <span class="nav-group-title">${esc(g.label)}</span>
          <span class="nav-group-meta">${g.items.length}</span>
          <span class="nav-chevron" aria-hidden="true"></span>
        </button>
        <div class="nav-group-body" ${open ? "" : "hidden"}>
          ${g.items.map((n) => `
            <button class="nav-btn ${state.page === n.id ? "active" : ""}" data-act="nav" data-page="${n.id}">
              ${ICONS[n.icon] || ""} ${esc(n.label)}
            </button>
          `).join("")}
        </div>
      </div>`;
    }).join("");
    return `
      <div class="shell">
        <aside class="sidebar" data-keep-scroll="sidebar">
          <div class="mark">
            <div class="mark-badge">IC</div>
            <span>Iguana Control</span>
          </div>
          <nav class="sidebar-nav">${nav}</nav>
          <div class="sidebar-foot">Role-gated demo · BRD §5</div>
        </aside>
        <div class="main">
          <header class="topbar">
            <div>
              <div class="crumb">${pageTitle()}</div>
            </div>
            <div class="top-actions">
              <select class="mobile-nav" data-act="nav-select">${navForRole().map((n) => `<option value="${n.id}" ${n.id === state.page ? "selected" : ""}>${esc(n.group)} · ${esc(n.label)}</option>`).join("")}</select>
              <div class="who-switch" title="Switch person">${peopleButtons()}</div>
              <button class="btn btn-ghost" data-act="logout">Sign out</button>
            </div>
          </header>
          <div class="content${state.page === "map" ? " content-map" : ""}" data-keep-scroll="content">${safePageBody()}</div>
        </div>
      </div>
    `;
  }

  function pageTitle() {
    if (state.page === "add-customer") return "Add customer";
    if (state.page === "create-service") return "Service setup";
    if (state.page === "create-oneoff") return "Live call-in";
    if (state.page === "location" && state.selectedCustomer && state.selectedLocation) return locBy(state.selectedCustomer, state.selectedLocation)?.name || "Location";
    if (state.page === "customer" && state.selectedCustomer) return custBy(state.selectedCustomer)?.name || "Customer";
    if (state.page === "assign" && state.assignId) return "Assign · " + (custBy(state.assignId)?.name || "technician");
    return NAV.find((n) => n.id === state.page)?.label || "Dashboard";
  }

  function safePageBody() {
    try {
      return pageBody();
    } catch (err) {
      console.error(err);
      return `<div class="notice locked">This page failed to open (${esc(err && err.message)}). Click <strong>Christy</strong> in the top bar, then Dashboard.</div>`;
    }
  }

  function pageBody() {
    if (state.page === "add-customer") return viewAddCustomer();
    if (state.page === "create-service") return viewCreateService();
    if (state.page === "create-oneoff") return viewCreateOneoff();
    if (state.page === "location") return viewLocation();
    if (state.page === "customer") return viewCustomerAccount();
    if (!role()) return renderLogin();
    if (!canPage(state.page) && !isRecordPage(state.page)) {
      return `<div class="forbidden"><h2>Your login doesn’t include this screen</h2><p>${esc(role().name)} doesn’t have ${esc(state.page)}. Switch people from the top bar, or go home.</p><button class="btn btn-primary" data-act="nav" data-page="dashboard">Dashboard</button></div>`;
    }
    const views = {
      dashboard: viewDashboard,
      customers: viewCustomers,
      locations: viewLocations,
      quotes: viewQuotes,
      schedule: viewSchedule,
      optimizer: viewOptimizer,
      map: viewMap,
      trappers: viewTrappers,
      assign: viewAssign,
      oneoffs: viewOneoffs,
      noshows: viewNoshows,
      duration: viewDuration,
      removals: viewRemovals,
      workload: viewWorkload,
      invoices: viewInvoices,
      payments: viewPayments,
      renewals: viewRenewals,
      commission: viewCommission,
      documents: viewDocuments,
      comms: viewComms,
      mtos: viewMtos,
      tasks: viewTasks,
      traps: viewTraps,
      reports: viewReports,
      users: viewUsers,
      lists: viewLists,
      templates: viewTemplates,
      settings: viewSettings,
      integrations: viewIntegrations,
    };
    return (views[state.page] || viewDashboard)();
  }

  function writeBar(action, label, extra = "") {
    if (can(action)) return extra;
    return `<div class="notice locked">${esc(role().title)} can’t do that here. “${esc(label)}” is for ${actionOwner(action)}.</div>`;
  }
  function actionOwner(action) {
    const ids = WRITE[action] || [];
    return ids.map((id) => ROLES[id]?.title || id).filter(Boolean).join(" / ") || "authorized";
  }
  function btn(action, label, act, data = "", cls = "btn-primary") {
    const ok = can(action);
    return `<button class="btn ${cls}" ${ok ? "" : "disabled"} data-act="${act}" ${data}>${esc(label)}</button>`;
  }

  /* ---------- Dashboards ---------- */
  function viewDashboard() {
    if (state.role === "owner") return dashOwner();
    if (state.role === "ops") return dashOps();
    if (state.role === "admin") {
      try { return dashAdmin(); } catch (err) {
        console.error(err);
        return `<div class="notice locked">Admin dashboard hit an error (${esc(err.message)}). Click <strong>Christy</strong> in the top bar and try again.</div>`;
      }
    }
    if (state.role === "sales") return dashSales();
    if (state.role === "sysadmin") return dashSys();
    return "";
  }

  function dashOwner() {
    const expiring = state.data.customers.filter((c) => c.status === "renewal" || (c.expires && daysUntil(c.expires) <= 60 && c.status === "active"));
    const failed = state.data.payments.filter((p) => p.failed);
    const paidToday = state.data.payments.filter((p) => p.date === TODAY && !p.failed && p.posted);
    const outliers = durationRows().filter((r) => r.delta < -8);
    const mine = myOpenTasks();
    const mtos = (state.data.mtos || []).filter((m) => !m.read);
    const modules = [
      ["Customers", "customers", "Bill-Tos and properties"],
      ["Quotes", "quotes", "Sent quotes"],
      ["Schedule", "schedule", "Weekly board"],
      ["Map & routing", "map", "Trappers and stops"],
      ["One-off jobs", "oneoffs", "Live call-ins"],
      ["Trap assets", "traps", "Field inventory"],
      ["No-shows", "noshows", "Missed stops"],
      ["Route workload", "workload", "Load by trapper"],
      ["Payment register", "payments", "Money in"],
      ["Invoices", "invoices", "Sent and open"],
      ["Renewal report", "renewals", "30–60 day window"],
      ["Commission", "commission", "Renewal splits"],
      ["Documents", "documents", "COIs, photos, files"],
      ["Communication log", "comms", "Calls and notes"],
      ["Memo to Office", "mtos", "Tech memos"],
      ["Tasks", "tasks", "Tom / Rick / Christy"],
      ["Duration report", "duration", "Sched vs clocked"],
      ["Removal report", "removals", "Counts and weight"],
      ["Reports hub", "reports", "All report tiles"],
      ["Users", "users", "Roles and access"],
      ["Configurable lists", "lists", "Dropdowns"],
      ["Templates", "templates", "Email copy"],
      ["Company settings", "settings", "Windows and rates"],
      ["Integrations", "integrations", "Credentials"],
    ];
    return `
      ${head("Owner overview", "Everything’s here. Edit when you need to — Christy and Rick still handle the daily posting.")}
      ${mine.length ? `
        <div class="card" style="margin-bottom:16px">
          <h3>My tasks <span class="muted">${mine.length} open</span></h3>
          ${taskListHtml(mine.slice(0, 5))}
          <div class="actions" style="margin-top:10px">
            <button class="btn btn-ghost" data-act="nav" data-page="tasks">All tasks</button>
            ${btn("task.create", "Create task", "new-task")}
          </div>
        </div>
      ` : `<div class="actions" style="margin-bottom:12px">${btn("task.create", "Create task", "new-task", "", "btn-ghost")}<button class="btn btn-ghost" data-act="nav" data-page="tasks">Tasks</button></div>`}
      <div class="grid-4">
        ${stat("Expiring in 60 days", expiring.length, "Renewals")}
        ${stat("Failed payments", failed.length, "Register exceptions", failed.length ? "alert" : "")}
        ${stat("Posted today", money(paidToday.reduce((s, p) => s + p.amount, 0)), "Register", "good")}
        ${stat("Unread memos", mtos.length, "Memo to Office", mtos.length ? "alert" : "")}
      </div>
      <div class="card section-gap">
        <h3>All modules</h3>
        <p class="tiny">Shortcuts into the screens you use.</p>
        <div class="owner-mod-grid">
          ${modules.map(([label, page, hint]) => `
            <button type="button" class="owner-mod" data-act="nav" data-page="${page}">
              <strong>${esc(label)}</strong>
              <span class="tiny">${esc(hint)}</span>
            </button>
          `).join("")}
        </div>
      </div>
      <div class="split section-gap">
        <div class="card">
          <h3>Duration outliers <span class="muted">scheduled vs clocked</span></h3>
          ${table(["Technician", "Stop", "Sched", "Actual", "Delta"], outliers.map((r) => [r.tech, r.name, r.sched + "m", r.actual + "m", r.delta + "m"]))}
          ${outliers.length ? "" : `<p class="muted">No under-servicing flags this week.</p>`}
          <div class="actions" style="margin-top:10px"><button class="btn btn-ghost" data-act="nav" data-page="duration">Duration report</button></div>
        </div>
        <div class="card">
          <h3>Quick ops / billing</h3>
          <div class="actions" style="flex-wrap:wrap">
            <button class="btn btn-ghost" data-act="nav" data-page="map">Map &amp; routing</button>
            <button class="btn btn-ghost" data-act="nav" data-page="payments">Payment register</button>
            <button class="btn btn-ghost" data-act="nav" data-page="renewals">Renewals</button>
            <button class="btn btn-ghost" data-act="nav" data-page="comms">Communication log</button>
            <button class="btn btn-ghost" data-act="nav" data-page="mtos">Memo to Office</button>
            <button class="btn btn-ghost" data-act="nav" data-page="reports">Reports hub</button>
            <button class="btn btn-ghost" data-act="nav" data-page="lists">Configurable lists</button>
          </div>
          <p class="tiny" style="margin-top:12px">Non-renewal sample: Martin Ruiz lapsed on Johnny’s book.</p>
        </div>
      </div>
    `;
  }

  function dashOps() {
    const mtos = state.data.mtos.filter((m) => m.dept === "ops" && !m.read);
    const missed = state.data.stops.filter((s) => s.status === "noshow" || s.status === "missed" || s.pendingExt);
    const needSvc = opsServiceQueue();
    const needTech = opsAssignQueue();
    const failedMonthly = opsFailedMonthlyQueue();
    const paid = state.data.payments.filter((p) => p.posted && !p.failed).slice()
      .sort((a, b) => String(b.date).localeCompare(String(a.date)) || String(b.id).localeCompare(String(a.id)))
      .slice(0, 14);
    const retrieve = (state.data.traps || []).filter((t) => t.status === "out" || t.status === "missing");
    const mine = myOpenTasks();
    return `
      ${head("Dispatch board", "New paid account → set up service once. Monthly AutoPay keeps the same trapper. Card declines → call them, stop service if they won’t pay.")}
      ${mine.length ? `
        <div class="card" style="margin-bottom:16px">
          <h3>My tasks <span class="muted">${mine.length} open · from Tom / Christy</span></h3>
          ${taskListHtml(mine.slice(0, 5))}
          <div class="actions" style="margin-top:10px">
            <button class="btn btn-ghost" data-act="nav" data-page="tasks">All tasks</button>
            ${btn("task.create", "Create task", "new-task")}
          </div>
        </div>
      ` : ""}
      ${failedMonthly.length ? `
        <div class="card" style="margin-bottom:16px">
          <h3>Failed monthly pay · stop if unpaid <span class="muted">${failedMonthly.length}</span></h3>
          <p class="tiny">12-month monthly plans keep the same service. After you talk to them — if they will not pay — stop service here. Do not create a new service.</p>
          ${failedMonthly.map(({ c, l, svc }) => `
            <div class="fit-row queue-new">
              <div>
                <span class="badge badge-bad">Payment failed</span>
                <strong>${esc(c.billTo || c.name)}</strong> · ${esc(l.name)}
                <div class="tiny">${esc(l.address)} · ${esc(techName(svc.techId))} · ${esc(svc.days || "")} · monthly plan already live</div>
              </div>
              <div class="actions">
                <button class="btn btn-ghost" data-act="open-customer" data-id="${c.id}">Open</button>
                ${btn("service.stop", "Stop service", "stop-service", `data-id="${svc.id}"`, "btn-sun")}
              </div>
            </div>
          `).join("")}
        </div>
      ` : ""}
      <div class="card" style="margin-bottom:16px">
        <h3>1 · Payment register <span class="muted">who paid · MOP · invoice · bill-to</span></h3>
        <p class="tiny">First payment on a new property → create service once. Later monthly AutoPay lines → already on route (no re-assign).</p>
        ${paid.map((p) => {
          const c = p.customerId ? custBy(p.customerId) : null;
          const loc = p.locationId && c
            ? (c.locations.find((l) => l.id === p.locationId) || c.locations[0])
            : (c?.locations.find((l) => locNeedsService(c, l)) || c?.locations.find((l) => locNeedsTech(c, l)) || c?.locations[0]);
          const setup = c && loc && locNeedsService(c, loc);
          const assign = c && loc && locNeedsTech(c, loc);
          const monthly = c && loc && (paymentIsMonthlyInstallment(p) || (locIsMonthlyPlan(c, loc) && svcFor(c.id, loc.id)));
          const live = c && loc && svcFor(c.id, loc.id) && svcIsContinuing(svcFor(c.id, loc.id));
          let badge = `<span class="badge badge-ok">On route</span> `;
          let action = c ? `<button class="btn btn-ghost" data-act="open-customer" data-id="${c.id}">Open location</button>` : `<span class="badge badge-mute">Christy has not matched this line</span>`;
          if (setup) {
            badge = `<span class="badge badge-warn">Needs setup</span> `;
            action = btn("service.create", "Create service", "open-service", `data-id="${c.id}" data-loc="${loc.id}"`);
          } else if (assign) {
            badge = `<span class="badge badge-sea">Needs technician</span> `;
            action = btn("schedule.assign", "Assign on map", "open-assign", `data-id="${c.id}" data-loc="${loc.id}"`);
          } else if (monthly && live) {
            badge = `<span class="badge badge-sea">Monthly · service live</span> `;
            action = `<button class="btn btn-ghost" data-act="open-customer" data-id="${c.id}">View (no re-setup)</button>`;
          }
          return `<div class="fit-row ${setup || assign ? "queue-new" : ""}">
            <div>
              ${badge}
              <strong>${esc(c?.name || p.memo || "Unmatched")}</strong>
              <div class="tiny">${esc(p.date)} · ${esc(p.method)} · ${esc(p.invoiceId || "—")} · ${money(p.amount)} · ${esc(loc?.address || "—")}${monthly && live ? " · installment — trapper already assigned" : ""}</div>
            </div>
            ${action}
          </div>`;
        }).join("")}
        ${needSvc.filter((row) => !paid.some((p) => p.customerId === row.c.id && p.locationId === row.l.id)).map((row) => `
          <div class="fit-row queue-new">
            <div><span class="badge badge-warn">Paid / handed over</span> <strong>${esc(row.c.name)}</strong> · ${esc(row.l.name)}<div class="tiny">${esc(row.l.address)} — create the service once, then assign on the map</div></div>
            ${btn("service.create", "Create service", "open-service", `data-id="${row.c.id}" data-loc="${row.l.id}"`)}
          </div>
        `).join("")}
        <div class="actions" style="margin-top:10px"><button class="btn btn-ghost" data-act="nav" data-page="payments">Full register</button></div>
      </div>
      ${needTech.length ? `
        <div class="card" style="margin-bottom:16px">
          <h3>2 · Assign on the map <span class="muted">first-time service only</span></h3>
          <p class="tiny">Only for new services that still need a trapper. Monthly renewals do not appear here.</p>
          ${needTech.map((row) => `
            <div class="fit-row queue-new">
              <div><span class="badge badge-sea">Needs technician</span> <strong>${esc(row.c.name)}</strong> · ${esc(row.l.name)}<div class="tiny">${esc(row.l.address)}</div></div>
              ${btn("schedule.assign", "Open map", "open-assign", `data-id="${row.c.id}" data-loc="${row.l.id}"`)}
            </div>
          `).join("")}
        </div>
      ` : ""}
      ${mtos.length ? `
        <div class="card" style="margin-bottom:16px">
          <h3>New memos from the field <span class="muted">${mtos.length}</span></h3>
          <p class="tiny">Techs send these — you don’t have to open the stop first.</p>
          ${mtos.map(mtoCard).join("")}
        </div>
      ` : ""}
      <div class="grid-4">
        ${stat("To set up", needSvc.length, "First payment only", needSvc.length ? "alert" : "")}
        ${stat("To assign on map", needTech.length, "New services", needTech.length ? "alert" : "")}
        ${stat("Failed monthly", failedMonthly.length, "Talk / stop service", failedMonthly.length ? "alert" : "")}
        ${stat("Miss / traps", missed.length + retrieve.length, "Field follow-ups", (missed.length + retrieve.length) ? "alert" : "")}
      </div>
      <div class="split section-gap">
        <div class="card">
          <h3>Duration by trapper · this week</h3>
          <p class="tiny">Minutes on the property this week — who’s light vs loaded.</p>
          ${table(["Technician", "Stops", "Scheduled min"], TECHS.map((t) => {
            const ss = state.data.stops.filter((s) => s.techId === t.id && !s.pending);
            return [t.name, ss.length, ss.reduce((a, s) => a + s.durationMin, 0) + " min"];
          }))}
        </div>
        <div class="card">
          <h3>Next few days</h3>
          <p class="tiny">Stops in order for the next few days.</p>
          ${["Thu", "Fri"].map((d) => {
            const ss = state.data.stops.filter((s) => s.day === d && !s.pending).sort((a, b) => String(a.time).localeCompare(String(b.time)));
            return `<div class="tiny" style="margin:8px 0 4px"><strong>${d}</strong> · ${ss.length} stops</div>
              ${ss.slice(0, 6).map((s) => `<div class="tiny">${esc(s.time)} ${esc(techName(s.techId))} · ${esc(stopLabel(s))} · ${s.durationMin}m</div>`).join("")}
              ${ss.length > 6 ? `<div class="tiny">+${ss.length - 6} more</div>` : ""}`;
          }).join("")}
          <div class="actions" style="margin-top:10px"><button class="btn btn-ghost" data-act="nav" data-page="workload">Full workload</button></div>
        </div>
      </div>
    `;
  }

  function dashAdmin() {
    const renew = renewalCandidates();
    const failed = failedAutopay();
    const mtos = (state.data.mtos || []).filter((m) => m.dept === "admin");
    const due = unpaidInvoices();
    const muni = state.data.customers.filter((c) => c.municipal);
    const todayPays = paymentsInFilter("today").filter((p) => !p.failed);
    const awaiting = (state.data.payments || []).filter((p) => payNeedsMark(p)).sort((a, b) => String(b.date).localeCompare(String(a.date)));
    const waitingLocs = [];
    (state.data.contracts || []).filter((ct) => ct.status === "PENDING PAYMENT").forEach((ct) => {
      const c = custBy(ct.customerId);
      const l = locBy(ct.customerId, ct.locationId);
      if (c && l) waitingLocs.push({ c, l, ct });
    });
    (state.data.customers || []).forEach((c) => {
      (c.locations || []).forEach((l) => {
        if (waitingLocs.some((w) => w.l.id === l.id)) return;
        if (l.lifecycle === "waiting_payment" || (l.covered !== false && !locPaid(c, l) && locInvoices(c.id, l.id).some((i) => invoiceFinStatus(i) === "OPEN" || invoiceFinStatus(i) === "PARTIAL"))) {
          waitingLocs.push({ c, l, ct: contractForLoc(c.id, l.id) });
        }
      });
    });
    const failedAuth = (state.data.autopayAuthorizations || []).filter((a) => a.status === "FAILED");
    const notes = unreadNotifications();
    const mine = myOpenTasks();
    return `
      ${head("Administration", "Payment register, exceptions, renewals, and invoices. Match and allocate what lands on the register.")}
      ${mine.length ? `
        <div class="card" style="margin-bottom:16px">
          <h3>My tasks <span class="muted">${mine.length} open · from Tom / Rick</span></h3>
          ${taskListHtml(mine.slice(0, 5))}
          <div class="actions" style="margin-top:10px">
            <button class="btn btn-ghost" data-act="nav" data-page="tasks">All tasks</button>
            ${btn("task.create", "Create task", "new-task")}
          </div>
        </div>
      ` : ""}
      ${notes.length ? `
        <div class="card" style="margin-bottom:16px">
          <h3>Notifications <span class="muted">${notes.length} unread</span></h3>
          ${notes.slice(0, 8).map((n) => `
            <div class="fit-row ${n.severity === "alert" ? "queue-new" : ""}">
              <div>
                <span class="badge ${n.severity === "alert" ? "badge-bad" : n.severity === "ok" ? "badge-ok" : "badge-sea"}">${esc(n.type || "INFO")}</span>
                <strong>${esc(n.title)}</strong>
                <div class="tiny">${esc(n.date)} · ${esc(n.text)}</div>
              </div>
              <div class="actions">
                ${n.customerId ? `<button class="btn btn-ghost" data-act="open-customer" data-id="${n.customerId}">Open</button>` : ""}
                <button class="btn btn-ghost" data-act="dismiss-notify" data-id="${n.id}">Dismiss</button>
              </div>
            </div>
          `).join("")}
        </div>
      ` : ""}
      <div class="card" style="margin-bottom:16px">
        <h3>1 · Waiting for payment <span class="muted">contracts pending</span></h3>
        <p class="tiny">Ops blocked until balance is zero.</p>
        ${waitingLocs.length ? waitingLocs.slice(0, 8).map(({ c, l, ct }) => `
          <div class="fit-row">
            <div>
              ${statusBadge(ct?.status || l.lifecycle || "PENDING PAYMENT")}
              ${locHasAutopay(c, l) ? `<span class="badge badge-sea">AutoPay</span>` : ""}
              <strong>${esc(c.billTo || c.name)}</strong> · ${esc(l.name)}
              <div class="tiny">${esc(billingPlanLabel(l))}${billingPeriodLabel(l) ? " · " + esc(billingPeriodLabel(l)) : ""}</div>
            </div>
            <button class="btn btn-ghost" data-act="open-customer" data-id="${c.id}">Open Bill-To</button>
          </div>
        `).join("") : `<p class="muted">No properties waiting for payment.</p>`}
      </div>
      <div class="card" style="margin-bottom:16px">
        <h3>2 · Payment register <span class="muted">manual / external</span></h3>
        <p class="tiny">Unallocated portal and external lines. Allocate so Ops can create service where needed.</p>
        ${awaiting.length ? awaiting.slice(0, 8).map(payRegisterRow).join("") : `<p class="muted">Nothing waiting to allocate.</p>`}
        <div class="actions" style="margin-top:10px">
          <button class="btn btn-primary" data-act="nav" data-page="payments">Open payment register</button>
          ${btn("payment.post", "Record payment", "new-pay")}
        </div>
      </div>
      ${failed.length || failedAuth.length ? `
        <div class="card" style="margin-bottom:16px">
          <h3>Payment exceptions <span class="muted">contact customer</span></h3>
          ${failedAuth.map((a) => {
            const c = custBy(a.customerId);
            const loc = a.locationId ? locBy(a.customerId, a.locationId) : null;
            return `<div class="fit-row queue-new">
              <div>
                <span class="badge badge-bad">${esc(a.failureCode || "FAILED")}</span>
                <strong>${esc(c?.name || "—")}</strong>${loc ? ` · ${esc(loc.name)}` : ""}
                <div class="tiny">${esc(a.method || "")}${a.last4 ? " ····" + esc(a.last4) : ""} · ${esc((a.failedAt || "").slice(0, 10))} · external pay → allocate</div>
              </div>
              <div class="actions">
                <button class="btn btn-sun" data-act="contact-autopay" data-id="${c?.id}" data-loc="${a.locationId || ""}">Log contact</button>
                <button class="btn btn-ghost" data-act="open-customer" data-id="${c?.id}">Open Bill-To</button>
              </div>
            </div>`;
          }).join("")}
          ${failed.map((p) => {
            const c = custBy(p.customerId);
            return `<div class="fit-row queue-new">
              <div>
                <span class="badge badge-bad">Declined</span>
                <strong>${esc(c?.name || "—")}</strong>
                <div class="tiny">${esc(p.date)} · ${esc(p.method)}${p.last4 ? " · " + esc(p.last4) : ""} · ${money(p.amount)}</div>
              </div>
              <button class="btn btn-ghost" data-act="open-customer" data-id="${c?.id}">Open Bill-To</button>
            </div>`;
          }).join("")}
        </div>
      ` : ""}
      <div class="card" style="margin-bottom:16px">
        <h3>3 · Renewal report <span class="muted">select → send</span></h3>
        <p class="tiny">Check the ones to send, then Send opens a confirmation list.</p>
        ${table(["", "Bill-To", "Property", "Expires", "Amount", "Flag"], renew.slice(0, 6).map((row) => {
          const m = renewalMeta(row);
          const ct = contractForLoc(row.customerId, row.locationId);
          const existing = (state.data.renewals || []).find((r) => r.rowId === row.id || (ct && r.contractId === ct.id));
          const alreadySent = existing?.status === "SENT";
          return [
            alreadySent
              ? `<span class="tiny">Sent</span>`
              : `<label class="chk"><input type="checkbox" data-act="renew-toggle" data-id="${row.id}" ${(state.renewPick || []).includes(row.id) ? "checked" : ""}></label>`,
            custBtn(row.customerId, row.name),
            esc(row.locName),
            row.expires,
            money(row.amount),
            m.flag,
          ];
        }))}
        <div class="actions" style="margin-top:10px">
          ${btn("renewal.send", `Send selected${(state.renewPick || []).length ? ` (${(state.renewPick || []).length})` : ""}`, "open-send-renewals", "", "btn-sun")}
          <button class="btn btn-ghost" data-act="nav" data-page="renewals">Full renewal report</button>
        </div>
      </div>
      <div class="card" style="margin-bottom:16px">
        <h3>Add a customer</h3>
        <p class="tiny">After the call: add Bill-To and properties, quote, invoice, then payment.</p>
        <div class="actions">${btn("customer.create", "Add customer", "new-customer")}</div>
      </div>
      <div class="grid-4">
        ${stat("Waiting for payment", waitingLocs.length, "Pending contracts")}
        ${stat("Awaiting allocation", awaiting.length, "On the register", awaiting.length ? "alert" : "")}
        ${stat("Exceptions", failed.length + failedAuth.length, "Contact customer", (failed.length || failedAuth.length) ? "alert" : "")}
        ${stat("Notifications", notes.length, "Unread", notes.length ? "alert" : "")}
      </div>
      <div class="split section-gap">
        <div class="card">
          <h3>Open invoices</h3>
          <p class="tiny">Balance from allocations. Zero balance → contract ACTIVE.</p>
          ${due.length ? due.map((i) => {
            const c = custBy(i.customerId);
            return `<div class="fit-row">
              <div><strong>${esc(i.id)}</strong> · ${custBtn(i.customerId, c?.name || "")}<div class="tiny">${esc(invProperty(i))} · ${money(i.amount)} · bal ${money(invoiceBalance(i))} · ${esc(invoiceFinStatus(i))} · sent ${esc(i.sent || "—")}</div></div>
              <button class="btn btn-ghost" data-act="open-customer" data-id="${c?.id}">Open property</button>
            </div>`;
          }).join("") : `<p class="muted">No open invoices.</p>`}
        </div>
        <div class="card">
          <h3>Municipal</h3>
          <p class="tiny">Service first. Rick confirms hours. You invoice with PO and period. They pay later.</p>
          ${muni.length ? muni.map((c) => {
            const left = muniHoursRemaining(c);
            const warn = muniNearLimit(c);
            return `<div class="fit-row"><div><strong>${esc(c.name)}</strong><div class="tiny">${esc(c.po)} · ${muniHoursUsed(c)}/${muniPoCapHours(c) || "—"} hrs${left != null ? ` · ${left} left` : ""}${warn ? " · near limit" : ""}</div></div>
            <button class="btn btn-ghost" data-act="manual-invoice" data-id="${c.id}">Manual invoice</button>
          </div>`;
          }).join("") : `<p class="muted">None.</p>`}
          <div class="tiny" style="margin-top:8px">Admin MTOs: ${mtos.filter((x) => !x.read).length} unread</div>
        </div>
      </div>
    `;
  }

  function dashSales() {
    const inbound = (state.data.inbound || []).slice();
    const inquiries = state.data.customers.filter((c) => c.status === "inquiry");
    return `
      ${head("Incoming", "Add Bill-To and properties, send a quote, they pick a plan, then invoice each property.")}
      <div class="card" style="margin-bottom:16px">
        <h3>Today’s calls and messages</h3>
        <p class="tiny">Click Add this customer. Fill the form. Instructions and whether they accept messages are on that form.</p>
        ${inbound.map((n) => `
          <div class="inbound-row ${n.used ? "used" : ""}">
            <div>
              <span class="badge ${n.channel === "Call" || n.channel === "Voicemail" ? "badge-sea" : "badge-ok"}">${esc(n.channel)}</span>
              <strong>${esc([n.firstName, n.lastName].filter(Boolean).join(" ") || n.company || "Unknown")}</strong>
              <div class="tiny">${esc(n.time)} · ${esc(n.phone || "")} ${n.city ? "· " + esc(n.city) : ""}</div>
              <div class="tiny">${esc(n.note || "")}</div>
            </div>
            ${n.used
              ? `<span class="tiny">Already added</span>`
              : btn("customer.create", "Add this customer", "from-inbound", `data-id="${n.id}"`)}
          </div>
        `).join("")}
        <div class="actions" style="margin-top:12px">${btn("customer.create", "+ Customer", "new-customer")}</div>
      </div>
      <div class="card">
        <h3>Customers just created</h3>
        ${inquiries.length ? table(["Account", "Address", "Status", ""], inquiries.map((c) => [
          custBtn(c.id, c.name),
          c.locations[0]?.address || "—",
          statusBadge(c.status),
          `<button class="btn btn-ghost" data-act="open-customer" data-id="${c.id}">Open</button>`,
        ])) : `<p class="muted">None yet. Take a call, then Add.</p>`}
      </div>
    `;
  }

  function dashSys() {
    return `
      ${head("System administration", "Users, lists, templates, keys, and company defaults. Change them here.")}
      <div class="grid-4">
        ${stat("Active users", state.data.users.filter((u) => u.active).length, "Logins")}
        ${stat("No-show reasons", REASONS.length, "Lists")}
        ${stat("Commission default", state.data.settings.commissionPct + "%", "Default %")}
        ${stat("Renewal window", state.data.settings.renewalWindow + " days", "Days out")}
      </div>
      <div class="card section-gap">
        <h3>Open a system screen</h3>
        <div class="actions">
          <button class="btn btn-ghost" data-act="nav" data-page="users">Users</button>
          <button class="btn btn-ghost" data-act="nav" data-page="lists">Lists</button>
          <button class="btn btn-ghost" data-act="nav" data-page="templates">Templates</button>
          <button class="btn btn-ghost" data-act="nav" data-page="settings">Settings</button>
          <button class="btn btn-ghost" data-act="nav" data-page="integrations">Integrations</button>
        </div>
      </div>
    `;
  }

  /* ---------- Customers ---------- */
  function billToOptions() {
    return state.data.customers.map((c) => ({
      id: c.id,
      name: c.billTo || c.name,
      label: `${c.billTo || c.name} (${c.id})`,
      type: c.type,
      company: c.company || "",
      firstName: c.firstName || (c.name || "").split(" ")[0] || "",
      lastName: c.lastName || (c.name || "").split(" ").slice(1).join(" ") || "",
      phone: c.phone || "",
      mobile: c.mobile || "",
      altPhone: c.altPhone || "",
      email: c.email || "",
      acceptSms: !!c.acceptSms,
      acceptEmail: c.acceptEmail !== false,
      prospect: !!c.prospect,
      opsNote: c.opsNote || "",
      notes: c.notes || "",
      locCount: (c.locations || []).length,
    }));
  }

  function viewAddCustomer() {
    if (!can("customer.create")) {
      return `<div class="forbidden"><h2>Your login doesn’t include this screen</h2><p>Only Sales and Administration add customers.</p><button class="btn btn-primary" data-act="nav" data-page="dashboard">Dashboard</button></div>`;
    }
    const inbound = (state.data.inbound || []).find((n) => n.id === state.inboundId);
    const html = window.IguanaIntake
      ? IguanaIntake.formHtml(inbound || {}, billToOptions(), state.locCount || 1)
      : `<p>Intake form failed to load.</p>`;
    return html;
  }

  function viewCreateService() {
    if (!can("service.create")) {
      return `<div class="forbidden"><h2>Your login doesn’t include this screen</h2><p>This login can’t create services.</p><button class="btn btn-primary" data-act="nav" data-page="dashboard">Dashboard</button></div>`;
    }
    const c = custBy(state.setupId || state.selectedCustomer);
    if (!c) return `<p>Customer not found.</p><button class="btn btn-ghost" data-act="nav" data-page="customers">← Customers</button>`;
    const locs = c.locations.filter((l) => l.covered !== false);
    const d = state.setupDraft || {};
    const selected = d.loc || state.setupLocId || locs.find((l) => locNeedsService(c, l))?.id || locs[0]?.id;
    const loc = locs.find((l) => l.id === selected) || locs[0];
    const code = d.type || defaultServiceCode(c, loc);
    const st = allServiceTypes().find((t) => t.id === code) || SERVICE_TYPES[0];
    const plan = locPlan(c, loc);
    const start = d.start || plan.start || TODAY;
    const expires = d.expires || expiryFrom(start, code) || plan.expires || "";
    const sched = SERVICE_SCHEDULES.find((s) => s.id === (d.sched || ""))
      || SERVICE_SCHEDULES.find((s) => s.days === (loc?.days || c.days || "Tue/Thu"))
      || SERVICE_SCHEDULES.find((s) => s.id === "WK-TUTH")
      || SERVICE_SCHEDULES[0];
    state.assignDays = sched.days;
    state.setupId = c.id;
    state.setupLocId = loc?.id;
    const price = d.price != null && d.price !== "" ? d.price : Number(st.price || 0).toFixed(2);
    const iprice = d.iprice != null && d.iprice !== "" ? d.iprice : price;
    const createInitial = d.createInitial !== false;
    const ranked = loc ? bestFitFor(c, loc, sched.days) : [];
    const pinX = loc?.x || "50%";
    const pinY = loc?.y || "50%";
    const otherPins = locs.filter((l) => l.id !== loc?.id).map((l) => ({
      x: l.x, y: l.y, label: l.name, color: locPinColor(c, l),
    }));
    const gps = loc?.lat != null
      ? `${Number(loc.lat).toFixed(4)}, ${Number(loc.lng).toFixed(4)}`
      : (loc?.gps || "");
    const techOpts = (sel) => `<option value="">— select or use Best fit —</option>${TECHS.map((t) => `<option value="${t.id}" ${sel === t.id ? "selected" : ""}>${esc(t.name.toUpperCase())} · ${esc(t.home)}</option>`).join("")}`;
    return `
      <div class="create-svc">
        <button class="btn btn-ghost" data-act="cancel-create-service">← ${esc(c.name)}</button>
        ${isMunicipal(c) ? `<div class="notice">Municipal — create &amp; schedule without payment. Christy invoices after the service period against PO hours (${muniHoursUsed(c)}/${muniPoCapHours(c) || "—"}).</div>` : ""}
        <div class="create-svc-head">
          <div>
            <h2>Service setup</h2>
            <p class="muted">${esc(loc?.name || "Property")} · Bill-To ${esc(c.billTo || c.name)} · pin the property, pick best fit, then save</p>
          </div>
        </div>
        <div class="create-svc-layout">
        <div class="create-svc-form">
          <div class="create-svc-section">
            <div class="create-svc-kicker">Property</div>
            <div class="field req"><label>Location</label>
              <select id="sv-loc" data-act="sv-loc">${locs.map((l) => `<option value="${l.id}" ${l.id === selected ? "selected" : ""}>${esc(l.name)} · ${esc(l.address)}</option>`).join("")}</select>
            </div>
          </div>

          <div class="create-svc-section">
            <div class="create-svc-kicker">Service</div>
            <div class="create-svc-line">
              <div class="field req"><label>Service</label>
                <select id="sv-type" data-act="sv-code">${allServiceTypes().map((t) => `<option value="${t.id}" ${t.id === code ? "selected" : ""}>${esc(t.code)} · ${esc(t.label)}</option>`).join("")}</select>
              </div>
              <div class="field"><label>Description</label><input id="sv-desc" value="${esc(d.desc || st.desc || st.label)}" readonly></div>
              <div class="field narrow"><label>Qty</label><input id="sv-qty" type="number" min="1" step="1" value="${esc(d.qty || "1")}"></div>
              <div class="field narrow"><label>Price</label><input id="sv-price" type="number" step="0.01" value="${esc(price)}"></div>
              <!-- <div class="field chk-field"><label class="chk"><input type="checkbox" id="sv-tax" ${d.tax ? "checked" : ""}> Tax</label></div> -->
            </div>
          </div>

          <div class="create-svc-section">
            <label class="chk create-svc-toggle"><input type="checkbox" id="sv-create-initial" data-act="sv-toggle-initial" ${createInitial ? "checked" : ""}> Create initial service</label>
            <div id="sv-initial-block" class="create-svc-initial" ${createInitial ? "" : "hidden"}>
              <div class="create-svc-2">
                <div class="field"><label>Initial service date</label><input id="sv-idate" type="date" value="${esc(d.idate || start)}" data-act="sv-start"></div>
                <div class="field"><label>Frequency</label><input id="sv-freq" value="${esc(d.freq || st.freq || "WEEKLY")}" readonly></div>
              </div>
              <div class="create-svc-3">
                <div class="field"><label>Initial time</label><input id="sv-itime" type="time" value="${esc(d.itime || "12:30")}"></div>
                <div class="field"><label>AM / PM</label>
                  <select id="sv-ampm"><option ${(d.ampm || "PM") === "AM" ? "selected" : ""}>AM</option><option ${(d.ampm || "PM") === "PM" ? "selected" : ""}>PM</option></select>
                </div>
                <div class="field"><label>Initial duration</label><input id="sv-idur" value="${esc(d.idur || fmtDur(st.duration))}" placeholder="00:10"></div>
              </div>
              <div class="create-svc-2">
                <div class="field"><label>Initial service price</label><input id="sv-iprice" type="number" step="0.01" value="${esc(iprice)}"></div>
                <div class="field">
                  <label>Initial trapper</label>
                  <div class="create-svc-trapper">
                    <select id="sv-initial">${techOpts(d.initial || "")}</select>
                    <button type="button" class="btn btn-ghost" data-act="sv-best-fit" data-target="initial">Best fit</button>
                  </div>
                  <div class="tiny">First visit — can differ from standing trapper</div>
                </div>
              </div>
            </div>
          </div>

          <div class="create-svc-section">
            <div class="create-svc-kicker">Standing schedule</div>
            <div class="create-svc-2">
              <div class="field req"><label>Schedule</label>
                <select id="sv-sched" data-act="sv-sched">${SERVICE_SCHEDULES.map((s) => `<option value="${s.id}" ${s.id === sched.id ? "selected" : ""}>${esc(s.label)}</option>`).join("")}</select>
              </div>
              <div class="field req"><label>Duration</label><input id="sv-dur" value="${esc(d.dur || fmtDur(st.duration))}" placeholder="00:10"></div>
            </div>
            <div class="create-svc-3">
              <div class="field"><label>Charge</label><input value="Production" readonly><div class="tiny">Always production</div></div>
              <div class="field req"><label>Start date</label><input id="sv-start" type="date" value="${esc(start)}" data-act="sv-start"></div>
              <div class="field req"><label>Renewal date</label><input id="sv-expires" type="date" value="${esc(expires)}"><div class="tiny">Auto from program + start</div></div>
            </div>
            <input type="hidden" id="sv-renewal" value="${esc(expires)}">
            <div class="create-svc-2">
              <div class="field"><label>Targets</label>
                <select id="sv-target">${TARGETS.map((t) => `<option ${t === (d.target || "IGUANA") ? "selected" : ""}>${t}</option>`).join("")}</select>
              </div>
              <div class="field">
                <label>Standing trapper</label>
                <div class="create-svc-trapper">
                  <select id="sv-trapper">${techOpts(d.trapper || "")}</select>
                  <button type="button" class="btn btn-ghost" data-act="sv-best-fit" data-target="standing">Best fit</button>
                </div>
                <div class="tiny">Continual route tech — pick from Best fit on the map</div>
              </div>
            </div>
          </div>

          <div class="create-svc-section">
            <div class="field"><label>Service instructions</label><textarea id="sv-notes" rows="3" placeholder="Gate codes, dogs, access notes…">${esc(d.notes != null ? d.notes : (loc?.notes || c.notes || ""))}</textarea></div>
            <div class="create-svc-notify">
              <div class="create-svc-kicker">Notify customer</div>
              <div class="chk-row">
                <label class="chk"><input type="checkbox" id="sv-notify-email" ${d.notifyEmail !== false ? "checked" : ""}> Email</label>
                <label class="chk"><input type="checkbox" id="sv-notify-text" ${d.notifyText !== false ? "checked" : ""}> Text</label>
                <span class="tiny">2 days before · system generated · no-reply</span>
              </div>
            </div>
          </div>

          <div class="actions create-svc-actions">
            <button class="btn btn-ghost" data-act="cancel-create-service">Cancel</button>
            ${btn("service.create", "Save — then assign on map", "save-service", `data-id="${c.id}"`)}
          </div>
        </div>
        <aside class="create-svc-map">
          ${miniMapHtml({
            drag: true,
            mapId: "sv-map",
            title: "Client location",
            existing: otherPins,
            preview: loc ? [{
              x: pinX,
              y: pinY,
              label: loc.name,
              elId: "sv-pin",
              xId: "sv-x",
              yId: "sv-y",
              fillLat: "sv-lat",
              fillLng: "sv-lng",
              capId: "sv-map-cap",
              keepLabel: true,
            }] : [],
            caption: loc
              ? `${loc.address}${gps ? " · " + gps : ""} · drag the pin to adjust`
              : "Pick a property",
          })}
          <input type="hidden" id="sv-x" value="${esc(String(pinX).replace("%", ""))}">
          <input type="hidden" id="sv-y" value="${esc(String(pinY).replace("%", ""))}">
          <input type="hidden" id="sv-lat" value="${esc(loc?.lat != null ? loc.lat : "")}">
          <input type="hidden" id="sv-lng" value="${esc(loc?.lng != null ? loc.lng : "")}">
          <div class="create-svc-map-fit">
            <div class="create-svc-kicker">Best fit for this pin</div>
            <p class="tiny">Closest by extra drive on ${esc(sched.label)}. Click to set standing trapper (and initial if empty).</p>
            <div class="bestfit" id="sv-fit">${fitCardsHtml(ranked, d.trapper || ranked[0]?.t.id, "standing")}</div>
          </div>
        </aside>
        </div>
      </div>
    `;
  }

  function viewCustomers() {
    const customers = visibleCustomers();
    const rows = customers.map((c) => ({
      search: [c.name, c.billTo, c.id, c.status].join(" "),
      status: c.status,
      cells: [
        `<strong>${esc(c.name)}</strong>`,
        statusBadge(c.status),
        esc(c.billTo || c.name),
        `${c.locations?.length || 0} ${c.locations?.length === 1 ? "location" : "locations"}`,
        `<button class="icon-btn table-icon-btn" data-act="open-customer" data-id="${esc(c.id)}" title="View customer" aria-label="View ${esc(c.name)}">${ICONS.eye}</button>`,
      ],
    }));
    const statuses = [...new Set(customers.map((c) => c.status).filter(Boolean))];
    return `
      ${head("Customers", state.role === "sales"
        ? "A call or message comes in. Add the customer. The quote comes later."
        : "Bill-To accounts only. Open Locations / Properties for service addresses and dispatch.")}
      ${can("customer.create")
        ? `<div class="page-head" style="margin-top:0"><div></div><div class="actions">${btn("customer.create", "New customer", "new-customer")}</div></div>`
        : state.role === "ops"
          ? `<div class="notice locked">Ops doesn’t add customers. When Admin puts someone on the register paid, they show up here — assign them on the map.</div>`
          : writeBar("customer.create", "New customer")}
      ${listFilterBar("customer", statuses)}
      ${filterableTable(["Customer", "Status", "Bill-To", "Locations", ""], rows, "customer")}
    `;
  }

  function listFilterBar(prefix, statuses, options = {}) {
    return `
      <div class="filter-bar list-filter-bar">
        <input id="${prefix}-filter-search" data-list-filter="${prefix}" type="search" placeholder="${esc(options.placeholder || "Search name, Bill-To, or ID")}">
        <select id="${prefix}-filter-status" data-list-filter="${prefix}">
          <option value="">All statuses</option>
          ${statuses.map((status) => `<option value="${esc(status)}">${statusBadge(status).replace(/<[^>]+>/g, "")}</option>`).join("")}
        </select>
        ${options.types ? `<select id="${prefix}-filter-type" data-list-filter="${prefix}"><option value="">All types</option>${options.types.map((type) => `<option value="${esc(type)}">${esc(type)}</option>`).join("")}</select>` : ""}
        ${options.techs ? `<select id="${prefix}-filter-tech" data-list-filter="${prefix}"><option value="">All trappers</option>${TECHS.map((t) => `<option value="${t.id}">${esc(t.name)}</option>`).join("")}</select>` : ""}
        <button class="btn btn-ghost" data-act="clear-list-filters" data-prefix="${prefix}">Clear</button>
        <span class="tiny" id="${prefix}-filter-count"></span>
      </div>`;
  }

  function filterableTable(headers, rows, prefix) {
    if (!rows.length) return `<p class="muted">Nothing to show.</p>`;
    return `
      <div class="table-wrap card" style="padding:8px 10px" data-filter-table="${prefix}">
        <table>
          <thead><tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr></thead>
          <tbody>${rows.map((row) => `
            <tr
              data-search="${esc(String(row.search || "").toLowerCase())}"
              data-status="${esc(row.status || "")}"
              data-type="${esc(row.type || "")}"
              data-tech="${esc(row.tech || "")}"
            >${row.cells.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody>
        </table>
        <p class="muted list-filter-empty" hidden>No matching records.</p>
      </div>`;
  }

  function locationServiceLabel(c, l) {
    const svc = svcFor(c.id, l.id);
    if (svc) return esc(svcTypeLabel(svc.type));
    const plan = locPlan(c, l);
    const program = plan.programId ? progBy(plan.programId) : null;
    return program ? esc(program.name) : `<span class="muted">No service</span>`;
  }

  function locationStatus(c, l) {
    if (l.covered === false) return statusBadge("not_covered");
    if (locNeedsService(c, l)) return statusBadge("paid");
    if (locNeedsTech(c, l)) return statusBadge("active");
    if (l.lifecycle) return statusBadge(l.lifecycle);
    return statusBadge(c.status);
  }

  function locationStatusKey(c, l) {
    if (l.covered === false) return "not_covered";
    if (locNeedsService(c, l)) return "paid";
    if (locNeedsTech(c, l)) return "active";
    return l.lifecycle || c.status;
  }

  function locationDispatch(c, l) {
    if (c.status === "lapsed" || l.covered === false) return `<span class="muted">Not dispatching</span>`;
    if (locNeedsService(c, l)) {
      return `<span class="badge badge-warn">Needs service setup</span>`;
    }
    if (locNeedsTech(c, l)) {
      return `<span class="badge badge-sea">Needs trapper</span>`;
    }
    if (!locPaid(c, l) && !isMunicipal(c)) return statusBadge("waiting_payment");
    const svc = svcFor(c.id, l.id);
    const routeTechId = svc?.techId || l.techId || c.techId;
    const routeDays = svc?.days || l.days || c.days;
    if (routeTechId) {
      return `<span class="badge badge-ok">On route</span><div class="tiny">${esc(techName(routeTechId))}${routeDays ? ` · ${esc(routeDays)}` : ""}</div>`;
    }
    if (isMunicipal(c)) return `<span class="badge badge-sea">PO · pay after service</span>`;
    return `<span class="muted">No dispatch yet</span>`;
  }

  function viewLocations() {
    const customers = visibleCustomers();
    const rows = customers.flatMap((c) => (c.locations || []).map((l) => {
      const svc = svcFor(c.id, l.id);
      const service = svc ? svcTypeLabel(svc.type) : (progBy(locPlan(c, l).programId)?.name || "");
      const techId = svc?.techId || l.techId || c.techId || "";
      const status = locationStatusKey(c, l);
      return {
        createdAt: Number(l.createdAt || 0),
        search: [c.name, c.billTo, c.id, l.name, l.address, c.type, service, techName(techId)].join(" "),
        status,
        type: c.type || "",
        tech: techId,
        cells: [
          `<strong>${esc(l.name || "Property")}</strong><div class="tiny">${esc(c.name)}</div>`,
          esc(c.type || "—"),
          locationServiceLabel(c, l),
          `<span>${esc(l.address || "No address")}</span>`,
          locationStatus(c, l),
          locationDispatch(c, l),
          `<button class="icon-btn table-icon-btn" data-act="open-location" data-id="${esc(c.id)}" data-loc="${esc(l.id)}" title="View location" aria-label="View ${esc(c.name)} ${esc(l.name || "property")}">${ICONS.eye}</button>`,
        ],
      };
    })).sort((a, b) => b.createdAt - a.createdAt);
    const statuses = [...new Set(rows.map((row) => row.status).filter(Boolean))];
    const types = [...new Set(rows.map((row) => row.type).filter(Boolean))];
    return `
      ${head("Locations / Properties", "Every service address in one list. Service setup and dispatch actions belong to the property, not the Bill-To account.")}
      ${listFilterBar("location", statuses, { types, techs: true, placeholder: "Search customer, property, address, or service" })}
      ${filterableTable(["Location", "Type", "Service", "Service address", "Status", "Dispatch", ""], rows, "location")}
    `;
  }

  function visibleCustomers() {
    if (state.role === "sales") {
      const quoted = new Set(state.data.quotes.map((q) => q.customerId));
      return state.data.customers.filter((c) => c.status === "inquiry" || quoted.has(c.id));
    }
    if (state.role === "ops") {
      return state.data.customers.slice().sort((a, b) => {
        const rank = (c) => c.locations.some((l) => locNeedsService(c, l)) ? 2 : c.locations.some((l) => locNeedsTech(c, l)) ? 1 : 0;
        const d = rank(b) - rank(a);
        if (d) return d;
        return (b.handedAt || 0) - (a.handedAt || 0);
      });
    }
    return state.data.customers;
  }

  function salesHide(text) {
    return esc(text);
  }

  function scheduleHint(c) {
    if (state.role === "sales") return `<span class="muted">—</span>`;
    if (c.status === "lapsed") return statusBadge("lapsed");
    if (c.status === "waiting_payment") return statusBadge("waiting_payment");
    if (c.municipal) return `<span class="gate"><span class="badge badge-sea">PO · pay after service</span></span>`;
    const locs = (c.locations || []).filter((l) => l.covered !== false);
    const paidN = locs.filter((l) => locPaid(c, l)).length;
    if (locs.length > 1 && paidN && paidN < locs.length) return `<span class="badge badge-warn">${paidN}/${locs.length} properties paid</span>`;
    if (paidN === locs.length && locs.length) return `<span class="badge badge-ok">Paid — eligible</span>`;
    return `<span class="badge badge-bad">Awaiting payment</span>`;
  }

  function customerLocationsCard(c) {
    const selectedId = locBy(c.id, state.selectedLocation)?.id || c.locations?.[0]?.id || "";
    return `
      <div class="card customer-location-list">
        <div class="customer-location-head">
          <div><h3>Locations</h3><p class="tiny">${(c.locations || []).length} service propert${(c.locations || []).length === 1 ? "y" : "ies"}</p></div>
          ${can("location.add") ? `<button class="btn btn-primary" data-act="add-location" data-id="${esc(c.id)}">${ICONS.plus} Add property</button>` : ""}
        </div>
        <div class="customer-location-scroll" data-keep-scroll="customer-locations">
          ${(c.locations || []).map((l) => {
            const svc = svcFor(c.id, l.id);
            return `
              <div class="customer-location-row ${l.id === selectedId ? "is-selected" : ""}">
                <button type="button" class="customer-location-select" data-act="select-customer-location" data-id="${esc(c.id)}" data-loc="${esc(l.id)}" aria-label="Show ${esc(l.name || "location")} on map">
                  <strong>${esc(l.name || "Property")}</strong>
                  <div class="tiny">${esc(l.address || "No address")}</div>
                  <div class="tiny">${svc ? esc(svcTypeLabel(svc.type)) : esc(progBy(locPlan(c, l).programId)?.name || "No service")} · ${locationStatus(c, l)}</div>
                </button>
                <button class="icon-btn" data-act="open-location" data-id="${esc(c.id)}" data-loc="${esc(l.id)}" title="Open location" aria-label="Open ${esc(l.name || "location")}">${ICONS.eye}</button>
              </div>`;
          }).join("") || `<p class="muted">No locations yet.</p>`}
        </div>
      </div>`;
  }

  function viewCustomerAccount() {
    const c = custBy(state.selectedCustomer);
    if (!c) return `<p>Not found.</p>`;
    const typeLabel = { residential: "Residential", commercial: "Commercial", hoa: "HOA", municipal: "Municipal" };
    const canEditCust = canEditField("name");
    return `
      <button class="btn btn-ghost" data-act="nav" data-page="customers">← Customers</button>
      <div class="cust-hero">
        <div>
          <h2 style="font-family:var(--display);font-size:28px;margin:8px 0 4px">${esc(c.billTo || c.name)}</h2>
          <p class="muted">${esc(c.id)} · Bill-To account · ${statusBadge(c.status)}</p>
        </div>
      </div>
      <div class="customer-overview-grid">
        <div class="stack customer-overview-left">
          <div class="panel-box customer-billto-card">
            ${canEditCust ? `<button type="button" class="btn btn-ghost panel-edit" data-act="edit-billto" data-id="${c.id}">Edit Bill-To</button>` : ""}
            <div class="panel-kicker">Bill-To details</div>
            <dl class="kv panel-kv">
              <dt>Customer</dt><dd>${esc(c.name)}</dd>
              <dt>Bill-To</dt><dd>${esc(c.billTo || c.name)}</dd>
              <dt>Type</dt><dd>${esc(typeLabel[c.billToType || c.type] || c.type || "—")}</dd>
              <dt>Phone</dt><dd>${esc(c.phone || "—")}</dd>
              <dt>Mobile</dt><dd>${esc(c.mobile || "—")}</dd>
              <dt>Email</dt><dd>${esc(c.email || "—")}</dd>
              <dt>Company</dt><dd>${esc(c.company || "—")}</dd>
              ${(c.municipal || c.type === "municipal") ? `
                <dt>PO / hours</dt><dd>${esc(c.po || "—")} · ${muniHoursUsed(c)}/${muniPoCapHours(c) || "—"} hrs used · ${muniHoursRemaining(c) == null ? "—" : muniHoursRemaining(c) + " left"}</dd>
                <dt>Billing</dt><dd>Pay after service${c.hourlyRate ? ` · ${money(c.hourlyRate)}/hr` : ""}</dd>
              ` : ""}
              <dt>Contact preference</dt><dd>${c.acceptSms ? "SMS on" : "SMS off"} · ${c.acceptEmail === false ? "Email off" : "Email on"}</dd>
            </dl>
          </div>
          ${customerLocationsCard(c)}
        </div>
        <div class="card customer-map-card">
          ${locationPreviewCard(c, state.selectedLocation)}
        </div>
      </div>
    `;
  }

  function viewLocation() {
    const c = custBy(state.selectedCustomer);
    const l = c && locBy(c.id, state.selectedLocation);
    if (!c || !l) return `<p>Location not found.</p>`;
    const svc = svcFor(c.id, l.id);
    const live = svc && svcIsContinuing(svc);
    const plan = locPlan(c, l);
    const prog = plan.programId ? progBy(plan.programId) : null;
    const invoices = locInvoices(c.id, l.id);
    const locationServices = (state.data.services || [])
      .filter((s) => s.customerId === c.id && s.locationId === l.id)
      .slice()
      .sort((a, b) => String(b.start || "").localeCompare(String(a.start || "")));
    const locationPayments = (state.data.payments || [])
      .filter((p) => p.customerId === c.id && p.locationId === l.id)
      .slice()
      .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
    const locTasks = tasksForCustomer(c.id).filter((t) => t.locationId === l.id);
    const locDocs = docsForCustomer(c.id).filter((d) => d.locationId === l.id);
    const visits = (state.data.stops || [])
      .filter((s) => s.customerId === c.id && s.locationId === l.id)
      .slice()
      .sort((a, b) => String(b.day || "").localeCompare(String(a.day || "")) || String(a.time || "").localeCompare(String(b.time || "")));
    const gps = l.lat != null && l.lng != null ? `${Number(l.lat).toFixed(4)}, ${Number(l.lng).toFixed(4)}` : (l.gps || approxGps(l));
    const needsQuote = locNeedsQuote(c, l);
    const readyToInvoice = !needsQuote && canInvoiceLocation(c, l);
    return `
      <button class="btn btn-ghost" data-act="open-customer" data-id="${esc(c.id)}">← ${esc(c.billTo || c.name)}</button>
      <div class="cust-hero">
        <div>
          <h2 style="font-family:var(--display);font-size:28px;margin:8px 0 4px">${esc(l.name || "Property")}</h2>
          <p class="muted">${esc(c.name)} · ${esc(l.address || "No address")} · ${locationStatus(c, l)}</p>
        </div>
        <div class="actions">
          ${needsQuote ? btn("quote.send", "Send quote", "send-quote", `data-id="${c.id}" data-loc="${l.id}"`) : ""}
          ${readyToInvoice ? btn("invoice.create", "Send invoice", "invoice-one-loc", `data-id="${c.id}" data-loc="${l.id}"`, "btn-sun") : ""}
          ${can("location.add") || canEditField("address") || state.role === "owner" ? `<button class="btn btn-ghost" data-act="edit-one-loc" data-id="${c.id}" data-loc="${l.id}">Edit location</button>` : ""}
          ${locNeedsService(c, l) ? btn("service.create", "Create service", "open-service", `data-id="${c.id}" data-loc="${l.id}"`) : ""}
          ${locNeedsTech(c, l) ? btn("schedule.assign", "Assign on map", "open-assign", `data-id="${c.id}" data-loc="${l.id}"`) : ""}
          ${live && ["ops", "owner"].includes(state.role) ? btn("schedule.reassign", "Reassign trapper", "open-assign", `data-id="${c.id}" data-loc="${l.id}"`, "btn-ghost") : ""}
          ${["owner", "ops", "admin"].includes(state.role) ? btn("task.create", "Create task", "new-task", `data-id="${c.id}" data-loc="${l.id}"`, "btn-ghost") : ""}
        </div>
      </div>
      <div class="location-detail-grid">
        <div class="stack">
          <div class="card">
            <h3>Location details</h3>
            <dl class="kv section-gap">
              <dt>Bill-To</dt><dd>${esc(c.billTo || c.name)}</dd>
              <dt>Property type</dt><dd>${esc(c.type || "—")}</dd>
              <dt>Address</dt><dd>${esc(l.address || "—")}</dd>
              <dt>GPS</dt><dd>${esc(gps)}</dd>
              <dt>Status</dt><dd>${locationStatus(c, l)}</dd>
              <dt>Instructions</dt><dd>${esc(l.notes || c.opsNote || c.notes || "—")}</dd>
            </dl>
          </div>
          <div class="card">
            <h3>Service history</h3>
            <dl class="kv section-gap">
              <dt>Current service</dt><dd>${svc ? esc(svcTypeLabel(svc.type)) : "No service yet"}</dd>
              <dt>Current trapper</dt><dd>${esc(svc?.techId || l.techId || c.techId ? techName(svc?.techId || l.techId || c.techId) : "Unassigned")}</dd>
              <dt>Current schedule</dt><dd>${esc(svc?.days || l.days || c.days || "—")}</dd>
            </dl>
            ${locationServices.length ? `
              <table class="mini-table location-history-table">
                <thead><tr><th>Service</th><th>Trapper</th><th>Schedule</th><th>Dates</th><th>Status</th></tr></thead>
                <tbody>${locationServices.map((s) => `
                  <tr>
                    <td>${esc(svcTypeLabel(s.type))}<div class="tiny">${Number(s.durationMin || 0)} min</div></td>
                    <td>${esc(s.techId ? techName(s.techId) : "Unassigned")}</td>
                    <td>${esc(s.days || "—")}</td>
                    <td>${esc(s.start || "—")} → ${esc(s.expires || s.cancelDate || "—")}</td>
                    <td>${svcStatusBadge(s)}</td>
                  </tr>`).join("")}</tbody>
              </table>
            ` : `<p class="muted">No service history yet.</p>`}
          </div>
          <div class="card">
            <h3>Tasks <span class="muted">${locTasks.filter((t) => t.status === "open").length} open</span></h3>
            ${taskListHtml(locTasks, "No tasks for this location.", { hideCustomer: true, manage: true })}
          </div>
        </div>
        <div class="stack">
          <div class="card customer-map-card">
            ${miniMapHtml({
              preview: [{ x: l.x, y: l.y, label: l.name, elId: "location-detail-pin" }],
              caption: l.address || gps,
              mapId: "location-detail-map",
              title: "Location map",
              showHomes: false,
              selectedLabel: l.name,
            })}
          </div>
          <div class="card">
            <h3>Billing history</h3>
            <dl class="kv section-gap">
              <dt>Program</dt><dd>${esc(prog?.name || "—")}${can("payment.viewAmount") && plan.amount ? ` · ${money(plan.amount)}` : ""}</dd>
              <dt>Plan dates</dt><dd>${esc(plan.start || "—")} → ${esc(plan.expires || "—")}</dd>
            </dl>
            ${invoices.length || locationPayments.length ? `
              <table class="mini-table location-history-table">
                <thead><tr><th>Date</th><th>Record</th><th>Amount</th><th>Method</th><th>Status</th></tr></thead>
                <tbody>
                  ${invoices.map((i) => `<tr>
                    <td>${esc(i.date || i.due || "—")}</td>
                    <td>${esc(i.id)}<div class="tiny">Invoice</div></td>
                    <td>${can("payment.viewAmount") ? money(i.amount) : "—"}</td>
                    <td>—</td>
                    <td>${statusBadge(invoiceFinStatus(i))}</td>
                  </tr>`).join("")}
                  ${locationPayments.map((p) => `<tr>
                    <td>${esc(p.date || "—")}</td>
                    <td>${esc(p.id)}<div class="tiny">Payment</div></td>
                    <td>${can("payment.viewAmount") ? money(p.amount) : "—"}</td>
                    <td>${esc(p.method || p.source || "—")}</td>
                    <td>${p.failed ? statusBadge("failed") : payNeedsMark(p) ? statusBadge("pending") : statusBadge("paid")}</td>
                  </tr>`).join("")}
                </tbody>
              </table>
            ` : `<p class="muted">No billing history yet.</p>`}
          </div>
          <div class="card">
            <h3>Recent visits</h3>
            ${visits.length ? table(["Day", "Time", "Trapper", "Duration", "Status"], visits.slice(0, 8).map((s) => [
              esc(s.day || "—"), esc(s.time || "—"), esc(techName(s.techId)), `${Number(s.actualMin ?? s.durationMin ?? 0)} min`, statusBadge(s.status),
            ])) : `<p class="muted">No visits yet.</p>`}
          </div>
          ${locDocs.length ? `<div class="card"><h3>Location documents</h3>${locDocs.map((d) => docRowHtml(d, false)).join("")}</div>` : ""}
        </div>
      </div>
    `;
  }

  function viewCustomer() {
    const c = custBy(state.selectedCustomer);
    if (!c) return `<p>Not found.</p>`;
    const showOpsNotes = state.role !== "sales";
    const showMoney = can("payment.viewAmount");
    const showProgramPrice = state.role !== "tech";
    const needsQuote = (c.locations || []).some((l) => locNeedsQuote(c, l));
    const quotedReady = (c.locations || []).some((l) => locNeedsInvoice(c, l) && !locNeedsQuote(c, l));
    const canEditCust = canEditField("name");
    const canEditLoc = can("location.add") || canEditField("address") || state.role === "owner";
    const typeLabel = { residential: "Residential", commercial: "Commercial", hoa: "HOA", municipal: "Municipal" };
    return `
      <button class="btn btn-ghost" data-act="nav" data-page="${state.role === "admin" ? "payments" : "customers"}">← ${state.role === "admin" ? "Payment register" : "Customers"}</button>
      <div class="cust-hero">
        <div>
          <h2 style="font-family:var(--display);font-size:28px;margin:8px 0 4px">${esc(c.name)}</h2>
          <p class="muted">${esc(c.id)} · Bill-To ${esc(c.billTo || c.name)} · ${statusBadge(c.status)}</p>
        </div>
        <div class="actions">
          ${needsQuote && can("quote.send") ? btn("quote.send", "Send quote", "send-quote", `data-id="${c.id}"`) : ""}
          ${(can("invoice.create") || state.role === "owner") && (c.locations || []).some((l) => canInvoiceLocation(c, l)) ? btn("invoice.create", "Send invoice to all", "open-convert", `data-id="${c.id}"`, "btn-sun") : ""}
          ${c.locations.some((l) => locNeedsService(c, l)) ? btn("service.create", "Create service", "open-service", `data-id="${c.id}"`) : ""}
          ${c.locations.some((l) => locNeedsTech(c, l)) ? btn("schedule.assign", "Assign on map", "open-assign", `data-id="${c.id}"`) : ""}
          ${c.techId && ["ops", "owner"].includes(state.role) ? btn("schedule.reassign", "Reassign on map", "open-assign", `data-id="${c.id}"`, "btn-ghost") : ""}
          ${["owner", "ops", "admin"].includes(state.role) ? btn("task.create", "Create task", "new-task", `data-id="${c.id}"`, "btn-ghost") : ""}
        </div>
      </div>
      ${needsQuote ? `<div class="notice">One quote to the Bill-To lists the programs and every property.</div>` : ""}
      ${quotedReady ? `<div class="notice">Quote is out. Send invoice to all, or send one property from its location card.</div>` : ""}
      <div class="cust-panels">
        <div class="panel-box">
          ${canEditCust ? `<button type="button" class="btn btn-ghost panel-edit" data-act="edit-billto" data-id="${c.id}">Edit Bill-To</button>` : ""}
          <div class="panel-kicker">Bill-To</div>
          <h3>${esc(c.billTo || c.name)}</h3>
          <p class="tiny">${esc(typeLabel[c.billToType || c.type] || c.type || "—")} · ${statusBadge(c.status)}${c.autoPay ? ` · <span class="badge badge-sea">Auto-pay</span>` : ""}</p>
          <dl class="kv panel-kv">
            <dt>Account</dt><dd>${esc(c.id)}</dd>
            <dt>Phone</dt><dd>${esc(c.phone || "—")}</dd>
            <dt>Mobile</dt><dd>${esc(c.mobile || "—")}</dd>
            <dt>Email</dt><dd>${esc(c.email || "—")}</dd>
            <dt>Company</dt><dd>${esc(c.company || "—")}</dd>
            ${(c.municipal || c.type === "municipal") ? `<dt>PO / hours</dt><dd>${esc(c.po || "—")} · ${muniHoursUsed(c)}/${muniPoCapHours(c) || "—"} hrs used · ${muniHoursRemaining(c) == null ? "—" : muniHoursRemaining(c) + " left"}${muniNearLimit(c) ? ` <span class="badge badge-bad">Near PO limit</span>` : ""}</dd>
            <dt>Billing</dt><dd>Pay after service · invoice ${(c.billPeriod || "preceding") === "current" ? "current" : "preceding"} month${c.hourlyRate ? ` · ${money(c.hourlyRate)}/hr` : ""}</dd>` : ""}
            <dt>SMS / Email</dt><dd>${c.acceptSms ? "SMS on" : "SMS off"} · ${c.acceptEmail === false ? "Email off" : "Email on"}</dd>
            <dt>Instructions</dt><dd>${esc(c.notes || "—")}</dd>
            ${showOpsNotes ? `<dt>Ops note</dt><dd>${esc(c.opsNote || "—")}</dd>` : ""}
          </dl>
        </div>
        <div class="panel-box panel-locs-box">
          ${canEditLoc ? `<button type="button" class="btn btn-ghost panel-edit" data-act="edit-locations" data-id="${c.id}">Edit locations</button>` : ""}
          <div class="panel-kicker">Locations</div>
          <h3>${(c.locations || []).length} propert${(c.locations || []).length === 1 ? "y" : "ies"}</h3>
          <p class="tiny">Quote → invoice → pay → ready for service.</p>
          <div class="panel-locs" data-keep-scroll="panel-locs">
            ${(c.locations || []).map((l) => {
              const plan = locPlan(c, l);
              const prog = progBy(plan.programId);
              const invs = locInvoices(c.id, l.id);
              const q = locQuote(c.id, l.id);
              const gps = l.lat != null && l.lng != null ? `${Number(l.lat).toFixed(4)}, ${Number(l.lng).toFixed(4)}` : (l.gps || approxGps(l));
              const svcs = svcsFor(c.id, l.id);
              const awaitPay = locPaymentAwaitingMark(c, l);
              const paidHere = locPaid(c, l);
              const ct = contractForLoc(c.id, l.id);
              const bp = ct ? planForContract(ct.id) : null;
              const periods = ct ? periodsForContract(ct.id) : [];
              const focusHere = state.payFocusId && awaitPay && awaitPay.id === state.payFocusId;
              const life = l.lifecycle || (paidHere ? "active" : (invs.some((i) => {
                const st = invoiceFinStatus(i);
                return st === "OPEN" || st === "PARTIAL" || st === "FAILED";
              }) ? "waiting_payment" : (q?.sent ? "quoted" : "inquiry")));
              const canGenNext = bp && bp.frequency === "monthly" && periods.length < (bp.installments || 12) && (can("invoice.create") || state.role === "owner");
              const onAutopay = locHasAutopay(c, l);
              const apaFail = (state.data.autopayAuthorizations || []).some((a) => a.status === "FAILED" && a.customerId === c.id && a.locationId === l.id);
              return `<div class="panel-loc ${l.covered === false ? "unpaid" : ""} ${awaitPay || life === "waiting_payment" || locNeedsService(c, l) || locNeedsTech(c, l) || apaFail ? "need" : ""} ${focusHere ? "pay-focus" : ""}">
                <div class="panel-loc-top">
                  <strong>${esc(l.name)}</strong>
                  ${ct ? statusBadge(ct.status) : lifecycleBadge(life)}
                  ${onAutopay ? `<span class="badge badge-sea">AutoPay ON</span>` : ""}
                  ${apaFail ? `<span class="badge badge-bad">AutoPay failed</span>` : ""}
                  ${paidHere && !(svcFor(c.id, l.id) && svcIsContinuing(svcFor(c.id, l.id))) ? `<span class="badge badge-ok">Ready for service</span>` : ""}
                  ${paidHere && svcFor(c.id, l.id) && svcIsContinuing(svcFor(c.id, l.id)) && locIsMonthlyPlan(c, l) ? `<span class="badge badge-sea">Monthly · service live</span>` : ""}
                  ${paidHere && svcFor(c.id, l.id) && svcIsContinuing(svcFor(c.id, l.id)) && !locIsMonthlyPlan(c, l) ? `<span class="badge badge-ok">Service live</span>` : ""}
                  ${awaitPay ? `<span class="badge badge-warn">Unallocated · ${money(awaitPay.amount)} · ${esc(awaitPay.method)}</span>` : ""}
                  ${!paidHere && !awaitPay && l.covered === false ? `<span class="badge badge-bad">Unpaid</span>` : ""}
                  ${locNeedsQuote(c, l) ? `<span class="badge badge-warn">Needs quote</span>` : ""}
                  ${!locNeedsQuote(c, l) && locNeedsInvoice(c, l) ? `<span class="badge badge-sea">Ready to invoice</span>` : ""}
                  ${locNeedsService(c, l) ? `<span class="badge badge-warn">Needs service</span>` : ""}
                  ${locNeedsTech(c, l) ? `<span class="badge badge-sea">Needs technician</span>` : ""}
                </div>
                <div class="tiny">${esc(l.address)}</div>
                <div class="tiny">GPS ${esc(gps)}${l.subdivision ? ` · ${esc(l.subdivision)}` : ""}</div>
                <div class="tiny"><strong>Contract</strong> ${ct ? `${esc(ct.id)} · ${esc(ct.program || "")} · ${esc(ct.startDate || "")} → ${esc(ct.endDate || "")}` : "None yet"}</div>
                <div class="tiny"><strong>Billing plan</strong> ${esc(billingPlanLabel(l))}${onAutopay ? " · AutoPay charges & allocates overnight — Christy does not mark those lines" : ""}</div>
                ${apaFail ? `<div class="tiny" style="color:var(--bad,#b42318)">Declined: call them, take external pay, allocate, then generate the next period by hand. Rick can stop service if they won’t pay.</div>` : ""}
                ${billingPeriodLabel(l) ? `<div class="tiny">${esc(billingPeriodLabel(l))}</div>` : ""}
                ${periods.length ? `<div class="tiny" style="margin-top:6px"><strong>Periods</strong></div>
                  <table class="mini-table"><thead><tr><th>#</th><th>Dates</th><th>Amt</th><th>Inv</th><th>Status</th></tr></thead><tbody>
                  ${periods.map((p) => `<tr><td>${p.sequence}</td><td>${esc(p.periodStart)} → ${esc(p.periodEnd)}</td><td>${money(p.amount)}</td><td>${esc(p.invoiceId || "—")}</td><td>${esc(p.status)}</td></tr>`).join("")}
                  </tbody></table>` : ""}
                <div class="tiny" style="margin-top:6px"><strong>Invoices</strong> ${invs.length ? invs.map((i) => {
                  const st = invoiceFinStatus(i);
                  return `${esc(i.id)} ${st} · paid ${money(allocated(i.id))} · bal ${money(invoiceBalance(i))}`;
                }).join("; ") : "None"}</div>
                ${(() => {
                  const locPays = (state.data.payments || []).filter((p) => p.customerId === c.id && p.locationId === l.id)
                    .sort((a, b) => String(b.date).localeCompare(String(a.date)));
                  if (!locPays.length || !showMoney) return "";
                  return `<div class="tiny" style="margin-top:6px"><strong>Payment history</strong></div>
                    <table class="mini-table"><thead><tr><th>Date</th><th>Amt</th><th>Alloc</th><th>Method</th><th>Status</th></tr></thead><tbody>
                    ${locPays.slice(0, 5).map((p) => {
                      const st = p.failed ? "Failed" : payNeedsMark(p) ? "Awaiting" : "Allocated";
                      return `<tr><td>${esc(p.date)}</td><td>${money(p.amount)}</td><td>${money(paymentAllocatedAmount(p.id))}</td><td>${esc(p.method || "—")}</td><td>${esc(st)}</td></tr>`;
                    }).join("")}
                    </tbody></table>
                    ${locPays.length > 5 ? `<div class="tiny">+${locPays.length - 5} more on Bill-To payment history below</div>` : ""}`;
                })()}
                <div class="tiny">Quote: ${q?.sent ? `Sent ${esc(q.date || "")}` : "Not yet"} · Plan dates: ${plan.programId ? `${esc(prog?.name || plan.programId)}${showProgramPrice ? ` · ${money(plan.amount)}` : ""}${plan.start ? ` · ${esc(plan.start)} → ${esc(plan.expires || "—")}` : ""}` : (q?.sent ? "On quote" : "No plan yet")}</div>
                <div class="tiny">${svcs.length ? svcs.map((s) => {
                  const sch = SERVICE_SCHEDULES.find((x) => x.id === s.schedule)?.label || s.days || "—";
                  const label = s.techId ? `${techName(s.techId)} · ${sch}` : `Setup · ${sch}`;
                  if (["ops", "owner"].includes(state.role) && canEditService() && svcIsContinuing(s)) {
                    return `<button class="btn btn-ghost linkish" data-act="edit-service" data-id="${s.id}">${esc(label)} · edit</button>`;
                  }
                  return esc(label);
                }).join(" · ") : "No service yet"}</div>
                <div class="actions" style="margin-top:8px">
                  ${(() => {
                    if (!can("payment.post") || state.role === "ops") return "";
                    if (!awaitPay) return "";
                    const inv = locInvoiceForMark(c, l, awaitPay);
                    if (!inv) return "";
                    return btn("payment.post", "Allocate payment", "open-record-pay", `data-id="${inv.id}" data-pay="${awaitPay.id}"`, "btn-sun");
                  })()}
                  ${(() => {
                    if (!(can("invoice.create") || can("invoice.send") || state.role === "owner")) return "";
                    const draft = invs.find((i) => i.status === "draft");
                    const open = invs.find((i) => {
                      const st = invoiceFinStatus(i);
                      return st === "OPEN" || st === "PARTIAL" || st === "FAILED";
                    });
                    if (draft) return btn("invoice.send", "Send invoice", "send-invoice", `data-id="${draft.id}"`);
                    if (open) return `<button class="btn btn-ghost" data-act="send-invoice" data-id="${open.id}">View invoice</button>`;
                    if (!canInvoiceLocation(c, l)) return "";
                    return btn("invoice.create", "Accept / send invoice", "invoice-one-loc", `data-id="${c.id}" data-loc="${l.id}"`, "btn-sun");
                  })()}
                  ${canGenNext ? `<button class="btn btn-ghost" data-act="generate-next-period" data-id="${c.id}" data-loc="${l.id}">Generate next period${apaFail || !onAutopay ? "" : " (manual)"}</button>` : ""}
                  ${onAutopay && (can("payment.post") || state.role === "owner") ? `
                    <button class="btn btn-sun" data-act="run-autopay" data-id="${c.id}" data-loc="${l.id}">Simulate AutoPay success</button>
                    <button class="btn btn-ghost" data-act="run-autopay-fail" data-id="${c.id}" data-loc="${l.id}">Simulate decline</button>
                  ` : ""}
                  ${(c.municipal || c.type === "municipal") && (can("invoice.create") || state.role === "owner") ? `<button class="btn btn-ghost" data-act="manual-invoice" data-id="${c.id}" data-loc="${l.id}">Manual invoice</button>` : ""}
                  ${locNeedsService(c, l) ? btn("service.create", "Create service", "open-service", `data-id="${c.id}" data-loc="${l.id}"`) : ""}
                  ${locNeedsTech(c, l) ? btn("schedule.assign", "Assign on map", "open-assign", `data-id="${c.id}" data-loc="${l.id}"`) : ""}
                  ${(() => {
                    const live = svcs.filter(svcIsContinuing);
                    if (!live.length || !["ops", "owner"].includes(state.role)) return "";
                    return `
                      ${btn("schedule.reassign", "Reassign trapper", "open-assign", `data-id="${c.id}" data-loc="${l.id}"`, "btn-ghost")}
                      ${can("service.create") || can("schedule.assign") ? `<button class="btn btn-ghost" data-act="share-property" data-id="${c.id}" data-loc="${l.id}">Share · add trapper</button>` : ""}
                    `;
                  })()}
                  ${(() => {
                    const live = svcs.find(svcIsContinuing);
                    if (!live || !can("service.stop")) return "";
                    if (!(apaFail || c.failedPayment || l.lifecycle === "past_due")) return "";
                    return btn("service.stop", "Stop service", "stop-service", `data-id="${live.id}"`, "btn-sun");
                  })()}
                </div>
              </div>`;
            }).join("") || `<p class="muted">No properties yet.</p>`}
          </div>
        </div>
      </div>
      <div class="split section-gap">
        <div class="stack">
          ${locationPreviewCard(c)}
        </div>
        <div class="stack">
          ${showMoney ? billingCard(c) : ""}
          ${state.role === "sales" ? "" : commCard(c)}
        </div>
      </div>
      ${showMoney ? paymentHistoryCard(c) : ""}
      ${["ops", "owner", "admin"].includes(state.role) ? customerDocumentsCard(c) : ""}
      ${["ops", "owner"].includes(state.role) ? serviceHistoryCard(c) : ""}
      ${["owner", "ops", "admin"].includes(state.role) ? customerTasksCard(c) : ""}
    `;
  }

  function customerDocumentsCard(c) {
    const docs = docsForCustomer(c.id).slice().sort((a, b) => String(b.date).localeCompare(String(a.date)));
    return `
      <div class="card section-gap">
        <div class="actions" style="justify-content:space-between;align-items:center;margin-bottom:8px">
          <h3 style="margin:0">Documents <span class="muted">${docs.length}</span></h3>
          ${btn("docs.upload", "Attach file", "upload-doc", `data-id="${c.id}"`, "btn-ghost")}
        </div>
        <p class="tiny">Choose a file and attach it to this Bill-To.</p>
        ${docs.length ? docs.map((d) => docRowHtml(d, false)).join("") : `<p class="muted">No files on this account yet.</p>`}
      </div>
    `;
  }

  function serviceHistoryCard(c) {
    const list = servicesForCustomer(c.id);
    const continuing = list.filter(svcIsContinuing);
    const stops = (state.data.stops || [])
      .filter((s) => s.customerId === c.id && s.type !== "oneoff")
      .slice()
      .sort((a, b) => String(b.day || "").localeCompare(String(a.day || "")) || String(a.time || "").localeCompare(String(b.time || "")));
    const canEdit = canEditService();
    return `
      <div class="card section-gap">
        <h3>Service history <span class="muted">${continuing.length} continuing</span></h3>
        <p class="tiny">All services under Bill-To ${esc(c.billTo || c.name)}. Click a continuing service to edit it or reassign the trapper.</p>
        ${list.length ? `
          <table class="mini-table" style="width:100%;font-size:13px">
            <thead><tr><th>Property</th><th>Program</th><th>Trapper</th><th>Schedule</th><th>Dates</th><th>Status</th><th></th></tr></thead>
            <tbody>
              ${list.map((s) => {
                const loc = locBy(c.id, s.locationId);
                const sch = SERVICE_SCHEDULES.find((x) => x.id === s.schedule)?.label || s.days || "—";
                const live = svcIsContinuing(s);
                const rowClick = live && canEdit
                  ? `class="svc-row clickable" data-act="edit-service" data-id="${s.id}" style="cursor:pointer"`
                  : "";
                return `<tr ${rowClick}>
                  <td><strong>${esc(loc?.name || "—")}</strong><div class="tiny">${esc(loc?.address || "")}</div></td>
                  <td>${esc(svcTypeLabel(s.type))}</td>
                  <td>${esc(s.techId ? techName(s.techId) : "Unassigned")}</td>
                  <td>${esc(sch)} · ${s.durationMin || "—"}m</td>
                  <td class="tiny">${esc(s.start || "—")} → ${esc(s.expires || "—")}</td>
                  <td>${svcStatusBadge(s)}</td>
                  <td>${live && canEdit
                    ? `<div class="actions">
                        <button class="btn btn-sun" data-act="edit-service" data-id="${s.id}">Edit / reassign</button>
                        ${can("service.stop") ? `<button class="btn btn-ghost" data-act="stop-service" data-id="${s.id}">Stop</button>` : ""}
                      </div>`
                    : (live ? `<span class="tiny">Active</span>` : `<span class="tiny">History</span>`)}</td>
                </tr>`;
              }).join("")}
            </tbody>
          </table>
        ` : `<p class="muted">No services on this Bill-To yet.</p>`}
        ${stops.length ? `
          <h3 style="margin-top:18px;font-size:15px">Recent visits</h3>
          <table class="mini-table" style="width:100%">
            <thead><tr><th>Day</th><th>Time</th><th>Property</th><th>Trapper</th><th>Min</th><th>Status</th></tr></thead>
            <tbody>
              ${stops.slice(0, 12).map((s) => {
                const loc = locBy(c.id, s.locationId);
                return `<tr>
                  <td>${esc(s.day || "—")}</td>
                  <td>${esc(s.time || "—")}</td>
                  <td>${esc(loc?.name || "—")}</td>
                  <td>${esc(techName(s.techId))}</td>
                  <td>${s.actualMin != null ? s.actualMin : s.durationMin || "—"}</td>
                  <td>${statusBadge(s.status)}</td>
                </tr>`;
              }).join("")}
            </tbody>
          </table>
        ` : ""}
        ${c.locations.some((l) => locNeedsService(c, l)) && can("service.create")
          ? `<div class="actions" style="margin-top:12px">${btn("service.create", "Create service", "open-service", `data-id="${c.id}"`)}</div>`
          : ""}
      </div>
    `;
  }

  function customerTasksCard(c) {
    const list = tasksForCustomer(c.id);
    const openN = list.filter((t) => t.status === "open").length;
    return `
      <div class="card section-gap">
        <h3>Tasks <span class="muted">${openN} open</span></h3>
        <p class="tiny">Tom, Rick, and Christy assign work to each other about this Bill-To.</p>
        ${taskListHtml(list, "No tasks on this customer yet.")}
        <div class="actions" style="margin-top:12px">
          ${btn("task.create", "Create task", "new-task", `data-id="${c.id}"`)}
          <button class="btn btn-ghost" data-act="nav" data-page="tasks">All tasks</button>
        </div>
      </div>
    `;
  }

  function locationPreviewCard(c, selectedLocationId) {
    const locs = c.locations || [];
    const selected = locs.find((l) => l.id === selectedLocationId) || locs[0] || null;
    const others = locs.filter((l) => l.id !== selected?.id);
    return miniMapHtml({
      existing: others.map((l) => ({ x: l.x, y: l.y, label: l.name, color: locPinColor(c, l), action: "select-customer-location", customerId: c.id, locationId: l.id })),
      preview: selected ? [{ x: selected.x, y: selected.y, label: selected.name, elId: "cust-selected-pin", action: "select-customer-location", customerId: c.id, locationId: selected.id }] : [],
      caption: selected ? (selected.address || "No address") : "No pin yet",
      selectedLabel: selected?.name || "",
      title: "Customer locations",
      mapId: "customer-locations-map",
      showHomes: false,
    });
  }

  function paymentHistoryCard(c) {
    const pays = (state.data.payments || [])
      .filter((p) => p.customerId === c.id)
      .slice()
      .sort((a, b) => String(b.date).localeCompare(String(a.date)) || String(b.id).localeCompare(String(a.id)));
    const totalIn = pays.filter((p) => !p.failed).reduce((s, p) => s + Number(p.amount || 0), 0);
    const totalAlloc = pays.filter((p) => !p.failed).reduce((s, p) => s + paymentAllocatedAmount(p.id), 0);
    const rows = pays.map((p) => {
      const loc = p.locationId ? locBy(c.id, p.locationId) : null;
      const alloc = paymentAllocatedAmount(p.id);
      const src = String(p.source || "").toUpperCase() || (payIsLink(p) ? "ONLINE" : "EXTERNAL");
      const ref = p.last4 ? (String(p.last4).length <= 4 ? "····" + p.last4 : p.last4) : (p.checkNo || "—");
      let status;
      if (p.failed) status = statusBadge("failed");
      else if (payNeedsMark(p)) status = `<span class="badge badge-warn">Awaiting allocation</span>`;
      else status = `<span class="badge badge-ok">Allocated</span>`;
      const acts = [];
      if (can("payment.post") && payNeedsMark(p) && p.invoiceId) {
        acts.push(btn("payment.post", "Allocate", "open-record-pay", `data-id="${p.invoiceId}" data-pay="${p.id}"`, "btn-sun"));
      }
      if (can("payment.post")) {
        acts.push(`<button class="btn btn-ghost" data-act="edit-memo" data-id="${p.id}">Memo</button>`);
      }
      return [
        esc(p.date),
        esc(loc?.name || "—"),
        esc(p.invoiceId || "—"),
        money(p.amount),
        money(alloc),
        esc(p.method || "—"),
        esc(ref),
        esc(src),
        status,
        `<span class="tiny">${esc(p.memo || "—")}</span>`,
        acts.join(" ") || "—",
      ];
    });
    return `
      <div class="card section-gap">
        <h3>Payment history</h3>
        <p class="tiny">All payments for Bill-To ${esc(c.billTo || c.name)}. Posted amounts stay on the register; allocation shows how much hit each invoice.</p>
        <div class="grid-3" style="margin-bottom:12px">
          ${stat("Payments", pays.length, "On this Bill-To")}
          ${stat("Posted", money(totalIn), "Excludes declined")}
          ${stat("Allocated", money(totalAlloc), "Applied to invoices")}
        </div>
        ${pays.length
          ? table(["Date", "Property", "Invoice", "Amount", "Allocated", "Method", "Ref", "Source", "Status", "Memo", ""], rows)
          : `<p class="muted">No payments on this account yet.</p>`}
        ${can("payment.post") ? `<div class="actions" style="margin-top:12px">${btn("payment.post", "Record payment", "new-pay", `data-id="${c.id}"`, "btn-ghost")}</div>` : ""}
      </div>
    `;
  }

  function billingCard(c) {
    const inv = state.data.invoices.filter((i) => i.customerId === c.id);
    const pays = state.data.payments.filter((p) => p.customerId === c.id);
    const rows = [...inv.map((i) => {
      const st = invoiceFinStatus(i);
      return { when: i.sent || i.paidOn || "—", kind: st === "FAILED" ? "bad" : st === "PAID" ? "ok" : "warn", text: `Invoice ${i.id} · ${invProperty(i)} · ${money(i.amount)} · paid ${money(allocated(i.id))} · bal ${money(invoiceBalance(i))} · ${st}` };
    }),
    ...pays.map((p) => ({ when: p.date, kind: p.failed ? "bad" : payNeedsMark(p) ? "warn" : "ok", text: `Payment ${money(p.amount)} · alloc ${money(paymentAllocatedAmount(p.id))} · ${p.method} · ${p.memo}` }))]
      .sort((a, b) => String(b.when).localeCompare(String(a.when)));
    return `
      <div class="card billing-timeline-card">
        <h3>Billing timeline</h3>
        <p class="tiny">Bill-To is ${esc(c.billTo || c.name)}. Balances come from payment allocations.</p>
        <div class="timeline" data-keep-scroll="billing-tl">
          ${rows.map((t) => `
              <div class="tl-item">
                <div class="when">${esc(t.when)}</div>
                <div class="tl-rail"><i class="${t.kind === "bad" ? "bad" : t.kind === "warn" ? "warn" : ""}"></i></div>
                <div>${esc(t.text)}</div>
              </div>
            `).join("") || `<p class="muted">No billing yet.</p>`}
        </div>
      </div>
    `;
  }

  function commCard(c) {
    const items = state.data.comms.filter((x) => x.customerId === c.id);
    return `
      <div class="card comm-log-card">
        <h3>Communication log</h3>
        <div class="comm-log-list" data-keep-scroll="comm-log">
          ${items.map((x) => `<div class="comm-item"><strong>${esc(x.who)}</strong> · ${esc(x.channel)} · ${esc(x.date)}<div>${esc(x.text)}</div></div>`).join("") || `<p class="muted">No correspondence yet.</p>`}
        </div>
        ${state.role !== "tech" ? `
          <div class="comm-log-compose">
            <div class="field section-gap"><label>Add a note</label>
              <select id="comm-channel"><option>Office</option><option>Phone</option><option>Email</option><option>Text</option></select>
            </div>
            <div class="field"><textarea id="comm-text" rows="2" placeholder="Call, email, or office note — stays on this account"></textarea></div>
            <button class="btn btn-primary" data-act="add-comm" data-id="${c.id}">Save to log</button>
          </div>
        ` : ""}
      </div>
    `;
  }

  function viewQuotes() {
    const rows = state.data.quotes.map((q) => {
      const c = custBy(q.customerId);
      const programCell = !q.sent && can("quote.send")
        ? `<span class="tiny">Not sent</span>`
        : (q.programId ? (progBy(q.programId)?.name || "—") : (q.sent ? "Programs listed — awaiting choice" : "—"));
      return [q.id, custBtn(q.customerId, c?.billTo || c?.name || "—"), esc(quotePropertyLabel(q)), programCell, q.sent ? statusBadge("sent") : statusBadge("draft"), q.date,
        q.sent ? (q.programId ? "Client chose" : "Waiting on client") : btn("quote.send", "Preview & send", "send-quote", `data-id="${q.customerId}"`)];
    });
    return `
      ${head("Quotes", "One quote per Bill-To. List the programs and properties. After they pick, invoice each property.")}
      ${table(["Quote", "Bill-To", "Properties", "Program", "Status", "Date", ""], rows)}
    `;
  }

  /* ---------- Ops ---------- */
  function viewSchedule() {
    const genQ = opsGenerateQueue();
    const toggle = `
      <div class="seg" style="margin-bottom:14px">
        <button class="${state.schedView === "week" ? "on" : ""}" data-act="sched-view" data-view="week">Weekly</button>
        <button class="${state.schedView === "month" ? "on" : ""}" data-act="sched-view" data-view="month">Monthly</button>
      </div>`;
    return `
      ${head("Schedule", "This week’s board. Monthly shows standing routes. Stops show up after you assign on the map.")}
      ${writeBar("schedule.reassign", "Reassign")}
      ${genQ.length ? `<div class="notice">${genQ.length} assigned service(s) are not on this board yet. ${btn("schedule.generate", "Generate now", "generate-schedule")}</div>` : ""}
      ${toggle}
      <div class="notice">Routes start and end at the tech’s home — no depot. Company blackouts: ${state.data.holidays.map(esc).join(", ")}. Reassign moves the stop; it doesn’t copy it.</div>
      ${state.schedView === "month" ? monthCalendar() : weekBoard()}
      <div class="card section-gap">
        <h3>Visit notices · 2 days before</h3>
        <p class="tiny">Templated text/email. The customer cannot reply to the system message. Friday’s remaining stops would have been notified Wednesday.</p>
        ${table(["When", "Customer", "Tech", "Notice"], state.data.stops.filter((s) => s.day === "Fri" && !s.pending).map((s) => [s.day + " " + (s.time || ""), stopLabel(s), techName(s.techId), s.noticed ? "Sent" : "Queued — no-reply template"]))}
        <div class="actions" style="margin-top:10px">${btn("schedule.assign", "Send Friday notices", "send-notices", "", "btn-ghost")}</div>
      </div>
    `;
  }

  function optimizerLimitField(id, label, unit, placeholder = "No limit") {
    const key = id.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    const current = state.optimizerPreview?.config?.limits?.[key] || "";
    return `<div class="field"><label for="opt-${id}">${esc(label)}</label><div class="opt-input-unit"><input id="opt-${id}" type="number" min="0" step="1" value="${esc(current)}" placeholder="${esc(placeholder)}"><span>${esc(unit)}</span></div></div>`;
  }

  function optimizerSummary(preview) {
    const saved = preview.beforeDrive - preview.afterDrive;
    return `
      <div class="opt-summary">
        <div class="stat"><span>Stops reviewed</span><strong>${preview.stopCount}</strong></div>
        <div class="stat"><span>Routes</span><strong>${preview.routeCount}</strong></div>
        <div class="stat"><span>Drive before</span><strong>${fmtDur(preview.beforeDrive)}</strong></div>
        <div class="stat"><span>Drive after</span><strong>${fmtDur(preview.afterDrive)}</strong><small class="${saved >= 0 ? "good" : "bad"}">${saved >= 0 ? `${fmtDur(saved)} saved` : `${fmtDur(Math.abs(saved))} added`}</small></div>
        <div class="stat"><span>Unreachable</span><strong>${preview.unreachable}</strong></div>
      </div>`;
  }

  function optimizerResultRow(route) {
    const reachable = route.optimized.length;
    const saved = route.beforeDrive - route.afterDrive;
    return `
      <div class="opt-route-row">
        <div>
          <strong>${esc(techName(route.techId))}</strong>
          <div class="tiny">${esc(route.day)} · ${esc(route.date)}</div>
        </div>
        <div><span class="tiny">Jobs</span><strong>${reachable}</strong></div>
        <div><span class="tiny">Service</span><strong>${fmtDur(route.serviceMin)}</strong></div>
        <div><span class="tiny">Working</span><strong>${fmtDur(route.workingMin)}</strong></div>
        <div><span class="tiny">Drive</span><strong>${fmtDur(route.beforeDrive)} → ${fmtDur(route.afterDrive)}</strong><small class="${saved >= 0 ? "good" : "bad"}">${saved >= 0 ? "Shorter" : "Longer"}</small></div>
        <div><span class="tiny">Production</span><strong>${money(route.production)}</strong></div>
        <div>${route.unreachableIds.length ? `<span class="badge badge-bad">${route.unreachableIds.length} unreachable</span>` : `<span class="badge badge-ok">All fit</span>`}${route.warnings.map((w) => `<div class="tiny opt-warning">${esc(w)}</div>`).join("")}</div>
        <button class="btn btn-ghost" data-act="optimizer-detail" data-date="${esc(route.date)}" data-tech="${esc(route.techId)}">Route details</button>
      </div>`;
  }

  function viewOptimizer() {
    const preview = state.optimizerPreview;
    return `
      ${head("Multi-Day Route Optimizer", "Build a route preview across several days. Nothing moves on the live schedule until you commit it.")}
      ${writeBar("schedule.optimize", "Optimize routes")}
      <div class="card opt-setup">
        <div class="opt-fields">
          <div class="field"><label for="opt-start">Start date</label><input id="opt-start" type="date" value="${esc(preview?.config.startDate || DAY_DATES.Tue)}"></div>
          <div class="field"><label for="opt-end">End date</label><input id="opt-end" type="date" value="${esc(preview?.config.endDate || DAY_DATES.Wed)}"></div>
          <div class="field"><label for="opt-tech">Trapper</label><select id="opt-tech"><option value="all">All trappers</option>${TECHS.map((t) => `<option value="${t.id}" ${preview?.config.techId === t.id ? "selected" : ""}>${esc(t.name)}</option>`).join("")}</select></div>
        </div>
        <div class="opt-locks">
          <label class="check-row"><input id="opt-keep-date" type="checkbox" ${preview?.config.keepDate !== false ? "checked" : ""}> Keep each stop on its current date</label>
          <label class="check-row"><input id="opt-keep-tech" type="checkbox" ${preview?.config.keepTech !== false ? "checked" : ""}> Keep each stop with its current trapper</label>
        </div>
        <details class="opt-limits">
          <summary>Daily route limits <span class="tiny">Optional · applied to each trapper and day</span></summary>
          <div class="opt-limit-grid">
            ${optimizerLimitField("leave-open", "Leave open", "min")}
            ${optimizerLimitField("min-jobs", "Minimum jobs", "jobs")}
            ${optimizerLimitField("max-jobs", "Maximum jobs", "jobs")}
            ${optimizerLimitField("max-service", "Maximum service", "min")}
            ${optimizerLimitField("max-working", "Maximum working", "min")}
            ${optimizerLimitField("max-drive", "Maximum drive", "min")}
            ${optimizerLimitField("min-production", "Minimum production", "$")}
            ${optimizerLimitField("max-production", "Maximum production", "$")}
          </div>
        </details>
        <div class="actions opt-actions">
          <button class="btn btn-primary" data-act="optimizer-run">Start Optimization</button>
          <button class="btn btn-ghost" data-act="optimizer-history">View Run History</button>
        </div>
      </div>
      ${preview ? `
        <div class="opt-results">
          <div class="opt-results-head">
            <div><h2>Optimization preview</h2><p class="muted">Review every route and any stops that could not fit.</p></div>
            <span class="badge badge-warn">Not committed</span>
          </div>
          ${optimizerSummary(preview)}
          <div class="card opt-route-list">
            ${preview.routes.map(optimizerResultRow).join("") || `<p class="muted">No scheduled stops matched these dates and trappers.</p>`}
          </div>
          <div class="actions opt-commit-bar">
            <button class="btn btn-primary" data-act="optimizer-commit" ${preview.stopCount ? "" : "disabled"}>Commit This Run</button>
            <button class="btn btn-ghost" data-act="optimizer-clear">Discard Preview</button>
          </div>
        </div>
      ` : ""}
    `;
  }

  function openOptimizerDetail(date, techId) {
    const preview = state.optimizerPreview;
    const route = preview?.routes.find((r) => r.date === date && r.techId === techId);
    if (!route) return;
    const current = route.originalStopIds.map((id) => state.data.stops.find((s) => s.id === id)).filter(Boolean);
    const optimized = route.optimized.map((x) => ({ ...state.data.stops.find((s) => s.id === x.id), optimizedTime: x.time })).filter((s) => s.id);
    const unreachable = route.unreachableIds.map((id) => state.data.stops.find((s) => s.id === id)).filter(Boolean);
    const orderList = (rows, optimizedOrder = false) => rows.map((s, i) => `
      <div class="opt-stop-row">
        <span class="opt-order">${i + 1}</span>
        <div><strong>${esc(stopLabel(s))}</strong><div class="tiny">${esc(optimizedOrder ? s.optimizedTime : s.time)} · ${Number(s.durationMin || 0)} min</div></div>
        ${optimizedOrder ? `<button class="btn btn-ghost btn-small" data-act="optimizer-anchor" data-date="${esc(date)}" data-tech="${esc(techId)}" data-stop="${esc(s.id)}">${route.anchorId === s.id ? "Starting here" : "Optimize from here"}</button>` : ""}
      </div>`).join("") || `<p class="muted">No stops.</p>`;
    state.modal = {
      wide: true,
      html: `
        <div class="modal-head"><div><h3>${esc(techName(techId))} · ${esc(route.day)} route</h3><p class="muted">${esc(date)} · starts and ends at ${esc(techBy(techId)?.home || "home")}</p></div><button class="icon-btn" data-act="close-modal">×</button></div>
        <div class="opt-compare">
          <div><h4>Current order</h4>${orderList(current)}</div>
          <div><h4>Optimized order</h4>${orderList(optimized, true)}</div>
        </div>
        ${unreachable.length ? `<div class="notice locked section-gap"><strong>Unreachable</strong><p class="tiny">These stay on their original schedule when this run is committed.</p>${unreachable.map((s) => `<div>${esc(stopLabel(s))} · ${esc(s.time)}</div>`).join("")}</div>` : ""}
        <div class="actions section-gap"><button class="btn btn-primary" data-act="close-modal">Done</button></div>`,
    };
    render();
  }

  function openOptimizerHistory() {
    const rows = (state.data.optimizerRuns || []).slice().reverse();
    state.modal = {
      wide: true,
      html: `
        <div class="modal-head"><div><h3>Optimizer run history</h3><p class="muted">Previous previews and committed route changes.</p></div><button class="icon-btn" data-act="close-modal">×</button></div>
        <div class="opt-history">
          ${rows.map((run) => `
            <div class="opt-history-row">
              <div><strong>${esc(run.id)}</strong><div class="tiny">${esc(run.createdAt)} · ${esc(run.createdBy || "Rick Torgerson")}</div></div>
              <div><span class="tiny">Dates</span><strong>${esc(run.startDate)} → ${esc(run.endDate)}</strong></div>
              <div><span class="tiny">Stops</span><strong>${Number(run.stopCount || 0)}</strong></div>
              <div><span class="tiny">Drive</span><strong>${fmtDur(run.beforeDrive)} → ${fmtDur(run.afterDrive)}</strong></div>
              <div>${run.unreachable ? `<span class="badge badge-bad">${run.unreachable} unreachable</span>` : `<span class="badge badge-ok">All fit</span>`}</div>
              <span class="badge ${run.committed ? "badge-ok" : "badge-mute"}">${run.committed ? "Committed" : "Preview only"}</span>
            </div>`).join("") || `<p class="muted">No optimizer runs yet.</p>`}
        </div>
        <div class="actions section-gap"><button class="btn btn-primary" data-act="close-modal">Close</button></div>`,
    };
    render();
  }

  function readOptimizerConfig() {
    let startDate = val("opt-start") || DAY_DATES.Tue;
    let endDate = val("opt-end") || DAY_DATES.Wed;
    if (startDate > endDate) [startDate, endDate] = [endDate, startDate];
    const numberValue = (id) => {
      const raw = val(id);
      return raw === "" ? null : Math.max(0, Number(raw) || 0);
    };
    return {
      startDate,
      endDate,
      techId: val("opt-tech") || "all",
      keepDate: checked("opt-keep-date"),
      keepTech: checked("opt-keep-tech"),
      limits: {
        leaveOpen: numberValue("opt-leave-open"),
        minJobs: numberValue("opt-min-jobs"),
        maxJobs: numberValue("opt-max-jobs"),
        maxService: numberValue("opt-max-service"),
        maxWorking: numberValue("opt-max-working"),
        maxDrive: numberValue("opt-max-drive"),
        minProduction: numberValue("opt-min-production"),
        maxProduction: numberValue("opt-max-production"),
      },
    };
  }

  function compactOptimizerRun(preview) {
    return {
      id: preview.id,
      createdAt: preview.createdAt,
      createdBy: preview.createdBy,
      startDate: preview.config.startDate,
      endDate: preview.config.endDate,
      techIds: preview.config.techIds,
      stopCount: preview.stopCount,
      routeCount: preview.routeCount,
      beforeDrive: preview.beforeDrive,
      afterDrive: preview.afterDrive,
      unreachable: preview.unreachable,
      committed: !!preview.committed,
      routes: preview.routes.map((r) => ({
        date: r.date,
        day: r.day,
        techId: r.techId,
        jobs: r.optimized.length,
        unreachable: r.unreachableIds.length,
        beforeDrive: r.beforeDrive,
        afterDrive: r.afterDrive,
      })),
    };
  }

  function saveOptimizerRun(preview) {
    const record = compactOptimizerRun(preview);
    const index = state.data.optimizerRuns.findIndex((r) => r.id === preview.id);
    if (index >= 0) state.data.optimizerRuns[index] = record;
    else state.data.optimizerRuns.push(record);
    persist();
  }

  function runOptimizer(config, existingId) {
    const dates = optimizerDates(config.startDate, config.endDate);
    if (!dates.length) {
      toast("Choose dates in the demo week: 24–28 Aug 2026.");
      return;
    }
    const preview = buildOptimizerPreview(config);
    if (existingId) {
      preview.id = existingId;
      preview.createdAt = state.optimizerPreview?.createdAt || preview.createdAt;
    }
    state.optimizerPreview = preview;
    saveOptimizerRun(preview);
    render();
  }

  function anchorOptimizerRoute(date, techId, stopId) {
    const preview = state.optimizerPreview;
    if (!preview) return;
    state.optimizerAnchors[`${date}:${techId}`] = stopId;
    state.modal = null;
    runOptimizer(preview.config, preview.id);
    openOptimizerDetail(date, techId);
  }

  function commitOptimizerRun() {
    const preview = state.optimizerPreview;
    if (!preview || !preview.stopCount) return;
    const unreachable = new Set(preview.routes.flatMap((r) => r.unreachableIds));
    let changed = 0;
    preview.routes.forEach((route) => {
      route.optimized.forEach((item) => {
        if (unreachable.has(item.id)) return;
        const stop = state.data.stops.find((s) => s.id === item.id);
        if (!stop) return;
        stop.techId = route.techId;
        stop.day = route.day;
        stop.time = item.time;
        changed += 1;
      });
    });
    preview.committed = true;
    saveOptimizerRun(preview);
    state.optimizerPreview = null;
    state.optimizerAnchors = {};
    persist();
    toast(`${changed} stop${changed === 1 ? "" : "s"} committed. ${preview.unreachable ? `${preview.unreachable} stayed on the original schedule.` : "All stops fit."}`);
    render();
  }

  function weekBoard() {
    const cells = TECHS.map((t) => {
      const row = DAYS.map((d) => {
        const stops = state.data.stops.filter((s) => s.techId === t.id && s.day === d && !s.pending);
        return `<div>${stops.map(stopChip).join("") || `<span class="tiny">—</span>`}</div>`;
      }).join("");
      return `<div class="tech-name">${esc(t.name)}<div class="tiny">${esc(t.home)}</div></div>${row}`;
    }).join("");
    return `
      <p class="tiny" style="margin-bottom:8px">Week of 24 Aug 2026 — this week’s live stops.</p>
      <div class="week">
        <div></div>
        ${DAYS.map((d) => `<div class="head">${d}<div class="tiny">${DAY_DATES[d]}</div></div>`).join("")}
        ${cells}
      </div>
    `;
  }

  function monthCalendar() {
    const year = 2026, month = 7;
    const first = new Date(year, month, 1);
    const startPad = first.getDay();
    const daysIn = new Date(year, month + 1, 0).getDate();
    const wdNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const cells = [];
    for (let i = 0; i < startPad; i++) cells.push(`<div class="month-cell mute"></div>`);
    for (let d = 1; d <= daysIn; d++) {
      const iso = `${year}-08-${String(d).padStart(2, "0")}`;
      const wd = wdNames[new Date(year, month, d).getDay()];
      const stops = DAYS.includes(wd) ? state.data.stops.filter((s) => s.day === wd && !s.pending) : [];
      const today = iso === TODAY;
      cells.push(`
        <div class="month-cell ${today ? "today" : ""}">
          <div class="month-num">${d} <span class="tiny">${wd}</span></div>
          ${stops.slice(0, 4).map((s) => `<div class="month-stop">${esc(techName(s.techId).slice(0, 1))} ${esc(stopLabel(s))}</div>`).join("")}
          ${stops.length > 4 ? `<div class="tiny">+${stops.length - 4} more</div>` : ""}
        </div>`);
    }
    return `
      <p class="tiny" style="margin-bottom:8px">August 2026 — standing weekday routes repeat each week. Today is highlighted.</p>
      <div class="month-grid">
        ${wdNames.map((n) => `<div class="month-dow">${n}</div>`).join("")}
        ${cells.join("")}
      </div>
    `;
  }

  function stopChip(s) {
    const cls = s.type === "oneoff" ? "oneoff" : s.status === "missed" || s.status === "noshow" || s.status === "blocked" ? "missed" : "";
    return `<div class="stop ${cls}"><div class="t">${esc(s.time)} · ${esc(stopLabel(s))}</div><div class="m">${s.durationMin}m · ${esc(s.status)}</div></div>`;
  }

  function mapRoadsSvg() {
    return "";
  }
  const SCHED_COLORS = {
    "Mon/Wed": "#7b5ea7",
    "Tue/Thu": "#8b3a3a",
    "Mon/Thu": "#2c5f8a",
    "Wed/Fri": "#1a8a8a",
    "Fri": "#c97b9b",
  };
  function locTechs(c, l) {
    return [...new Set(svcsFor(c.id, l.id).map((s) => s.techId).filter(Boolean).concat(l.techId ? [l.techId] : []))];
  }
  function locIsShared(c, l) {
    return !!(l.shared || locTechs(c, l).length > 1);
  }
  function locScheduleKey(c, l) {
    const svc = svcsFor(c.id, l.id)[0];
    return svc?.days || l.days || c.days || "Mon/Wed";
  }
  function fmtClock(min) {
    const n = Math.max(0, Number(min) || 0);
    return `${String(Math.floor(n / 60)).padStart(2, "0")}:${String(n % 60).padStart(2, "0")}`;
  }
  function techBookLocations(techId) {
    const rows = [];
    state.data.customers.forEach((c) => {
      (c.locations || []).forEach((l) => {
        if (l.covered === false) return;
        const techs = locTechs(c, l);
        if (!techs.includes(techId) && l.techId !== techId) return;
        const dur = svcsFor(c.id, l.id)[0]?.durationMin || l.durationMin || c.durationMin || 20;
        rows.push({ c, l, shared: locIsShared(c, l), techs, days: locScheduleKey(c, l), durationMin: dur });
      });
    });
    return rows;
  }
  function techScheduleBreakdown(techId) {
    const rows = techBookLocations(techId);
    const by = {};
    rows.forEach((r) => {
      const k = r.days;
      if (!by[k]) by[k] = { days: k, count: 0, durationMin: 0 };
      by[k].count += 1;
      by[k].durationMin += r.durationMin;
    });
    return Object.values(by).sort((a, b) => b.count - a.count);
  }
  function mapPinColor(c, l, { filterTech, colorBy }) {
    if (locNeedsTech(c, l) || locNeedsService(c, l)) return "#c4a24a";
    if (locIsShared(c, l)) return "#8a8680";
    if (colorBy === "schedule" || filterTech) {
      return SCHED_COLORS[locScheduleKey(c, l)] || "#888";
    }
    return locPinColor(c, l);
  }

  function viewMap() {
    const filterTech = state.mapTech;
    const filterDay = state.mapDay;
    const colorBy = filterTech ? (state.mapColorBy || "schedule") : "tech";
    const focusCid = state.mapClient;
    const focusLid = state.mapLoc;
    const assignMode = !!(focusCid && focusLid);
    const compareIds = state.mapCompare || [];
    const focusCust = focusCid ? custBy(focusCid) : null;
    const focusLoc = focusCust?.locations.find((l) => l.id === focusLid) || null;
    const ranked = (focusCust && focusLoc) ? bestFitFor(focusCust, focusLoc, state.assignDays) : [];
    const showBestFit = !!(focusCust && focusLoc && (svcFor(focusCust.id, focusLoc.id) || locNeedsTech(focusCust, focusLoc)));
    const selectedTech = filterTech ? techBy(filterTech) : null;
    const genQ = opsGenerateQueue();

    const techStats = TECHS.map((t) => {
      const book = techBookLocations(t.id);
      const durationMin = book.reduce((a, r) => a + r.durationMin, 0);
      return { t, count: book.length, durationMin, book };
    });
    const totals = techStats.reduce((a, r) => ({ count: a.count + r.count, durationMin: a.durationMin + r.durationMin }), { count: 0, durationMin: 0 });

    const pins = [];
    const book = [];
    const stopList = [];

    // Property pins — scale for many stops: dots only, no name labels
    state.data.customers.forEach((c) => {
      if (!(c.status === "active" || c.status === "renewal" || c.status === "past_due" || c.locations.some((l) => locNeedsTech(c, l) || locNeedsService(c, l)))) return;
      (c.locations || []).forEach((l) => {
        if (l.covered === false) return;
        const techsHere = locTechs(c, l);
        const assignedHere = techsHere.includes(filterTech) || l.techId === filterTech;
        const needs = locNeedsTech(c, l) || locNeedsService(c, l);
        const isFocus = focusCid === c.id && focusLid === l.id;
        const shared = locIsShared(c, l);

        // Assign mode: only the one stop Rick is working on from the waiting set
        if (assignMode && needs && !isFocus) return;
        // Without assign mode, still show waiting golds; with assign mode hide other waitings

        if (filterTech) {
          if (!assignedHere && !isFocus) return;
        } else if (needs && !isFocus && assignMode) {
          return;
        }

        if (!locOnDay(c, l, filterDay)) return;
        // When filtering a day and this is only the focus assign pin with no schedule yet, keep it
        if (filterDay && isFocus && needs) { /* keep */ }

        const key = `${c.id}:${l.id}`;
        const on = state.mapSelect.includes(key);
        const color = isFocus ? "#e11d2e" : mapPinColor(c, l, { filterTech, colorBy });
        const row = { c, l, shared, techsHere, needs, isFocus, days: locScheduleKey(c, l), durationMin: svcsFor(c.id, l.id)[0]?.durationMin || l.durationMin || 20 };
        if (filterTech && assignedHere && !needs) {
          book.push(row);
          stopList.push(row);
        }
        const shape = shared ? "diamond" : "dot";
        const selectedPin = state.mapPin && state.mapPin.cid === c.id && state.mapPin.lid === l.id;
        if (state.mapSched && locScheduleKey(c, l) !== state.mapSched && !isFocus) return;
        const mark = isFocus
          ? `<span class="prop-pin-mark" aria-hidden="true"></span>`
          : `<span class="prop-pin-dot" aria-hidden="true"></span>`;
        pins.push(`<button type="button" class="pin prop-pin ${shape} ${shared ? "shared" : ""} ${on ? "picked" : ""} ${needs && !isFocus ? "need" : ""} ${isFocus ? "client assign-focus" : ""} ${selectedPin ? "pin-open" : ""}" data-act="map-pin" data-cid="${c.id}" data-lid="${l.id}" data-drag="1" style="left:${l.x};top:${l.y};--pin-color:${color}" title="${esc(c.name)} · ${esc(l.name)}">${mark}</button>`);
      });
    });

    // Home dots — always visible (small)
    TECHS.forEach((t) => {
      if (filterTech && filterTech !== t.id) return; // when drilled in, only that home
      const on = filterTech === t.id;
      pins.push(`<button type="button" class="pin home-pin ${on ? "on" : ""}" data-act="map-tech" data-tech="${t.id}" style="left:${t.x};top:${t.y}" title="${esc(t.name)} · ${esc(t.home)}"><div class="pin-dot" style="background:${t.color}"></div></button>`);
    });
    // In master view show all homes
    if (!filterTech) {
      // already added all in loop above when !filterTech — wait, when !filterTech the condition `if (filterTech && filterTech !== t.id) return` doesn't return, so all homes added. Good.
    }

    const compareRows = compareIds.map((id) => ranked.find((r) => r.t.id === id) || { t: techBy(id), miles: focusLoc ? distMiles(focusLoc.x, focusLoc.y, techBy(id)?.x, techBy(id)?.y) : 0, mins: 0, route: [] }).filter((r) => r.t);
    const routeLines = [];
    if (focusLoc && (compareIds.length || (filterTech && showBestFit))) {
      const drawIds = compareIds.length ? compareIds : (filterTech ? [filterTech] : []);
      drawIds.forEach((id) => {
        const t = techBy(id);
        if (!t) return;
        const r = ranked.find((x) => x.t.id === id);
        const pts = [`${pct(t.x)},${pct(t.y)}`, ...((r?.route || []).map((s) => `${pct(s.x)},${pct(s.y)}`)), `${pct(focusLoc.x)},${pct(focusLoc.y)}`];
        routeLines.push(`<polyline fill="none" stroke="${t.color}" stroke-width="1.05" stroke-linecap="round" opacity="0.9" points="${pts.join(" ")}" />`);
      });
    }

    let pinCard = "";
    if (state.mapPin) {
      const pc = custBy(state.mapPin.cid);
      const pl = pc?.locations.find((x) => x.id === state.mapPin.lid);
      if (pc && pl) {
        const techs = locTechs(pc, pl);
        const shared = locIsShared(pc, pl);
        const svc = svcFor(pc.id, pl.id);
        const primaryTech = pl.techId || svc?.techId || techs[0];
        const sched = locScheduleKey(pc, pl);
        const dur = fmtClock(svc?.durationMin || pl.durationMin || 20);
        const xPct = pct(pl.x);
        const yPct = pct(pl.y);
        const flipX = xPct > 58;
        const flipY = yPct > 55;
        const cityLine = [pl.city, pl.zip].filter(Boolean).join(" · ");
        const addrLine = pl.address || cityLine || "—";
        const trapperRows = (shared ? techs : (primaryTech ? [primaryTech] : [])).map((tid) => {
          const t = techBy(tid);
          const name = t?.name || techName(tid);
          const color = t?.color || "#888";
          const home = t?.home ? ` · ${esc(t.home)}` : "";
          return `<div class="map-pin-tech"><i class="dot" style="background:${color}"></i><span><strong>${esc(name)}</strong>${home}</span></div>`;
        }).join("");
        const currentSched = SERVICE_SCHEDULES.find((s) => s.days === sched || s.id === svc?.schedule) || SERVICE_SCHEDULES[0];
        const canReassign = can("schedule.reassign") || state.role === "owner";
        const canShare = can("schedule.assign") || can("service.create") || can("service.edit") || state.role === "owner";
        pinCard = `
          <div class="map-float-card map-pin-card${flipX ? " flip-x" : ""}${flipY ? " flip-y" : ""}" style="left:${pl.x};top:${pl.y}">
            <button type="button" class="map-float-close" data-act="clear-map-pin" aria-label="Close">×</button>
            <div class="map-pin-title">${esc(pl.name || "Property")}</div>
            <div class="map-pin-addr">${esc(addrLine)}</div>
            ${cityLine && pl.address ? `<div class="map-pin-meta">${esc(cityLine)}</div>` : ""}
            <div class="map-pin-meta">Bill-To · ${esc(pc.billTo || pc.name)}</div>
            <div class="map-pin-section">
              <div class="map-pin-label">${shared ? `Shared · ${techs.length} trappers` : "Trapper"}</div>
              ${trapperRows || `<div class="map-pin-tech"><span class="muted">Unassigned</span></div>`}
            </div>
            <div class="map-pin-facts">
              <span>Days · ${esc(sched)}</span>
              <span>${dur}</span>
              <span>${svc ? esc(svcTypeLabel(svc.type)) : "No service yet"}</span>
            </div>
            ${canReassign ? `
              <div class="map-pin-assign">
                <div class="map-pin-label">Change on map</div>
                <div class="field"><label>Trapper</label>
                  <select id="pin-tech">${TECHS.map((t) => `<option value="${t.id}" ${t.id === primaryTech ? "selected" : ""}>${esc(t.name)}</option>`).join("")}</select>
                </div>
                <div class="field"><label>Schedule</label>
                  <select id="pin-sched">${SERVICE_SCHEDULES.map((s) => `<option value="${s.id}" ${s.id === currentSched.id ? "selected" : ""}>${esc(s.label)}</option>`).join("")}</select>
                </div>
                <div class="actions map-pin-assign-actions">
                  <button type="button" class="btn btn-sun" data-act="pin-map-assign" data-mode="move" data-cid="${pc.id}" data-lid="${pl.id}">Reassign</button>
                  ${canShare && svc ? `<button type="button" class="btn btn-ghost" data-act="pin-map-assign" data-mode="share" data-cid="${pc.id}" data-lid="${pl.id}">Share</button>` : ""}
                </div>
                <p class="tiny">Reassign moves this stop. Share adds another trapper on different days.</p>
              </div>
            ` : ""}
            <div class="actions" style="margin-top:10px">
              <button class="btn btn-ghost" data-act="open-location" data-id="${pc.id}" data-loc="${pl.id}">Open location</button>
              ${locNeedsTech(pc, pl) && filterTech ? btn("schedule.assign", "Assign " + techName(filterTech), "map-assign", `data-id="${pc.id}" data-loc="${pl.id}" data-tech="${filterTech}"`) : ""}
              ${canReassign ? `<button type="button" class="btn btn-ghost" data-act="open-pin-assign" data-cid="${pc.id}" data-lid="${pl.id}">Full assign…</button>` : ""}
            </div>
          </div>`;
      }
    }

    const schedBreak = filterTech ? techScheduleBreakdown(filterTech) : [];
    const sideList = filterTech
      ? stopList.filter((r) => !filterDay || patternDays(r.days).includes(filterDay) || locOnDay(r.c, r.l, filterDay))
      : [];
    const selectDur = state.mapSelect.reduce((sum, key) => {
      const [cid, lid] = key.split(":");
      const loc = locBy(cid, lid);
      return sum + (svcsFor(cid, lid)[0]?.durationMin || loc?.durationMin || 20);
    }, 0);

    return `
      ${head("Map & routing", "Click a pin to change trapper or schedule. Box select several, then Assign. Gray diamonds = shared.")}
      ${writeBar("schedule.assign", "Assign")}
      ${assignMode ? `<div class="notice">Assigning <strong>${esc(focusCust.name)} · ${esc(focusLoc.name)}</strong> only — other waiting stops are hidden until you finish this one.</div>` : ""}
      <div class="map-toolbar">
        <div class="actions">
          <span class="tiny">Color by</span>
          <button class="legend-btn ${colorBy === "tech" && !filterTech ? "on" : ""} ${!filterTech ? "" : ""}" data-act="map-color" data-mode="tech" ${filterTech ? "disabled" : ""}>Technician</button>
          <button class="legend-btn ${filterTech && colorBy === "schedule" ? "on" : ""}" data-act="map-color" data-mode="schedule" ${filterTech ? "" : "disabled"}>Schedule</button>
        </div>
        <div class="actions">
          <button class="legend-btn ${filterDay === todayDay() ? "on" : ""}" data-act="map-day" data-day="${todayDay()}">Today (${todayDay()})</button>
          ${DAYS.filter((d) => d !== todayDay()).map((d) => `<button class="legend-btn ${filterDay === d ? "on" : ""}" data-act="map-day" data-day="${d}">${d}</button>`).join("")}
          <button class="legend-btn ${!filterDay ? "on" : ""}" data-act="map-day" data-day="">All days</button>
          ${btn("schedule.reassign", state.mapLasso ? "Box select on" : "Box select", "toggle-lasso", "", state.mapLasso ? "btn-sun" : "btn-ghost")}
        </div>
      </div>
      ${state.mapLasso && !state.mapSelect.length ? `<div class="notice">Drag a box on the map to select properties (Shift+drag to add). Then Clear or Assign.</div>` : ""}

      <div class="map-vrm${showBestFit ? " has-bestfit" : ""}">
        <aside class="map-vrm-side card" data-keep-scroll="map-side">
          ${!filterTech ? `
            <div class="vrm-side-head">
              <h3>Trappers</h3>
              <p class="tiny">Click a name to see only that trapper’s stops</p>
            </div>
            <div class="vrm-table">
              <div class="vrm-row vrm-head"><span></span><span>Technician</span><span>Count</span><span>Duration</span></div>
              ${techStats.map(({ t, count, durationMin }) => `
                <button type="button" class="vrm-row" data-act="map-tech" data-tech="${t.id}">
                  <i class="dot" style="background:${t.color}"></i>
                  <span class="vrm-name">${esc(t.name.toUpperCase())}</span>
                  <span>${count}</span>
                  <span>${fmtClock(durationMin)}</span>
                </button>
              `).join("")}
              <div class="vrm-row vrm-total"><span></span><span>Total</span><span>${totals.count}</span><span>${fmtClock(totals.durationMin)}</span></div>
            </div>
            <p class="tiny section-gap"><i class="map-legend-pin"></i> Bright red = assigning · Box select → Clear / Assign · <i class="map-legend-diamond"></i> shared</p>
          ` : `
            <div class="vrm-side-head">
              <button class="btn btn-ghost" data-act="map-tech" data-tech="">← All trappers</button>
              <h3>${esc(selectedTech.name)}</h3>
              <p class="tiny">${esc(selectedTech.home)} · color by schedule day pattern</p>
            </div>
            <div class="vrm-table">
              <div class="vrm-row vrm-head"><span></span><span>Schedule</span><span>Count</span><span>Duration</span></div>
              ${schedBreak.map((s) => `
                <button type="button" class="vrm-row ${state.mapSched === s.days ? "on" : ""}" data-act="map-sched-filter" data-days="${esc(s.days)}">
                  <i class="dot" style="background:${SCHED_COLORS[s.days] || "#888"}"></i>
                  <span class="vrm-name">WK · ${esc(s.days)}</span>
                  <span>${s.count}</span>
                  <span>${fmtClock(s.durationMin)}</span>
                </button>
              `).join("") || `<p class="muted">No stops on this trapper yet.</p>`}
              <div class="vrm-row vrm-total"><span></span><span>Total</span><span>${sideList.length || techBookLocations(filterTech).length}</span><span>${fmtClock((sideList.length ? sideList : techBookLocations(filterTech)).reduce((a, r) => a + r.durationMin, 0))}</span></div>
            </div>
            <h3 class="section-gap">Stops ${filterDay ? "· " + esc(filterDay) : ""}</h3>
            <div class="vrm-stops" data-keep-scroll="vrm-stops">
              ${(sideList.length ? sideList : techBookLocations(filterTech).filter((r) => !filterDay || patternDays(r.days).includes(filterDay))).map((r, i) => `
                <button type="button" class="vrm-stop ${state.mapPin?.cid === r.c.id && state.mapPin?.lid === r.l.id ? "on" : ""}" data-act="map-pin" data-cid="${r.c.id}" data-lid="${r.l.id}">
                  <span class="vrm-stop-n" style="background:${SCHED_COLORS[r.days] || selectedTech.color}">${i + 1}</span>
                  <div>
                    <strong>${esc(r.c.name)}</strong>
                    <div class="tiny">${esc(r.l.name)} · ${fmtClock(r.durationMin)}${r.shared ? " · shared" : ""}</div>
                  </div>
                </button>
              `).join("") || `<p class="muted">No stops for this filter.</p>`}
            </div>
          `}
          ${genQ.length ? `<div class="notice" style="margin-top:10px">${genQ.length} assigned, not live. ${btn("schedule.generate", "Generate", "generate-schedule")}</div>` : ""}
        </aside>

        <div class="map-vrm-canvas-wrap">
          <div class="map-canvas gmap map-vrm-canvas${state.mapLasso ? " lasso-on" : ""}" id="map-canvas">
            <div class="map-bg gmap"></div>
            <div class="map-terrain" aria-hidden="true">
              <div class="map-water gulf"></div>
              <div class="map-water atlantic"></div>
              <div class="map-water lake"></div>
              <div class="map-land-patch" style="left:28%;top:28%;width:22%;height:18%"></div>
              <div class="map-land-patch" style="left:52%;top:44%;width:18%;height:16%"></div>
            </div>
            <div class="map-label gmap-label water" style="left:3%;top:14%">Gulf</div>
            <div class="map-label gmap-label water" style="right:4%;top:10%;left:auto">Atlantic</div>
            <div class="map-label gmap-label city" style="left:30%;top:48%">Fort Lauderdale</div>
            <div class="map-label gmap-label city" style="left:26%;top:36%">Boca Raton</div>
            <div class="map-label gmap-label city" style="left:12%;top:32%">Tampa</div>
            <div class="map-label gmap-label city" style="left:36%;top:22%">West Palm</div>
            <div class="map-label gmap-label city" style="left:16%;top:68%">Naples</div>
            ${routeLines.length ? `<svg class="route-svg" viewBox="0 0 100 100" preserveAspectRatio="none">${routeLines.join("")}</svg>` : ""}
            ${pins.join("")}
            ${pinCard}
            ${state.mapSelect.length ? `
              <div class="map-select-panel" role="status">
                <div class="map-select-row"><span>Selected</span><strong>${state.mapSelect.length}</strong></div>
                <div class="map-select-row"><span>Duration</span><strong>${fmtClock(selectDur)}</strong></div>
                <div class="map-select-actions">
                  <button type="button" class="btn btn-ghost" data-act="clear-map-select">Clear</button>
                  ${btn("schedule.reassign", "Assign", "open-bulk-assign", "", "btn-sun")}
                </div>
                <p class="tiny" style="margin:8px 0 0">Assign = pick trapper + schedule for all selected.</p>
              </div>` : ""}
          </div>
        </div>

        ${showBestFit ? `
        <aside class="map-vrm-side card is-right" data-keep-scroll="map-bestfit">
          <div class="map-bestfit-block">
            <div class="vrm-side-head">
              <h3>Best fit</h3>
              <p class="tiny">${esc(focusCust.name)} · ${esc(focusLoc.name)}</p>
            </div>
            <div class="bestfit">
              ${ranked.map((r, i) => `
                <div class="bestfit-card ${filterTech === r.t.id ? "pick" : ""} ${compareIds.includes(r.t.id) ? "compare-on" : ""}">
                  <button type="button" class="bestfit-main" data-act="map-tech" data-tech="${r.t.id}">
                    <strong>${i === 0 ? "Suggested · " : ""}${esc(r.t.name)}</strong> · ${esc(r.t.home)}
                    <div class="tiny">${r.miles} mi · ~${r.mins} min · ${r.route.length} nearby stops</div>
                  </button>
                  <div class="bestfit-actions">
                    <button type="button" class="btn btn-ghost" data-act="map-compare-tech" data-tech="${r.t.id}">${compareIds.includes(r.t.id) ? "In compare" : "Compare drive"}</button>
                    ${btn("schedule.assign", "Assign", "map-assign", `data-id="${focusCust.id}" data-loc="${focusLoc.id}" data-tech="${r.t.id}"`, "btn-sun")}
                  </div>
                </div>
              `).join("")}
            </div>
            ${compareRows.length ? `
              <div class="map-compare-box">
                ${compareRows.map((r) => `<div class="map-compare-row"><i class="dot" style="background:${r.t.color}"></i><div><strong>${esc(r.t.name)}</strong><div class="tiny">${r.miles} mi · ~${r.mins} min</div></div></div>`).join("")}
                <button class="btn btn-ghost" data-act="clear-map-compare">Clear compare</button>
              </div>` : ""}
          </div>
        </aside>
        ` : ""}
      </div>
    `;
  }

  function viewAssign() {
    const queue = opsAssignQueue();
    const c = custBy(state.assignId) || queue[0]?.c;
    if (c && state.assignId !== c.id) state.assignId = c.id;
    if (!c) {
      return `
        ${head("Assign technician", "Create the service first. Then pick a technician on this map.")}
        <p class="muted">No unassigned properties.</p>
      `;
    }
    const loc = c.locations.find((l) => l.id === state.assignLocId) || queue.find((r) => r.c.id === c.id)?.l || c.locations[0];
    if (loc && state.assignLocId !== loc.id) state.assignLocId = loc.id;
    const ranked = bestFitFor(c, loc);
    if (!state.assignFocus) state.assignFocus = ranked[0]?.t.id;
    const focus = ranked.find((r) => r.t.id === state.assignFocus) || ranked[0];
    const lines = ranked.map((r) => {
      const pts = [`${pct(r.t.x)},${pct(r.t.y)}`, ...r.route.map((s) => `${pct(s.x)},${pct(s.y)}`)];
      if (loc) pts.push(`${pct(loc.x)},${pct(loc.y)}`);
      const on = r.t.id === focus?.t.id;
      return `<polyline fill="none" stroke="${r.t.color}" stroke-width="${on ? 0.9 : 0.28}" stroke-dasharray="${on ? "0" : "1.2 0.8"}" opacity="${on ? 0.95 : 0.35}" points="${pts.join(" ")}" />`;
    }).join("");
    const pins = [
      ...TECHS.map((t) => `<button type="button" class="pin home-pin ${t.id === focus?.t.id ? "on focus" : ""}" data-act="focus-tech" data-tech="${t.id}" style="left:${t.x};top:${t.y}" title="${esc(t.name)} · ${esc(t.home)}"><div class="pin-dot" style="background:${t.color}"></div></button>`),
      ...c.locations.filter((l) => l.covered !== false).map((l) =>
        `<div class="pin prop-pin client ${l.id === loc?.id ? "" : "other"}" style="left:${l.x};top:${l.y}" title="${esc(l.name)}"><div class="pin-dot" style="background:${l.id === loc?.id ? "#c4a24a" : "#8a7a55"}"></div>${l.id === loc?.id ? `<span>This property</span>` : ""}</div>`
      ),
      ...ranked.flatMap((r) => r.route.map((s) =>
        `<div class="pin prop-pin stop-pin" style="left:${s.x};top:${s.y}" title="${esc(s.name)}"><div class="pin-dot" style="background:${r.t.color}"></div></div>`
      )),
    ].join("");
    const covered = c.locations.filter((l) => l.covered !== false);
    return `
      ${head("Assign technician", "Drive times from each home to this property. Usual path: Map & routing → click a trapper’s home.")}
      ${writeBar("schedule.assign", "Assign")}
      <div class="legend">${TECHS.map((t) => `<span><i class="dot" style="background:${t.color}"></i> ${esc(t.name)}</span>`).join("")}<span><i class="dot" style="background:#c4a24a"></i> This property</span><span><i class="dot" style="background:#8a7a55"></i> Other properties</span></div>
      <div class="assign-stage">
        <div class="map-canvas">
          <div class="map-bg"></div>
          <svg class="route-svg" viewBox="0 0 100 100" preserveAspectRatio="none">${lines}</svg>
          <div class="map-label" style="left:8%;top:18%">Gulf</div>
          <div class="map-label" style="left:70%;top:20%">East coast</div>
          ${pins}
        </div>
        <div class="card assign-panel">
          <h3>${esc(c.name)}</h3>
          <p class="tiny">${esc(c.id)} · ${covered.length} ${covered.length === 1 ? "property" : "properties"} on this Bill-To</p>
          ${!(c.paid || isMunicipal(c)) ? `<div class="notice locked">Not paid yet. You can still pick a trapper and days; live stops wait until it’s paid.</div>` : isMunicipal(c) ? `<div class="notice">Municipal PO — schedule without payment. Invoice after service against PO hours (${muniHoursUsed(c)}/${muniPoCapHours(c) || "—"}).</div>` : `<div class="notice">${esc(loc?.name || "This property")} is on the map. Nearby stops for ${esc(state.assignDays)} draw from each tech’s home.</div>`}
          ${covered.length > 1 ? `
            <div class="field">
              <label>Property to catch iguanas</label>
              <select data-act="assign-loc">${covered.map((l) => `<option value="${l.id}" ${l.id === loc?.id ? "selected" : ""}>${esc(l.name)} · ${esc(l.address)}${l.requestService && !l.techId ? " · requested" : l.techId ? ` · ${techName(l.techId)}` : ""}</option>`).join("")}</select>
            </div>
          ` : ""}
          <p class="tiny">${esc(loc?.address || "")}</p>
          <div class="field">
            <label>Service days</label>
            <select data-act="assign-days">${DAY_PATTERNS.map((p) => `<option value="${p.id}" ${p.id === state.assignDays ? "selected" : ""}>${esc(p.id)}</option>`).join("")}</select>
          </div>
          <h3 class="section-gap">Best-fit (nearest home → this property)</h3>
          <div class="bestfit">
            ${ranked.map((r, i) => `
              <button class="bestfit-card ${r.t.id === focus?.t.id ? "pick" : ""}" data-act="focus-tech" data-tech="${r.t.id}">
                <strong>${i === 0 ? "Suggested · " : ""}${esc(r.t.name)}</strong> · ${esc(r.t.home)}
                <div class="tiny">${r.miles} mi · ~${r.mins} min drive · ${r.route.length} stop${r.route.length === 1 ? "" : "s"} on ${esc(state.assignDays)}</div>
                ${r.route.length ? `<div class="tiny">${r.route.map((s) => `${s.day} ${s.time} ${s.name}`).join(" → ")}</div>` : `<div class="tiny">No other stops that pattern — open day.</div>`}
              </button>
            `).join("")}
          </div>
          <div class="actions" style="margin-top:12px">
            ${btn("schedule.assign", `Assign ${focus ? focus.t.name : "technician"} · ${esc(loc?.name || "property")} · ${state.assignDays}`, "confirm-assign", `data-id="${c.id}" data-loc="${loc?.id || ""}" data-tech="${focus?.t.id || ""}"`)}
          </div>
          ${queue.length > 1 ? `
            <h3 class="section-gap">Queue (newest first)</h3>
            ${queue.map((row) => `
              <button class="fit-row" style="width:100%;background:transparent;border:0;text-align:left" data-act="open-assign" data-id="${row.c.id}" data-loc="${row.l.id}">
                <div><strong>${esc(row.c.name)}</strong><div class="tiny">${esc(row.l.name)} · ${esc(row.l.address)}</div></div>
                ${row.l.id === loc?.id ? `<span class="badge badge-ok">This map</span>` : `<span class="badge badge-mute">Open</span>`}
              </button>
            `).join("")}
          ` : ""}
        </div>
      </div>
    `;
  }

  function viewOneoffs() {
    const day = state.oneoffDay || todayDay();
    const pending = state.data.stops.filter((s) => s.pending || (s.type === "oneoff" && s.status === "waiting"));
    const live = state.data.stops.filter((s) => s.type === "oneoff" && !s.pending && s.status === "scheduled");
    const todayLive = live.filter((s) => s.day === day);
    return `
      ${head("One-off / live call-in", "Someone calls — toilet, garage, office. No full account. Drop it on whoever’s closest with room today.")}
      ${writeBar("oneoff.insert", "Create live job")}
      <div class="actions" style="margin-bottom:14px">
        ${btn("oneoff.insert", "New call-in job", "new-oneoff")}
        <div class="actions">${DAYS.map((d) => `<button class="legend-btn ${day === d ? "on" : ""}" data-act="oneoff-day" data-day="${d}">${d === todayDay() ? "Today · " : ""}${d}</button>`).join("")}</div>
      </div>
      <div class="grid-3" style="margin-bottom:14px">
        ${stat("Waiting", pending.length, "Need a trapper now")}
        ${stat("On " + day, todayLive.length, "Live call-ins scheduled")}
        ${stat("This week", live.length, "All one-off stops")}
      </div>
      <div class="split">
        <div class="card">
          <h3>Waiting / just called in</h3>
          <p class="tiny">Not on a route yet — open and assign nearest with schedule check</p>
          ${pending.map((s) => `
            <div class="fit-row">
              <div>
                <strong>${esc(s.label)}</strong>
                <div class="tiny">${esc(s.address)} · ${esc((TASK_TYPES.find((t) => t.id === s.taskType) || {}).label || s.taskType || "live call")} · suggested ${esc(techBy(s.techId)?.name || "—")}</div>
              </div>
              <div class="actions">
                ${btn("oneoff.insert", "Place on route", "insert-oneoff", `data-id="${s.id}"`)}
              </div>
            </div>
          `).join("") || `<p class="muted">No waiting call-ins. Click <strong>New call-in job</strong>.</p>`}
        </div>
        <div class="card">
          <h3>On route · ${esc(day)}</h3>
          <p class="tiny">Already inserted into a trapper’s day — shows on Schedule / mobile</p>
          ${todayLive.length ? table(
            ["Time", "Job", "Trapper", "Min", ""],
            todayLive.slice().sort((a, b) => String(a.time).localeCompare(String(b.time))).map((s) => [
              esc(s.time),
              `${esc(s.label)}<div class="tiny">${esc(s.address)}</div>`,
              esc(techName(s.techId)),
              String(s.durationMin || 25),
              `<span class="badge badge-ok">Live</span>`,
            ])
          ) : `<p class="muted">Nothing on ${esc(day)} yet.</p>`}
        </div>
      </div>
      ${live.filter((s) => s.day !== day).length ? `
        <div class="card section-gap">
          <h3>Other days this week</h3>
          ${table(["Day", "Time", "Job", "Trapper"], live.filter((s) => s.day !== day).map((s) => [s.day, s.time, s.label, techName(s.techId)]))}
        </div>` : ""}
    `;
  }

  function viewCreateOneoff() {
    if (!can("oneoff.insert")) {
      return `<div class="forbidden"><h2>Your login doesn’t include this screen</h2><p>Only Operations drops live call-ins.</p><button class="btn btn-primary" data-act="nav" data-page="dashboard">Dashboard</button></div>`;
    }
    const d = state.oneoffDraft || {};
    const day = d.day || todayDay();
    const type = TASK_TYPES.find((t) => t.id === (d.type || "toilet")) || TASK_TYPES[0];
    const duration = Number(d.duration || type.duration || 25);
    const pos = pinFromAddress(d.addr || "", { x: "31%", y: "48%", place: "Florida" });
    const x = d.x || pos.x;
    const y = d.y || pos.y;
    const ranked = oneoffRankTechs(x, y, day, duration);
    const picked = d.techId || ranked[0]?.t.id;
    const focus = ranked.find((r) => r.t.id === picked) || ranked[0];
    return `
      <div class="create-svc create-oneoff">
        <button class="btn btn-ghost" data-act="cancel-create-oneoff">← One-off jobs</button>
        <div class="create-svc-head">
          <div>
            <h2>Live call-in</h2>
            <p class="muted">Toilet, garage, office — find who is down the street and has room on the day, then drop it on their route.</p>
          </div>
        </div>
        <div class="oneoff-layout">
          <div class="create-svc-form">
            <div class="create-svc-section">
              <div class="create-svc-kicker">Call details</div>
              <div class="create-svc-2">
                <div class="field"><label>Caller name</label><input id="oo-caller" value="${esc(d.caller || "")}" placeholder="Who called"></div>
                <div class="field"><label>Phone</label><input id="oo-phone" value="${esc(d.phone || "")}" placeholder="Mobile"></div>
              </div>
              <div class="field req"><label>What happened</label>
                <select id="oo-type" data-act="oo-type">${TASK_TYPES.map((t) => `<option value="${t.id}" ${t.id === type.id ? "selected" : ""}>${esc(t.label)}</option>`).join("")}</select>
              </div>
              <div class="field req"><label>Job note</label><input id="oo-label" value="${esc(d.label || "")}" placeholder="Iguana in toilet — Boca office park"></div>
              <div class="field req"><label>Where</label><input id="oo-addr" value="${esc(d.addr || "")}" data-act="oo-addr" data-preview-pin="oo-pin" placeholder="Street, city, or park"></div>
              <div class="create-svc-3">
                <div class="field req"><label>Day</label>
                  <select id="oo-day" data-act="oo-refresh">${DAYS.map((x) => `<option value="${x}" ${x === day ? "selected" : ""}>${x === todayDay() ? "Today · " : ""}${x}</option>`).join("")}</select>
                </div>
                <div class="field req"><label>Duration (min)</label><input id="oo-dur" type="number" min="10" step="5" value="${duration}" data-act="oo-refresh"></div>
                <div class="field"><label>Urgency</label>
                  <select id="oo-urgent"><option value="now" ${d.urgent !== "later" ? "selected" : ""}>ASAP / today</option><option value="later" ${d.urgent === "later" ? "selected" : ""}>Can wait a window</option></select>
                </div>
              </div>
              <div class="field"><label>Notify</label>
                <select id="oo-notify">
                  <option value="">No extra ping</option>
                  <option value="ops" ${d.notify === "ops" ? "selected" : ""}>Ping Operations</option>
                  <option value="admin" ${d.notify === "admin" ? "selected" : ""}>Ping Administration</option>
                </select>
              </div>
            </div>

            <div class="create-svc-section">
              <div class="create-svc-kicker">Assign trapper</div>
              <p class="tiny">Ranked by distance to the job / their nearby stops that day, then whether their route still has a gap.</p>
              <div class="bestfit" id="oo-fit">
                ${ranked.map((r, i) => `
                  <button type="button" class="bestfit-card ${r.t.id === picked ? "pick" : ""} ${r.conflict ? "oo-conflict" : ""}" data-act="oo-pick-tech" data-tech="${r.t.id}">
                    <strong>${i === 0 ? "Nearest · " : ""}${esc(r.t.name)}</strong> · ${esc(r.t.home)}
                    <div class="tiny">${r.routeMiles} mi from nearest stop · ~${r.driveMin} min drive · ${r.stopCount} stop${r.stopCount === 1 ? "" : "s"} · ${r.loadMin} min already on ${esc(day)}</div>
                    <div class="tiny">Insert ~${esc(r.slot.time)}${r.slot.gap ? " (gap found)" : ""}${r.nearStop ? ` · near ${esc(stopLabel(r.nearStop))}` : " · from home"}</div>
                    ${r.conflict ? `<div class="tiny" style="color:var(--clay)"><strong>Tight / late day</strong> — still assignable if Rick accepts</div>` : r.heavy ? `<div class="tiny">Heavy day already — check before stacking</div>` : `<div class="tiny">Looks workable</div>`}
                  </button>
                `).join("")}
              </div>
              <input type="hidden" id="oo-tech" value="${esc(picked || "")}">
              <input type="hidden" id="oo-x" value="${esc(String(x).replace("%", ""))}">
              <input type="hidden" id="oo-y" value="${esc(String(y).replace("%", ""))}">
              <div class="field" style="margin-top:10px"><label>Insert time</label><input id="oo-time" type="time" value="${esc(d.time || focus?.slot.time || "09:00")}"></div>
              ${focus ? `
                <div class="notice" style="margin-top:10px">
                  <strong>${esc(focus.t.name)}</strong> on ${esc(day)}: ${focus.stopCount} stops · ${focus.loadMin} min booked.
                  ${focus.stops.length ? `<div class="tiny" style="margin-top:6px">${focus.stops.map((s) => `${s.time} ${stopLabel(s)} (${s.durationMin || 20}m)`).join(" → ")}</div>` : `<div class="tiny">Open day — first live call-in.</div>`}
                </div>` : ""}
            </div>

            <div class="actions create-svc-actions">
              <button class="btn btn-ghost" data-act="cancel-create-oneoff">Cancel</button>
              ${btn("oneoff.insert", "Drop on route now", "save-oneoff")}
            </div>
          </div>
          <div class="create-svc-map">
            ${miniMapHtml({
              drag: true,
              mapId: "oo-map",
              title: "Call-in location",
              existing: [],
              preview: [{ x, y, label: d.label || "Call-in", elId: "oo-pin", xId: "oo-x", yId: "oo-y", capId: "oo-cap", keepLabel: true }],
              caption: `${pos.place || "Pin the job"} · drag to adjust · nearest homes shown`,
            })}
            <div class="tiny" style="margin-top:8px">Homes: ${TECHS.map((t) => `<span style="margin-right:8px"><i class="dot" style="background:${t.color}"></i> ${esc(t.name)}</span>`).join("")}</div>
          </div>
        </div>
      </div>
    `;
  }

  function viewNoshows() {
    const marked = state.data.stops.filter((s) => s.status === "noshow" || s.status === "missed");
    const pendingExt = state.data.stops.filter((s) => s.pendingExt);
    const thuJohnny = state.data.stops.filter((s) => s.techId === "johnny" && s.day === "Thu" && s.status === "scheduled");
    return `
      ${head("Missed visits", "Gate, weather, private event — log it. You decide on an extension. No automatic make-up visit.")}
      ${writeBar("noshow.mark", "Mark no-show")}
      ${pendingExt.length ? `
        <div class="card" style="margin-bottom:16px">
          <h3>Waiting on an extension decision</h3>
          ${pendingExt.map((s) => `
            <div class="fit-row">
              <div><strong>${esc(stopLabel(s))}</strong><div class="tiny">${esc(s.reason || "Miss")} · ${esc(s.fault || "")}</div></div>
              <div class="actions">
                ${btn("noshow.mark", "Approve +1 visit", "ext-yes", `data-id="${s.id}"`)}
                ${btn("noshow.mark", "Deny", "ext-no", `data-id="${s.id}"`, "btn-ghost")}
              </div>
            </div>
          `).join("")}
        </div>
      ` : ""}
      <div class="grid-3">
        <div class="card">
          <h3>Macro · company day off</h3>
          <p class="muted">Block a date so nothing is marked missed.</p>
          ${btn("blackout.edit", "Block Fri 28 Aug (meeting)", "macro-block")}
          ${state.data.blackout.length ? `<p class="tiny">Blocked: ${state.data.blackout.join(", ")}</p>` : ""}
        </div>
        <div class="card">
          <h3>Technician / weather</h3>
          <p class="muted">Mark remaining Thursday stops for Johnny. You will choose whether to extend — it is not automatic.</p>
          ${btn("noshow.mark", `Mark ${thuJohnny.length} remaining`, "noshow-company")}
        </div>
        <div class="card">
          <h3>Customer fault</h3>
          <p class="muted">Gated, no answer, unannounced event — log the miss. Extension stays off unless you approve it.</p>
          ${btn("noshow.mark", "Mark Walsh Wed as customer miss", "noshow-customer", "", "btn-warn")}
        </div>
      </div>
      <div class="card section-gap">
        <h3>Logged this session</h3>
        ${table(["Stop", "Reason", "Fault", "Contract"], marked.map((s) => [s.id, s.reason || "—", s.fault || "—", s.pendingExt ? "Awaiting decision" : s.extended ? "Extended +1 visit" : "Not extended"]))}
      </div>
    `;
  }

  function durationRows() {
    return state.data.stops.filter((s) => s.actualMin != null).map((s) => {
      return {
        tech: techName(s.techId),
        name: stopLabel(s),
        day: s.day,
        sched: s.durationMin,
        actual: s.actualMin,
        delta: s.actualMin - s.durationMin,
      };
    });
  }

  function viewDuration() {
    const rows = durationRows();
    const totals = DAYS.flatMap((d) => TECHS.map((t) => {
      const ss = state.data.stops.filter((s) => s.techId === t.id && s.day === d && !s.pending);
      const sched = ss.reduce((a, s) => a + (s.durationMin || 0), 0);
      return [t.name, d, ss.length, sched + " min"];
    })).filter((row) => row[2] > 0);
    const byAccount = state.data.customers.filter((c) => c.municipal || state.data.stops.some((s) => s.customerId === c.id && s.actualMin != null)).map((c) => {
      const ss = state.data.stops.filter((s) => s.customerId === c.id && !s.pending);
      const mins = ss.reduce((a, s) => a + (s.actualMin != null ? s.actualMin : 0), 0);
      const sched = ss.reduce((a, s) => a + (s.durationMin || 0), 0);
      return [c.name, c.po || "—", (c.hoursUsed || 0) + " / " + (c.poCapHours || "—") + (muniNearLimit(c) ? " ⚠" : ""), +(sched / 60).toFixed(1) + " hrs", +(mins / 60).toFixed(1) + " hrs", muniHoursRemaining(c) == null ? "—" : muniHoursRemaining(c) + " hrs"];
    });
    return `
      ${head("Duration / hours report", state.role === "admin"
        ? "Municipal hours for the invoice (name, PO, period). PO hours are the limit — they pay after service."
        : "Confirm field time here. Municipal rows show PO hours used / left — pass those to Christy for the invoice.")}
      ${state.role === "admin" || state.role === "owner" || state.role === "ops" ? `
        <div class="card" style="margin-bottom:16px">
          <h3>Hours per account <span class="muted">municipal · PO running total</span></h3>
          <p class="tiny">Coastal Parks and other PO accounts — confirm clocked hours, then Christy invoices.</p>
          ${table(["Customer", "PO", "PO hours used", "Scheduled this week", "Clocked", "PO left"], byAccount)}
        </div>
      ` : ""}
      ${state.role === "admin" ? "" : `
      <div class="card" style="margin-bottom:16px">
        <h3>On-property minutes · per trapper · per day</h3>
        <p class="tiny">If one trapper is at 200 minutes and another is at 800, this is how you move work.</p>
        ${table(["Technician", "Day", "Stops", "Scheduled min"], totals)}
      </div>
      ${table(["Technician", "Customer", "Day", "Scheduled", "Actual", "Delta"], rows.map((r) => [r.tech, r.name, r.day, r.sched + " min", r.actual + " min", `<span class="${r.delta < -8 ? "badge badge-bad" : "badge badge-ok"}">${r.delta} min</span>`]))}
      `}
    `;
  }

  function viewRemovals() {
    const rows = state.data.stops
      .filter((s) => s.removals && s.removals.count > 0)
      .map((s) => {
        return [DAY_DATES[s.day] || s.day, stopLabel(s), techName(s.techId), s.removals.count, s.removals.weight + " lb"];
      });
    return `
      ${head("Monthly removal report", "Only days with actual removals. Zero-catch visits stay off this list.")}
      ${table(["Date", "Customer", "Technician", "Count", "Weight"], rows)}
      <p class="tiny">Customers who had visits but zero removals are omitted on purpose.</p>
    `;
  }

  function viewWorkload() {
    return `
      ${head("Route / workload", "Next few days by trapper, in stop order. Busy routes show every stop.")}
      ${TECHS.map((t) => {
        const ss = state.data.stops.filter((s) => s.techId === t.id && !s.pending).sort((a, b) => DAYS.indexOf(a.day) - DAYS.indexOf(b.day) || String(a.time).localeCompare(String(b.time)));
        const extra = t.id === "bobby" ? state.data.customers.find((c) => c.id === "C-1108")?.locations.filter((l) => l.covered !== false).length : 0;
        return `<div class="card" style="margin-bottom:10px"><h3>${esc(t.name)} · ${esc(t.home)} · ${ss.length} timed stop${ss.length === 1 ? "" : "s"}${extra ? ` · ${extra} HOA lots on the map` : ""}</h3>${table(["Day", "Time", "Stop", "Min", "Type"], ss.map((s) => [s.day, s.time, stopLabel(s), s.durationMin, s.type === "oneoff" ? "Task" : "Service"]))}</div>`;
      }).join("")}
    `;
  }

  /* ---------- Admin ---------- */
  function viewInvoices() {
    const rows = state.data.invoices.map((i) => {
      const c = custBy(i.customerId);
      const st = invoiceFinStatus(i);
      const paid = allocated(i.id);
      const bal = invoiceBalance(i);
      let act = "";
      if (i.status === "draft") act = btn("invoice.send", "Preview & send", "send-invoice", `data-id="${i.id}"`);
      else if (st === "PAID") act = `<span class="tiny">Paid ${esc(i.paidOn || "")}</span>`;
      else act = btn("payment.post", "Post / allocate", "open-record-pay", `data-id="${i.id}"`);
      return [
        i.id,
        custBtn(i.customerId, c?.billTo || c?.name || "—"),
        esc(invProperty(i)),
        (can("invoice.send") || can("payment.post") || state.role === "owner") && st !== "PAID"
          ? inline("invoice", "amount", i.amount, `data-id="${i.id}"`, "number")
          : money(i.amount),
        money(paid),
        money(bal),
        statusBadge(st),
        i.kind,
        i.sent || "—",
        act,
      ];
    });
    return `
      ${head("Invoices", "One invoice per property / period. OPEN, PARTIAL, or PAID from what’s allocated. Paid in full → Ops can set up service.")}
      ${writeBar("invoice.send", "Send invoice")}
      <div class="actions" style="margin-bottom:10px">${btn("invoice.create", "Manual municipal invoice", "manual-invoice", "", "btn-ghost")}</div>
      ${table(["Invoice", "Bill-To", "Property", "Amount", "Paid", "Balance", "Status", "Kind", "Sent", ""], rows)}
    `;
  }

  function viewPayments() {
    const isOps = state.role === "ops";
    const filter = state.payFilter || "month";
    const srcFilter = state.paySrcFilter || "all";
    let list = paymentsInFilter(filter).slice().sort((a, b) => String(b.date).localeCompare(String(a.date)) || String(b.id).localeCompare(String(a.id)));
    if (srcFilter !== "all") {
      list = list.filter((p) => {
        const s = String(p.source || "").toUpperCase();
        if (srcFilter === "ONLINE") return s === "ONLINE" || s === "PORTAL" || s === "WEBSITE" || !!p.linkPay;
        if (srcFilter === "AUTOPAY") return s === "AUTOPAY" || s === "AUTOPAY";
        if (srcFilter === "EXTERNAL") return s === "EXTERNAL" || s === "CHECK" || s === "ZELLE" || s === "WIRE" || s === "ACH" || (!p.linkPay && !p.failed);
        return true;
      });
    }
    const filters = [
      ["today", "Today"],
      ["week", "This week"],
      ["month", "This month"],
      ["prev", "Previous month"],
      ["all", "All"],
    ];
    const srcFilters = [
      ["all", "All sources"],
      ["ONLINE", "Online"],
      ["AUTOPAY", "AutoPay"],
      ["EXTERNAL", "External"],
    ];
    const rows = list.map((p) => {
      const c = p.customerId ? custBy(p.customerId) : null;
      const loc = p.locationId ? locBy(p.customerId, p.locationId) : c?.locations?.[0];
      const needs = payNeedsMark(p);
      let act = "";
      if (isOps) {
        const need = c && loc && locNeedsService(c, loc);
        act = c
          ? (need ? btn("service.create", "Create service", "open-service", `data-id="${c.id}" data-loc="${loc.id}"`) : `<button class="btn btn-ghost" data-act="open-customer" data-id="${c.id}">Bill-To</button>`)
          : "—";
      } else if (p.failed) {
        act = "—";
      } else if (needs) {
        act = `<button class="btn btn-sun" data-act="mark-invoice-paid" data-id="${p.id}">Post payment</button>`;
      } else {
        act = "—";
      }
      const status = p.failed
        ? statusBadge("failed")
        : needs
          ? `<span class="badge badge-warn">Needs posting</span>`
          : `<span class="badge badge-ok">Posted</span>`;
      return [
        p.date,
        c ? `<button class="btn btn-ghost linkish" data-act="open-pay-row" data-id="${p.id}">${esc(c.billTo || c.name)}</button>` : "—",
        esc(p.method || "—"),
        p.invoiceId || "—",
        can("payment.viewAmount") || isOps ? money(p.amount) : "—",
        status,
        `<div class="payment-row-actions">${act}</div>`,
      ];
    });
    return `
      ${head("Payment register", isOps
        ? "When Christy’s done and the balance is $0, open the Bill-To and create the service."
        : "All client payments appear here. Post each received payment to its invoice; a full payment marks the invoice paid.")}
      ${isOps
        ? `<div class="notice">You don’t allocate invoices. When balance is zero: open Bill-To → create service → assign on the map.</div>`
        : `<div class="notice">Online, AutoPay, checks, ACH, Zelle, and other client payments land here. Click <strong>Post payment</strong> to apply it to the linked invoice.</div>`}
      <div class="seg" style="margin-bottom:8px">
        ${filters.map(([id, lab]) => `<button class="${filter === id ? "on" : ""}" data-act="pay-filter" data-filter="${id}">${lab}</button>`).join("")}
      </div>
      <div class="seg" style="margin-bottom:12px">
        ${srcFilters.map(([id, lab]) => `<button class="${srcFilter === id ? "on" : ""}" data-act="pay-src-filter" data-filter="${id}">${lab}</button>`).join("")}
      </div>
      <p class="tiny" style="margin-bottom:10px">${list.length} payment${list.length === 1 ? "" : "s"} · ${esc(payFilterLabel(filter))}${!isOps ? ` · ${btn("payment.post", "Record payment", "new-pay", "", "btn-ghost")}` : ""}</p>
      ${table(["Date", "Bill-To", "MOP", "Invoice no.", "Amount paid", "Status", ""], rows, "payment-register-table")}
    `;
  }

  function payFilterRange(filter) {
    const t = new Date(TODAY + "T12:00:00");
    const iso = (d) => d.toISOString().slice(0, 10);
    const startOfMonth = (d) => new Date(d.getFullYear(), d.getMonth(), 1);
    const endOfMonth = (d) => new Date(d.getFullYear(), d.getMonth() + 1, 0);
    if (filter === "today") return { from: TODAY, to: TODAY };
    if (filter === "week") {
      const day = t.getDay();
      const mondayOffset = day === 0 ? -6 : 1 - day;
      const from = new Date(t);
      from.setDate(t.getDate() + mondayOffset);
      const to = new Date(from);
      to.setDate(from.getDate() + 6);
      return { from: iso(from), to: iso(to) };
    }
    if (filter === "prev") {
      const prev = new Date(t.getFullYear(), t.getMonth() - 1, 15);
      return { from: iso(startOfMonth(prev)), to: iso(endOfMonth(prev)) };
    }
    if (filter === "all") return { from: "2000-01-01", to: "2100-12-31" };
    return { from: iso(startOfMonth(t)), to: iso(endOfMonth(t)) };
  }
  function payFilterLabel(filter) {
    const map = { today: "Today", week: "This week", month: "This month", prev: "Previous month", all: "All dates" };
    const r = payFilterRange(filter);
    return `${map[filter] || "This month"} (${r.from} → ${r.to})`;
  }
  function paymentsInFilter(filter) {
    const r = payFilterRange(filter || state.payFilter || "month");
    return (state.data.payments || []).filter((p) => p.date >= r.from && p.date <= r.to);
  }
  function openPayRow(payId) {
    const p = (state.data.payments || []).find((x) => x.id === payId);
    if (!p) return;
    state.payFocusId = payId;
    if (!p.customerId) {
      matchPay(payId);
      return;
    }
    state.selectedCustomer = p.customerId;
    state.page = "customer";
    render();
  }

  function openMarkInvoicePaid(payId) {
    if (!can("payment.post")) return;
    const p = (state.data.payments || []).find((x) => x.id === payId);
    const inv = p?.invoiceId ? (state.data.invoices || []).find((i) => i.id === p.invoiceId) : null;
    if (!p || !inv || p.failed) {
      toast("This payment cannot be applied to an invoice.");
      return;
    }
    if (!payNeedsMark(p)) {
      toast("This payment is already allocated.");
      return;
    }
    const c = custBy(inv.customerId);
    const loc = inv.locationId ? locBy(inv.customerId, inv.locationId) : null;
    const available = Math.max(0, Number(p.amount || 0) - paymentAllocatedAmount(p.id));
    const balance = invoiceBalance(inv);
    const paysInFull = available + 0.001 >= balance;
    state.modal = {
      html: `
        <h3>Post payment?</h3>
        <div class="task-location-context">
          <div><span>Bill-To</span><strong>${esc(c?.billTo || c?.name || "—")}</strong></div>
          <div><span>Location</span><strong>${esc(loc?.name || "—")}</strong><small>${esc(loc?.address || "")}</small></div>
        </div>
        <dl class="kv">
          <dt>Invoice</dt><dd>${esc(inv.id)}</dd>
          <dt>Payment received</dt><dd>${money(available)}</dd>
          <dt>Invoice balance</dt><dd>${money(balance)}</dd>
          <dt>Result</dt><dd>${paysInFull ? `<span class="badge badge-ok">Paid in full</span>` : `<span class="badge badge-warn">Partial payment</span>`}</dd>
        </dl>
        <div class="actions section-gap">
          <button class="btn btn-ghost" data-act="close-modal">Cancel</button>
          <button class="btn btn-primary" data-act="confirm-mark-invoice-paid" data-id="${p.id}">Post payment</button>
        </div>
      `,
    };
    render();
  }

  function markInvoicePaidFromRegister(payId) {
    if (!can("payment.post")) return;
    const p = (state.data.payments || []).find((x) => x.id === payId);
    const inv = p?.invoiceId ? (state.data.invoices || []).find((i) => i.id === p.invoiceId) : null;
    if (!p || !inv || p.failed || !payNeedsMark(p)) return;
    const available = Math.max(0, Number(p.amount || 0) - paymentAllocatedAmount(p.id));
    if (!available) return;
    allocatePaymentToInvoice(p, inv, available);
    const paid = invoiceFinStatus(inv) === "PAID";
    state.data.comms.unshift({
      id: nid("CM"),
      customerId: inv.customerId,
      who: role()?.name || "Christy Brown",
      channel: "Office",
      date: TODAY,
      text: `${p.method || "Payment"} allocated to ${inv.id}. ${paid ? "Invoice marked paid." : `Remaining balance ${money(invoiceBalance(inv))}.`}`,
    });
    state.modal = null;
    state.payFocusId = null;
    toast(paid ? `${inv.id} marked paid. Rick can continue with service.` : `${money(available)} allocated. ${money(invoiceBalance(inv))} remains.`);
    render();
  }

  function renewalCandidates() {
    const windowDays = state.data.settings?.renewalWindow || 60;
    const rows = [];
    (state.data.customers || []).forEach((c) => {
      if (c.status === "lapsed" || c.status === "inquiry") return;
      (c.locations || []).filter((l) => l.covered !== false).forEach((l) => {
        const plan = locPlan(c, l);
        const inWindow = plan.expires && daysUntil(plan.expires) <= windowDays && ["active", "renewal", "past_due"].includes(c.status);
        if (!(c.status === "renewal" || inWindow)) return;
        if (!plan.expires && c.status !== "renewal") return;
        rows.push({
          id: `${c.id}:${l.id}`,
          customerId: c.id,
          locationId: l.id,
          name: c.billTo || c.name,
          locName: l.name,
          amount: plan.amount,
          expires: plan.expires || c.expires,
          programId: plan.programId,
          autoPay: plan.autoPay,
          status: c.status,
        });
      });
    });
    return rows;
  }
  function daysUntil(date) {
    return Math.round((new Date(date) - new Date(TODAY)) / 86400000);
  }
  const KNOWN_RENEWAL_AMOUNTS = [2000, 2100, 2400, 1400, 1200, 800, 300, 180];
  function renewalMeta(row) {
    if (!row) return { window: "—", flag: "—", batchable: false, noticeOnly: false };
    const days = daysUntil(row.expires);
    const window = days <= 30 ? "30 days" : "60 days";
    const already = (state.data.invoices || []).some((i) => i.customerId === (row.customerId || row.id) && i.locationId === row.locationId && i.kind === "renewal" && (i.status === "sent" || i.status === "failed"));
    const odd = !KNOWN_RENEWAL_AMOUNTS.includes(Number(row.amount));
    const rollover = row.programId === "1mo";
    const noticeOnly = !!row.autoPay;
    let flag = "Standard — same terms";
    if (already) flag = "Invoice already out — follow up unpaid, don’t send again";
    else if (odd) flag = "Odd amount — review with Tom";
    else if (rollover) flag = "1-month — offer 6/12 rollover, don’t re-send 1-month";
    else if (noticeOnly) flag = "Auto-pay — send notice only, do not charge";
    else if (row.programId === "12mo") flag = "Monthly installment — renewal is the term, not one $200 hit";
    const batchable = !odd && !rollover && !already;
    return { window, days, flag, odd, rollover, noticeOnly, batchable };
  }
  function parseRenewId(id) {
    const hit = renewalCandidates().find((r) => r.id === id);
    if (hit) return hit;
    const c = custBy(id);
    if (!c) return null;
    const l = c.locations?.[0];
    if (!l) return null;
    const plan = locPlan(c, l);
    return { id: `${c.id}:${l.id}`, customerId: c.id, locationId: l.id, name: c.billTo || c.name, locName: l.name, amount: plan.amount, expires: plan.expires, programId: plan.programId, autoPay: plan.autoPay, status: c.status };
  }
  function failedAutopay() {
    return (state.data.payments || []).filter((p) => p.failed);
  }
  function overnightPortal() {
    return (state.data.payments || []).filter((p) => (p.source === "portal" || p.source === "website") && p.appliedAuto && p.posted && p.date >= "2026-08-26");
  }
  function registerPosted() {
    return (state.data.payments || []).filter((p) => p.posted && !p.failed).slice().sort((a, b) => String(b.date).localeCompare(String(a.date)));
  }
  function unpostedBank() {
    return (state.data.payments || []).filter((p) => !p.posted && !p.failed);
  }
  function mailKindLabel(kind) {
    if (kind === "check") return "Check";
    if (kind === "cash") return "Cash";
    if (kind === "bank") return "Bank transfer";
    if (kind === "ach") return "ACH";
    return "Card";
  }
  function payRegisterRow(p) {
    const c = p.customerId ? custBy(p.customerId) : null;
    const needs = payNeedsMark(p);
    const src = String(p.source || "").toUpperCase() || (payIsLink(p) ? "ONLINE" : "EXTERNAL");
    return `<div class="fit-row">
      <div>
        <span class="badge ${p.failed ? "badge-bad" : needs ? "badge-warn" : "badge-ok"}">${p.failed ? "Declined" : needs ? "Needs posting" : "Posted"}</span>
        ${c
          ? `<button class="btn btn-ghost linkish" data-act="open-pay-row" data-id="${p.id}">${esc(c.billTo || c.name)}</button>`
          : `<strong>${esc(p.memo || "—")}</strong>`}
        <div class="tiny">${esc(p.date)} · ${esc(src)} · ${esc(p.method || "")}${p.last4 ? " · ····" + esc(p.last4) : ""} · ${money(p.amount)} · alloc ${money(paymentAllocatedAmount(p.id))} · ${p.invoiceId ? esc(p.invoiceId) + " · " : ""}${esc(p.memo || "")}</div>
      </div>
      ${c
        ? needs && can("payment.post")
          ? `<button class="btn btn-sun" data-act="mark-invoice-paid" data-id="${p.id}">Post payment</button>`
          : `<button class="btn btn-ghost" data-act="open-pay-row" data-id="${p.id}">Open Bill-To</button>`
        : ""}
    </div>`;
  }

  function renewalProposedText(row, programId) {
    const pid = programId || row.programId;
    const p = progBy(pid);
    const amt = p ? programBillAmount(p) : Number(row.amount || 0);
    if (p?.id === "12mo") {
      return `${money(amt)}/month × ${p.months} — ${p.name}`;
    }
    if (p) {
      return `${money(amt)} upfront — ${p.name}`;
    }
    const bp = (() => {
      const ct = contractForLoc(row.customerId, row.locationId);
      return ct ? planForContract(ct.id) : null;
    })();
    if (bp?.frequency === "monthly") return `${money(row.amount)}/month × ${bp.installments} — same terms`;
    return `${money(row.amount)} upfront — same terms`;
  }

  function programOptionsHtml(selectedId) {
    return allPrograms().map((p) => {
      const amt = programBillAmount(p);
      const price = p.id === "12mo" ? `${money(amt)}/mo` : money(amt);
      return `<option value="${p.id}" ${p.id === selectedId ? "selected" : ""}>${esc(p.name)} · ${price} · ${esc(p.freq)}</option>`;
    }).join("");
  }

  function viewRenewals() {
    const candidates = renewalCandidates();
    const rows = candidates.map((row) => {
      const m = renewalMeta(row);
      const ct = contractForLoc(row.customerId, row.locationId);
      const existing = (state.data.renewals || []).find((r) => r.rowId === row.id || (ct && r.contractId === ct.id));
      const pickProgram = existing?.programId || row.programId;
      const alreadySent = existing?.status === "SENT";
      const send = alreadySent
        ? `<span class="tiny">—</span>`
        : `<label class="chk"><input type="checkbox" data-act="renew-toggle" data-id="${row.id}" ${(state.renewPick || []).includes(row.id) ? "checked" : ""}></label>`;
      const status = alreadySent
        ? statusBadge("sent")
        : `<span class="badge badge-mute">Ready</span>`;
      const act = alreadySent
        ? `<span class="tiny">Sent ${esc((existing.sentAt || "").slice(0, 10))}</span>`
        : `<button class="btn btn-ghost" data-act="review-renewal" data-id="${row.id}">Review / edit</button>`;
      const proposed = existing?.proposedText || renewalProposedText(row, pickProgram);
      const planCell = `${esc(progBy(pickProgram)?.name || pickProgram || "—")}<div class="tiny">${esc(proposed)}</div>`;
      return [send, custBtn(row.customerId, row.name), esc(row.locName), row.expires, m.window, money(existing?.amount != null ? existing.amount : row.amount), planCell, m.flag, status, act];
    });
    const pickable = candidates.filter((row) => {
      const ct = contractForLoc(row.customerId, row.locationId);
      const existing = (state.data.renewals || []).find((r) => r.rowId === row.id || (ct && r.contractId === ct.id));
      return existing?.status !== "SENT";
    });
    const pickedN = (state.renewPick || []).length;
    return `
      ${head("Renewal report", "Check the ones to send, then Send — you’ll confirm the list.")}
      ${writeBar("renewal.send", "Send renewal")}
      <div class="notice">
        Select rows, then <strong>Send selected</strong>. Confirm in the modal. Use <strong>Review / edit</strong> only if the program changed (e.g. 1-month → 6/12). Sending a notice does not charge AutoPay.
      </div>
      <div class="actions" style="margin-bottom:10px">
        <button class="btn btn-ghost" data-act="renew-select-all">Select all (${pickable.length})</button>
        <button class="btn btn-ghost" data-act="renew-clear">Clear selection${pickedN ? ` (${pickedN})` : ""}</button>
        ${btn("renewal.send", `Send selected${pickedN ? ` (${pickedN})` : ""}`, "open-send-renewals", "", "btn-sun")}
      </div>
      ${table(["", "Bill-To", "Property", "Expires", "Window", "Amount", "Program / proposed", "Flag", "Status", ""], rows)}
      <div class="actions" style="margin-top:12px">
        ${btn("renewal.send", `Send selected${pickedN ? ` (${pickedN})` : ""}`, "open-send-renewals", "", "btn-sun")}
      </div>
    `;
  }

  function viewCommission() {
    const rows = state.data.commissions.map((b) => {
      const c = custBy(b.customerId);
      return [b.period, custBtn(b.customerId, c?.name || "—"), money2(b.amount), b.splits.map((s) => `${techName(s.techId)} ${s.pct}% (${money2(s.dollars)})`).join(" · ")];
    });
    return `
      ${head("Commission / bonus", "Renewal pay only — not the first term. You enter the split by hand. Dollars only; ADP stays outside.")}
      ${writeBar("commission.enter", "Enter split")}
      <div class="actions" style="margin-bottom:12px">${btn("commission.enter", "Enter split on next renewal", "enter-comm")}</div>
      ${table(["Period", "Account", "Bonus $", "Split"], rows)}
      <p class="tiny">Default rate ${state.data.settings.commissionPct}%. Owner can read this. Christy’s team enters the split — not Ops.</p>
    `;
  }

  function docKindLabel(kind) {
    return ({ coi: "COI", photo: "Photo", police: "Police / incident", contract: "Contract", other: "Other" })[kind] || "File";
  }
  function docKindBadge(kind) {
    const map = { coi: "badge-sea", photo: "badge-ok", police: "badge-bad", contract: "badge-warn", other: "badge-mute" };
    return `<span class="badge ${map[kind] || "badge-mute"}">${esc(docKindLabel(kind))}</span>`;
  }
  function docsForCustomer(cid) {
    return (state.data.documents || []).filter((d) => d.customerId === cid);
  }

  function viewDocuments() {
    const docs = (state.data.documents || []).slice().sort((a, b) => String(b.date).localeCompare(String(a.date)));
    const kinds = ["coi", "contract", "photo", "police", "other"];
    const counts = kinds.map((k) => ({ k, n: docs.filter((d) => d.kind === k).length })).filter((x) => x.n);
    return `
      ${head("Documents", "Attach a file to the Bill-To. Rick and Christy both see it.")}
      ${writeBar("docs.upload", "Upload")}
      <div class="doc-summary">
        ${counts.map((x) => `<span class="doc-chip">${docKindBadge(x.k)} <strong>${x.n}</strong></span>`).join("")}
        <span class="tiny">${docs.length} files on file</span>
      </div>
      <div class="actions" style="margin-bottom:12px">${btn("docs.upload", "Attach document", "upload-doc", "", "btn-sun")}</div>
      <div class="card doc-list">
        ${docs.length ? docs.map((d) => docRowHtml(d, true)).join("") : `<p class="muted">No documents yet. Attach one to a customer.</p>`}
      </div>
    `;
  }

  function docExt(name) {
    return ((name || "").match(/\.([a-z0-9]+)$/i) || [, "file"])[1].toUpperCase();
  }
  function fmtDocSize(n) {
    const b = Number(n) || 0;
    if (!b) return "";
    if (b < 1024) return b + " B";
    if (b < 1024 * 1024) return (b / 1024).toFixed(1) + " KB";
    return (b / (1024 * 1024)).toFixed(1) + " MB";
  }
  function docRowHtml(d, showCustomer) {
    const c = custBy(d.customerId);
    const loc = d.locationId ? locBy(d.customerId, d.locationId) : null;
    const ext = docExt(d.name);
    const isImg = !!(d.mime || "").startsWith("image/") || ["JPG", "JPEG", "PNG", "GIF", "WEBP"].includes(ext);
    return `<div class="doc-row">
      <div class="doc-icon${isImg && d.dataUrl ? " has-thumb" : ""}" aria-hidden="true">${isImg && d.dataUrl ? `<img src="${d.dataUrl}" alt="">` : (isImg ? "IMG" : ext.slice(0, 4))}</div>
      <div class="doc-body">
        <div class="doc-title">${docKindBadge(d.kind)} <strong>${esc(d.name)}</strong></div>
        <div class="tiny">${showCustomer ? `${custBtn(d.customerId, c?.billTo || c?.name || "—")}${loc ? ` · ${esc(loc.name)}` : ""} · ` : (loc ? `${esc(loc.name)} · ` : "")}by ${esc(d.by)}${d.size ? ` · ${fmtDocSize(d.size)}` : ""}${d.mime ? ` · ${esc(d.mime.split("/").pop())}` : ""}</div>
        ${d.note ? `<div class="tiny doc-note">${esc(d.note)}</div>` : ""}
      </div>
      <div class="doc-meta">
        <span class="muted">${esc(d.date)}</span>
        ${d.dataUrl || d.fileName ? `<button type="button" class="btn btn-ghost" data-act="view-doc" data-id="${d.id}">View</button>` : `<button type="button" class="btn btn-ghost" data-act="view-doc" data-id="${d.id}">Details</button>`}
        ${showCustomer ? `<button type="button" class="btn btn-ghost" data-act="open-customer" data-id="${d.customerId}">Open account</button>` : ""}
      </div>
    </div>`;
  }

  function viewComms() {
    const items = state.role === "sales" ? [] : state.data.comms;
    return `
      ${head("Communication log", "Calls, emails, and texts on the account — the office can all see them.")}
      ${items.map((x) => {
        const c = custBy(x.customerId);
        return `<div class="comm-item">${custBtn(x.customerId, c?.name)} · ${esc(x.who)} · ${esc(x.channel)} · ${esc(x.date)}<div>${esc(x.text)}</div></div>`;
      }).join("")}
      ${state.role !== "sales" ? `
        <div class="card section-gap">
          <h3>Add a note</h3>
          <div class="field"><label>Customer</label>
            <select id="comm-cust">${state.data.customers.map((c) => `<option value="${c.id}">${esc(c.name)}</option>`).join("")}</select>
          </div>
          <div class="field"><label>Channel</label>
            <select id="comm-channel"><option>Office</option><option>Phone</option><option>Email</option><option>Text</option></select>
          </div>
          <div class="field"><label>Note</label><textarea id="comm-text" rows="3" placeholder="Stays on the shared log"></textarea></div>
          <button class="btn btn-primary" data-act="add-comm">Save to log</button>
        </div>
      ` : ""}
    `;
  }

  function viewMtos() {
    const list = state.data.mtos.filter((m) => {
      if (state.role === "owner") return true;
      if (state.role === "ops") return m.dept === "ops";
      if (state.role === "admin") return m.dept === "admin";
      return false;
    });
    return `
      ${head("Memo to Office", "Tech notes to Ops or Admin — stays on that memo.")}
      ${list.map(mtoCard).join("") || `<p class="muted">No memos for this department.</p>`}
    `;
  }

  function viewTasks() {
    const filter = state.taskFilter || "mine";
    const all = (state.data.tasks || []).slice().sort((a, b) => {
      if (a.status !== b.status) return a.status === "open" ? -1 : 1;
      return String(a.due || "").localeCompare(String(b.due || ""));
    });
    const list = all.filter((t) => {
      if (filter === "mine") return t.assignee === state.role && t.status === "open";
      if (filter === "open") return t.status === "open";
      if (filter === "done") return t.status === "done";
      if (filter === "created") return t.createdBy === state.role;
      return true;
    });
    const filters = [
      ["mine", "Assigned to me"],
      ["open", "All open"],
      ["created", "I created"],
      ["done", "Done"],
      ["all", "Everything"],
    ];
    return `
      ${head("Tasks", "Tom, Rick, and Christy leave tasks for each other on a customer. Open the Bill-To from the task, or create one from the customer page.")}
      ${writeBar("task.create", "Create task")}
      <div class="seg" style="margin-bottom:12px">
        ${filters.map(([id, lab]) => `<button class="${filter === id ? "on" : ""}" data-act="task-filter" data-filter="${id}">${lab}</button>`).join("")}
      </div>
      <div class="actions" style="margin-bottom:12px">${btn("task.create", "Create task", "new-task")}</div>
      <div class="card">
        <h3>${esc(filters.find((f) => f[0] === filter)?.[1] || "Tasks")} <span class="muted">${list.length}</span></h3>
        ${taskListHtml(list, "Nothing in this filter.")}
      </div>
    `;
  }

  function mtoCard(m) {
    const c = custBy(m.customerId);
    return `<div class="mto-card ${m.read ? "" : "unread"}">
      <strong>${esc(techBy(m.from)?.name || m.from)}</strong> → ${esc(m.dept)} · ${custBtn(m.customerId, c?.name)} · ${esc(m.date)}
      <div>${esc(m.text)}</div>
      ${can("mto.reply")
        ? `<div class="field" style="margin-top:10px"><label>Office reply</label><textarea class="inline-edit" data-edit="mto" data-field="reply" data-id="${m.id}" rows="2" placeholder="Reply stays on this memo">${esc(m.reply || "")}</textarea></div>`
        : (m.reply ? `<div class="tiny">Reply: ${esc(m.reply)}</div>` : "")}
    </div>`;
  }

  function viewTrappers() {
    const rows = TECHS.map((t) => {
      const user = (state.data.users || []).find((u) =>
        u.role === "trapper"
        && String(u.name || "").toLowerCase() === String(t.name || "").toLowerCase()
      );
      const stops = (state.data.stops || []).filter((s) =>
        s.techId === t.id && s.status === "scheduled" && !s.pending
      );
      const customers = new Set(stops.map((s) => s.customerId).filter(Boolean)).size;
      const minutes = stops.reduce((sum, s) => sum + Number(s.durationMin || 0), 0);
      const next = stops.slice().sort((a, b) =>
        DAYS.indexOf(a.day) - DAYS.indexOf(b.day)
        || String(a.time || "").localeCompare(String(b.time || ""))
      )[0];
      return { t, user, stops, customers, minutes, next };
    });
    return `
      ${head("Trappers", "Field team list for Rick, Christy, and Tom. Avery manages roles on Users.")}
      <div class="grid-4">
        ${stat("Active trappers", rows.filter((r) => r.user?.active !== false).length, "Field team")}
        ${stat("Stops scheduled", rows.reduce((n, r) => n + r.stops.length, 0), "Current board")}
        ${stat("Customers covered", new Set((state.data.stops || []).filter((s) => s.status === "scheduled" && !s.pending).map((s) => s.customerId).filter(Boolean)).size, "Across all trappers")}
        ${stat("Scheduled hours", (rows.reduce((n, r) => n + r.minutes, 0) / 60).toFixed(1), "Current board")}
      </div>
      <div class="card section-gap">
        ${rows.map(({ t, user, stops, customers, minutes, next }) => `
          <div class="user-row">
            <div>
              <div class="actions" style="gap:8px">
                <i class="dot" style="background:${t.color}"></i>
                <strong>${esc(t.name)}</strong>
                <span class="badge ${user?.active === false ? "badge-bad" : "badge-ok"}">${user?.active === false ? "Inactive" : "Active"}</span>
              </div>
              <div class="tiny">${esc(t.home)} · ${customers} customer${customers === 1 ? "" : "s"} · ${stops.length} stop${stops.length === 1 ? "" : "s"} · ${fmtClock(minutes)}</div>
              <div class="tiny">${next ? `Next: ${esc(next.day)} ${esc(next.time || "")} · ${esc(stopLabel(next))}` : "No scheduled stops"}</div>
            </div>
            <div class="actions">
              ${canPage("map") ? `<button class="btn btn-ghost" data-act="map-tech" data-tech="${t.id}">Open on map</button>` : ""}
              ${canPage("workload") ? `<button class="btn btn-ghost" data-act="nav" data-page="workload">Workload</button>` : ""}
            </div>
          </div>
        `).join("")}
      </div>
      ${state.role === "admin"
        ? `<p class="tiny section-gap">Christy can see the field team and workload here. Rick handles route changes; Avery changes user roles.</p>`
        : `<p class="tiny section-gap">Need to change a role? Avery or Tom can do that under System → Users.</p>`}
    `;
  }

  function viewTraps() {
    const traps = state.data.traps || [];
    const valueOut = traps.filter((t) => t.status !== "retrieved").reduce((s, t) => s + t.value, 0);
    return `
      ${head("Trap assets", "Traps run about $80 each. Track where they are and pull them when the contract ends.")}
      ${writeBar("trap.update", "Update trap")}
      <div class="grid-3">
        ${stat("In the field", traps.filter((t) => t.status === "deployed" || t.status === "out").length, "Need a location")}
        ${stat("Missing / retrieve", traps.filter((t) => t.status === "missing" || t.status === "out").length, "Contract ended or lost", "alert")}
        ${stat("Value still out", money(valueOut), "Not retrieved")}
      </div>
      <div class="card section-gap">
        ${traps.map((t) => {
          const c = custBy(t.customerId);
          const loc = locBy(t.customerId, t.locationId);
          return `<div class="fit-row">
            <div>
              <strong>${esc(t.serial)}</strong> · ${statusBadge(t.status === "deployed" ? "active" : t.status === "retrieved" ? "paid" : t.status === "missing" ? "failed" : "inquiry")}
              <div class="tiny">${esc(c?.name || "—")} · ${esc(loc?.name || loc?.address || "—")} · last ${esc(t.lastSeen)} · ${esc(t.note)}</div>
            </div>
            <div class="actions">
              ${t.status !== "retrieved" ? btn("trap.update", "Mark retrieved", "trap-status", `data-id="${t.id}" data-status="retrieved"`, "btn-ghost") : ""}
              ${t.status === "deployed" ? btn("trap.update", "Missing", "trap-status", `data-id="${t.id}" data-status="missing"`, "btn-warn") : ""}
              ${t.status === "out" ? btn("trap.update", "Still out", "trap-status", `data-id="${t.id}" data-status="out"`, "btn-ghost") : ""}
            </div>
          </div>`;
        }).join("")}
      </div>
    `;
  }

  function viewReports() {
    const ops = ["Duration vs scheduled", "Route / workload", "Monthly removals"];
    const adm = ["Payment register", "Failed auto-pay", "Renewals (30 / 60 days)", "Hours per account / PO (municipal)", "Commission by technician"];
    const own = ["Non-renewals by technician", "Closing rate"];
    const show = [];
    if (["owner", "ops"].includes(state.role)) show.push(...ops);
    if (["owner", "admin"].includes(state.role)) show.push(...adm);
    if (state.role === "owner") show.push(...own);
    return `
      ${head("Reports", "Only the reports for your job.")}
      <ul class="settings-list">${show.map((s) => `<li><span>${esc(s)}</span><span class="muted">Available</span></li>`).join("")}</ul>
      <div class="actions section-gap">
        ${canPage("duration") ? `<button class="btn btn-ghost" data-act="nav" data-page="duration">Open duration</button>` : ""}
        ${canPage("removals") ? `<button class="btn btn-ghost" data-act="nav" data-page="removals">Open removals</button>` : ""}
        ${canPage("payments") ? `<button class="btn btn-ghost" data-act="nav" data-page="payments">Open register</button>` : ""}
        ${canPage("renewals") ? `<button class="btn btn-ghost" data-act="nav" data-page="renewals">Open renewals</button>` : ""}
        ${canPage("commission") ? `<button class="btn btn-ghost" data-act="nav" data-page="commission">Open commission</button>` : ""}
      </div>
    `;
  }

  /* ---------- System ---------- */
  function viewUsers() {
    return `
      ${head("Users & roles", "Set each person to the right role. Field techs are Trappers — not Owner.")}
      ${writeBar("users.manage", "Edit users")}
      ${state.data.users.map((u) => `
        <div class="user-row">
          <div>
            ${can("users.manage") ? inline("user", "name", u.name, `data-id="${u.id}"`) : `<strong>${esc(u.name)}</strong>`}
            <div class="tiny">${can("users.manage")
              ? `<select class="inline-edit" data-edit="user" data-field="role" data-id="${u.id}">${USER_ROLE_OPTIONS.map((r) => `<option value="${r.id}" ${r.id === u.role || (u.role === "tech" && r.id === "trapper") ? "selected" : ""}>${esc(r.title)}</option>`).join("")}</select>`
              : esc(userRoleTitle(u.role))}</div>
          </div>
          <div class="row">
            ${statusBadge(u.active ? "active" : "lapsed")}
            ${btn("users.manage", u.active ? "Deactivate" : "Reactivate", "toggle-user", `data-id="${u.id}"`, "btn-ghost")}
          </div>
        </div>
      `).join("")}
      <p class="tiny section-gap">Trapper = field route / mobile. Operations = Rick. Administration = Christy. Owner = Tom. System admin = Avery.</p>
    `;
  }

  function viewLists() {
    const programs = allPrograms();
    const types = allServiceTypes();
    return `
      ${head("Configurable lists", "No-show reasons, programs, and service types — add what the office uses.")}
      ${writeBar("lists.edit", "Edit lists")}
      <div class="split">
        <div class="card">
          <h3>No-show reasons</h3>
          <ul class="settings-list">${allReasons().map((r) => `<li><span>${esc(r.label)}</span><span class="muted">${esc(r.fault)}</span></li>`).join("")}</ul>
          <div class="field"><label>New reason</label><input id="new-reason" placeholder="Flooded yard"></div>
          <div class="field"><label>Fault</label>
            <select id="new-reason-fault"><option value="customer">Customer</option><option value="company">Company</option></select>
          </div>
          ${btn("lists.edit", "Add reason", "add-reason")}
        </div>
        <div class="card">
          <h3>Programs we use</h3>
          <ul class="settings-list">${programs.map((p) => `<li><span>${esc(p.name)}</span><span class="muted">${money(p.list)}${p._custom ? " · custom" : ""}</span></li>`).join("")}</ul>
          <div class="field"><label>Program name</label><input id="new-prog-name" placeholder="e.g. 9-month prepaid"></div>
          <div class="field"><label>List price $</label><input id="new-prog-price" type="number" value="1000"></div>
          <div class="field"><label>Months</label><input id="new-prog-months" type="number" step="0.5" value="6"></div>
          ${btn("lists.edit", "Add program", "add-program")}
          <h3 class="section-gap">Service types</h3>
          <ul class="settings-list">${types.map((t) => `<li><span>${esc(t.code)} · ${esc(t.label)}</span><span class="muted">${fmtDur(t.duration)}${t._custom ? " · custom" : ""}</span></li>`).join("")}</ul>
          <div class="field"><label>Code</label><input id="new-svc-code" placeholder="e.g. 9 - 9 MON RES"></div>
          <div class="field"><label>Label</label><input id="new-svc-label" placeholder="9-month residential"></div>
          <div class="field"><label>Duration (min)</label><input id="new-svc-dur" type="number" value="20"></div>
          ${btn("lists.edit", "Add service type", "add-service-type")}
        </div>
      </div>
    `;
  }

  function viewTemplates() {
    const tpls = state.data.templates || {};
    const cards = allTemplates();
    return `
      ${head("Templates", "Edit the body, preview, or add a new template. Saves on this browser.")}
      ${writeBar("template.edit", "Edit templates")}
      <div class="actions" style="margin-bottom:12px">
        ${btn("template.edit", "Add template", "add-template", "", "btn-sun")}
        ${btn("template.edit", "Save all templates", "save-templates", "", "btn-ghost")}
      </div>
      <div class="grid-3">
        ${cards.map(({ key, label, custom }) => `
          <div class="card">
            <h3>${esc(label)}${custom ? ` <span class="badge badge-mute">Custom</span>` : ""}</h3>
            <textarea id="tpl-${esc(key)}" class="inline-edit" data-edit="template" data-field="${esc(key)}" rows="6">${esc(tpls[key] || "")}</textarea>
            <div class="actions" style="margin-top:10px">
              <button class="btn btn-ghost" data-act="preview-tpl" data-name="${esc(label)}" data-key="${esc(key)}">Preview</button>
              ${custom ? `<button class="btn btn-ghost" data-act="remove-template" data-key="${esc(key)}">Remove</button>` : ""}
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  function viewSettings() {
    const s = state.data.settings;
    const lock = can("settings.edit") ? "" : "disabled";
    return `
      ${head("Company settings", "Office defaults — commission %, how early renewals show, and reminder channel.")}
      ${writeBar("settings.edit", "Save")}
      <div class="card">
        <p class="tiny">These are company-wide defaults. Change a value, then hit <strong>Save settings</strong>.</p>
        <div class="field"><label>Default commission %</label>
          <input id="set-comm" type="number" value="${s.commissionPct}" ${lock}>
          <span class="tiny">Used when Christy enters a renewal bonus split</span>
        </div>
        <div class="field"><label>Renewal window (days)</label>
          <input id="set-win" type="number" value="${s.renewalWindow}" ${lock}>
          <span class="tiny">How many days before expiry a contract shows on the renewal report</span>
        </div>
        <div class="field"><label>Reminder channel</label>
          <select id="set-reminder" ${lock}>
            <option value="email" ${s.reminder === "email" ? "selected" : ""}>Email</option>
            <option value="sms" ${s.reminder === "sms" ? "selected" : ""}>SMS</option>
            <option value="both" ${s.reminder === "both" ? "selected" : ""}>Email + SMS</option>
          </select>
          <span class="tiny">Visit notices and renewal notices</span>
        </div>
        ${btn("settings.edit", "Save settings", "save-settings")}
        <div class="actions" style="margin-top:12px"><button class="btn btn-ghost" data-act="reset-demo">Reset demo data</button></div>
      </div>
    `;
  }

  function viewIntegrations() {
    const g = state.data.integrations || {};
    const lock = can("settings.edit") ? "" : "disabled";
    return `
      ${head("Integrations", "API keys and processor settings. Card numbers never go in this app.")}
      ${writeBar("settings.edit", "Save")}
      <div class="card">
        <p class="tiny">Fill these in, then <strong>Save integrations</strong>. Values stay on this browser for the demo.</p>
        <div class="field"><label>Google Maps Platform key</label>
          <input id="int-maps" value="${esc(g.mapsKey || "")}" placeholder="Maps API key" ${lock}>
        </div>
        <div class="field"><label>Payment processor</label>
          <input id="int-processor" value="${esc(g.processor || "")}" placeholder="Portal / ACH processor id" ${lock}>
        </div>
        <div class="field"><label>SendGrid / SMS</label>
          <input id="int-sendgrid" value="${esc(g.sendgrid || "")}" placeholder="Email / SMS provider key" ${lock}>
        </div>
        <div class="field"><label>Notes</label>
          <textarea id="int-notes" rows="2" placeholder="Vehicle GPS stays outside this app" ${lock}>${esc(g.notes || "")}</textarea>
        </div>
        ${btn("settings.edit", "Save integrations", "save-integrations")}
      </div>
      <p class="tiny section-gap">ADP / QuickBooks stay outside. No custom build for a single contract.</p>
    `;
  }

  /* ---------- Mobile ---------- */
  function renderMobile() {
    const r = role();
    const stops = state.data.stops.filter((s) => s.techId === r.techId && s.day === "Thu" && !s.pending);
    if (state.mobileStop) return renderMobileStop(stops.find((s) => s.id === state.mobileStop) || stops[0]);
    return `
      <div class="mobile-shell">
        <div class="phone">
          <div class="phone-bar">
            <small>Thu 27 Aug · Field app</small>
            <h2>Johnny’s route</h2>
            <div class="tiny">Starts/ends at Deerfield Beach · no pricing, no invoices</div>
          </div>
          <div class="phone-body">
            ${stops.map((s) => {
              const c = s.customerId ? custBy(s.customerId) : null;
              const loc = s.locationId ? locBy(s.customerId, s.locationId) : null;
              return `
                <button class="stop-card ${s.status === "scheduled" ? "active" : ""}" data-act="open-stop" data-id="${s.id}" style="width:100%;text-align:left">
                  <h3>${esc(stopLabel(s))}</h3>
                  <div class="meta">${esc(s.time || "Live")} · ${esc(loc?.address || s.address || "")} · ${s.durationMin}m</div>
                  ${statusBadge(s.status)}
                  ${s.type === "oneoff" ? `<div class="hidden-note">One-off dropped onto your live route</div>` : ""}
                  ${c?.notes && state.role === "tech" ? `<div class="hidden-note">${esc(c.notes)}</div>` : ""}
                </button>
              `;
            }).join("") || `<p class="muted">No Thursday stops.</p>`}
          </div>
          <div class="phone-foot">
            <span>${esc(r.name)}</span>
            <button class="btn btn-ghost" data-act="switch-role-btn" data-role="ops">Office login</button>
          </div>
        </div>
      </div>
    `;
  }

  function renderMobileStop(s) {
    if (!s) {
      state.mobileStop = null;
      return renderMobile();
    }
    const c = s.customerId ? custBy(s.customerId) : null;
    const loc = s.locationId ? locBy(s.customerId, s.locationId) : null;
    const started = s.status === "in_progress";
    return `
      <div class="mobile-shell">
        <div class="phone">
          <div class="phone-bar">
            <small><button class="btn btn-ghost" data-act="close-stop" style="color:#fff;border-color:transparent">← Route</button></small>
            <h2>${esc(stopLabel(s))}</h2>
            <div class="tiny">${esc(loc?.address || s.address || "")}</div>
          </div>
          <div class="phone-body">
            <div class="notice">No invoice, price, or payment on this screen.</div>
            ${(() => {
              const gps = loc?.gps || (loc ? approxGps(loc) : "");
              return gps ? `
                <p class="muted">GPS ${esc(gps)}${loc?.manualPin ? " · manual pin" : ""}</p>
                <div class="actions">
                  <button class="btn btn-primary" data-act="navigate" data-gps="${esc(gps)}">Open in Maps</button>
                  <button class="btn btn-ghost" data-act="copy-gps" data-gps="${esc(gps)}">Copy lat/long</button>
                </div>
                <p class="tiny">Copy-paste into Google Maps — the old field app blocked that.</p>
              ` : "";
            })()}
            <div class="stack section-gap">
              ${!started && s.status === "scheduled" ? `<button class="btn btn-primary" data-act="start-stop" data-id="${s.id}">Start activity</button>` : ""}
              ${started ? `
                <div class="card">
                  <h3>Wildlife removal</h3>
                  <div class="removal-grid">
                    <div class="field"><label>Count</label><input id="rem-count" type="number" value="${esc(s.draftCount ?? 0)}"></div>
                    <div class="field"><label>Weight (lb)</label><input id="rem-wt" type="number" step="0.1" value="${esc(s.draftWt ?? 0)}"></div>
                  </div>
                  <button class="btn btn-ghost" data-act="add-photo" data-id="${s.id}" style="margin-top:8px">Attach photo</button>
                  ${(s.photos || []).map((p) => `<div class="tiny">${esc(p)}</div>`).join("")}
                </div>
                <div class="field"><label>Memo to Office</label>
                  <select id="mto-dept"><option value="ops" ${s.draftDept === "admin" ? "" : "selected"}>Route to Operations</option><option value="admin" ${s.draftDept === "admin" ? "selected" : ""}>Route to Administration</option></select>
                  <textarea id="mto-text" rows="3" placeholder="Internal only — never on the customer report">${esc(s.draftMto || "")}</textarea>
                </div>
                <div class="field"><label>If incomplete / no-show</label>
                  <select id="miss-reason">${allReasons().map((r) => `<option value="${r.id}">${esc(r.label)} (${esc(r.fault)})</option>`).join("")}</select>
                </div>
                <button class="btn btn-primary" data-act="complete-stop" data-id="${s.id}">Complete</button>
                <button class="btn btn-warn" data-act="miss-stop" data-id="${s.id}">Log no-show</button>
              ` : ""}
              ${s.status === "complete" ? `<div class="notice">Clocked ${s.actualMin} min. Removals: ${s.removals?.count || 0} / ${s.removals?.weight || 0} lb.${(s.photos || []).length ? " Photos: " + s.photos.length : ""}</div>` : ""}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /* ---------- Public pay ---------- */
  function renderPublicPay() {
    const inv = state.data.invoices.find((i) => i.id === state.payInvoice);
    const c = inv ? custBy(inv.customerId) : null;
    return `
      <div class="pay-public">
        <div class="pay-box">
          <div class="mark" style="margin-bottom:16px"><div class="mark-badge">IC</div><span>Iguana Control</span></div>
          <h2 style="font-family:var(--display);font-size:28px;margin-bottom:8px">Pay an invoice</h2>
          <p class="muted">No login. Pay by invoice link, website, or ACH — it shows up on the register.</p>
          <div class="field"><label>Invoice number</label>
            <input id="pay-id" value="${esc(state.payInvoice)}" placeholder="INV-4510">
          </div>
          <div class="field"><label>How you are paying</label>
            <select id="pay-method">${pay().optionsHtml("Portal", { publicPage: true })}</select>
          </div>
          ${inv ? `<div class="preview"><strong>${esc(c?.name)}</strong><div>${esc(inv.id)} · ${money(inv.amount)} · ${esc(inv.status)}</div></div>` : state.payInvoice ? `<div class="notice locked">No invoice with that number.</div>` : ""}
          <div class="actions" style="margin-top:12px">
            <button class="btn btn-ghost" data-act="lookup-pay">Look up</button>
            <button class="btn btn-primary" data-act="pay-now" ${inv && inv.status !== "paid" ? "" : "disabled"}>Pay ${inv ? money(inv.amount) : ""}</button>
          </div>
          <p class="tiny">Checks Tom deposits and bank wires are posted by Administration. Your name stays on the register line (not rolled into a batch).</p>
          <p class="tiny section-gap"><button class="btn btn-ghost" data-act="close-pay">Back to CRM</button></p>
        </div>
      </div>
    `;
  }

  /* ---------- Shared UI ---------- */
  function head(title, lede) {
    return `<div class="page-head"><div><h2>${esc(title)}</h2><p>${esc(lede)}</p></div></div>`;
  }
  function stat(k, v, s, cls = "") {
    return `<div class="stat ${cls}"><div class="k">${esc(k)}</div><div class="v">${v}</div><div class="s">${esc(s)}</div></div>`;
  }
  function table(headers, rows, className = "") {
    if (!rows.length) return `<p class="muted">Nothing to show.</p>`;
    return `<div class="table-wrap card ${esc(className)}" style="padding:8px 10px"><table><thead><tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
  }
  function renderToast() {
    return state.toast ? `<div class="toast">${esc(state.toast)}</div>` : "";
  }
  function renderModal() {
    if (!state.modal) return "";
    return `<div class="overlay"><div class="modal ${state.modal.wide ? "wide" : ""} ${state.modal.setup ? "setup" : ""} ${state.modal.previewMap ? "map-preview" : ""}">${state.modal.html}</div></div>`;
  }

  function applyListFilters(prefix) {
    const table = document.querySelector(`[data-filter-table="${prefix}"]`);
    if (!table) return;
    const search = String(document.getElementById(`${prefix}-filter-search`)?.value || "").trim().toLowerCase();
    const status = document.getElementById(`${prefix}-filter-status`)?.value || "";
    const type = document.getElementById(`${prefix}-filter-type`)?.value || "";
    const tech = document.getElementById(`${prefix}-filter-tech`)?.value || "";
    let visible = 0;
    const rows = [...table.querySelectorAll("tbody tr")];
    rows.forEach((row) => {
      const show =
        (!search || row.dataset.search.includes(search))
        && (!status || row.dataset.status === status)
        && (!type || row.dataset.type === type)
        && (!tech || row.dataset.tech === tech);
      row.hidden = !show;
      if (show) visible += 1;
    });
    const empty = table.querySelector(".list-filter-empty");
    if (empty) empty.hidden = visible !== 0;
    const count = document.getElementById(`${prefix}-filter-count`);
    if (count) count.textContent = `${visible} of ${rows.length}`;
  }

  function clearListFilters(prefix) {
    document.querySelectorAll(`[data-list-filter="${prefix}"]`).forEach((el) => { el.value = ""; });
    applyListFilters(prefix);
  }

  /* ---------- Bind / actions ---------- */
  function bind() {
    $app.onclick = (e) => {
      // Backdrop only. Overlay must NOT have data-act — otherwise clicking any input
      // inside the modal bubbles to closest([data-act]) and closes the dialog.
      if (e.target.classList.contains("overlay")) {
        state.modal = null;
        render();
        return;
      }
      const loginCard = e.target.closest("[data-act=enter], [data-act=login]");
      if (loginCard) {
        enterAs(loginCard.getAttribute("data-who") || loginCard.getAttribute("data-role"));
        return;
      }
      const el = e.target.closest("[data-act]");
      if (!el || el.disabled) return;
      if (el.tagName === "SELECT") return;
      // Typing / focusing a field must not fire a parent control's data-act.
      if (["INPUT", "TEXTAREA", "LABEL", "OPTION"].includes(e.target.tagName) && e.target !== el && !e.target.hasAttribute("data-act")) {
        return;
      }
      // Map / list clicks: stop focus jump + keep scroll position across re-render
      if (String(el.dataset.act || "").startsWith("map-") || el.dataset.act === "focus-tech" || el.dataset.act === "focus-client") {
        e.preventDefault();
      }
      act(el.dataset.act, el.dataset);
    };
    $app.onkeydown = (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const el = e.target.closest('[role="button"][data-act]');
      if (!el) return;
      e.preventDefault();
      act(el.dataset.act, el.dataset);
    };
    $app.onchange = (e) => {
      if (e.target.dataset.listFilter) {
        applyListFilters(e.target.dataset.listFilter);
        return;
      }
      if (e.target.id === "nc-email-none") {
        const em = document.getElementById("nc-email");
        if (em) {
          em.disabled = e.target.checked;
          if (e.target.checked) em.value = "";
        }
        return;
      }
      if (e.target.name === "nc-billto") {
        syncBillToMode();
        return;
      }
      if (e.target.id === "nc-type" || e.target.dataset.act === "intake-type") {
        syncCompanyField();
        return;
      }
      if (e.target.id === "nc-existing" || e.target.dataset.act === "pick-billto") {
        applyExistingBillTo(e.target.value);
        syncCompanyField();
        return;
      }
      if (e.target.dataset.edit) {
        applyInlineEdit(e.target);
        if (e.target.tagName === "SELECT" || e.target.type === "checkbox") render();
        return;
      }
      const el = e.target.closest("[data-act]");
      if (!el) return;
      if (el.dataset.act === "switch-role") {
        enterAs(el.value);
      }
      if (el.dataset.act === "nav-select") {
        state.page = el.value;
        ensureNavGroupOpenForPage(el.value);
        if (el.value === "map") {
          state.mapClient = null;
          state.mapLoc = null;
          state.mapCompare = [];
          state.mapPin = null;
        }
        render();
      }
      if (el.dataset.act === "assign-days") {
        state.assignDays = el.value;
        render();
      }
      if (el.dataset.act === "assign-loc") {
        state.assignLocId = el.value;
        state.assignFocus = null;
        render();
      }
      if (el.dataset.act === "preview-program") {
        const box = document.getElementById("cv-preview");
        if (box) box.innerHTML = convertPreviewInner(el.value);
      }
      if (el.dataset.act === "preview-loc-program") {
        const box = document.getElementById("cv-preview-" + el.dataset.loc);
        if (box) box.innerHTML = convertPreviewInner(el.value);
      }
      if (el.dataset.act === "preview-io-program") {
        const box = document.getElementById("io-preview");
        if (box) box.innerHTML = convertPreviewInner(el.value);
      }
      if (el.dataset.act === "task-cust-change") refreshTaskLocOptions();
      if (el.dataset.act === "sv-code") {
        applyServiceTypeDefaults();
        refreshSetupFit();
      }
      if (el.dataset.act === "ren-program") applyRenewalProgramFields();
      if (el.dataset.act === "oo-type") {
        const t = TASK_TYPES.find((x) => x.id === el.value);
        captureOneoffDraft();
        if (state.oneoffDraft && t) {
          state.oneoffDraft.type = t.id;
          state.oneoffDraft.duration = t.duration || 25;
        }
        refreshOneoffFit();
      }
      if (el.dataset.act === "oo-refresh" || el.dataset.act === "oo-addr") refreshOneoffFit();
      if (el.dataset.act === "sv-toggle-initial") {
        const block = document.getElementById("sv-initial-block");
        if (block) block.hidden = !el.checked;
        if (state.setupDraft) state.setupDraft.createInitial = el.checked;
      }
      if (el.dataset.act === "sv-start") fillSetupDates();
      if (el.dataset.act === "sv-sched") refreshSetupFit();
      if (el.dataset.act === "sv-loc") {
        captureCreateServiceDraft();
        state.setupLocId = el.value;
        if (state.setupDraft) state.setupDraft.loc = el.value;
        if (state.page === "create-service") render();
        else refreshSetupFit();
      }
    };
    $app.oninput = (e) => {
      if (e.target.dataset.listFilter) {
        applyListFilters(e.target.dataset.listFilter);
        return;
      }
      if (e.target.dataset.previewPin && !e.target.dataset.coord) updateMiniPreview(e.target);
      if (e.target.dataset.coord) syncPinFromLatLng(e.target);
      if (e.target.dataset.edit && e.target.tagName !== "SELECT") applyInlineEdit(e.target);
    };
    bindMapPins();
    bindMiniMapPins();
    if (state.page === "add-customer") {
      syncBillToMode();
      syncCompanyField();
    }
  }

  function bindMapPins() {
    const canvas = document.getElementById("map-canvas");
    if (!canvas || state.page !== "map") return;
    canvas.querySelectorAll(".pin[data-drag]").forEach((pin) => {
      pin.style.cursor = state.mapLasso ? "pointer" : "grab";
      pin.onmousedown = (e) => {
        if (state.mapLasso) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const move = (ev) => {
          const x = Math.max(4, Math.min(96, ((ev.clientX - rect.left) / rect.width) * 100));
          const y = Math.max(6, Math.min(94, ((ev.clientY - rect.top) / rect.height) * 100));
          pin.style.left = x + "%";
          pin.style.top = y + "%";
          pin.dataset.nx = x.toFixed(1);
          pin.dataset.ny = y.toFixed(1);
        };
        const up = () => {
          document.removeEventListener("mousemove", move);
          document.removeEventListener("mouseup", up);
          if (pin.dataset.nx) {
            const loc = locBy(pin.dataset.cid, pin.dataset.lid);
            if (loc) {
              loc.x = pin.dataset.nx + "%";
              loc.y = pin.dataset.ny + "%";
              loc.manualPin = true;
              loc.gps = approxGps(loc);
            }
            toast("Pin dropped. GPS " + (locBy(pin.dataset.cid, pin.dataset.lid)?.gps || "") + " — technicians navigate to this coordinate, not the street label.");
          }
        };
        document.addEventListener("mousemove", move);
        document.addEventListener("mouseup", up);
      };
    });
    bindMapBoxSelect(canvas);
  }

  function bindMapBoxSelect(canvas) {
    if (!canvas) return;
    canvas.onmousedown = null;
    if (!state.mapLasso) return;
    canvas.onmousedown = (e) => {
      if (e.button !== 0) return;
      if (e.target.closest(".pin.prop-pin, .map-select-panel, .map-float-card, .home-pin, button[data-act]")) return;
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const start = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      let box = canvas.querySelector(".map-box-select");
      if (!box) {
        box = document.createElement("div");
        box.className = "map-box-select";
        canvas.appendChild(box);
      }
      const paint = (x, y) => {
        const left = Math.min(start.x, x);
        const top = Math.min(start.y, y);
        box.style.left = left + "px";
        box.style.top = top + "px";
        box.style.width = Math.abs(x - start.x) + "px";
        box.style.height = Math.abs(y - start.y) + "px";
        box.hidden = false;
      };
      paint(start.x, start.y);
      const move = (ev) => paint(ev.clientX - rect.left, ev.clientY - rect.top);
      const up = (ev) => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
        const endX = ev.clientX - rect.left;
        const endY = ev.clientY - rect.top;
        const left = Math.min(start.x, endX);
        const top = Math.min(start.y, endY);
        const right = Math.max(start.x, endX);
        const bottom = Math.max(start.y, endY);
        box.remove();
        if (right - left < 6 && bottom - top < 6) return;
        const keys = [];
        canvas.querySelectorAll(".pin.prop-pin[data-cid][data-lid]").forEach((pin) => {
          const pr = pin.getBoundingClientRect();
          const cx = pr.left + pr.width / 2 - rect.left;
          const cy = pr.top + pr.height / 2 - rect.top;
          if (cx >= left && cx <= right && cy >= top && cy <= bottom) {
            keys.push(`${pin.dataset.cid}:${pin.dataset.lid}`);
          }
        });
        if (ev.shiftKey) {
          const set = new Set(state.mapSelect.concat(keys));
          state.mapSelect = [...set];
        } else {
          state.mapSelect = keys;
        }
        render();
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    };
  }

  function updateMiniPreview(input) {
    const pinId = input.dataset.previewPin;
    if (!pinId) return;
    let addr = input.value;
    if (input.dataset.locIndex != null) {
      const i = input.dataset.locIndex;
      const street = document.getElementById(`nc-loc-street-${i}`)?.value || "";
      const city = document.getElementById(`nc-loc-city-${i}`)?.value || "";
      addr = [street, city, "FL"].filter(Boolean).join(", ");
    } else if (input.id === "al-city" || input.id === "al-street" || input.id === "al-addr" || input.id === "el-city" || input.id === "el-street") {
      const prefix = input.id.startsWith("el-") ? "el" : "al";
      const street = document.getElementById(`${prefix}-street`)?.value || "";
      const city = document.getElementById(`${prefix}-city`)?.value || document.getElementById("al-addr")?.value || "";
      addr = [street, city, "FL"].filter(Boolean).join(", ") || input.value;
    }
    const pos = pinFromAddress(addr);
    const pin = document.getElementById(pinId);
    if (pin) {
      pin.style.left = pos.x;
      pin.style.top = pos.y;
      pin.classList.remove("ghost");
      const span = pin.querySelector("span");
      if (span) span.textContent = pos.place;
    }
    const xEl = document.getElementById(input.dataset.previewX);
    const yEl = document.getElementById(input.dataset.previewY);
    if (xEl) xEl.value = pct(pos.x);
    if (yEl) yEl.value = pct(pos.y);
    const coords = latLngFromXy(pct(pos.x), pct(pos.y));
    if (input.dataset.locIndex != null) {
      const i = input.dataset.locIndex;
      const latEl = document.getElementById(`nc-loc-lat-${i}`);
      const lngEl = document.getElementById(`nc-loc-lng-${i}`);
      if (latEl) latEl.value = coords.lat;
      if (lngEl) lngEl.value = coords.lng;
    }
    if (input.id === "al-city" || input.id === "al-street" || input.id === "al-addr" || input.id === "el-city" || input.id === "el-street") {
      const prefix = input.id.startsWith("el-") ? "el" : "al";
      const latEl = document.getElementById(`${prefix}-lat`);
      const lngEl = document.getElementById(`${prefix}-lng`);
      if (latEl) latEl.value = coords.lat;
      if (lngEl) lngEl.value = coords.lng;
    }
    const cap = document.getElementById(pin?.dataset.cap || input.dataset.cap || "mini-cap");
    if (cap && String(addr || "").trim()) cap.textContent = `${pos.place} · ${coords.lat}, ${coords.lng}`;
  }

  function applyPinToFields(pin, x, y) {
    const xEl = document.getElementById(pin.dataset.x);
    const yEl = document.getElementById(pin.dataset.y);
    if (xEl) xEl.value = x.toFixed(1);
    if (yEl) yEl.value = y.toFixed(1);
    const coords = latLngFromXy(x, y);
    const place = placeFromPin(x, y);
    const cityEl = pin.dataset.fillCity ? document.getElementById(pin.dataset.fillCity) : null;
    const streetEl = pin.dataset.fillStreet ? document.getElementById(pin.dataset.fillStreet) : null;
    const zipEl = pin.dataset.fillZip ? document.getElementById(pin.dataset.fillZip) : null;
    const latEl = pin.dataset.fillLat ? document.getElementById(pin.dataset.fillLat) : null;
    const lngEl = pin.dataset.fillLng ? document.getElementById(pin.dataset.fillLng) : null;
    if (cityEl) {
      cityEl.value = place.place;
      cityEl.dataset.fromMap = "1";
    }
    if (streetEl && !streetEl.value.trim()) {
      streetEl.value = `Near ${place.place}`;
      streetEl.dataset.fromMap = "1";
    }
    if (zipEl && (!zipEl.value.trim() || zipEl.dataset.fromMap)) {
      zipEl.value = place.zip || "";
      zipEl.dataset.fromMap = "1";
    }
    if (latEl) latEl.value = coords.lat;
    if (lngEl) lngEl.value = coords.lng;
    const span = pin.querySelector("span");
    if (span && !pin.dataset.keepLabel) span.textContent = place.place;
    const cap = document.getElementById(pin.dataset.cap || "mini-cap");
    if (cap) {
      const keep = pin.dataset.keepLabel
        ? (document.getElementById("sv-loc")?.selectedOptions?.[0]?.text?.split(" · ")[0]
          || pin.querySelector("span")?.textContent
          || place.place)
        : place.place;
      cap.textContent = pin.dataset.keepLabel
        ? `${keep} · ${coords.lat}, ${coords.lng} · drag to adjust`
        : `${place.place} · ${coords.lat}, ${coords.lng}`;
    }
    if (state.page === "create-service" && (pin.id === "sv-pin" || pin.dataset.x === "sv-x")) {
      syncSetupLocFromPin(x, y);
      refreshSetupFit();
    }
  }

  function syncPinFromLatLng(input) {
    const latEl = document.getElementById(input.dataset.pairLat || input.id.replace("lng", "lat"));
    const lngEl = document.getElementById(input.dataset.pairLng || input.id.replace("lat", "lng"));
    const lat = Number(latEl?.value);
    const lng = Number(lngEl?.value);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;
    if (lat < 24 || lat > 31 || lng > -79 || lng < -88) return;
    const { x, y } = xyFromLatLng(lat, lng);
    const pinId = input.dataset.previewPin || latEl?.dataset.previewPin || lngEl?.dataset.previewPin;
    const pin = pinId ? document.getElementById(pinId) : null;
    if (!pin) return;
    pin.style.left = x + "%";
    pin.style.top = y + "%";
    const xEl = document.getElementById(pin.dataset.x);
    const yEl = document.getElementById(pin.dataset.y);
    if (xEl) xEl.value = x.toFixed(1);
    if (yEl) yEl.value = y.toFixed(1);
    const place = placeFromPin(x, y);
    const span = pin.querySelector("span");
    if (span) span.textContent = place.place;
    const cap = document.getElementById(pin.dataset.cap || "mini-cap");
    if (cap) cap.textContent = `${lat.toFixed(4)}, ${lng.toFixed(4)} · pin from coordinates`;
  }

  function bindMiniMapPins() {
    document.querySelectorAll(".mini-map").forEach((canvas) => {
      const pins = canvas.querySelectorAll(".pin[data-drag-mini]");
      if (!pins.length) return;
      pins.forEach((pin) => {
        pin.style.cursor = "grab";
        pin.onmousedown = (e) => {
          e.preventDefault();
          e.stopPropagation();
          const rect = canvas.getBoundingClientRect();
          const move = (ev) => {
            const x = Math.max(4, Math.min(96, ((ev.clientX - rect.left) / rect.width) * 100));
            const y = Math.max(6, Math.min(94, ((ev.clientY - rect.top) / rect.height) * 100));
            pin.style.left = x + "%";
            pin.style.top = y + "%";
            pin.dataset.nx = String(x);
            pin.dataset.ny = String(y);
          };
          const up = () => {
            document.removeEventListener("mousemove", move);
            document.removeEventListener("mouseup", up);
            if (pin.dataset.nx) applyPinToFields(pin, Number(pin.dataset.nx), Number(pin.dataset.ny));
          };
          document.addEventListener("mousemove", move);
          document.addEventListener("mouseup", up);
        };
      });
      canvas.onclick = (e) => {
        if (e.target.closest(".pin[data-drag-mini]")) return;
        const pin = canvas.querySelector(".pin[data-drag-mini]");
        if (!pin) return;
        const rect = canvas.getBoundingClientRect();
        const x = Math.max(4, Math.min(96, ((e.clientX - rect.left) / rect.width) * 100));
        const y = Math.max(6, Math.min(94, ((e.clientY - rect.top) / rect.height) * 100));
        pin.style.left = x + "%";
        pin.style.top = y + "%";
        applyPinToFields(pin, x, y);
      };
    });
  }

  function switchRole(id) {
    enterAs(id);
  }

  function act(name, ds) {
    const actions = {
      login: () => enterAs(ds.who || ds.role),
      enter: () => enterAs(ds.who || ds.role),
      logout: () => { state.role = null; state.page = "dashboard"; persistSession(); render(); },
      "reset-demo": () => resetDemo(),
      nav: () => {
        state.page = ds.page;
        state.selectedCustomer = null;
        ensureNavGroupOpenForPage(ds.page);
        if (ds.page === "map") {
          state.mapClient = null;
          state.mapLoc = null;
          state.mapCompare = [];
          state.mapPin = null;
        }
        render();
      },
      "clear-list-filters": () => clearListFilters(ds.prefix),
      "nav-toggle": () => toggleNavGroup(ds.group),
      "switch-role-btn": () => switchRole(ds.role),
      "open-customer": () => { state.selectedCustomer = ds.id; state.selectedLocation = null; state.page = "customer"; state.payFocusId = null; render(); },
      "select-customer-location": () => {
        state.selectedCustomer = ds.id;
        state.selectedLocation = ds.loc;
        render();
      },
      "open-location": () => {
        state.selectedCustomer = ds.id;
        state.selectedLocation = ds.loc;
        state.page = "location";
        state.payFocusId = null;
        render();
      },
      "open-pay-row": () => openPayRow(ds.id),
      "mark-invoice-paid": () => openMarkInvoicePaid(ds.id),
      "confirm-mark-invoice-paid": () => markInvoicePaidFromRegister(ds.id),
      "pay-filter": () => { state.payFilter = ds.filter || "month"; render(); },
      "pay-src-filter": () => { state.paySrcFilter = ds.filter || "all"; render(); },
      "open-pay": () => { state.payView = true; state.payInvoice = ds.inv || "INV-4510"; render(); },
      "close-pay": () => { state.payView = false; render(); },
      "lookup-pay": () => { state.payInvoice = document.getElementById("pay-id")?.value.trim() || ""; render(); },
      "pay-now": () => payNow(),
      "new-customer": () => openNewCustomer(),
      "from-inbound": () => openNewCustomer(ds.id),
      "create-customer": () => createCustomer(),
      "cancel-add": () => { state.inboundId = null; state.locCount = 1; state.page = "dashboard"; render(); },
      "billto-mode": () => syncBillToMode(),
      "pick-billto": () => applyExistingBillTo(val("nc-existing")),
      "add-loc-row": () => addLocRow(),
      "remove-loc-row": () => removeLocRow(ds.index),
      "email-none": () => {
        const none = document.getElementById("nc-email-none")?.checked;
        const email = document.getElementById("nc-email");
        if (email) {
          email.disabled = !!none;
          if (none) email.value = "";
        }
      },
      "intake-type": () => syncCompanyField(),
      "send-quote": () => openQuote(ds.id, ds.loc),
      "confirm-quote": () => confirmQuote(ds.id, ds.loc),
      "convert-invoice": () => convertInvoice(ds.id),
      "open-convert": () => openConvertInvoice(ds.id),
      "confirm-convert": () => convertInvoice(ds.id),
      "invoice-one-loc": () => openInvoiceOneLocation(ds.id, ds.loc),
      "confirm-invoice-one": () => createAndSendLocInvoice(ds.id, ds.loc),
      "send-invoice": () => openInvoice(ds.id),
      "confirm-invoice": () => confirmInvoice(ds.id),
      "send-renewal": () => openRenewal(ds.id),
      "confirm-renewal": () => confirmRenewal(ds.id),
      "review-renewal": () => reviewRenewal(ds.id),
      "open-send-renewals": () => openSendSelectedRenewals(),
      "confirm-send-renewals": () => confirmSendSelectedRenewals(),
      "save-renewal-draft": () => saveRenewalDraft(ds.id),
      "approve-renewal": () => approveRenewal(ds.id),
      "renew-toggle": () => toggleRenewPick(ds.id),
      "renew-select-all": () => renewSelectAll(),
      "renew-clear": () => renewClearSelection(),
      "generate-next-period": () => generateNextBillingPeriod(ds.id, ds.loc),
      "run-autopay": () => runAutopayCharge(ds.id, ds.loc, { succeed: true }),
      "run-autopay-fail": () => runAutopayCharge(ds.id, ds.loc, { succeed: false }),
      "run-overnight-autopay": () => runOvernightAutopay(),
      "dismiss-notify": () => {
        const n = (state.data.notifications || []).find((x) => x.id === ds.id);
        if (n) n.read = true;
        render();
      },
      "contact-autopay": () => {
        const c = custBy(ds.id);
        if (!c) return;
        const loc = ds.loc ? locBy(ds.id, ds.loc) : c.locations?.[0];
        state.data.comms.unshift({
          id: nid("CM"), customerId: c.id, who: role()?.name || "Christy Brown", channel: "Phone", date: TODAY,
          text: `Called about AutoPay decline${loc ? ` at ${loc.name}` : ""}. Asked them to pay by check / Zelle / portal. Will allocate when funds hit the register, then generate next billing period manually.`,
        });
        pushNotify({
          type: "AUTOPAY_CONTACT",
          severity: "info",
          title: "Customer contacted",
          text: `${c.billTo || c.name}${loc ? ` · ${loc.name}` : ""} — follow up when external payment posts.`,
          customerId: c.id, locationId: loc?.id || null,
        });
        state.selectedCustomer = c.id;
        state.page = "customer";
        toast("Contact logged. When they pay, Record payment / Allocate, then Generate next period.");
        render();
      },
      "manual-invoice": () => openManualInvoice(ds.id, ds.loc),
      "save-manual-invoice": () => saveManualInvoice(),
      "open-record-pay": () => { if (ds.pay) state.payFocusId = ds.pay; openRecordPay(ds.id); },
      bestfit: () => openAssign(ds.id),
      "open-assign": () => { state.modal = null; openAssign(ds.id, ds.loc); },
      "share-property": () => openShareProperty(ds.id, ds.loc),
      "confirm-share-property": () => confirmShareProperty(ds.id, ds.loc),
      "compare-routes": () => openCompareRoutes(ds.id, ds.loc),
      "map-focus-assign": () => {
        state.mapClient = ds.id || null;
        state.mapLoc = ds.loc || null;
        state.mapPin = null;
        render();
      },
      "map-assign": () => mapAssign(ds.id, ds.tech, ds.loc),
      "focus-client": () => { state.mapClient = ds.id; state.mapLoc = ds.loc || null; render(); },
      "open-service": () => openCreateService(ds.id, ds.loc),
      "save-service": () => saveCreateService(ds.id || state.setupId),
      "cancel-create-service": () => {
        state.setupDraft = null;
        state.page = "customer";
        state.selectedCustomer = state.setupId || state.selectedCustomer;
        state.modal = null;
        render();
      },
      "edit-service": () => openEditService(ds.id),
      "save-edit-service": () => saveEditService(ds.id),
      "stop-service": () => openStopService(ds.id),
      "confirm-stop-service": () => confirmStopService(ds.id),
      "sched-view": () => { state.schedView = ds.view; render(); },
      "optimizer-run": () => { state.optimizerAnchors = {}; runOptimizer(readOptimizerConfig()); },
      "optimizer-detail": () => openOptimizerDetail(ds.date, ds.tech),
      "optimizer-anchor": () => anchorOptimizerRoute(ds.date, ds.tech, ds.stop),
      "optimizer-history": () => openOptimizerHistory(),
      "optimizer-commit": () => commitOptimizerRun(),
      "optimizer-clear": () => { state.optimizerPreview = null; state.optimizerAnchors = {}; render(); },
      "focus-tech": () => { state.assignFocus = ds.tech; render(); },
      "confirm-assign": () => confirmAssign(ds.id, ds.tech, ds.loc),
      "confirm-bestfit": () => confirmAssign(ds.id, ds.tech, ds.loc),
      "add-location": () => openAddLocation(ds.id),
      "edit-billto": () => openEditBillTo(ds.id),
      "save-billto": () => saveEditBillTo(ds.id),
      "edit-locations": () => openEditLocations(ds.id),
      "edit-one-loc": () => openEditOneLocation(ds.id, ds.loc),
      "save-one-loc": () => saveEditOneLocation(ds.id, ds.loc),
      "save-location": () => saveAddLocation(ds.id),
      "request-loc": () => requestLocService(ds.id, ds.loc),
      reassign: () => openReassign(ds.id),
      "confirm-reassign": () => confirmReassign(ds.id, ds.tech, ds.day),
      "insert-oneoff": () => insertOneoff(ds.id),
      "new-oneoff": () => openNewOneoff(),
      "save-oneoff": () => saveNewOneoff(),
      "cancel-create-oneoff": () => { state.oneoffDraft = null; state.page = "oneoffs"; state.modal = null; render(); },
      "oo-pick-tech": () => pickOneoffTech(ds.tech),
      "oneoff-day": () => { state.oneoffDay = ds.day || todayDay(); render(); },
      "generate-schedule": () => generateSchedule(),
      "map-tech": () => {
        const next = ds.tech || null;
        const openingFromList = state.page !== "map";
        state.mapTech = openingFromList ? next : (next && state.mapTech !== next ? next : null);
        if (openingFromList) {
          state.page = "map";
          state.mapClient = null;
          state.mapLoc = null;
          state.mapCompare = [];
          ensureNavGroupOpenForPage("map");
        }
        if (!state.mapTech) {
          state.mapColorBy = "tech";
          state.mapSched = null;
        } else {
          state.mapColorBy = "schedule";
        }
        state.mapPin = null;
        render();
      },
      "map-color": () => {
        if (ds.mode === "schedule" && !state.mapTech) return;
        state.mapColorBy = ds.mode || "tech";
        render();
      },
      "map-sched-filter": () => {
        const days = ds.days || null;
        state.mapSched = state.mapSched === days ? null : days;
        state.mapDay = null;
        render();
      },
      "map-pin": () => {
        if (!ds.cid || !ds.lid) return;
        if (state.mapLasso) {
          toggleMapSelect(ds.cid, ds.lid);
          return;
        }
        if (state.mapPin && state.mapPin.cid === ds.cid && state.mapPin.lid === ds.lid) state.mapPin = null;
        else state.mapPin = { cid: ds.cid, lid: ds.lid };
        render();
      },
      "clear-map-pin": () => { state.mapPin = null; render(); },
      "clear-map-select": () => { state.mapSelect = []; if (state.modal) state.modal = null; render(); },
      "open-bulk-assign": () => openBulkAssign(),
      "open-pin-assign": () => openBulkAssign(ds.cid, ds.lid),
      "pin-map-assign": () => pinMapAssign(ds.cid, ds.lid, ds.mode),
      "confirm-bulk-assign": () => confirmBulkAssign(),
      "map-compare-tech": () => {
        const id = ds.tech;
        if (!id) return;
        let list = (state.mapCompare || []).slice();
        if (list.includes(id)) list = list.filter((x) => x !== id);
        else {
          list.push(id);
          if (list.length > 2) list = list.slice(-2);
        }
        state.mapCompare = list;
        state.mapTech = id;
        state.mapColorBy = "schedule";
        render();
      },
      "clear-map-compare": () => { state.mapCompare = []; render(); },
      "map-day": () => { state.mapDay = ds.day || null; state.mapSched = null; render(); },
      "sv-pick-fit": () => pickSetupTrapper(ds.tech, ds.target),
      "sv-best-fit": () => openSetupBestFit(ds.target || "standing"),
      "toggle-lasso": () => { state.mapLasso = !state.mapLasso; if (!state.mapLasso) state.mapSelect = []; render(); },
      "toggle-pin": () => toggleMapSelect(ds.cid, ds.lid),
      "bulk-move": () => bulkMove(ds.tech),
      "bulk-days": () => bulkDays(ds.days),
      "trap-status": () => trapStatus(ds.id, ds.status),
      "ext-yes": () => decideExtension(ds.id, true),
      "ext-no": () => decideExtension(ds.id, false),
      "send-notices": () => sendNotices(),
      "copy-gps": () => copyGps(ds.gps),
      "macro-block": () => macroBlock(),
      "noshow-company": () => noshowCompany(),
      "noshow-customer": () => noshowCustomer(),
      "post-pay": () => postPayCustomer(ds.id),
      "match-pay": () => matchPay(ds.id),
      "new-pay": () => openNewPay(ds.id),
      "new-task": () => openCreateTask(ds.id, ds.loc),
      "save-task": () => saveTask(),
      "edit-task": () => openEditTask(ds.id),
      "save-task-edit": () => saveTaskEdit(ds.id),
      "remove-task": () => openRemoveTask(ds.id),
      "confirm-remove-task": () => removeTask(ds.id),
      "complete-task": () => completeTask(ds.id),
      "reopen-task": () => reopenTask(ds.id),
      "task-filter": () => { state.taskFilter = ds.filter || "mine"; render(); },
      "save-new-pay": () => saveNewPay(),
      "open-mail": () => openMail(ds.id),
      "apply-mail": () => applyMail(ds.id),
      "apply-mail-pay": () => applyMatchPay(ds.id),
      "record-pay": () => openRecordPay(ds.id),
      "confirm-record-pay": () => confirmRecordPay(ds.id),
      "enter-comm": () => enterComm(),
      "edit-memo": () => openMemo(ds.id),
      "save-memo": () => saveMemo(ds.id),
      "add-comm": () => addComm(ds.id),
      "upload-doc": () => uploadDoc(ds.id),
      "save-upload-doc": () => saveUploadDoc(),
      "view-doc": () => viewDoc(ds.id),
      "toggle-user": () => toggleUser(ds.id),
      "add-reason": () => addReason(),
      "save-settings": () => saveSettings(),
      "save-integrations": () => saveIntegrations(),
      "save-templates": () => saveTemplates(),
      "add-template": () => openAddTemplate(),
      "confirm-add-template": () => confirmAddTemplate(),
      "remove-template": () => removeTemplate(ds.key),
      "add-program": () => addProgram(),
      "add-service-type": () => addServiceType(),
      "preview-tpl": () => previewTpl(ds.name, ds.key),
      "close-modal": () => { captureCreateServiceDraft(); captureOneoffDraft(); state.modal = null; render(); },
      "open-stop": () => { state.mobileStop = ds.id; render(); },
      "close-stop": () => { state.mobileStop = null; render(); },
      "start-stop": () => startStop(ds.id),
      "complete-stop": () => completeStop(ds.id),
      "miss-stop": () => missStop(ds.id),
      "add-photo": () => addPhoto(ds.id),
      navigate: () => toast("Would open Maps at " + ds.gps + "."),
    };
    (actions[name] || (() => {}))();
  }

  function payNow() {
    const inv = state.data.invoices.find((i) => i.id === state.payInvoice);
    if (!inv || invoiceFinStatus(inv) === "PAID") return;
    const method = val("pay-method") || "Portal";
    const c = custBy(inv.customerId);
    const src = pay().sourceOf(method);
    // Client paid on the link — line goes on the register; Christy allocates to activate.
    state.data.payments.push({
      id: nid("P"), invoiceId: inv.id, customerId: inv.customerId, locationId: inv.locationId || null, amount: inv.amount,
      method, date: TODAY, source: "ONLINE", linkPay: true, invoiceMarked: false, posted: true, status: "POSTED",
      last4: String(Math.floor(1000 + Math.random() * 9000)),
      memo: `Invoice link · ${c?.name || "client"} · on register — allocate to activate`,
    });
    toast("Payment is on the register. Christy allocates to the invoice to activate service.");
    state.payView = false;
    render();
  }

  function addComm(customerId) {
    const text = (val("comm-text") || "").trim();
    if (!text) {
      toast("Type a note first.");
      return;
    }
    const cid = customerId || val("comm-cust");
    if (!cid) return;
    state.data.comms.unshift({
      id: nid("CM"), customerId: cid, who: role()?.name || "Office",
      channel: val("comm-channel") || "Office", date: TODAY, text,
    });
    toast("Saved on the shared communication log.");
    render();
  }

  function openNewCustomer(inboundId) {
    if (!can("customer.create")) return;
    state.inboundId = inboundId || null;
    state.locCount = 1;
    state.modal = null;
    state.page = "add-customer";
    render();
  }

  function radioVal(name) {
    return document.querySelector(`input[name="${name}"]:checked`)?.value || "";
  }

  function setInput(id, value) {
    const el = document.getElementById(id);
    if (el) el.value = value == null ? "" : value;
  }

  function setChecked(id, on) {
    const el = document.getElementById(id);
    if (el) el.checked = !!on;
  }

  function syncBillToMode() {
    const mode = radioVal("nc-billto") || "new";
    const wrap = document.getElementById("nc-existing-wrap");
    const notice = document.getElementById("nc-bill-notice");
    const sel = document.getElementById("nc-existing");
    const isExisting = mode === "existing";
    if (wrap) wrap.hidden = !isExisting;
    if (sel) {
      sel.disabled = !isExisting;
      if (!isExisting) sel.value = "";
    }
    if (notice) notice.hidden = !isExisting || !val("nc-existing");
    if (isExisting && val("nc-existing")) applyExistingBillTo(val("nc-existing"));
    syncCompanyField();
  }

  function syncCompanyField() {
    const type = val("nc-type") || "residential";
    const wrap = document.getElementById("nc-company-wrap");
    const input = document.getElementById("nc-company");
    const show = type === "hoa";
    if (wrap) wrap.hidden = !show;
    if (input && !show) input.value = "";
  }

  function applyExistingBillTo(id) {
    const c = custBy(id);
    const notice = document.getElementById("nc-bill-notice");
    if (!c) {
      if (notice) notice.hidden = true;
      return;
    }
    if (notice) {
      notice.hidden = false;
      notice.textContent = `${c.billTo || c.name} already has ${(c.locations || []).length} location(s). Contact fields filled — add the new service location below.`;
    }
    const parts = String(c.name || "").trim().split(/\s+/);
    const isOrg = c.type === "hoa" || c.type === "commercial" || c.type === "municipal";
    setInput("nc-company", c.company || (isOrg ? c.name : ""));
    setInput("nc-first", c.firstName || (isOrg ? "" : (parts[0] || "")));
    setInput("nc-last", c.lastName || (isOrg ? "" : (parts.slice(1).join(" ") || "")));
    setInput("nc-phone", c.phone === "—" ? "" : (c.phone || ""));
    setInput("nc-mobile", c.mobile || "");
    setInput("nc-alt", c.altPhone || "");
    setInput("nc-email", c.email || "");
    setInput("nc-type", c.type || "residential");
    setInput("nc-billtype", c.billToType || c.type || "residential");
    setInput("nc-internal", c.opsNote || "");
    if (!(val("nc-instructions") || "").trim()) setInput("nc-instructions", c.notes || "");
    setChecked("nc-sms", !!c.acceptSms);
    setChecked("nc-mail", c.acceptEmail !== false);
    setChecked("nc-prospect", !!c.prospect);
    setChecked("nc-email-none", !c.email);
    const email = document.getElementById("nc-email");
    if (email) email.disabled = !c.email && document.getElementById("nc-email-none")?.checked;
    syncCompanyField();
  }

  function addLocRow() {
    state.locCount = (state.locCount || 1) + 1;
    const snapshot = snapshotIntake();
    render();
    restoreIntake(snapshot);
    syncBillToMode();
    bindMiniMapPins();
  }

  function removeLocRow(index) {
    if ((state.locCount || 1) <= 1) return;
    const snapshot = snapshotIntake();
    snapshot.locs = (snapshot.locs || []).filter((_, i) => String(i) !== String(index));
    state.locCount = Math.max(1, snapshot.locs.length || 1);
    render();
    restoreIntake(snapshot);
    syncBillToMode();
    bindMiniMapPins();
  }

  function snapshotIntake() {
    const locs = [];
    document.querySelectorAll(".loc-block").forEach((block) => {
      const i = block.dataset.locIndex;
      locs.push({
        name: val(`nc-loc-name-${i}`),
        street: val(`nc-loc-street-${i}`),
        city: val(`nc-loc-city-${i}`),
        state: val(`nc-loc-state-${i}`) || "FL",
        zip: val(`nc-loc-zip-${i}`),
        subdivision: val(`nc-loc-subdiv-${i}`),
        x: val(`nc-loc-x-${i}`),
        y: val(`nc-loc-y-${i}`),
        lat: val(`nc-loc-lat-${i}`),
        lng: val(`nc-loc-lng-${i}`),
      });
    });
    return {
      billMode: radioVal("nc-billto") || "new",
      existing: val("nc-existing"),
      channel: radioVal("nc-channel"),
      type: val("nc-type"),
      billToType: val("nc-billtype"),
      company: val("nc-company"),
      first: val("nc-first"),
      last: val("nc-last"),
      phone: val("nc-phone"),
      mobile: val("nc-mobile"),
      alt: val("nc-alt"),
      email: val("nc-email"),
      emailNone: !!document.getElementById("nc-email-none")?.checked,
      instructions: val("nc-instructions"),
      internal: val("nc-internal"),
      sms: !!document.getElementById("nc-sms")?.checked,
      mail: !!document.getElementById("nc-mail")?.checked,
      prospect: !!document.getElementById("nc-prospect")?.checked,
      locs,
    };
  }

  function restoreIntake(s) {
    if (!s) return;
    document.querySelectorAll(`input[name="nc-billto"]`).forEach((el) => { el.checked = el.value === s.billMode; });
    document.querySelectorAll(`input[name="nc-channel"]`).forEach((el) => { el.checked = el.value === s.channel; });
    setInput("nc-existing", s.existing);
    setInput("nc-type", s.type);
    setInput("nc-billtype", s.billToType);
    setInput("nc-company", s.company);
    setInput("nc-first", s.first);
    setInput("nc-last", s.last);
    setInput("nc-phone", s.phone);
    setInput("nc-mobile", s.mobile);
    setInput("nc-alt", s.alt);
    setInput("nc-email", s.email);
    setInput("nc-instructions", s.instructions);
    setInput("nc-internal", s.internal);
    setChecked("nc-email-none", s.emailNone);
    setChecked("nc-sms", s.sms);
    setChecked("nc-mail", s.mail);
    setChecked("nc-prospect", s.prospect);
    (s.locs || []).forEach((loc, i) => {
      setInput(`nc-loc-name-${i}`, loc.name);
      setInput(`nc-loc-street-${i}`, loc.street);
      setInput(`nc-loc-city-${i}`, loc.city);
      setInput(`nc-loc-state-${i}`, loc.state || "FL");
      setInput(`nc-loc-zip-${i}`, loc.zip);
      setInput(`nc-loc-subdiv-${i}`, loc.subdivision);
      setInput(`nc-loc-x-${i}`, loc.x);
      setInput(`nc-loc-y-${i}`, loc.y);
      setInput(`nc-loc-lat-${i}`, loc.lat);
      setInput(`nc-loc-lng-${i}`, loc.lng);
      const pin = document.getElementById(`intake-pin-${i}`);
      if (pin && loc.x != null && loc.y != null) {
        pin.style.left = `${loc.x}%`;
        pin.style.top = `${loc.y}%`;
      }
    });
    const wrap = document.getElementById("nc-existing-wrap");
    const sel = document.getElementById("nc-existing");
    const isExisting = s.billMode === "existing";
    if (wrap) wrap.hidden = !isExisting;
    if (sel) {
      sel.disabled = !isExisting;
      if (!isExisting) sel.value = "";
    }
    syncCompanyField();
  }

  function makeLocation(raw, fallbackName) {
    const street = (raw.street || "").trim();
    const city = (raw.city || "").trim();
    const st = raw.state || "FL";
    const zip = (raw.zip || "").trim();
    const address = `${street}, ${city}, ${st} ${zip}`;
    const pos = pinFromAddress(address);
    let x = raw.x != null && raw.x !== "" && !Number.isNaN(Number(raw.x)) ? Number(raw.x) : pct(pos.x);
    let y = raw.y != null && raw.y !== "" && !Number.isNaN(Number(raw.y)) ? Number(raw.y) : pct(pos.y);
    let lat = raw.lat != null && raw.lat !== "" && !Number.isNaN(Number(raw.lat)) ? Number(raw.lat) : null;
    let lng = raw.lng != null && raw.lng !== "" && !Number.isNaN(Number(raw.lng)) ? Number(raw.lng) : null;
    if (lat != null && lng != null) {
      const xy = xyFromLatLng(lat, lng);
      x = xy.x;
      y = xy.y;
    } else {
      const coords = latLngFromXy(x, y);
      lat = Number(coords.lat);
      lng = Number(coords.lng);
    }
    const loc = {
      id: nid("L"),
      name: (raw.name || "").trim() || fallbackName || "Residence",
      address,
      street, city, state: st, zip,
      subdivision: (raw.subdivision || "").trim(),
      x: `${x}%`,
      y: `${y}%`,
      lat,
      lng,
      gps: `${Number(lat).toFixed(4)}, ${Number(lng).toFixed(4)}`,
      covered: true,
      requestService: true,
      requestedAt: Date.now(),
      createdAt: Date.now(),
      manualPin: true,
      lifecycle: "inquiry",
    };
    return loc;
  }

  function createCustomer() {
    if (!can("customer.create")) return;
    const type = val("nc-type") || val("nc-billtype") || "residential";
    const company = type === "hoa" ? (val("nc-company") || "").trim() : "";
    const first = (val("nc-first") || "").trim();
    const last = (val("nc-last") || "").trim();
    const billToType = val("nc-billtype") || type;
    const billMode = radioVal("nc-billto") || "new";
    const existing = billMode === "existing" ? custBy(val("nc-existing")) : null;
    const emailNone = document.getElementById("nc-email-none")?.checked;
    const locsRaw = window.IguanaIntake ? IguanaIntake.collectLocations() : [];

    if (billMode === "existing" && !existing) {
      toast("Pick an existing Bill-To, or switch to New Bill-To.");
      return;
    }
    if (!existing && type === "hoa" && !company && !last && !first) {
      toast("Enter the Company / HOA name, or a contact name.");
      return;
    }
    if (!existing && type !== "hoa" && !last && !first) {
      toast("Enter a first or last name for the Bill-To.");
      return;
    }
    if (!locsRaw.length) {
      toast("Add at least one service location with street and city.");
      return;
    }

    const displayName = [first, last].filter(Boolean).join(" ") || company || existing?.name || "Customer";
    const instructions = (val("nc-instructions") || "").trim();
    const internal = (val("nc-internal") || "").trim();

    if (existing) {
      existing.company = company || existing.company;
      existing.firstName = first || existing.firstName;
      existing.lastName = last || existing.lastName;
      existing.name = displayName || existing.name;
      existing.phone = val("nc-phone") || existing.phone;
      existing.mobile = val("nc-mobile") || existing.mobile;
      existing.altPhone = val("nc-alt") || existing.altPhone;
      existing.email = emailNone ? "" : (val("nc-email") || existing.email);
      existing.type = type || existing.type;
      existing.billToType = billToType || existing.billToType || existing.type;
      existing.municipal = type === "municipal" || billToType === "municipal";
      existing.acceptSms = !!document.getElementById("nc-sms")?.checked;
      existing.acceptEmail = !!document.getElementById("nc-mail")?.checked;
      if (instructions) existing.notes = instructions;
      if (internal) existing.opsNote = internal;
      const fallback = type === "hoa" ? (company || "HOA property") : "Residence";
      const newLocations = locsRaw.map((raw, idx) =>
        makeLocation(raw, locsRaw.length > 1 ? `${fallback} ${idx + 1}` : fallback)
      );
      existing.locations.unshift(...newLocations);
      const inbound = (state.data.inbound || []).find((n) => n.id === state.inboundId);
      if (inbound) inbound.used = true;
      state.inboundId = null;
      state.locCount = 1;
      state.selectedCustomer = existing.id;
      state.selectedLocation = newLocations[0]?.id || null;
      state.page = "customer";
      toast(`Added ${locsRaw.length} propert${locsRaw.length > 1 ? "ies" : "y"} under ${existing.billTo || existing.name}. Same Bill-To — next send a quote, then invoice after they choose a plan.`);
      render();
      return;
    }

    const locations = locsRaw.map((raw, idx) =>
      makeLocation(raw, type === "hoa" ? (company || `Property ${idx + 1}`) : (raw.name || (idx === 0 ? "Residence" : `Property ${idx + 1}`)))
    );
    const id = nid("C");
    state.data.customers.unshift({
      id,
      name: displayName,
      firstName: first,
      lastName: last,
      company,
      title: "",
      phone: val("nc-phone") || "—",
      altPhone: val("nc-alt") || "",
      mobile: val("nc-mobile") || "",
      email: emailNone ? "" : (val("nc-email") || ""),
      type,
      billToType,
      billTo: displayName,
      status: "inquiry",
      programId: null,
      amount: 0,
      start: null,
      expires: null,
      paid: false,
      autoPay: false,
      municipal: type === "municipal",
      techId: null,
      backupId: null,
      days: null,
      durationMin: type === "hoa" ? 45 : 20,
      handedToOps: false,
      handedAt: 0,
      createdBy: state.role,
      source: radioVal("nc-channel") || "Call",
      inboundChannel: radioVal("nc-channel") || "Call",
      prospect: !!document.getElementById("nc-prospect")?.checked,
      createdAt: Date.now(),
      acceptSms: !!document.getElementById("nc-sms")?.checked,
      acceptEmail: !!document.getElementById("nc-mail")?.checked,
      locations,
      notes: instructions,
      opsNote: internal,
    });
    const inbound = (state.data.inbound || []).find((n) => n.id === state.inboundId);
    if (inbound) inbound.used = true;
    state.inboundId = null;
    state.locCount = 1;
    state.modal = null;
    state.selectedCustomer = id;
    state.selectedLocation = locations[0]?.id || null;
    state.page = "customer";
    toast(`Customer saved. ${displayName} · ${locations.length} propert${locations.length > 1 ? "ies" : "y"} · one Bill-To. Next: send one quote with the programs, wait for their choice, then invoice.`);
    render();
  }

  function openQuote(customerId, locationId) {
    const c = custBy(customerId);
    const target = locationId ? locBy(customerId, locationId) : null;
    const locs = target
      ? [target].filter((l) => l.covered !== false)
      : (c.locations || []).filter((l) => l.covered !== false && locNeedsQuote(c, l));
    const use = locs.length ? locs : (c.locations || []).filter((l) => l.covered !== false);
    const n = use.length;
    const options = allPrograms().filter((x) => c.type === "hoa" ? true : x.id !== "hoa2")
      .map((x) => `<li>${esc(x.name)} — ${money(programAmount(x))}${x.prepaid != null ? ` prepaid (list ${money(x.list)})` : ""} · ${esc(x.freq)}</li>`)
      .join("");
    const propList = use.map((l, i) => `<li><strong>${esc(l.name)}</strong> — ${esc(l.address)}</li>`).join("");
    const multiAsk = n > 1
      ? `<p>You have <strong>${n} properties</strong> on this account. Please tell us:</p>
          <ul style="margin:8px 0 0 18px;padding:0;font-size:13px">
            <li>the <strong>same program on all ${n} properties</strong>, or</li>
            <li><strong>a different program per property</strong> — reply with the program name next to each address below.</li>
          </ul>`
      : `<p>Please reply with which program you want for this property.</p>`;
    state.modal = {
      wide: true,
      html: `
        <h3>Send quote</h3>
        <p>${target ? `Quote for <strong>${esc(target.name)}</strong>, sent to Bill-To ${esc(c.billTo || c.name)}.` : `One letter to Bill-To ${esc(c.billTo || c.name)}. Lists the programs once. ${n > 1 ? `Mentions all ${n} properties and asks same vs different.` : "Asks which program they want."}`} No plan is locked yet.</p>
        <div class="invoice-sheet">
          <div class="demo-flag">Iguana Control</div>
          <h3>Hello ${esc(c.billTo || c.name)},</h3>
          <p>Account ${esc(c.id)}. Here are the iguana removal programs you can choose from:</p>
          <ul style="margin:8px 0 0 18px;padding:0;font-size:13px">${options}</ul>
          ${multiAsk}
          <p style="margin-top:12px"><strong>Propert${n === 1 ? "y" : "ies"} on your account:</strong></p>
          <ul style="margin:8px 0 0 18px;padding:0;font-size:13px">${propList}</ul>
          <p class="tiny" style="margin-top:12px">This is a proposal only — no balance until we invoice each property after you choose.</p>
        </div>
        <div class="actions" style="margin-top:14px">
          <button class="btn btn-ghost" data-act="close-modal">Back</button>
          <button class="btn btn-primary" data-act="confirm-quote" data-id="${c.id}" ${target ? `data-loc="${target.id}"` : ""}>Send quote</button>
        </div>
      `,
    };
    render();
  }

  function confirmQuote(id, locationId) {
    const c = custBy(id);
    const target = locationId ? locBy(id, locationId) : null;
    const locs = target
      ? [target].filter((l) => l.covered !== false)
      : (c.locations || []).filter((l) => l.covered !== false && locNeedsQuote(c, l));
    const use = locs.length ? locs : (c.locations || []).filter((l) => l.covered !== false);
    const locationIds = use.map((l) => l.id);
    const existing = state.data.quotes.find((x) =>
      x.customerId === id
      && x.sent
      && !x.programId
      && (target ? quoteCoversLoc(x, target.id) : Array.isArray(x.locationIds))
    );
    if (existing) {
      existing.sent = true;
      existing.date = TODAY;
      existing.optionsSent = true;
      existing.programId = null;
      existing.locationIds = [...new Set([...(existing.locationIds || []), ...locationIds])];
      existing.locationId = existing.locationIds[0] || null;
    } else {
      state.data.quotes.push({
        id: nid("Q"),
        customerId: id,
        locationIds,
        locationId: locationIds[0] || null,
        programId: null,
        optionsSent: true,
        sent: true,
        previewed: true,
        date: TODAY,
      });
    }
    use.forEach((l) => {
      if (l.lifecycle !== "active" && l.lifecycle !== "waiting_payment") l.lifecycle = "quoted";
    });
    const n = locationIds.length;
    state.data.comms.push({
      id: nid("CM"), customerId: id, who: role().name, channel: "Email", date: TODAY,
      text: target
        ? `Sent quote to ${c.billTo || c.name} for ${target.name} — waiting on their program choice.`
        : n > 1
        ? `Sent one quote to ${c.billTo || c.name} with program options for ${n} properties — asked same plan on all vs different per property.`
        : `Sent one quote to ${c.billTo || c.name} with program options — waiting on their choice.`,
    });
    state.modal = null;
    toast(target
      ? `Quote sent for ${target.name}. Wait for their plan choice, then send the invoice here.`
      : n > 1
      ? `One quote sent for ${n} properties. Wait for same-vs-different, then create invoices.`
      : "Quote sent. Wait for their plan choice, then create the invoice.");
    render();
  }

  function convertPreviewInner(programId) {
    const p = progBy(programId) || PROGRAMS[0];
    const commitment = buildCommitment(programId, TODAY);
    const amount = commitment.installmentAmount;
    const expires = addMonths(TODAY, p.months);
    const billing = commitment.billingFrequency === "monthly"
      ? `Monthly billing plan: ${money(amount)} × ${commitment.periods} (term value ${money(commitment.totalValue)}). Period 1 invoices now. With AutoPay ON, later periods charge + allocate overnight and the next invoice is created automatically — Christy only handles declines.`
      : (p.prepaid != null
        ? `Upfront commitment: ${money(amount)} now (list ${money(p.list)}${p.freeMonths ? `, ${p.freeMonths} promotional months` : ""}). One billing period for the term.`
        : `Upfront / term invoice ${money(amount)}.`);
    return `
      <div class="preview">
        <strong>${esc(p.name)}</strong>
        <div>Billing: ${commitment.billingFrequency === "monthly" ? "Monthly" : "Upfront"} · Invoice amount: ${money(amount)}${commitment.autoPay ? " · AutoPay recommended" : ""}</div>
        <div>Visit pattern: ${esc(p.freq)}</div>
        <div>Start ${TODAY} → expires ${expires} <span class="tiny">(calculated from the program)</span></div>
        <div class="tiny" style="margin-top:6px">${esc(billing)}</div>
      </div>
    `;
  }

  function openInvoiceOneLocation(customerId, locationId) {
    if (!can("invoice.create") && state.role !== "owner") {
      toast("Only Administration creates and sends invoices.");
      return;
    }
    const c = custBy(customerId);
    const loc = locBy(customerId, locationId);
    if (!c || !loc) {
      toast("Open Send invoice from that property card.");
      return;
    }
    if (!canInvoiceLocation(c, loc)) {
      toast("That location already has an invoice or is paid.");
      return;
    }
    const plan = locPlan(c, loc);
    const selectedProg = plan.programId || "12pre";
    const options = allPrograms().map((p) =>
      `<option value="${p.id}" ${p.id === selectedProg ? "selected" : ""}>${esc(programOptionLabel(p))}</option>`
    ).join("");
    state.modal = {
      wide: true,
      html: `
        <h3>Send invoice</h3>
        <p>Accepts the proposal for <strong>${esc(loc.name)}</strong>: creates contract <em>PENDING PAYMENT</em>, billing plan, period 1, and sends the invoice. Ops stays blocked until allocated balance is zero.</p>
        <div class="invoice-sheet">
          <h3>${esc(loc.name)}</h3>
          <p class="tiny">${esc(loc.address)}</p>
       
        </div>
        <div class="field" style="margin-top:12px">
          <label>Program</label>
          <select id="io-program" data-act="preview-io-program">${options}</select>
        </div>
        <div class="field chk-field"><label class="chk"><input type="checkbox" id="io-autopay" ${selectedProg === "12mo" ? "checked" : ""}> AutoPay — charge &amp; allocate overnight; generate next monthly period automatically</label></div>
        <div id="io-preview">${convertPreviewInner(selectedProg)}</div>
        <div class="actions" style="margin-top:14px">
          <button class="btn btn-ghost" data-act="close-modal">Cancel</button>
          <button class="btn btn-primary" data-act="confirm-invoice-one" data-id="${c.id}" data-loc="${loc.id}">Send invoice</button>
        </div>
      `,
    };
    render();
  }

  function createAndSendLocInvoice(customerId, locationId) {
    if (!can("invoice.create") && state.role !== "owner") {
      toast("Only Administration creates and sends invoices.");
      return;
    }
    const c = custBy(customerId);
    const loc = locBy(customerId, locationId);
    if (!c || !loc) {
      toast("Property missing.");
      return;
    }
    const existing = locInvoices(c.id, loc.id).find((i) => i.status === "draft" || i.status === "sent" || i.status === "failed" || i.status === "paid");
    if (existing?.status === "paid") {
      toast("That location is already paid.");
      return;
    }
    if (existing?.status === "sent" || existing?.status === "failed") {
      state.modal = null;
      openInvoice(existing.id);
      return;
    }
    const pid = val("io-program") || locPlan(c, loc).programId || "12pre";
    let inv = existing;
    if (!inv) {
      inv = { id: nid("INV"), customerId: c.id, locationId: loc.id, amount: 0, status: "draft", sent: null, paidOn: null, kind: "initial", periodN: 1 };
      state.data.invoices.push(inv);
    }
    commitLocationPlan(loc, pid, TODAY, inv.id, c.id);
    const wantAutopay = !!document.getElementById("io-autopay")?.checked || pid === "12mo";
    const bp = planForContract(loc.contractId);
    if (bp) {
      bp.autopay = wantAutopay;
      loc.autoPay = wantAutopay;
      if (wantAutopay) c.autoPay = true;
    }
    inv.amount = loc.amount;
    inv.status = "sent";
    inv.sent = TODAY;
    inv.periodN = 1;
    if (wantAutopay) inv.kind = "autopay";
    const q = locQuote(c.id, loc.id);
    if (q) q.programId = pid;
    syncCustomerFromLocations(c);
    syncCustomerLifecycle(c);
    const cmt = loc.commitment;
    state.data.comms.push({
      id: nid("CM"), customerId: c.id, who: role().name, channel: "Email", date: TODAY,
      text: `Contract + invoice ${inv.id} for ${loc.name} (${billingPlanLabel(loc)})${wantAutopay ? " · AutoPay ON — overnight charge posts without Christy marking the register" : " · AutoPay OFF — Christy allocates from the register"}. Waiting on payment — Ops sets up service when the balance is zero.`,
    });
    state.modal = null;
    state.page = "location";
    state.selectedCustomer = c.id;
    state.selectedLocation = loc.id;
    toast(`Invoice ${inv.id} sent · ${cmt?.billingFrequency === "monthly" ? "period 1 of " + cmt.periods : "upfront"}${wantAutopay ? " · AutoPay ON" : ""}.`);
    render();
  }

  function openConvertInvoice(id) {
    if (!can("invoice.create") && state.role !== "owner") {
      toast("Only Administration creates and sends invoices.");
      return;
    }
    const c = custBy(id);
    const use = (c.locations || []).filter((l) => canInvoiceLocation(c, l));
    if (!use.length) {
      toast("No properties waiting for an invoice.");
      return;
    }
    const blocks = use.map((l) => {
      const selected = locPlan(c, l).programId || "12pre";
      const options = allPrograms().map((p) =>
        `<option value="${p.id}" ${p.id === selected ? "selected" : ""}>${esc(programOptionLabel(p))}</option>`
      ).join("");
      return `<div class="field inv-prop-block" style="margin-top:14px;padding:12px;border:1px dashed var(--line-strong);border-radius:12px">
        <label>${esc(l.name)} · ${esc(l.address)}</label>
        <p class="tiny">Property fixed on its own invoice — pick the program only</p>
        <select id="cv-program-${l.id}" data-act="preview-loc-program" data-loc="${l.id}">${options}</select>
        <div id="cv-preview-${l.id}">${convertPreviewInner(selected)}</div>
      </div>`;
    }).join("");
    state.modal = {
      wide: true,
      html: `
        <h3>Send invoice to all</h3>
        <p>Bill-To ${esc(c.billTo || c.name)}. Each property gets its own invoice. Ops sets up service after it’s paid in full.</p>
        ${blocks}
        <div class="actions" style="margin-top:14px">
          <button class="btn btn-ghost" data-act="close-modal">Cancel</button>
          <button class="btn btn-primary" data-act="confirm-convert" data-id="${c.id}">Send ${use.length} invoice${use.length === 1 ? "" : "s"}</button>
        </div>
      `,
    };
    render();
  }

  function convertInvoice(id) {
    if (!can("invoice.create") && state.role !== "owner") {
      toast("Only Administration creates and sends invoices.");
      return;
    }
    const c = custBy(id);
    const targets = (c.locations || []).filter((l) => canInvoiceLocation(c, l) && document.getElementById(`cv-program-${l.id}`));
    const created = [];
    targets.forEach((l) => {
      const pid = val(`cv-program-${l.id}`) || "12pre";
      const inv = { id: nid("INV"), customerId: id, locationId: l.id, amount: 0, status: "sent", sent: TODAY, paidOn: null, kind: "initial", periodN: 1 };
      state.data.invoices.push(inv);
      commitLocationPlan(l, pid, TODAY, inv.id, id);
      inv.amount = l.amount;
      created.push(inv);
      const q = locQuote(id, l.id);
      if (q) q.programId = pid;
    });
    syncCustomerFromLocations(c);
    syncCustomerLifecycle(c);
    if (created.length) {
      state.data.comms.push({
        id: nid("CM"), customerId: c.id, who: role().name, channel: "Email", date: TODAY,
        text: `Sent ${created.length} contract invoice${created.length === 1 ? "" : "s"} (${created.map((i) => i.id).join(", ")}). Pending payment — Ops after allocation.`,
      });
    }
    state.modal = null;
    const n = created.length;
    if (!n) {
      toast("Nothing to invoice.");
      render();
      return;
    }
    toast(n === 1
      ? `Invoice ${created[0].id} sent · waiting for payment.`
      : `${n} invoices sent · waiting for payment on each property.`);
    state.page = "customer";
    state.selectedCustomer = c.id;
    render();
  }

  function openInvoice(id) {
    const inv = state.data.invoices.find((i) => i.id === id);
    const c = custBy(inv.customerId);
    const loc = inv.locationId ? locBy(inv.customerId, inv.locationId) : c?.locations?.[0];
    const plan = locPlan(c, loc);
    state.modal = {
      html: `
        <h3>Invoice preview</h3>
        <div class="invoice-sheet">
          <h3>Invoice ${esc(inv.id)}</h3>
          <p>Bill-To ${esc(c.billTo || c.name)}</p>
          <p>Property ${esc(loc?.name || "—")} · ${esc(loc?.address || "")}</p>
          <p>${esc(progBy(plan.programId)?.name || "Program")} · ${money(inv.amount)}</p>
          <p class="tiny">This invoice is only for this property. Other properties on the same Bill-To have their own invoices and can be paid separately.</p>
        </div>
        <div class="actions" style="margin-top:14px">
          <button class="btn btn-ghost" data-act="close-modal">Back</button>
          ${inv.status === "draft" ? `<button class="btn btn-primary" data-act="confirm-invoice" data-id="${id}">Send invoice</button>` : btn("payment.post", "Post payment to this invoice", "open-record-pay", `data-id="${id}"`)}
        </div>
      `,
    };
    render();
  }

  function confirmInvoice(id) {
    const inv = state.data.invoices.find((i) => i.id === id);
    inv.status = "sent";
    inv.sent = TODAY;
    const c = custBy(inv.customerId);
    const loc = inv.locationId ? locBy(inv.customerId, inv.locationId) : null;
    state.modal = null;
    if (c) {
      state.page = "customer";
      state.selectedCustomer = c.id;
    }
    toast(`Invoice ${inv.id} sent for ${loc?.name || "property"} · Bill-To ${c?.billTo || c?.name || ""}. They can pay this one on its own.`);
    render();
  }

  function openRenewal(id) {
    reviewRenewal(id);
  }

  function selectedUnsentRenewalIds() {
    if (!Array.isArray(state.data.renewals)) state.data.renewals = [];
    return (state.renewPick || []).filter((id) => {
      const row = parseRenewId(id);
      if (!row) return false;
      const ct = contractForLoc(row.customerId, row.locationId);
      const existing = state.data.renewals.find((x) => x.rowId === id || (ct && x.contractId === ct.id));
      return existing?.status !== "SENT";
    });
  }

  function ensureRenewalDraft(id) {
    const row = parseRenewId(id);
    if (!row) return null;
    if (!Array.isArray(state.data.renewals)) state.data.renewals = [];
    const ct = contractForLoc(row.customerId, row.locationId);
    let r = state.data.renewals.find((x) => x.rowId === id || (ct && x.contractId === ct.id));
    const programId = r?.programId || row.programId;
    const text = r?.proposedText || renewalProposedText(row, programId);
    const amount = r?.amount != null ? r.amount : (progBy(programId) ? programBillAmount(progBy(programId)) : row.amount);
    if (!r) {
      r = {
        id: nid("REN"), rowId: id, contractId: ct?.id || null,
        customerId: row.customerId, locationId: row.locationId,
        status: "DRAFT", proposedText: text, programId, amount, sent: false,
      };
      state.data.renewals.push(r);
    } else if (r.status !== "SENT") {
      r.proposedText = r.proposedText || text;
      if (!r.programId) r.programId = programId;
      if (r.amount == null) r.amount = amount;
      r.status = "DRAFT";
    }
    return r;
  }

  function openSendSelectedRenewals() {
    if (!can("renewal.send")) return;
    const picked = selectedUnsentRenewalIds();
    if (!picked.length) {
      toast("Select one or more renewals, then Send.");
      return;
    }
    const list = picked.map((id) => {
      const row = parseRenewId(id);
      const r = ensureRenewalDraft(id);
      const programId = r?.programId || row.programId;
      const amount = r?.amount != null ? r.amount : row.amount;
      const proposed = r?.proposedText || renewalProposedText(row, programId);
      return `<div class="fit-row" style="align-items:flex-start">
        <div>
          <strong>${esc(row.name)}</strong> · ${esc(row.locName)}
          <div class="tiny">Expires ${esc(row.expires)} · ${esc(progBy(programId)?.name || programId || "—")} · ${money(amount)}</div>
          <div class="tiny">${esc(proposed)}</div>
        </div>
      </div>`;
    }).join("");
    state.modal = {
      wide: true,
      html: `
        <h3>Send renewals</h3>
        <p>${picked.length} selected. Review the list, then send. AutoPay is <strong>not</strong> charged.</p>
        <div class="preview" style="max-height:min(50vh,420px);overflow:auto">${list}</div>
        <div class="actions" style="margin-top:14px">
          <button class="btn btn-ghost" data-act="close-modal">Back</button>
          <button class="btn btn-primary" data-act="confirm-send-renewals">Send ${picked.length}</button>
        </div>
      `,
    };
    render();
  }

  function confirmSendSelectedRenewals() {
    if (!can("renewal.send")) return;
    const picked = selectedUnsentRenewalIds();
    if (!picked.length) {
      state.modal = null;
      toast("Nothing selected to send.");
      render();
      return;
    }
    picked.forEach((id) => ensureRenewalDraft(id));
    sendRenewalBatch(picked);
  }

  function reviewRenewal(id) {
    const row = parseRenewId(id);
    if (!row) return;
    const m = renewalMeta(row);
    const ct = contractForLoc(row.customerId, row.locationId);
    if (!Array.isArray(state.data.renewals)) state.data.renewals = [];
    let r = state.data.renewals.find((x) => x.rowId === row.id || (ct && x.contractId === ct.id));
    const pickProgram = r?.programId || row.programId || "12pre";
    const defaultText = r?.proposedText || renewalProposedText(row, pickProgram);
    const defaultAmt = r?.amount != null ? r.amount : (progBy(pickProgram) ? programBillAmount(progBy(pickProgram)) : row.amount);
    if (!r) {
      r = {
        id: nid("REN"), rowId: row.id, contractId: ct?.id || null,
        customerId: row.customerId, locationId: row.locationId,
        status: "DRAFT", proposedText: defaultText, programId: pickProgram, amount: defaultAmt, sent: false,
      };
      state.data.renewals.push(r);
    }
    const currentName = progBy(row.programId)?.name || row.programId || "—";
    state.modal = {
      html: `
        <h3>Review renewal · ${esc(row.locName)}</h3>
        <p>Choose the renewal program (can differ from the current plan), edit terms, then send. AutoPay is <strong>not</strong> charged on send.</p>
        <div class="preview">
          <strong>${esc(row.name)}</strong> · ${esc(row.locName)} · expires ${esc(row.expires)}
          <div class="tiny">Current program: ${esc(currentName)} · ${esc(m.flag)}</div>
        </div>
        <div class="field req"><label>Renewal program</label>
          <select id="ren-program" data-act="ren-program">${programOptionsHtml(pickProgram)}</select>
          <div class="tiny">For 1-month ending, pick a 6- or 12-month plan instead of repeating 1-month.</div>
        </div>
        <div class="field"><label>Proposed renewal terms</label><input id="ren-text" value="${esc(defaultText)}"></div>
        <div class="field"><label>Amount</label><input id="ren-amt" type="number" step="0.01" value="${esc(defaultAmt)}"></div>
        <div class="actions" style="margin-top:14px">
          <button class="btn btn-ghost" data-act="close-modal">Back</button>
          <button class="btn btn-ghost" data-act="save-renewal-draft" data-id="${row.id}">Save draft</button>
          <button class="btn btn-primary" data-act="approve-renewal" data-id="${row.id}">Approve &amp; send</button>
        </div>
      `,
    };
    render();
  }

  function applyRenewalProgramFields() {
    const pid = val("ren-program");
    const p = progBy(pid);
    if (!p) return;
    const amt = programBillAmount(p);
    setInput("ren-amt", amt);
    const textEl = document.getElementById("ren-text");
    if (textEl) {
      textEl.value = p.id === "12mo"
        ? `${money(amt)}/month × ${p.months} — ${p.name}`
        : `${money(amt)} upfront — ${p.name}`;
    }
  }

  function saveRenewalDraft(id) {
    const row = parseRenewId(id);
    if (!row) return;
    const ct = contractForLoc(row.customerId, row.locationId);
    let r = (state.data.renewals || []).find((x) => x.rowId === row.id || (ct && x.contractId === ct.id));
    if (!r) return;
    r.proposedText = val("ren-text") || r.proposedText;
    r.programId = val("ren-program") || r.programId || row.programId;
    const amt = Number(val("ren-amt"));
    if (Number.isFinite(amt) && amt > 0) r.amount = amt;
    else if (progBy(r.programId)) r.amount = programBillAmount(progBy(r.programId));
    r.status = "DRAFT";
    state.modal = null;
    toast("Renewal draft saved · " + (progBy(r.programId)?.name || "program set"));
    render();
  }

  function approveRenewal(id) {
    confirmRenewal(id, true);
  }

  function confirmRenewal(id, fromReview) {
    const row = parseRenewId(id);
    if (!row) return;
    const c = custBy(row.customerId);
    const l = locBy(row.customerId, row.locationId);
    const m = renewalMeta(row);
    const ct = contractForLoc(row.customerId, row.locationId);
    if (!Array.isArray(state.data.renewals)) state.data.renewals = [];
    let r = state.data.renewals.find((x) => x.rowId === row.id || (ct && x.contractId === ct.id));
    const programId = fromReview
      ? (val("ren-program") || r?.programId || row.programId)
      : (r?.programId || row.programId);
    const p = progBy(programId);
    const proposed = fromReview
      ? (val("ren-text") || r?.proposedText || renewalProposedText(row, programId))
      : (r?.proposedText || renewalProposedText(row, programId));
    const amtOverride = fromReview ? Number(val("ren-amt")) : Number(r?.amount);
    const amount = Number.isFinite(amtOverride) && amtOverride > 0
      ? amtOverride
      : (p ? programBillAmount(p) : row.amount);
    if (!r) {
      r = {
        id: nid("REN"), rowId: row.id, contractId: ct?.id || null,
        customerId: row.customerId, locationId: row.locationId,
        status: "DRAFT", proposedText: proposed, programId, amount, sent: false,
      };
      state.data.renewals.push(r);
    }
    r.proposedText = proposed;
    r.programId = programId;
    r.amount = amount;
    r.status = "SENT";
    r.sent = true;
    r.sentAt = TODAY;

    const termStart = row.expires || TODAY;
    const stayAutopayNotice = (m.noticeOnly || row.autoPay) && (!programId || programId === row.programId) && programId === "12mo";

    if (l && programId) {
      // Apply chosen plan for the next term; invoice id attached below when created
      commitLocationPlan(l, programId, termStart, null, row.customerId);
      l.amount = amount;
      l.paid = false;
      l.lifecycle = "waiting_payment";
    }
    if (c && programId) {
      c.programId = programId;
      c.amount = amount;
      if (c.status === "renewal" || c.status === "active") c.status = "waiting_payment";
    }
    if (l) l.renewalSent = TODAY;
    if (c) c.renewalSent = TODAY;

    const planLabel = p?.name || programId || "renewal";
    if (stayAutopayNotice) {
      state.data.comms.push({
        id: nid("CM"), customerId: row.customerId, who: role().name, channel: "Email", date: TODAY,
        text: `Renewal notice for ${row.locName}: ${proposed} (${planLabel}). AutoPay not charged on send.`,
      });
      state.modal = null;
      toast(`Notice sent to ${row.name} · ${planLabel}. Saved card was not charged.`);
      render();
      return;
    }

    const inv = {
      id: nid("INV"), customerId: row.customerId, locationId: row.locationId,
      contractId: l?.contractId || ct?.id || null,
      amount, status: "sent", sent: TODAY, paidOn: null, kind: "renewal",
      description: proposed, programId,
    };
    state.data.invoices.push(inv);
    if (l && programId) {
      // Link invoice onto the new commitment period
      commitLocationPlan(l, programId, termStart, inv.id, row.customerId);
      l.amount = amount;
    }
    r.contractId = l?.contractId || r.contractId;
    state.data.comms.push({
      id: nid("CM"), customerId: row.customerId, who: role().name, channel: "Email", date: TODAY,
      text: `Renewal ${inv.id} emailed for ${row.locName}: ${proposed} (${planLabel}). No AutoPay charge on send.`,
    });
    state.modal = null;
    toast(`Renewal ${inv.id} sent · ${planLabel} · ${row.name} · ${row.locName}.`);
    render();
  }

  function toggleRenewPick(id) {
    if (!Array.isArray(state.renewPick)) state.renewPick = [];
    if (state.renewPick.includes(id)) state.renewPick = state.renewPick.filter((x) => x !== id);
    else state.renewPick = state.renewPick.concat(id);
    render();
  }

  function renewSelectAll() {
    if (!Array.isArray(state.renewPick)) state.renewPick = [];
    const ids = renewalCandidates().filter((row) => {
      const ct = contractForLoc(row.customerId, row.locationId);
      const existing = (state.data.renewals || []).find((r) => r.rowId === row.id || (ct && r.contractId === ct.id));
      return existing?.status !== "SENT";
    }).map((r) => r.id);
    state.renewPick = ids;
    toast(ids.length ? `Selected ${ids.length} renewal${ids.length === 1 ? "" : "s"}.` : "Nothing left to select.");
    render();
  }

  function renewClearSelection() {
    state.renewPick = [];
    render();
  }

  function sendRenewalBatch(ids) {
    if (!can("renewal.send")) return;
    if (!Array.isArray(state.data.renewals)) state.data.renewals = [];
    const list = (ids || []).map((id) => ensureRenewalDraft(id)).filter(Boolean).filter((r) => r.status !== "SENT");
    if (!list.length) {
      toast("Nothing to send.");
      return;
    }
    list.forEach((r) => {
      const row = parseRenewId(r.rowId) || (r.customerId && r.locationId ? {
        id: r.rowId, customerId: r.customerId, locationId: r.locationId,
        name: custBy(r.customerId)?.billTo || custBy(r.customerId)?.name,
        locName: locBy(r.customerId, r.locationId)?.name,
        amount: r.amount || locPlan(custBy(r.customerId), locBy(r.customerId, r.locationId)).amount,
        autoPay: locPlan(custBy(r.customerId), locBy(r.customerId, r.locationId)).autoPay,
        expires: locPlan(custBy(r.customerId), locBy(r.customerId, r.locationId)).expires,
        programId: r.programId || locPlan(custBy(r.customerId), locBy(r.customerId, r.locationId)).programId,
      } : null);
      if (!row) return;
      if (r.programId) row.programId = r.programId;
      const programId = r.programId || row.programId;
      const p = progBy(programId);
      const amount = r.amount != null ? r.amount : (p ? programBillAmount(p) : row.amount);
      const m = renewalMeta(row);
      const c = custBy(row.customerId);
      const l = locBy(row.customerId, row.locationId);
      const termStart = row.expires || TODAY;
      if (l && programId) {
        commitLocationPlan(l, programId, termStart, null, row.customerId);
        l.amount = amount;
        l.paid = false;
        l.lifecycle = "waiting_payment";
      }
      if (c && programId) {
        c.programId = programId;
        c.amount = amount;
        if (c.status === "renewal" || c.status === "active") c.status = "waiting_payment";
      }
      if (l) l.renewalSent = TODAY;
      if (c) c.renewalSent = TODAY;
      r.status = "SENT";
      r.sent = true;
      r.sentAt = TODAY;
      r.programId = programId;
      r.amount = amount;
      const noticeOnly = (m.noticeOnly || row.autoPay) && programId === "12mo";
      if (noticeOnly) {
        state.data.comms.push({ id: nid("CM"), customerId: row.customerId, who: role().name, channel: "Email", date: TODAY, text: `Batch renewal notice for ${row.locName}: ${r.proposedText} (${p?.name || programId}). AutoPay not charged.` });
      } else {
        const inv = { id: nid("INV"), customerId: row.customerId, locationId: row.locationId, contractId: l?.contractId || r.contractId, amount, status: "sent", sent: TODAY, paidOn: null, kind: "renewal", description: r.proposedText, programId };
        state.data.invoices.push(inv);
        if (l && programId) commitLocationPlan(l, programId, termStart, inv.id, row.customerId);
        state.data.comms.push({ id: nid("CM"), customerId: row.customerId, who: role().name, channel: "Email", date: TODAY, text: `Batch renewal ${inv.id} to ${row.name} · ${row.locName} · ${p?.name || programId}. No AutoPay charge.` });
      }
    });
    const n = list.length;
    state.renewPick = [];
    state.modal = null;
    toast(`Sent ${n} renewal${n === 1 ? "" : "s"}. No AutoPay charges.`);
    render();
  }

  function openManualInvoice(customerId, locationId) {
    if (!can("invoice.create") && state.role !== "owner") {
      toast("Only Administration creates invoices.");
      return;
    }
    const munis = (state.data.customers || []).filter((c) => isMunicipal(c));
    const c = custBy(customerId) || munis[0];
    if (!c) {
      toast("No municipal customer on file.");
      return;
    }
    const locs = c.locations || [];
    const loc = locationId ? locBy(c.id, locationId) : locs[0];
    const clocked = muniClockedHours(c, loc?.id);
    const rate = muniHourlyRate(c);
    const suggestHrs = clocked > 0 ? clocked : Math.min(8, muniHoursRemaining(c) ?? 8);
    const suggestAmt = rate ? +(suggestHrs * rate).toFixed(2) : 0;
    const left = muniHoursRemaining(c);
    state.modal = {
      html: `
        <h3>Manual municipal invoice</h3>
        <p>Pay <strong>after</strong> service — not the residential pay-before flow. Include name, PO #, and service period (Christy / Tom).</p>
        ${muniNearLimit(c) ? `<div class="notice locked">Near PO hour limit — ${muniHoursUsed(c)}/${muniPoCapHours(c)} used · ${left} hrs left.</div>` : `<div class="notice">PO ${esc(c.po || "—")} · ${muniHoursUsed(c)}/${muniPoCapHours(c) || "—"} hrs used${left != null ? ` · ${left} remaining` : ""}.</div>`}
        <div class="field"><label>Bill-To</label>
          <select id="mi-cust">${munis.map((x) => `<option value="${x.id}" ${x.id === c.id ? "selected" : ""}>${esc(x.billTo || x.name)}</option>`).join("")}</select>
        </div>
        <div class="field"><label>Location / site</label>
          <select id="mi-loc">${(locs.length ? locs : [{ id: "", name: "—" }]).map((l) => `<option value="${l.id}" ${loc && l.id === loc.id ? "selected" : ""}>${esc(l.name || "—")}</option>`).join("")}</select>
        </div>
        <div class="field"><label>Description</label><input id="mi-desc" value="Municipal service — ${esc(muniSuggestPeriod(c))}"></div>
        <div class="field"><label>Hours this period</label><input id="mi-hours" type="number" step="0.25" value="${suggestHrs}"></div>
        <div class="field"><label>Rate $/hr</label><input id="mi-rate" type="number" step="0.01" value="${rate || ""}" placeholder="Optional"></div>
        <div class="field"><label>Amount</label><input id="mi-amt" type="number" step="0.01" value="${suggestAmt}"></div>
        <div class="field"><label>PO #</label><input id="mi-po" value="${esc(c.po || "")}"></div>
        <div class="field"><label>Service period</label><input id="mi-period" value="${esc(muniSuggestPeriod(c))}" placeholder="e.g. July 2026"></div>
        <p class="tiny">Clocked on stops: ${clocked || 0} hrs. Amount ≈ hours × rate; adjust by hand when the contract is not hourly.</p>
        <div class="actions">
          <button class="btn btn-ghost" data-act="close-modal">Cancel</button>
          <button class="btn btn-primary" data-act="save-manual-invoice">Create invoice</button>
        </div>
      `,
    };
    render();
  }

  function saveManualInvoice() {
    if (!can("invoice.create") && state.role !== "owner") return;
    const cid = val("mi-cust");
    const c = custBy(cid);
    if (!c) {
      toast("Pick a municipal Bill-To.");
      return;
    }
    const lid = val("mi-loc") || c.locations?.[0]?.id || null;
    const hours = Number(val("mi-hours")) || 0;
    const rate = Number(val("mi-rate")) || muniHourlyRate(c) || 0;
    let amt = Number(val("mi-amt"));
    if ((!Number.isFinite(amt) || amt === 0) && hours && rate) amt = +(hours * rate).toFixed(2);
    const left = muniHoursRemaining(c);
    if (left != null && hours > left + 0.001) {
      toast(`Only ${left} PO hours left — lower hours or raise the PO cap.`);
      return;
    }
    const inv = {
      id: nid("INV"), customerId: cid, locationId: lid, amount: Number.isFinite(amt) ? amt : 0,
      status: "sent", sent: TODAY, paidOn: null, kind: "municipal",
      description: val("mi-desc") || "Municipal service",
      po: val("mi-po") || c.po || "",
      period: val("mi-period") || "",
      hours,
      hourlyRate: rate || null,
    };
    state.data.invoices.push(inv);
    if (hours > 0) {
      c.hoursUsed = +(muniHoursUsed(c) + hours).toFixed(2);
      if (rate) c.hourlyRate = rate;
    }
    state.data.comms.push({
      id: nid("CM"), customerId: cid, who: role().name, channel: "Office", date: TODAY,
      text: `Manual municipal invoice ${inv.id}: ${inv.description} · ${money(inv.amount)} · ${hours || "—"} hrs · PO ${inv.po} · ${inv.period}. Remaining PO hours: ${muniHoursRemaining(c) ?? "—"}.`,
    });
    state.modal = null;
    toast(`Invoice ${inv.id} · ${money(inv.amount)} · PO ${inv.po} · ${muniHoursUsed(c)}/${muniPoCapHours(c) || "—"} hrs on PO.`);
    render();
  }

  function openCreateService(id, locId) {
    if (!can("service.create")) return;
    const c = custBy(id);
    if (!c) return;
    const locs = c.locations.filter((l) => l.covered !== false);
    const selected = locId || locs.find((l) => locNeedsService(c, l))?.id || locs[0]?.id;
    state.setupId = c.id;
    state.setupLocId = selected || null;
    state.selectedCustomer = c.id;
    state.setupDraft = null;
    state.page = "create-service";
    state.modal = null;
    render();
  }

  function saveCreateService(id) {
    if (!can("service.create")) return;
    const c = custBy(id || state.setupId);
    const locId = val("sv-loc") || state.setupLocId;
    const loc = c?.locations.find((l) => l.id === locId);
    if (!c || !loc) return;
    if (svcFor(c.id, loc.id)) {
      state.modal = null;
      goToAssignMap(c.id, loc.id, "Service already saved. Click a technician’s home to see their properties.");
      return;
    }
    const durationMin = parseDur(val("sv-dur"));
    const start = val("sv-start") || val("sv-idate");
    const type = val("sv-type") || defaultServiceCode(c, loc);
    const expires = val("sv-expires") || expiryFrom(start, type);
    const renewal = expires;
    if (!durationMin || !start || !expires) {
      toast("Duration, start date, and renewal date are required.");
      return;
    }
    const sched = SERVICE_SCHEDULES.find((s) => s.id === val("sv-sched")) || SERVICE_SCHEDULES[0];
    const createInitial = checked("sv-create-initial");
    const standing = val("sv-trapper") || null;
    const initial = createInitial ? (val("sv-initial") || standing || null) : standing;
    const notes = val("sv-notes");
    if (notes) loc.notes = notes;
    const px = Number(val("sv-x"));
    const py = Number(val("sv-y"));
    if (Number.isFinite(px) && Number.isFinite(py)) {
      loc.x = `${px.toFixed(1)}%`;
      loc.y = `${py.toFixed(1)}%`;
      const coords = latLngFromXy(px, py);
      loc.lat = Number(val("sv-lat")) || coords.lat;
      loc.lng = Number(val("sv-lng")) || coords.lng;
      loc.gps = `${loc.lat}, ${loc.lng}`;
    }
    const notifyEmail = checked("sv-notify-email");
    const notifyText = checked("sv-notify-text");
    const svc = {
      id: nid("SVC"), customerId: c.id, locationId: loc.id,
      type, status: "new",
      techId: null, initialTechId: initial, standingTechId: standing, days: sched.days,
      durationMin, generated: false,
      notify: notifyEmail || notifyText,
      notifyEmail, notifyText, notifyDays: 2,
      schedule: sched.id,
      createInitial,
      initialDate: createInitial ? (val("sv-idate") || start) : "",
      initialTime: createInitial ? val("sv-itime") : "",
      ampm: createInitial ? (val("sv-ampm") || "PM") : "AM",
      initialDuration: createInitial ? parseDur(val("sv-idur") || val("sv-dur")) : durationMin,
      description: val("sv-desc") || "",
      qty: Number(val("sv-qty") || 1),
      price: Number(val("sv-price") || 0),
      initialPrice: createInitial ? Number(val("sv-iprice") || val("sv-price") || 0) : 0,
      // tax: checked("sv-tax"),
      locked: false,
      unscheduled: false,
      active: true,
      timeWhen: "Anytime",
      timeRange: "",
      color: techBy(standing || initial)?.color || "#5ec8d8",
      charge: "Production",
      start, expires, renewal,
      route: "",
      target: val("sv-target") || "IGUANA",
      measurement: 0,
      po: c.po || "",
      poExp: "",
      division: "",
      source: "",
      skipMonths: [],
      nextGen: start,
      lastGen: "",
      nextService: "",
      lastService: "",
      increaseDate: "",
      increasePrice: true,
      cancelDate: "",
      cancelReason: "",
      instructions: notes,
      freq: val("sv-freq") || "",
    };
    if (!state.data.services) state.data.services = [];
    state.data.services.push(svc);
    loc.requestService = false;
    loc.days = sched.days;
    if (!c.start) c.start = start;
    if (!c.expires) c.expires = expires;
    c.days = sched.days;
    c.durationMin = durationMin;
    if (c.status === "inquiry" && (c.paid || c.municipal)) c.status = "active";
    state.modal = null;
    state.setupDraft = null;
    const who = standing || initial;
    goToAssignMap(
      c.id,
      loc.id,
      who
        ? `${c.name} · ${loc.name} saved · ${techBy(who)?.name || "trapper"} suggested. Confirm on the map.`
        : `${c.name} · ${loc.name} is saved. Click a technician’s home to assign this pin.`
    );
  }

  function openEditService(svcId) {
    if (!canEditService()) {
      toast("Only Operations or Owner can edit services.");
      return;
    }
    const svc = (state.data.services || []).find((s) => s.id === svcId);
    if (!svc) return;
    const c = custBy(svc.customerId);
    const loc = locBy(svc.customerId, svc.locationId);
    if (!c || !loc) return;
    const sched = SERVICE_SCHEDULES.find((s) => s.id === svc.schedule || s.days === svc.days) || SERVICE_SCHEDULES[0];
    const continuing = svcIsContinuing(svc);
    state.modal = {
      wide: true,
      html: `
        <h3>${continuing ? "Edit continuing service" : "Service detail"} · ${esc(loc.name)}</h3>
        <p>Bill-To ${esc(c.billTo || c.name)}. <strong>Reassign</strong> moves this service to another trapper (Johnny unavailable → Bobby). <strong>Share</strong> adds a second trapper on the same property with their own days — do not copy the stop.</p>
        <div class="preview">
          <strong>${esc(svc.id)}</strong> · ${svcStatusBadge(svc)}
          <div class="tiny">${esc(loc.address)}</div>
          ${locIsShared(c, loc) ? `<div class="tiny">Shared property · ${locTechs(c, loc).map(techName).join(" / ")}</div>` : ""}
        </div>
        <div class="setup-grid">
          <div class="field"><label>Service type</label>
            <select id="es-type" ${continuing ? "" : "disabled"}>${allServiceTypes().map((t) => `<option value="${t.id}" ${t.id === svc.type ? "selected" : ""}>${esc(t.code)} · ${esc(t.label)}</option>`).join("")}</select>
          </div>
          <div class="field"><label>Standing trapper (reassign = change this)</label>
            <select id="es-trapper" ${continuing ? "" : "disabled"}>
              <option value="">Unassigned</option>
              ${TECHS.map((t) => `<option value="${t.id}" ${t.id === svc.techId ? "selected" : ""}>${esc(t.name.toUpperCase())} · ${esc(t.home)}</option>`).join("")}
            </select>
          </div>
          <div class="field"><label>Schedule</label>
            <select id="es-sched" ${continuing ? "" : "disabled"}>${SERVICE_SCHEDULES.map((s) => `<option value="${s.id}" ${s.id === sched.id ? "selected" : ""}>${esc(s.label)}</option>`).join("")}</select>
          </div>
          <div class="field"><label>Duration (min)</label><input id="es-dur" type="number" value="${esc(svc.durationMin || 20)}" ${continuing ? "" : "disabled"}></div>
          <div class="field"><label>Start</label><input id="es-start" type="date" value="${esc(svc.start || "")}" ${continuing ? "" : "disabled"}></div>
          <div class="field"><label>Expires / renewal</label><input id="es-expires" type="date" value="${esc(svc.expires || svc.renewal || "")}" ${continuing ? "" : "disabled"}></div>
          <div class="field"><label>Charge</label>
            <select id="es-charge" ${continuing ? "" : "disabled"}>${CHARGE_MODES.map((m) => `<option ${m === (svc.charge || "Production") ? "selected" : ""}>${m}</option>`).join("")}</select>
          </div>
          <div class="field"><label>Target</label>
            <select id="es-target" ${continuing ? "" : "disabled"}>${TARGETS.map((t) => `<option ${t === (svc.target || "IGUANA") ? "selected" : ""}>${t}</option>`).join("")}</select>
          </div>
          <div class="field chk-field"><label class="chk"><input type="checkbox" id="es-active" ${svc.active !== false && continuing ? "checked" : ""} ${continuing ? "" : "disabled"}> Active / continuing</label></div>
          <div class="field"><label>Cancel date</label><input id="es-cancel" type="date" value="${esc(svc.cancelDate || "")}" ${continuing ? "" : "disabled"}></div>
          <div class="field"><label>Cancel reason</label><input id="es-cancelr" value="${esc(svc.cancelReason || "")}" ${continuing ? "" : "disabled"} placeholder="optional"></div>
          <div class="field"><label>Ops note</label><textarea id="es-note" rows="2" ${continuing ? "" : "disabled"} placeholder="Internal note on this service">${esc(svc.opsNote || "")}</textarea></div>
        </div>
        <div class="actions" style="margin-top:14px">
          <button class="btn btn-ghost" data-act="close-modal">Close</button>
          ${continuing && canEditService() ? `
            <button class="btn btn-ghost" data-act="open-assign" data-id="${c.id}" data-loc="${loc.id}">Reassign on map</button>
            <button class="btn btn-ghost" data-act="share-property" data-id="${c.id}" data-loc="${loc.id}">Share · add trapper</button>
            ${can("service.stop") ? btn("service.stop", "Stop service", "stop-service", `data-id="${svc.id}"`) : ""}
            ${btn("service.edit", "Save changes", "save-edit-service", `data-id="${svc.id}"`)}
          ` : ""}
        </div>
      `,
    };
    render();
  }

  function openStopService(svcId) {
    if (!can("service.stop")) {
      toast("Only Operations can stop a service.");
      return;
    }
    const svc = (state.data.services || []).find((s) => s.id === svcId);
    if (!svc || !svcIsContinuing(svc)) {
      toast("That service is already stopped.");
      return;
    }
    const c = custBy(svc.customerId);
    const loc = locBy(svc.customerId, svc.locationId);
    state.modal = {
      html: `
        <h3>Stop service</h3>
        <p><strong>${esc(c?.billTo || c?.name || "")}</strong> · ${esc(loc?.name || "")}. Pulls them off the route now. Use this after a failed monthly payment when they will not pay — do not create a new service later unless they start again.</p>
        <div class="field"><label>Reason</label>
          <select id="stop-reason">
            <option value="Failed monthly payment — customer will not pay">Failed monthly payment — will not pay</option>
            <option value="Failed monthly payment — holding until they call back">Failed monthly — holding until callback</option>
            <option value="Customer asked to cancel">Customer asked to cancel</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div class="field"><label>Note (optional)</label><textarea id="stop-note" rows="2" placeholder="Who you spoke with, next step…"></textarea></div>
        <div class="actions" style="margin-top:12px">
          <button class="btn btn-ghost" data-act="close-modal">Keep running</button>
          ${btn("service.stop", "Stop service now", "confirm-stop-service", `data-id="${svc.id}"`, "btn-sun")}
        </div>
      `,
    };
    render();
  }

  function confirmStopService(svcId) {
    if (!can("service.stop")) return;
    const svc = (state.data.services || []).find((s) => s.id === svcId);
    if (!svc) return;
    const c = custBy(svc.customerId);
    const loc = locBy(svc.customerId, svc.locationId);
    const reason = val("stop-reason") || "Stopped by Operations";
    const note = val("stop-note") || "";
    svc.status = "cancelled";
    svc.active = false;
    svc.cancelDate = TODAY;
    svc.cancelReason = reason;
    svc.opsNote = [svc.opsNote, note].filter(Boolean).join(" · ");
    (state.data.stops || []).forEach((st) => {
      if (st.customerId !== svc.customerId || st.locationId !== svc.locationId) return;
      if (st.status === "complete" || st.status === "noshow" || st.pending) return;
      st.status = "blocked";
    });
    if (loc) {
      loc.lifecycle = "stopped";
      loc.requestService = false;
      loc.techId = null;
    }
    if (c) {
      c.opsNote = [c.opsNote, `Service stopped ${TODAY}: ${reason}`].filter(Boolean).join(" ");
      const stillLive = (c.locations || []).some((l) => {
        const s = svcFor(c.id, l.id);
        return s && svcIsContinuing(s);
      });
      if (!stillLive) c.status = "lapsed";
    }
    const ct = contractForLoc(svc.customerId, svc.locationId);
    if (ct) {
      ct.status = "CANCELLED";
      ct.paymentStatus = "STOPPED";
    }
    const bp = ct && planForContract(ct.id);
    if (bp) bp.status = "INACTIVE";
    state.data.comms.push({
      id: nid("CM"), customerId: svc.customerId, who: ROLES[state.role]?.name || "Operations",
      channel: "System", date: TODAY,
      text: `Service stopped on ${loc?.name || svc.locationId}. ${reason}${note ? " — " + note : ""}`,
    });
    pushNotify({
      type: "SERVICE_STOPPED",
      severity: "alert",
      title: "Service stopped",
      text: `${c?.billTo || c?.name || ""} · ${loc?.name || ""} stopped by Ops. ${reason}`,
      customerId: svc.customerId, locationId: svc.locationId,
    });
    (state.data.tasks || []).filter((t) =>
      t.status === "open" && t.customerId === svc.customerId && t.locationId === svc.locationId
      && /stop|hold|unpaid|autopay/i.test(`${t.title} ${t.notes || ""}`)
    ).forEach((t) => {
      t.status = "done";
      t.completedAt = TODAY;
    });
    state.modal = null;
    toast(`${c?.name || "Customer"} · ${loc?.name || "property"} stopped — off the route.`);
    render();
  }

  function saveEditService(svcId) {
    if (!canEditService()) return;
    const svc = (state.data.services || []).find((s) => s.id === svcId);
    if (!svc) return;
    const c = custBy(svc.customerId);
    const loc = locBy(svc.customerId, svc.locationId);
    const prevTech = svc.techId;
    const sched = SERVICE_SCHEDULES.find((s) => s.id === val("es-sched")) || SERVICE_SCHEDULES[0];
    const techId = val("es-trapper") || null;
    const durationMin = Number(val("es-dur")) || svc.durationMin || 20;
    const start = val("es-start") || svc.start;
    const expires = val("es-expires") || svc.expires;
    const cancelDate = val("es-cancel") || null;

    svc.type = val("es-type") || svc.type;
    svc.techId = techId;
    svc.schedule = sched.id;
    svc.days = sched.days;
    svc.durationMin = durationMin;
    svc.start = start;
    svc.expires = expires;
    svc.renewal = expires;
    svc.charge = val("es-charge") || svc.charge;
    svc.target = val("es-target") || svc.target;
    svc.opsNote = val("es-note") || "";
    svc.cancelDate = cancelDate;
    svc.cancelReason = val("es-cancelr") || "";
    if (cancelDate) {
      svc.status = "cancelled";
      svc.active = false;
    } else if (checked("es-active")) {
      svc.status = techId ? "live" : "new";
      svc.active = true;
    } else {
      svc.status = "ended";
      svc.active = false;
    }

    if (loc) {
      loc.days = sched.days;
      loc.techId = techId || loc.techId;
      loc.durationMin = durationMin;
    }
    if (c) {
      c.days = sched.days;
      if (techId) c.techId = techId;
      c.durationMin = durationMin;
    }

    // Sync open stops when trapper or days change
    (state.data.stops || []).forEach((st) => {
      if (st.customerId !== svc.customerId || st.locationId !== svc.locationId) return;
      if (st.status === "complete" || st.status === "noshow" || st.pending) return;
      if (techId && techId !== prevTech) st.techId = techId;
      if (sched.days && patternDays(sched.days).length === 1) {
        // leave multi-day patterns alone; single-day schedule updates day
        st.day = patternDays(sched.days)[0] || st.day;
      }
      st.durationMin = durationMin;
    });

    state.modal = null;
    if (techId && techId !== prevTech) {
      toast(`Service updated · trapper ${techName(techId)}. Open stops moved with the reassignment.`);
    } else if (cancelDate) {
      toast("Service cancelled on this property.");
    } else {
      toast("Service updated.");
    }
    state.page = "customer";
    state.selectedCustomer = svc.customerId;
    render();
  }

  function goToAssignMap(id, locId, message) {
    const c = custBy(id);
    const loc = c?.locations.find((l) => l.id === locId) || c?.locations.find((l) => locNeedsTech(c, l)) || c?.locations[0];
    state.mapClient = id;
    state.mapLoc = loc?.id || null;
    state.mapTech = null;
    state.mapCompare = [];
    state.mapPin = null;
    state.mapSched = null;
    state.mapColorBy = "tech";
    state.assignId = id;
    state.assignLocId = loc?.id || null;
    const svc = loc ? svcFor(c.id, loc.id) : null;
    state.assignDays = DAY_PATTERNS.some((p) => p.id === (svc?.days || loc?.days || c?.days)) ? (svc?.days || loc?.days || c.days) : "Mon/Wed";
    const ranked = loc ? bestFitFor(c, loc, state.assignDays) : [];
    state.assignFocus = ranked[0]?.t.id || null;
    state.page = "map";
    state.modal = null;
    if (message) toast(message);
    render();
  }

  function openAssign(id, locId) {
    const c = custBy(id);
    if (!c) return;
    const loc = c.locations.find((l) => l.id === locId) || c.locations.find((l) => locNeedsTech(c, l)) || c.locations[0];
    if (!svcFor(c.id, loc?.id)) {
      toast("Create the service for this property first, then assign a technician on the map.");
      openCreateService(c.id, loc?.id);
      return;
    }
    goToAssignMap(c.id, loc?.id, "Reassign: click a trapper home, then Assign — this moves the property (does not share).");
  }

  function openShareProperty(customerId, locationId) {
    if (!(can("schedule.assign") || can("service.create") || can("service.edit") || state.role === "owner")) {
      toast("Only Operations can share a property.");
      return;
    }
    const c = custBy(customerId);
    const loc = locBy(customerId, locationId);
    if (!c || !loc) return;
    const existing = svcsFor(c.id, loc.id).filter(svcIsContinuing);
    if (!existing.length) {
      toast("Create and assign the first service before sharing.");
      openCreateService(c.id, loc.id);
      return;
    }
    const taken = locTechs(c, loc);
    const primary = existing[0];
    const freeTechs = TECHS.filter((t) => !taken.includes(t.id));
    if (!freeTechs.length) {
      toast("Every trapper is already on this property.");
      return;
    }
    const defaultSched = SERVICE_SCHEDULES.find((s) => s.days !== primary.days) || SERVICE_SCHEDULES[1] || SERVICE_SCHEDULES[0];
    state.modal = {
      wide: true,
      html: `
        <h3>Share property · add trapper</h3>
        <p><strong>${esc(loc.name)}</strong> stays with ${esc(taken.map(techName).join(" / "))}. Adding another trapper creates a <strong>second service</strong> on different days — do not copy the stop.</p>
        <div class="preview">
          <div class="tiny">Already on this pin</div>
          ${existing.map((s) => `<div><strong>${esc(techName(s.techId))}</strong> · ${esc(s.days || "—")} · ${s.durationMin || 20}m</div>`).join("")}
        </div>
        <div class="notice">Use <strong>Reassign</strong> instead if Johnny is unavailable and Bobby should take the whole property.</div>
        <div class="setup-grid">
          <div class="field req"><label>Additional trapper</label>
            <select id="share-tech">${freeTechs.map((t, i) => `<option value="${t.id}" ${i === 0 ? "selected" : ""}>${esc(t.name)} · ${esc(t.home)}</option>`).join("")}</select>
          </div>
          <div class="field req"><label>Their schedule (different days)</label>
            <select id="share-sched">${SERVICE_SCHEDULES.map((s) => `<option value="${s.id}" ${s.id === defaultSched.id ? "selected" : ""}>${esc(s.label)}</option>`).join("")}</select>
          </div>
          <div class="field"><label>Duration (min)</label>
            <input id="share-dur" type="number" value="${esc(primary.durationMin || loc.durationMin || 20)}">
          </div>
          <div class="field"><label>Service type</label>
            <select id="share-type">${allServiceTypes().map((t) => `<option value="${t.id}" ${t.id === primary.type ? "selected" : ""}>${esc(t.code)} · ${esc(t.label)}</option>`).join("")}</select>
          </div>
        </div>
        <div class="actions" style="margin-top:14px">
          <button class="btn btn-ghost" data-act="close-modal">Cancel</button>
          <button class="btn btn-primary" data-act="confirm-share-property" data-id="${c.id}" data-loc="${loc.id}">Add trapper · share pin</button>
        </div>
      `,
    };
    render();
  }

  function confirmShareProperty(customerId, locationId) {
    if (!(can("schedule.assign") || can("service.create") || can("service.edit") || state.role === "owner")) return;
    const c = custBy(customerId);
    const loc = locBy(customerId, locationId);
    if (!c || !loc) return;
    const techId = val("share-tech");
    const sched = SERVICE_SCHEDULES.find((s) => s.id === val("share-sched")) || SERVICE_SCHEDULES[0];
    const typeId = val("share-type") || svcsFor(c.id, loc.id).find(svcIsContinuing)?.type || "12mon-res";
    const durationMin = Number(val("share-dur")) || 20;
    if (!techId) {
      toast("Pick the additional trapper.");
      return;
    }
    if (locTechs(c, loc).includes(techId)) {
      toast(`${techName(techId)} is already on this property — pick someone else, or reassign instead.`);
      return;
    }
    const primary = svcsFor(c.id, loc.id).find(svcIsContinuing);
    if (!Array.isArray(state.data.services)) state.data.services = [];
    const svc = {
      id: nid("SVC"),
      customerId: c.id,
      locationId: loc.id,
      type: typeId,
      status: "live",
      techId,
      days: sched.days,
      durationMin,
      generated: true,
      schedule: sched.id,
      target: primary?.target || "IGUANA",
      charge: primary?.charge || "Production",
      start: primary?.start || TODAY,
      expires: primary?.expires || primary?.renewal || null,
      renewal: primary?.renewal || primary?.expires || null,
      shared: true,
      active: true,
      opsNote: `Shared with ${locTechs(c, loc).map(techName).concat(techName(techId)).filter((n, i, a) => a.indexOf(n) === i).join(" / ")} — separate service, do not copy stop.`,
    };
    state.data.services.push(svc);
    loc.shared = true;
    loc.backupId = techId;
    if (c.paid || c.municipal) {
      patternDays(sched.days).forEach((d) => {
        state.data.stops.push({
          id: nid("S"), customerId: c.id, locationId: loc.id,
          techId, day: d, time: nextSlot(techId, d),
          durationMin, type: "service",
          status: "scheduled", actualMin: null, removals: null,
        });
      });
    }
    state.data.comms.push({
      id: nid("CM"), customerId: c.id, who: role().name, channel: "Office", date: TODAY,
      text: `Shared ${loc.name}: added ${techName(techId)} on ${sched.days} (${durationMin}m). Existing trapper(s) kept — gray diamond on the map.`,
    });
    state.modal = null;
    state.page = "customer";
    state.selectedCustomer = c.id;
    toast(`Shared ${loc.name} · ${techName(techId)} added on ${sched.days}. Pin is a gray diamond.`);
    render();
  }

  function openCompareRoutes(id, locId) {
    const c = custBy(id);
    if (!c) return;
    const loc = c.locations.find((l) => l.id === locId) || c.locations.find((l) => locNeedsTech(c, l)) || c.locations[0];
    if (!svcFor(c.id, loc?.id)) {
      toast("Create the service for this property first, then assign a technician.");
      openCreateService(c.id, loc?.id);
      return;
    }
    state.assignId = id;
    state.assignLocId = loc?.id || null;
    const svc = svcFor(c.id, loc.id);
    state.assignDays = DAY_PATTERNS.some((p) => p.id === (svc?.days || loc?.days || c.days)) ? (svc?.days || loc?.days || c.days) : "Mon/Wed";
    state.assignFocus = loc?.techId || svc?.techId || null;
    state.page = "assign";
    state.modal = null;
    render();
  }

  function mapAssign(id, techId, locId) {
    const cid = id || state.mapClient || opsAssignQueue()[0]?.c.id;
    const queue = opsAssignQueue();
    const lid = locId || state.mapLoc || queue.find((r) => r.c.id === cid)?.l.id;
    const tech = techId || state.mapTech;
    if (!cid || !tech) {
      toast("Click a technician’s home first.");
      return;
    }
    const c = custBy(cid);
    const loc = c?.locations.find((l) => l.id === lid);
    const svc = loc ? svcFor(cid, loc.id) : null;
    if (svc?.days) state.assignDays = svc.days;
    else if (loc?.days) state.assignDays = loc.days;
    confirmAssign(cid, tech, lid);
  }

  function confirmAssign(id, techId, locId) {
    if (!can("schedule.assign")) return;
    const c = custBy(id);
    if (!c) return;
    const loc = c.locations.find((l) => l.id === (locId || state.assignLocId || state.mapLoc)) || c.locations[0];
    if (!svcFor(c.id, loc.id)) {
      toast("Create the service for this property first, then assign a technician on the map.");
      return;
    }
    const stayOnMap = state.page === "map";
    const ranked = bestFitFor(c, loc);
    const tech = techId || state.assignFocus || state.mapTech || ranked[0]?.t.id;
    if (!tech) return;
    const days = patternDays(state.assignDays);
    const backup = ranked.find((r) => r.t.id !== tech)?.t.id || (tech === "johnny" ? "bobby" : "johnny");
    const svc = svcFor(c.id, loc.id);
    const prevTech = svc?.techId;
    loc.techId = tech;
    loc.backupId = backup;
    loc.days = state.assignDays;
    loc.requestService = false;
    if (svc) {
      svc.techId = tech;
      svc.days = state.assignDays;
      svc.status = "live";
      svc.generated = true;
      svc.durationMin = svc.durationMin || loc.durationMin || c.durationMin;
    }
    if (!c.techId) {
      c.techId = tech;
      c.backupId = backup;
      c.days = state.assignDays;
    }
    if (c.status === "inquiry" && (c.paid || c.municipal)) c.status = "active";
    if (prevTech) {
      state.data.stops = state.data.stops.filter((s) => !(s.customerId === id && s.locationId === loc.id && s.techId === prevTech && (s.status === "scheduled" || s.status === "unassigned_done")));
    }
    if (c.paid || c.municipal) {
      days.forEach((d) => {
        state.data.stops.push({
          id: nid("S"), customerId: c.id, locationId: loc.id,
          techId: tech, day: d, time: nextSlot(tech, d),
          durationMin: svc?.durationMin || c.durationMin, type: "service",
          status: "scheduled", actualMin: null, removals: null,
        });
      });
    }
    const still = opsAssignQueue().find((r) => r.c.id === c.id);
    const moreSetup = c.locations.some((l) => locNeedsService(c, l));
    state.mapTech = tech;
    if (still) {
      state.mapClient = c.id;
      state.mapLoc = still.l.id;
      state.assignId = c.id;
      state.assignLocId = still.l.id;
      state.assignFocus = null;
      state.page = stayOnMap ? "map" : "assign";
      toast(`${techName(tech)} is live on ${c.name} · ${loc.name}. Click another home or assign the next property.`);
    } else {
      state.mapClient = null;
      state.mapLoc = null;
      state.assignId = null;
      state.assignLocId = null;
      state.assignFocus = null;
      state.page = stayOnMap ? "map" : "schedule";
      toast(moreSetup
        ? `${techName(tech)} now has ${c.name} · ${loc.name}. Another property still needs a service created.`
        : `${techName(tech)} now has ${c.name} · ${loc.name} on the live route.`);
    }
    render();
  }

  function openEditBillTo(id) {
    if (!canEditField("name")) return;
    const c = custBy(id);
    if (!c) return;
    const type = c.billToType || c.type || "residential";
    state.modal = {
      wide: true,
      html: `
        <h3>Edit Bill-To</h3>
        <p>Payer contact only. Properties are edited separately.</p>
        <div class="intake-grid">
          <div class="field"><label>Display name</label><input id="eb-name" value="${esc(c.name)}"></div>
          <div class="field"><label>Bill-To name</label><input id="eb-billto" value="${esc(c.billTo || c.name)}"></div>
          <div class="field"><label>Company / HOA</label><input id="eb-company" value="${esc(c.company || "")}"></div>
          <div class="field"><label>Bill-To type</label>
            <select id="eb-billtype">${[["residential","Residential"],["commercial","Commercial"],["hoa","HOA"],["municipal","Municipal"]].map(([v, lab]) => `<option value="${v}" ${type === v ? "selected" : ""}>${lab}</option>`).join("")}</select>
          </div>
          <div class="field"><label>Phone</label><input id="eb-phone" value="${esc(c.phone || "")}"></div>
          <div class="field"><label>Mobile</label><input id="eb-mobile" value="${esc(c.mobile || "")}"></div>
          <div class="field"><label>Email</label><input id="eb-email" value="${esc(c.email || "")}"></div>
          <div class="field"><label>Status</label>
            <select id="eb-status">${[["inquiry","Inquiry"],["waiting_payment","Waiting for payment"],["active","Active"],["renewal","Renewal window"],["past_due","Past due"],["lapsed","Non-renewed"]].map(([v, lab]) => `<option value="${v}" ${c.status === v ? "selected" : ""}>${lab}</option>`).join("")}</select>
          </div>
        </div>
        <div class="field"><label>Customer instructions</label><textarea id="eb-notes" rows="3">${esc(c.notes || "")}</textarea></div>
        ${state.role !== "sales" ? `<div class="field"><label>Internal Ops note</label><textarea id="eb-ops" rows="2">${esc(c.opsNote || "")}</textarea></div>` : ""}
        <label class="chk"><input type="checkbox" id="eb-autopay" ${c.autoPay ? "checked" : ""}> Auto-pay on this Bill-To</label>
        <label class="chk" style="margin-left:14px"><input type="checkbox" id="eb-sms" ${c.acceptSms ? "checked" : ""}> Accept SMS</label>
        <label class="chk" style="margin-left:14px"><input type="checkbox" id="eb-mail" ${c.acceptEmail !== false ? "checked" : ""}> Accept email</label>
        ${(c.municipal || type === "municipal") ? `
          <div class="intake-grid" style="margin-top:12px">
            <div class="field"><label>PO #</label><input id="eb-po" value="${esc(c.po || "")}"></div>
            <div class="field"><label>Hours used</label><input id="eb-hours" type="number" value="${esc(c.hoursUsed || 0)}"></div>
            <div class="field"><label>PO cap hours</label><input id="eb-cap" type="number" value="${esc(c.poCapHours || 0)}"></div>
          </div>
        ` : ""}
        <div class="actions" style="margin-top:14px">
          <button class="btn btn-ghost" data-act="close-modal">Cancel</button>
          <button class="btn btn-primary" data-act="save-billto" data-id="${c.id}">Save Bill-To</button>
        </div>
      `,
    };
    render();
  }

  function saveEditBillTo(id) {
    if (!canEditField("name")) return;
    const c = custBy(id);
    if (!c) return;
    c.name = val("eb-name") || c.name;
    c.billTo = val("eb-billto") || c.name;
    c.company = val("eb-company");
    c.billToType = val("eb-billtype") || c.type;
    c.type = c.billToType;
    c.municipal = c.type === "municipal";
    c.phone = val("eb-phone");
    c.mobile = val("eb-mobile");
    c.email = val("eb-email");
    c.status = val("eb-status") || c.status;
    c.notes = val("eb-notes");
    if (state.role !== "sales") c.opsNote = val("eb-ops");
    c.autoPay = !!document.getElementById("eb-autopay")?.checked;
    c.acceptSms = !!document.getElementById("eb-sms")?.checked;
    c.acceptEmail = !!document.getElementById("eb-mail")?.checked;
    if (document.getElementById("eb-po")) {
      c.po = val("eb-po");
      c.hoursUsed = Number(val("eb-hours") || 0);
      c.poCapHours = Number(val("eb-cap") || 0);
    }
    state.modal = null;
    toast("Bill-To updated.");
    render();
  }

  function openEditLocations(id) {
    if (!(can("location.add") || canEditField("address") || state.role === "owner")) return;
    const c = custBy(id);
    if (!c) return;
    state.modal = {
      wide: true,
      html: `
        <h3>Edit locations</h3>
        <p>Bill-To ${esc(c.billTo || c.name)}. Pick a property to edit, or add another.</p>
        ${(c.locations || []).map((l) => {
          const gps = l.lat != null && l.lng != null ? `${Number(l.lat).toFixed(4)}, ${Number(l.lng).toFixed(4)}` : (l.gps || approxGps(l));
          return `<div class="fit-row">
            <div>
              <strong>${esc(l.name)}</strong>
              <div class="tiny">${esc(l.address)}</div>
              <div class="tiny">GPS ${esc(gps)}</div>
            </div>
            <button class="btn btn-ghost" data-act="edit-one-loc" data-id="${c.id}" data-loc="${l.id}">Edit</button>
          </div>`;
        }).join("") || `<p class="muted">No properties yet.</p>`}
        <div class="actions" style="margin-top:14px">
          <button class="btn btn-ghost" data-act="close-modal">Done</button>
          ${btn("location.add", "Add property", "add-location", `data-id="${c.id}"`)}
        </div>
      `,
    };
    render();
  }

  function openEditOneLocation(cid, lid) {
    if (!(can("location.add") || canEditField("address") || state.role === "owner")) return;
    const c = custBy(cid);
    const loc = locBy(cid, lid);
    if (!c || !loc) return;
    const coords = loc.lat != null && loc.lng != null
      ? { lat: Number(loc.lat).toFixed(4), lng: Number(loc.lng).toFixed(4) }
      : latLngFromXy(pct(loc.x), pct(loc.y));
    const street = loc.street || "";
    const city = loc.city || "";
    const zip = loc.zip || "";
    state.modal = {
      previewMap: true,
      html: `
        <h3>Edit location · ${esc(loc.name)}</h3>
        <p>Map, address, and GPS for this property only.</p>
        <div class="modal-map-row">
          <div>
            <div class="field"><label>Property name</label><input id="el-name" value="${esc(loc.name)}"></div>
            <div class="field"><label>Subdivision</label><input id="el-subdiv" value="${esc(loc.subdivision || "")}"></div>
            <div class="field"><label>Street</label><input id="el-street" value="${esc(street)}" data-preview-pin="mini-preview" data-preview-x="el-x" data-preview-y="el-y"></div>
            <div class="field"><label>City</label><input id="el-city" value="${esc(city)}" data-preview-pin="mini-preview" data-preview-x="el-x" data-preview-y="el-y"></div>
            <div class="field"><label>Zip</label><input id="el-zip" value="${esc(zip)}"></div>
            <div class="field"><label>Latitude</label><input id="el-lat" value="${coords.lat}" data-coord="1" data-preview-pin="mini-preview" data-pair-lat="el-lat" data-pair-lng="el-lng" inputmode="decimal"></div>
            <div class="field"><label>Longitude</label><input id="el-lng" value="${coords.lng}" data-coord="1" data-preview-pin="mini-preview" data-pair-lat="el-lat" data-pair-lng="el-lng" inputmode="decimal"></div>
            <input type="hidden" id="el-x" value="${pct(loc.x)}">
            <input type="hidden" id="el-y" value="${pct(loc.y)}">
            <div class="actions">
              <button class="btn btn-ghost" data-act="close-modal">Back</button>
              <button class="btn btn-primary" data-act="save-one-loc" data-id="${c.id}" data-loc="${loc.id}">Save location</button>
            </div>
          </div>
          ${miniMapHtml({
            mapId: "mini-map-edit",
            title: "Map · " + loc.name,
            existing: c.locations.filter((l) => l.id !== loc.id).map((l) => ({ x: l.x, y: l.y, label: l.name, color: locPinColor(c, l) })),
            preview: [{
              x: loc.x, y: loc.y, label: loc.name, elId: "mini-preview",
              xId: "el-x", yId: "el-y",
              fillCity: "el-city", fillStreet: "el-street", fillZip: "el-zip",
              fillLat: "el-lat", fillLng: "el-lng",
              capId: "mini-cap-edit",
            }],
            caption: `${coords.lat}, ${coords.lng}`,
            drag: true,
          })}
        </div>
      `,
    };
    render();
  }

  function saveEditOneLocation(cid, lid) {
    if (!(can("location.add") || canEditField("address") || state.role === "owner")) return;
    const loc = locBy(cid, lid);
    if (!loc) return;
    const street = (val("el-street") || "").trim();
    const city = (val("el-city") || "").trim();
    const zip = (val("el-zip") || "").trim();
    let x = Number(val("el-x")) || pct(loc.x);
    let y = Number(val("el-y")) || pct(loc.y);
    let lat = Number(val("el-lat"));
    let lng = Number(val("el-lng"));
    if (Number.isFinite(lat) && Number.isFinite(lng)) {
      const xy = xyFromLatLng(lat, lng);
      x = xy.x;
      y = xy.y;
    } else {
      const coords = latLngFromXy(x, y);
      lat = Number(coords.lat);
      lng = Number(coords.lng);
    }
    loc.name = val("el-name") || loc.name;
    loc.subdivision = val("el-subdiv") || "";
    loc.street = street;
    loc.city = city;
    loc.zip = zip;
    loc.state = "FL";
    loc.address = [street, city, zip ? `FL ${zip}` : "FL"].filter(Boolean).join(", ") || loc.address;
    loc.x = `${x}%`;
    loc.y = `${y}%`;
    loc.lat = lat;
    loc.lng = lng;
    loc.gps = `${Number(lat).toFixed(4)}, ${Number(lng).toFixed(4)}`;
    loc.manualPin = true;
    state.modal = null;
    state.selectedCustomer = cid;
    state.selectedLocation = lid;
    state.page = "location";
    persist();
    toast(`${loc.name} updated · ${loc.gps}`);
  }

  function openAddLocation(id) {
    if (!can("location.add")) return;
    const c = custBy(id);
    const base = c.locations[0];
    const pos = pinFromAddress(base?.address || "", { x: `${Math.min(70, pct(base?.x) + 3)}%`, y: `${Math.min(78, pct(base?.y) + 2)}%`, place: "Near existing property" });
    const coords = latLngFromXy(pct(pos.x), pct(pos.y));
    state.modal = {
      previewMap: true,
      html: `
        <h3>Add a property</h3>
        <p>Same Bill-To (${esc(c.billTo || c.name)}). Own map — type address or lat/long, or drag / click the pin.</p>
        <div class="modal-map-row">
          <div>
            <div class="field"><label>Property name</label><input id="al-name" placeholder="Canal house, rental, dock lot"></div>
            <div class="field"><label>Street</label><input id="al-street" data-preview-pin="mini-preview" data-preview-x="al-x" data-preview-y="al-y" placeholder="Street address"></div>
            <div class="field"><label>City</label><input id="al-city" data-preview-pin="mini-preview" data-preview-x="al-x" data-preview-y="al-y" placeholder="Boca Raton"></div>
            <div class="field"><label>Zip</label><input id="al-zip" placeholder="33432"></div>
            <div class="field"><label>Latitude</label><input id="al-lat" value="${coords.lat}" data-coord="1" data-preview-pin="mini-preview" data-pair-lat="al-lat" data-pair-lng="al-lng" inputmode="decimal" placeholder="26.3587"></div>
            <div class="field"><label>Longitude</label><input id="al-lng" value="${coords.lng}" data-coord="1" data-preview-pin="mini-preview" data-pair-lat="al-lat" data-pair-lng="al-lng" inputmode="decimal" placeholder="-80.0831"></div>
            <input type="hidden" id="al-x" value="${pct(pos.x)}">
            <input type="hidden" id="al-y" value="${pct(pos.y)}">
            <div class="actions">
              <button class="btn btn-ghost" data-act="close-modal">Cancel</button>
              <button class="btn btn-primary" data-act="save-location" data-id="${c.id}">Add property</button>
            </div>
          </div>
          ${miniMapHtml({
            mapId: "mini-map-add",
            title: "Map · new property",
            existing: c.locations.map((l) => ({ x: l.x, y: l.y, label: l.name, color: locPinColor(c, l) })),
            preview: [{
              x: pos.x, y: pos.y, label: "New location", elId: "mini-preview",
              xId: "al-x", yId: "al-y",
              fillCity: "al-city", fillStreet: "al-street", fillZip: "al-zip",
              fillLat: "al-lat", fillLng: "al-lng",
              capId: "mini-cap-add",
            }],
            caption: `${coords.lat}, ${coords.lng} · type address, edit lat/long, or drag the pin`,
            drag: true,
          })}
        </div>
      `,
    };
    render();
  }

  function saveAddLocation(id) {
    if (!can("location.add")) return;
    const c = custBy(id);
    const street = (val("al-street") || "").trim();
    const city = (val("al-city") || "").trim();
    const zip = (val("al-zip") || "").trim();
    const address = [street, city, zip ? `FL ${zip}` : "FL"].filter(Boolean).join(", ") || "Florida";
    let x = Number(val("al-x")) || Math.min(70, pct(c.locations[0]?.x) + 2);
    let y = Number(val("al-y")) || Math.min(78, pct(c.locations[0]?.y) + 1);
    let lat = Number(val("al-lat"));
    let lng = Number(val("al-lng"));
    if (Number.isFinite(lat) && Number.isFinite(lng)) {
      const xy = xyFromLatLng(lat, lng);
      x = xy.x;
      y = xy.y;
    } else {
      const coords = latLngFromXy(x, y);
      lat = Number(coords.lat);
      lng = Number(coords.lng);
    }
    const loc = {
      id: nid("L"),
      name: val("al-name") || "Second property",
      address,
      street, city, state: "FL", zip,
      x: `${x}%`,
      y: `${y}%`,
      lat, lng,
      gps: `${Number(lat).toFixed(4)}, ${Number(lng).toFixed(4)}`,
      covered: true,
      requestService: true,
      requestedAt: Date.now(),
      createdAt: Date.now(),
      manualPin: true,
      lifecycle: "inquiry",
    };
    c.locations.unshift(loc);
    state.data.comms.push({ id: nid("CM"), customerId: id, who: role().name, channel: "Phone", date: TODAY, text: `Added property ${loc.name} — ${loc.address} · ${loc.gps}. Quote next; invoice after they choose a plan.` });
    state.modal = null;
    state.selectedLocation = loc.id;
    persist();
    toast(`${loc.name} added · ${loc.gps}. Next: send a quote for this property.`);
    render();
  }

  function requestLocService(id, locId) {
    if (!can("location.request")) return;
    const c = custBy(id);
    const loc = c?.locations.find((l) => l.id === locId);
    if (!loc) return;
    if (loc.covered === false) {
      toast("That location is not on the paid program.");
      return;
    }
    loc.requestService = true;
    loc.requestedAt = Date.now();
    if (state.role === "admin") handOffToOps(c);
    state.data.comms.push({ id: nid("CM"), customerId: id, who: role().name, channel: "Phone", date: TODAY, text: `Client asked to catch iguanas at ${loc.name}.` });
    toast(`Service requested at ${loc.name}. It is on the assign map.`);
    render();
  }

  function openReassign(id) {
    const c = custBy(id);
    state.modal = {
      html: `
        <h3>Reassign ${esc(c.name)}</h3>
        <p>This moves the existing stop. It does not put a copy on a second technician.</p>
        <div class="bestfit">
          ${TECHS.map((t) => `<button class="bestfit-card" data-act="confirm-reassign" data-id="${c.id}" data-tech="${t.id}" data-day="Fri">${esc(t.name)} · Friday</button>`).join("")}
        </div>
      `,
    };
    render();
  }

  function confirmReassign(id, techId, day) {
    if (!can("schedule.reassign")) return;
    const c = custBy(id);
    const existing = state.data.stops.filter((s) => s.customerId === id && s.status === "scheduled");
    const before = existing.length;
    existing.forEach((s) => {
      s.techId = techId;
      if (day) s.day = day;
    });
    (state.data.services || []).filter((s) => s.customerId === id && s.techId).forEach((s) => {
      const old = s.techId;
      s.techId = techId;
      if (c) c.techId = techId;
      const loc = locBy(id, s.locationId);
      if (loc) loc.techId = techId;
    });
    c.techId = techId;
    state.modal = null;
    toast(`Moved ${before} stop(s) to ${techName(techId)}. The original trapper no longer has them — nothing was copied.`);
    state.page = "schedule";
    render();
  }

  function generateSchedule() {
    if (!can("schedule.generate")) return;
    const queue = opsGenerateQueue();
    if (!queue.length) {
      toast("Nothing waiting to generate.");
      return;
    }
    queue.forEach((svc) => {
      const c = custBy(svc.customerId);
      const loc = locBy(svc.customerId, svc.locationId);
      patternDays(svc.days).forEach((d) => {
        state.data.stops.push({
          id: nid("S"), customerId: svc.customerId, locationId: svc.locationId,
          techId: svc.techId, day: d, time: nextSlot(svc.techId, d),
          durationMin: svc.durationMin || c?.durationMin || 20, type: "service",
          status: "scheduled", actualMin: null, removals: null,
        });
      });
      svc.generated = true;
      svc.status = "live";
      if (loc) {
        loc.techId = svc.techId;
        loc.days = svc.days;
      }
    });
    toast(`Generated ${queue.length} service(s) onto live routes. Technicians will see them on the current schedule.`);
    state.page = "schedule";
    render();
  }

  function captureOneoffDraft() {
    if (state.page !== "create-oneoff") return state.oneoffDraft || null;
    if (!document.getElementById("oo-type") && !document.getElementById("oo-addr")) return state.oneoffDraft || null;
    const type = TASK_TYPES.find((t) => t.id === val("oo-type")) || TASK_TYPES[0];
    state.oneoffDraft = {
      caller: val("oo-caller"),
      phone: val("oo-phone"),
      type: val("oo-type") || type.id,
      label: val("oo-label"),
      addr: val("oo-addr"),
      day: val("oo-day") || todayDay(),
      duration: Number(val("oo-dur") || type.duration || 25),
      urgent: val("oo-urgent") || "now",
      notify: val("oo-notify"),
      techId: val("oo-tech") || state.oneoffDraft?.techId || null,
      time: val("oo-time"),
      x: val("oo-x") ? val("oo-x") + "%" : state.oneoffDraft?.x,
      y: val("oo-y") ? val("oo-y") + "%" : state.oneoffDraft?.y,
    };
    return state.oneoffDraft;
  }
  function refreshOneoffFit() {
    captureOneoffDraft();
    const d = state.oneoffDraft || {};
    if (d.addr) {
      const pos = pinFromAddress(d.addr, { x: d.x || "31%", y: d.y || "48%" });
      if (!d.x || document.getElementById("oo-addr")?.dataset.fromMap !== "1") {
        d.x = pos.x;
        d.y = pos.y;
      }
    }
    const type = TASK_TYPES.find((t) => t.id === d.type) || TASK_TYPES[0];
    if (document.getElementById("oo-dur") && !document.getElementById("oo-dur").dataset.touched) {
      setInput("oo-dur", type.duration || 25);
      d.duration = type.duration || 25;
    }
    state.oneoffDraft = d;
    render();
  }
  function pickOneoffTech(techId) {
    captureOneoffDraft();
    if (!state.oneoffDraft) state.oneoffDraft = {};
    state.oneoffDraft.techId = techId;
    const day = state.oneoffDraft.day || todayDay();
    const dur = state.oneoffDraft.duration || 25;
    const x = state.oneoffDraft.x || "31%";
    const y = state.oneoffDraft.y || "48%";
    const ranked = oneoffRankTechs(x, y, day, dur);
    const hit = ranked.find((r) => r.t.id === techId);
    if (hit) state.oneoffDraft.time = hit.slot.time;
    state.toast = `${techBy(techId)?.name || "Trapper"} selected`;
    render();
    setTimeout(() => { if (state.toast && state.toast.endsWith("selected")) { state.toast = null; render(); } }, 1800);
  }
  function insertOneoff(id) {
    if (!can("oneoff.insert")) return;
    const s = id ? state.data.stops.find((x) => x.id === id) : state.data.stops.find((x) => x.pending);
    if (!s) {
      toast("No pending one-off.");
      return;
    }
    state.oneoffDraft = {
      label: s.label,
      addr: s.address,
      type: s.taskType || "garage",
      day: todayDay(),
      duration: s.durationMin || 25,
      techId: null,
      x: s.x,
      y: s.y,
      caller: s.caller || "",
      phone: s.phone || "",
      pendingId: s.id,
    };
    state.page = "create-oneoff";
    state.modal = null;
    render();
  }
  function openNewOneoff() {
    if (!can("oneoff.insert")) return;
    state.oneoffDraft = {
      type: "toilet",
      day: todayDay(),
      duration: 25,
      urgent: "now",
      x: "31%",
      y: "48%",
    };
    state.page = "create-oneoff";
    state.modal = null;
    render();
  }
  function saveNewOneoff() {
    if (!can("oneoff.insert")) return;
    captureOneoffDraft();
    const d = state.oneoffDraft || {};
    const label = d.label || val("oo-label");
    const addr = d.addr || val("oo-addr");
    if (!label || !addr) {
      toast("Job note and address are required.");
      return;
    }
    const type = d.type || val("oo-type") || "toilet";
    const day = d.day || val("oo-day") || todayDay();
    const durationMin = Number(d.duration || val("oo-dur") || 25);
    const x = (d.x && String(d.x).includes("%") ? d.x : (val("oo-x") ? val("oo-x") + "%" : "31%"));
    const y = (d.y && String(d.y).includes("%") ? d.y : (val("oo-y") ? val("oo-y") + "%" : "48%"));
    const ranked = oneoffRankTechs(x, y, day, durationMin);
    const techId = d.techId || val("oo-tech") || ranked[0]?.t.id;
    if (!techId) {
      toast("Pick a trapper.");
      return;
    }
    const focus = ranked.find((r) => r.t.id === techId) || ranked[0];
    const time = d.time || val("oo-time") || focus?.slot.time || nextSlot(techId, day);
    const notify = d.notify || val("oo-notify");
    const pendingId = d.pendingId;
    let stop = pendingId ? state.data.stops.find((s) => s.id === pendingId) : null;
    if (stop) {
      Object.assign(stop, {
        pending: false, type: "oneoff", status: "scheduled",
        techId, day, time, durationMin, label, address: addr,
        taskType: type, x, y, caller: d.caller || "", phone: d.phone || "",
        notify: notify ? `Pinged ${notify}` : "",
        urgent: d.urgent || "now",
      });
    } else {
      state.data.stops.push({
        id: nid("S"), customerId: null, locationId: null, techId,
        day, time, durationMin, type: "oneoff", status: "scheduled",
        actualMin: null, removals: null, label, address: addr,
        pending: false, taskType: type, x, y,
        caller: d.caller || "", phone: d.phone || "",
        notify: notify ? `Pinged ${notify}` : "",
        urgent: d.urgent || "now",
      });
    }
    const tech = techBy(techId);
    state.oneoffDraft = null;
    state.modal = null;
    state.page = "oneoffs";
    state.oneoffDay = day;
    toast(`${label} → ${tech?.name || "trapper"} · ${day} ${time}${focus?.conflict ? " (tight day — Rick accepted)" : ""}. On the live schedule now.`);
    render();
  }

  function macroBlock() {
    if (!state.data.blackout.includes("2026-08-28")) state.data.blackout.push("2026-08-28");
    state.data.stops.forEach((s) => {
      if (s.day === "Fri" && s.status === "scheduled") s.status = "blocked_off";
    });
    toast("Friday blocked company-wide. Existing stops aren’t marked missed and contracts aren’t extended.");
    render();
  }

  function noshowCompany() {
    const list = state.data.stops.filter((s) => s.techId === "johnny" && s.day === "Thu" && s.status === "scheduled");
    list.forEach((s) => {
      s.status = "noshow";
      s.fault = "company";
      s.reason = "Technician illness";
      s.extended = false;
      s.pendingExt = true;
    });
    toast(`${list.length} stop(s) logged. Approve or deny a contract extension — a make-up visit is not added automatically.`);
    render();
  }

  function noshowCustomer() {
    const s = state.data.stops.find((x) => x.id === "S-3");
    if (!s) return;
    s.status = "missed";
    s.fault = "customer";
    s.reason = "Gated — no answer";
    s.extended = false;
    toast("Customer-fault miss logged. Contract is not extended.");
    render();
  }

  function addDays(iso, days) {
    const d = new Date(iso);
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10);
  }

  function postPayCustomer(id) {
    const inv = state.data.invoices.find((i) => i.customerId === id && (i.status === "sent" || i.status === "failed"))
      || state.data.invoices.find((i) => i.customerId === id && i.status !== "paid");
    if (inv) {
      openRecordPay(inv.id);
      return;
    }
    openNewPay(id);
  }

  function matchPay(id) {
    if (!can("payment.post")) return;
    const p = state.data.payments.find((x) => x.id === id);
    const due = unpaidInvoices().slice().sort((a, b) => {
      const an = payerLooksLike(p.memo, custBy(a.customerId)?.name) ? 0 : 1;
      const bn = payerLooksLike(p.memo, custBy(b.customerId)?.name) ? 0 : 1;
      return an - bn;
    });
    state.modal = {
      html: `
        <h3>Match bank line</h3>
        <p>This deposit has no invoice number. Pick the client by name.</p>
        <div class="preview">${money(p.amount)} · ${esc(p.method)}<div class="tiny">${esc(p.memo)}</div></div>
        <div class="field"><label>Open invoice</label>
          <select id="mail-inv">${due.map((i) => `<option value="${i.id}">${esc(invOptionLabel(i))}</option>`).join("")}</select>
        </div>
        <div class="actions">
          <button class="btn btn-ghost" data-act="close-modal">Cancel</button>
          ${btn("payment.post", "This is that client — mark paid", "apply-mail-pay", `data-id="${p.id}"`)}
        </div>
      `,
    };
    render();
  }

  function applyMatchPay(id) {
    if (!can("payment.post")) return;
    const p = state.data.payments.find((x) => x.id === id);
    const inv = state.data.invoices.find((i) => i.id === val("mail-inv"));
    if (!p || !inv) {
      toast("Pick which client this bank line belongs to.");
      return;
    }
    p.customerId = inv.customerId;
    p.invoiceId = inv.id;
    p.locationId = inv.locationId || null;
    p.posted = true;
    p.memo = `Matched ${p.method} to ${inv.id} — ${custBy(inv.customerId)?.name || ""} · ${invProperty(inv)}`;
    inv.status = "paid";
    inv.paidOn = TODAY;
    markLocPaidFromInvoice(inv);
    state.modal = null;
    toast(`${inv.id} marked paid. Rick creates the service next.`);
    render();
  }

  function openMail(id) {
    if (!can("payment.post")) return;
    const m = state.data.mail.find((x) => x.id === id);
    if (!m) return;
    m.opened = true;
    const due = unpaidInvoices().slice().sort((a, b) => {
      const an = payerLooksLike(m.from, custBy(a.customerId)?.name) ? 0 : 1;
      const bn = payerLooksLike(m.from, custBy(b.customerId)?.name) ? 0 : 1;
      return an - bn;
    });
    state.modal = {
      html: `
        <h3>Match deposit · ${esc(m.from)}</h3>
        <p>This hit the bank. There is no invoice number on it. Compare the name to open invoices and pick the client.</p>
        <div class="preview">
          <strong>${esc(m.from)}</strong>
          <div>${esc(m.kind)}${m.checkNo ? " #" + esc(m.checkNo) : ""} · ${money(m.amount)}</div>
          <div class="tiny">${esc(m.note)}</div>
        </div>
        <div class="field"><label>Which invoice? (name on file)</label>
          <select id="mail-inv">${due.length ? due.map((i) => {
            const c = custBy(i.customerId);
            const hit = payerLooksLike(m.from, c?.name);
            return `<option value="${i.id}">${hit ? "Looks similar · " : ""}${esc(invOptionLabel(i))}</option>`;
          }).join("") : `<option value="">No open invoices</option>`}</select>
        </div>
        <div class="actions" style="margin-top:14px">
          <button class="btn btn-ghost" data-act="close-modal">Leave unmatched</button>
          ${btn("payment.post", "This is that client — post payment", "apply-mail", `data-id="${m.id}"`)}
        </div>
      `,
    };
    render();
  }

  function applyMail(id) {
    if (!can("payment.post")) return;
    const m = state.data.mail.find((x) => x.id === id);
    if (!m || m.posted) return;
    const invId = val("mail-inv") || m.invoiceId;
    const inv = state.data.invoices.find((i) => i.id === invId);
    if (!inv) {
      toast("Pick which client this deposit belongs to.");
      return;
    }
    const method = m.kind === "check" ? "Check" : m.kind === "cash" ? "Cash" : m.kind === "bank" ? "Bank transfer" : m.kind === "ach" ? "ACH" : "Card";
    if (!applyInvoicePayment(inv, method, `${method}${m.checkNo ? " #" + m.checkNo : ""} from ${m.from} — opened in mail/counter`, m.checkNo)) {
      toast("That invoice is already paid.");
      return;
    }
    m.posted = true;
    m.opened = true;
    m.invoiceId = inv.id;
    m.customerId = inv.customerId;
    state.modal = null;
    toast(`${inv.id} marked paid for ${custBy(inv.customerId)?.name || "client"}. Rick creates the service next, then assigns.`);
    render();
  }

  function openRecordPay(invId) {
    if (!can("payment.post")) return;
    const inv = state.data.invoices.find((i) => i.id === invId);
    if (!inv) return;
    const c = custBy(inv.customerId);
    const focus = state.payFocusId ? (state.data.payments || []).find((p) => p.id === state.payFocusId) : null;
    const methodDefault = focus?.method || "Check";
    const bal = invoiceBalance(inv);
    state.modal = {
      html: `
        <h3>Allocate payment · ${esc(inv.id)}</h3>
        <p>Post / confirm payment on this invoice. When the balance hits zero the contract goes active and Rick can create service.</p>
        <div class="preview"><strong>${esc(inv.id)}</strong> · Bill-To ${esc(c?.billTo || c?.name || "")} · ${esc(invProperty(inv))} · Amount ${money(inv.amount)} · Paid ${money(allocated(inv.id))} · Balance ${money(bal)} · ${esc(invoiceFinStatus(inv))}</div>
        <div class="field"><label>Method</label>
          <select id="rp-method">${pay().optionsHtml(methodDefault)}</select>
        </div>
        <div class="field"><label>Amount to allocate</label><input id="rp-amt" type="number" step="0.01" value="${esc(focus?.amount || bal)}"></div>
        <div class="field"><label>Reference / check # / last 4</label><input id="rp-check" value="${esc(focus?.last4 || focus?.checkNo || "")}" placeholder="optional"></div>
        <div class="field"><label>Memo</label><textarea id="rp-memo" rows="2">${esc(focus?.memo || "Payment allocated — activate service when paid in full")}</textarea></div>
        <div class="actions">
          <button class="btn btn-ghost" data-act="close-modal">Cancel</button>
          ${btn("payment.post", "Save allocation", "confirm-record-pay", `data-id="${inv.id}"`)}
        </div>
      `,
    };
    render();
  }

  function confirmRecordPay(invId) {
    const inv = state.data.invoices.find((i) => i.id === invId);
    const amt = Number(val("rp-amt"));
    if (!applyInvoicePayment(inv, val("rp-method") || "Check", val("rp-memo"), val("rp-check"), Number.isFinite(amt) ? amt : undefined)) {
      toast("Could not allocate payment.");
      return;
    }
    state.modal = null;
    toast(`${inv.id} · ${invoiceFinStatus(inv)} · balance ${money(invoiceBalance(inv))}`);
    render();
  }

  function openNewPay(preCust) {
    if (!can("payment.post")) return;
    const due = unpaidInvoices();
    if (!due.length) {
      toast("No open invoices. Create/send a bill first, then post payment.");
      return;
    }
    const selected = preCust ? (due.find((i) => i.customerId === preCust)?.id || due[0].id) : due[0].id;
    const selInv = due.find((i) => i.id === selected) || due[0];
    state.modal = {
      html: `
        <h3>Record payment (direct post)</h3>
        <p>One step: payment lands on the register <strong>and</strong> allocates to the invoice. Full pay activates the contract for Ops.</p>
        <div class="field"><label>Invoice</label>
          <select id="np-inv">${due.map((i) => `<option value="${i.id}" ${i.id === selected ? "selected" : ""}>${esc(invOptionLabel(i))} · bal ${money(invoiceBalance(i))}</option>`).join("")}</select>
        </div>
        <div class="field"><label>Source</label>
          <select id="np-source"><option value="EXTERNAL">External / manual</option><option value="ONLINE">Online payment link</option><option value="AUTOPAY">AutoPay</option></select>
        </div>
        <div class="field"><label>Method</label>
          <select id="np-method">${pay().optionsHtml("Check")}<option>Virtual Credit Card</option></select>
        </div>
        <div class="field"><label>Amount</label><input id="np-amt" type="number" step="0.01" value="${esc(invoiceBalance(selInv))}"></div>
        <div class="field"><label>Reference / check # / last 4</label><input id="np-check" placeholder="optional"></div>
        <div class="field"><label>Memo</label><textarea id="np-memo" rows="2">Direct payment posted to invoice</textarea></div>
        <div class="actions">
          <button class="btn btn-ghost" data-act="close-modal">Cancel</button>
          <button class="btn btn-primary" data-act="save-new-pay">Save payment</button>
        </div>
      `,
    };
    render();
  }

  function saveNewPay() {
    if (!can("payment.post")) return;
    const inv = state.data.invoices.find((i) => i.id === val("np-inv"));
    if (!inv || invoiceFinStatus(inv) === "PAID") {
      toast("Pick an open invoice.");
      return;
    }
    const method = val("np-method") || "Check";
    const checkNo = val("np-check") || "";
    const amt = Number(val("np-amt"));
    const src = val("np-source") || "EXTERNAL";
    const p = {
      id: nid("P"), invoiceId: inv.id, customerId: inv.customerId, locationId: inv.locationId || null,
      amount: Number.isFinite(amt) && amt > 0 ? amt : invoiceBalance(inv),
      method, date: TODAY, checkNo, last4: String(checkNo || "").slice(-4),
      source: src, linkPay: src === "ONLINE" || src === "AUTOPAY", invoiceMarked: false, posted: true, status: "POSTED",
      memo: val("np-memo") || `Posted · ${method} · ${inv.id}`,
    };
    state.data.payments.push(p);
    allocatePaymentToInvoice(p, inv, p.amount);
    state.modal = null;
    toast(`${inv.id} · ${invoiceFinStatus(inv)} · balance ${money(invoiceBalance(inv))}`);
    render();
  }

  function enterComm() {
    if (!can("commission.enter")) return;
    if (state.data.commissions.some((b) => b.customerId === "C-1091" && b.period === "2026-08")) {
      toast("Split already entered for Sarah Chen this period.");
      return;
    }
    const c = custBy("C-1091");
    const bonus = +(c.amount * state.data.settings.commissionPct / 100).toFixed(2);
    state.data.commissions.push({
      id: nid("B"), paymentId: "pending", customerId: "C-1091", amount: bonus,
      splits: [{ techId: "pedro", pct: 100, dollars: bonus }], period: "2026-08",
    });
    toast(`Bonus ${money2(bonus)} on Sarah Chen’s renewal — 100% Pedro. First-term payments never generate this.`);
    render();
  }

  function openMemo(id) {
    if (!can("payment.post")) return;
    const p = state.data.payments.find((x) => x.id === id);
    state.modal = {
      html: `
        <h3>Edit payment memo</h3>
        <p>You can edit memos after save. Use them to note which location a payment was for (bonus tracking).</p>
        <div class="field"><label>Memo</label><textarea id="memo-text" rows="3">${esc(p.memo)}</textarea></div>
        <div class="actions">
          <button class="btn btn-ghost" data-act="close-modal">Cancel</button>
          <button class="btn btn-primary" data-act="save-memo" data-id="${id}">Save memo</button>
        </div>
      `,
    };
    render();
  }

  function saveMemo(id) {
    const p = state.data.payments.find((x) => x.id === id);
    p.memo = val("memo-text");
    state.modal = null;
    toast("Memo saved.");
    render();
  }

  function uploadDoc(customerId) {
    if (!can("docs.upload") && state.role !== "owner") return;
    const custs = state.data.customers.filter((c) => c.status !== "inquiry" || isMunicipal(c));
    const pick = custBy(customerId) || custBy(state.selectedCustomer) || custs[0];
    const kinds = [
      ["coi", "COI — insurance certificate"],
      ["contract", "Contract / agreement"],
      ["photo", "Photo"],
      ["police", "Police / incident report"],
      ["other", "Other file"],
    ];
    state.modal = {
      wide: true,
      html: `
        <h3>Attach document</h3>
        <p class="tiny">Pick a file from your computer, then link it to a customer account.</p>
        <div class="field req"><label>File</label>
          <label class="doc-file-pick" for="doc-file">
            <input type="file" id="doc-file" accept=".pdf,.png,.jpg,.jpeg,.gif,.webp,.doc,.docx,.xls,.xlsx,image/*,application/pdf">
            <span class="doc-file-btn">Choose file…</span>
            <span class="doc-file-name" id="doc-file-label">No file chosen</span>
          </label>
          <div class="doc-file-preview" id="doc-file-preview" hidden></div>
        </div>
        <div class="field req"><label>Customer (Bill-To)</label>
          <select id="doc-cust">${custs.map((c) => `<option value="${c.id}" ${c.id === pick?.id ? "selected" : ""}>${esc(c.billTo || c.name)}</option>`).join("")}</select>
        </div>
        <div class="field req"><label>Type</label>
          <select id="doc-kind">${kinds.map(([id, lab]) => `<option value="${id}">${esc(lab)}</option>`).join("")}</select>
        </div>
        <div class="field"><label>Display name <span class="tiny">(defaults to the file name)</span></label>
          <input id="doc-name" placeholder="Uses the chosen file name">
        </div>
        <div class="field"><label>Note</label>
          <input id="doc-note" placeholder="Optional — why this is on the account">
        </div>
        <div class="actions" style="margin-top:12px">
          <button class="btn btn-ghost" data-act="close-modal">Cancel</button>
          <button class="btn btn-primary" data-act="save-upload-doc">Attach file to account</button>
        </div>
      `,
    };
    render();
    setTimeout(() => bindDocFilePicker(), 0);
  }

  function bindDocFilePicker() {
    const fileEl = document.getElementById("doc-file");
    const label = document.getElementById("doc-file-label");
    const nameEl = document.getElementById("doc-name");
    const preview = document.getElementById("doc-file-preview");
    const kindEl = document.getElementById("doc-kind");
    if (!fileEl) return;
    fileEl.onchange = () => {
      const file = fileEl.files && fileEl.files[0];
      if (!file) {
        if (label) label.textContent = "No file chosen";
        if (preview) { preview.hidden = true; preview.innerHTML = ""; }
        return;
      }
      if (label) label.textContent = `${file.name} · ${fmtDocSize(file.size)}`;
      if (nameEl && !nameEl.value.trim()) nameEl.value = file.name;
      else if (nameEl && nameEl.dataset.fromFile !== "0") nameEl.value = file.name;
      nameEl.dataset.fromFile = "1";
      const lower = file.name.toLowerCase();
      if (kindEl) {
        if (/\.(jpg|jpeg|png|gif|webp)$/.test(lower)) kindEl.value = "photo";
        else if (/coi|insurance|cert/.test(lower)) kindEl.value = "coi";
        else if (/police|incident|accident/.test(lower)) kindEl.value = "police";
        else if (/contract|agreement|signed/.test(lower)) kindEl.value = "contract";
      }
      if (preview && file.type.startsWith("image/") && file.size <= 2_500_000) {
        const reader = new FileReader();
        reader.onload = () => {
          preview.hidden = false;
          preview.innerHTML = `<img src="${reader.result}" alt="Preview">`;
        };
        reader.readAsDataURL(file);
      } else if (preview) {
        preview.hidden = false;
        preview.innerHTML = `<div class="tiny">Ready to attach · ${esc(file.type || "file")} · ${fmtDocSize(file.size)}</div>`;
      }
    };
    if (nameEl) {
      nameEl.oninput = () => { nameEl.dataset.fromFile = "0"; };
    }
  }

  function saveUploadDoc() {
    if (!can("docs.upload") && state.role !== "owner") return;
    const cid = val("doc-cust");
    const c = custBy(cid);
    if (!c) {
      toast("Pick a customer.");
      return;
    }
    const fileEl = document.getElementById("doc-file");
    const file = fileEl && fileEl.files && fileEl.files[0];
    if (!file) {
      toast("Choose a file first — use Choose file…");
      return;
    }
    if (file.size > 4_500_000) {
      toast("File is too large for this demo (max ~4.5 MB). Pick a smaller file.");
      return;
    }
    const kind = val("doc-kind") || "other";
    const name = (val("doc-name") || file.name || "Attached file").trim();
    const note = val("doc-note") || "Attached from Documents workspace.";
    const loc = (c.locations || [])[0];
    const reader = new FileReader();
    reader.onerror = () => toast("Could not read that file.");
    reader.onload = () => {
      const dataUrl = reader.result;
      // Keep preview data for images / small files; skip huge payloads in localStorage
      const keepData = file.type.startsWith("image/") ? file.size <= 900_000 : file.size <= 350_000;
      state.data.documents.unshift({
        id: nid("D"),
        customerId: c.id,
        locationId: loc?.id || null,
        kind,
        name,
        fileName: file.name,
        mime: file.type || "",
        size: file.size,
        dataUrl: keepData ? dataUrl : null,
        by: role().name,
        date: TODAY,
        note,
      });
      state.modal = null;
      toast(`Attached “${name}” on ${c.billTo || c.name}.`);
      render();
    };
    reader.readAsDataURL(file);
  }

  function viewDoc(id) {
    const d = (state.data.documents || []).find((x) => x.id === id);
    if (!d) return;
    const c = custBy(d.customerId);
    const isImg = !!(d.mime || "").startsWith("image/") || /\.(jpg|jpeg|png|gif|webp)$/i.test(d.name || "");
    if (d.dataUrl && isImg) {
      state.modal = {
        wide: true,
        html: `
          <h3>${esc(d.name)}</h3>
          <p class="tiny">${custBtn(d.customerId, c?.billTo || c?.name || "—")} · ${esc(d.by)} · ${esc(d.date)}${d.size ? ` · ${fmtDocSize(d.size)}` : ""}</p>
          ${d.note ? `<p class="tiny">${esc(d.note)}</p>` : ""}
          <div class="doc-view-frame"><img src="${d.dataUrl}" alt="${esc(d.name)}"></div>
          <div class="actions" style="margin-top:12px">
            <a class="btn btn-ghost" href="${d.dataUrl}" download="${esc(d.fileName || d.name)}">Download</a>
            <button class="btn btn-primary" data-act="close-modal">Close</button>
          </div>
        `,
      };
      render();
      return;
    }
    if (d.dataUrl) {
      state.modal = {
        wide: true,
        html: `
          <h3>${esc(d.name)}</h3>
          <p class="tiny">${custBtn(d.customerId, c?.billTo || c?.name || "—")} · ${esc(d.mime || "file")}${d.size ? ` · ${fmtDocSize(d.size)}` : ""}</p>
          ${d.note ? `<p class="tiny">${esc(d.note)}</p>` : ""}
          <div class="notice">File is on this account. Open / download it below.</div>
          <div class="actions" style="margin-top:12px">
            <a class="btn btn-sun" href="${d.dataUrl}" download="${esc(d.fileName || d.name)}" target="_blank" rel="noopener">Open / download file</a>
            <button class="btn btn-ghost" data-act="close-modal">Close</button>
          </div>
        `,
      };
      render();
      return;
    }
    state.modal = {
      html: `
        <h3>${esc(d.name)}</h3>
        <p class="tiny">${docKindBadge(d.kind)} · ${custBtn(d.customerId, c?.billTo || c?.name || "—")} · ${esc(d.by)} · ${esc(d.date)}</p>
        ${d.note ? `<p>${esc(d.note)}</p>` : ""}
        <div class="notice">This is a sample placeholder — no real file behind it. Attach a new one with <strong>Choose file…</strong> if you want to open or download it.</div>
        <div class="actions" style="margin-top:12px"><button class="btn btn-primary" data-act="close-modal">Close</button></div>
      `,
    };
    render();
  }

  function toggleUser(id) {
    const u = state.data.users.find((x) => x.id === id);
    u.active = !u.active;
    toast(u.name + (u.active ? " reactivated." : " deactivated."));
    render();
  }

  function addReason() {
    if (!can("lists.edit") && state.role !== "owner") return;
    const label = val("new-reason") || "Flooded yard";
    const fault = val("new-reason-fault") || "customer";
    const id = label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 24) || "custom";
    if (allReasons().some((r) => r.id === id || r.label.toLowerCase() === label.toLowerCase())) {
      toast("That reason is already on the list.");
      return;
    }
    if (!state.data.settings.extraReasons) state.data.settings.extraReasons = [];
    state.data.settings.extraReasons.push({ id, label, fault });
    toast("Reason saved.");
    render();
  }

  function addProgram() {
    if (!can("lists.edit") && state.role !== "owner") return;
    const name = (val("new-prog-name") || "").trim();
    const list = Number(val("new-prog-price"));
    const months = Number(val("new-prog-months")) || 1;
    if (!name) {
      toast("Enter a program name.");
      return;
    }
    const id = "custom-" + name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 20);
    if (allPrograms().some((p) => p.id === id || p.name.toLowerCase() === name.toLowerCase())) {
      toast("That program is already on the list.");
      return;
    }
    if (!state.data.settings.extraPrograms) state.data.settings.extraPrograms = [];
    state.data.settings.extraPrograms.push({
      id, name, months, list: Number.isFinite(list) ? list : 0, prepaid: null, freeMonths: 0, freq: "Bi-weekly", _custom: true,
    });
    toast(`Program “${name}” added.`);
    render();
  }

  function addServiceType() {
    if (!can("lists.edit") && state.role !== "owner") return;
    const code = (val("new-svc-code") || "").trim();
    const label = (val("new-svc-label") || "").trim();
    const duration = Number(val("new-svc-dur")) || 20;
    if (!code || !label) {
      toast("Enter a code and label.");
      return;
    }
    const id = "custom-" + code.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 24);
    if (allServiceTypes().some((t) => t.id === id || t.code.toLowerCase() === code.toLowerCase())) {
      toast("That service type is already on the list.");
      return;
    }
    if (!state.data.settings.extraServiceTypes) state.data.settings.extraServiceTypes = [];
    state.data.settings.extraServiceTypes.push({
      id, code, label, desc: label, type: "res", duration, months: 1, price: 0, freq: "WEEKLY", _custom: true,
    });
    toast(`Service type “${code}” added.`);
    render();
  }

  function openAddTemplate() {
    if (!can("template.edit") && state.role !== "owner") return;
    state.modal = {
      html: `
        <h3>Add template</h3>
        <p class="tiny">Name it, write the body. Use {customer_name}, {account_id}, {invoice_or_quote} if you want.</p>
        <div class="field req"><label>Name</label><input id="tpl-new-label" placeholder="e.g. COI cover letter"></div>
        <div class="field"><label>Body</label><textarea id="tpl-new-body" rows="6" placeholder="Hello {customer_name},…"></textarea></div>
        <div class="actions">
          <button class="btn btn-ghost" data-act="close-modal">Cancel</button>
          <button class="btn btn-primary" data-act="confirm-add-template">Add template</button>
        </div>
      `,
    };
    render();
  }

  function confirmAddTemplate() {
    if (!can("template.edit") && state.role !== "owner") return;
    const label = (val("tpl-new-label") || "").trim();
    const body = val("tpl-new-body") || "";
    if (!label) {
      toast("Enter a template name.");
      return;
    }
    const key = "custom-" + label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 28);
    if (!state.data.settings.customTemplates) state.data.settings.customTemplates = [];
    if (allTemplates().some((t) => t.key === key)) {
      toast("That template name is already used.");
      return;
    }
    state.data.settings.customTemplates.push({ key, label });
    if (!state.data.templates) state.data.templates = {};
    state.data.templates[key] = body || `Hello {customer_name},\n\n${label}\n\n— Iguana Control`;
    state.modal = null;
    toast(`Template “${label}” added.`);
    render();
  }

  function removeTemplate(key) {
    if (!can("template.edit") && state.role !== "owner") return;
    if (!key || !String(key).startsWith("custom-")) return;
    state.data.settings.customTemplates = (state.data.settings.customTemplates || []).filter((t) => t.key !== key);
    if (state.data.templates) delete state.data.templates[key];
    toast("Template removed.");
    render();
  }

  function saveTemplates() {
    if (!can("template.edit") && state.role !== "owner") return;
    if (!state.data.templates) state.data.templates = {};
    allTemplates().forEach(({ key }) => {
      const el = document.getElementById("tpl-" + key);
      if (el) state.data.templates[key] = el.value;
    });
    persist();
    toast("Templates saved on this browser.");
    render();
  }

  function saveIntegrations() {
    if (!can("settings.edit") && state.role !== "owner") return;
    if (!state.data.integrations) state.data.integrations = {};
    state.data.integrations.mapsKey = val("int-maps") || "";
    state.data.integrations.processor = val("int-processor") || "";
    state.data.integrations.sendgrid = val("int-sendgrid") || "";
    state.data.integrations.notes = val("int-notes") || "";
    persist();
    toast("Integrations saved on this browser.");
    render();
  }

  function resetDemo() {
    if (window.IguanaStore) IguanaStore.reset();
    state.data = seed();
    normalizeDemoData();
    state.modal = null;
    state.selectedCustomer = null;
    state.page = "dashboard";
    toast("Demo data reset. Fields you typed were cleared.");
    render();
  }

  function saveSettings() {
    if (!can("settings.edit") && state.role !== "owner") return;
    state.data.settings.commissionPct = Number(val("set-comm") || state.data.settings.commissionPct || 2);
    state.data.settings.renewalWindow = Number(val("set-win") || state.data.settings.renewalWindow || 60);
    if (document.getElementById("set-reminder")) state.data.settings.reminder = val("set-reminder") || "email";
    persist();
    toast("Company settings saved.");
    render();
  }

  function previewTpl(name, key) {
    const body = (key && state.data.templates?.[key]) || "";
    const sample = body
      ? esc(body).replace(/\{customer_name\}/g, "Diane Walsh").replace(/\{account_id\}/g, "C-1042").replace(/\{invoice_or_quote\}/g, "INV-4419").replace(/\n/g, "<br>")
      : "";
    const visit = String(name).includes("Visit");
    state.modal = {
      html: sample
        ? `<h3>${esc(name)}</h3><div class="preview">${sample}</div><button class="btn btn-primary" data-act="close-modal">Looks right</button>`
        : visit
          ? `<h3>${esc(name)}</h3><div class="preview">Hi Diane Walsh,<br>A technician is scheduled Friday 07:30 at Riverside Park.<br><br>This is an automated message from Iguana Control. You cannot reply to this text or email.</div><button class="btn btn-primary" data-act="close-modal">Looks right</button>`
          : `<h3>${esc(name)}</h3><div class="preview"><strong>Subject: Sarah Chen · C-1091 · renewal</strong><br><br>Hello Sarah Chen,<br>Account C-1091 expires 24 Sep 2026.<br><br>Your iguana removal program is ready to renew.<br>— Iguana Control</div><button class="btn btn-primary" data-act="close-modal">Looks right</button>`,
    };
    render();
  }

  function startStop(id) {
    const s = state.data.stops.find((x) => x.id === id);
    s.status = "in_progress";
    s.startedAt = Date.now();
    toast("Clock started.");
    render();
  }

  function completeStop(id) {
    const s = state.data.stops.find((x) => x.id === id);
    s.status = "complete";
    s.actualMin = 22;
    s.removals = { count: Number(val("rem-count") || 0), weight: Number(val("rem-wt") || 0) };
    const text = val("mto-text");
    if (text) {
      state.data.mtos.unshift({
        id: nid("M"), from: "johnny", dept: val("mto-dept") || "ops",
        customerId: s.customerId, text, date: TODAY + " 11:05", read: false,
      });
    }
    state.mobileStop = null;
    toast("Stop complete. Duration stored for the report. Monthly customer report will only list dates with actual removals.");
    render();
  }

  function addPhoto(id) {
    const s = state.data.stops.find((x) => x.id === id);
    s.photos = s.photos || [];
    s.photos.push("photo-" + (s.photos.length + 1) + ".jpg");
    s.draftCount = val("rem-count");
    s.draftWt = val("rem-wt");
    s.draftMto = val("mto-text");
    s.draftDept = val("mto-dept");
    toast("Photo added on this stop.");
    render();
  }

  function missStop(id) {
    const s = state.data.stops.find((x) => x.id === id);
    const reason = REASONS.find((r) => r.id === val("miss-reason")) || REASONS.find((r) => r.id === "gate");
    s.status = reason.fault === "company" ? "noshow" : "missed";
    s.fault = reason.fault;
    s.reason = reason.label;
    s.extended = false;
    s.pendingExt = true;
    state.mobileStop = null;
    toast("Miss logged for the office. Rick approves or denies a contract extension — a visit is not auto-added.");
    render();
  }

  function decideExtension(id, yes) {
    if (!can("noshow.mark")) return;
    const s = state.data.stops.find((x) => x.id === id);
    if (!s) return;
    s.pendingExt = false;
    s.extended = !!yes;
    const c = custBy(s.customerId);
    if (yes && c?.expires) c.expires = addDays(c.expires, 14);
    toast(yes ? `Extension approved for ${stopLabel(s)}. Contract +1 visit — not an extra generated stop.` : `Extension denied for ${stopLabel(s)}. Miss stays on the log only.`);
    render();
  }

  function trapStatus(id, status) {
    if (!can("trap.update")) return;
    const t = (state.data.traps || []).find((x) => x.id === id);
    if (!t) return;
    t.status = status;
    t.lastSeen = TODAY;
    toast(status === "retrieved" ? `${t.serial} retrieved — $${t.value} asset back.` : `${t.serial} marked ${status}.`);
    render();
  }

  function toggleMapSelect(cid, lid) {
    const key = `${cid}:${lid}`;
    if (state.mapSelect.includes(key)) state.mapSelect = state.mapSelect.filter((k) => k !== key);
    else state.mapSelect = state.mapSelect.concat(key);
    render();
  }

  function openBulkAssign(cid, lid) {
    if (!can("schedule.reassign") && state.role !== "owner") return;
    if (cid && lid) {
      state.mapSelect = [`${cid}:${lid}`];
      state.mapPin = { cid, lid };
    }
    if (!state.mapSelect.length && state.mapPin) {
      state.mapSelect = [`${state.mapPin.cid}:${state.mapPin.lid}`];
    }
    if (!state.mapSelect.length) {
      toast("Click a property or box-select first.");
      return;
    }
    const n = state.mapSelect.length;
    const firstKey = state.mapSelect[0];
    const [fcid, flid] = firstKey.split(":");
    const firstLoc = locBy(fcid, flid);
    const firstSvc = svcsFor(fcid, flid).find(svcIsContinuing);
    const currentTech = firstLoc?.techId || firstSvc?.techId || TECHS[0]?.id;
    const currentSched = SERVICE_SCHEDULES.find((s) => s.id === firstSvc?.schedule || s.days === (firstSvc?.days || firstLoc?.days)) || SERVICE_SCHEDULES[0];
    const selectDur = state.mapSelect.reduce((sum, key) => {
      const [c, l] = key.split(":");
      const loc = locBy(c, l);
      return sum + (svcsFor(c, l)[0]?.durationMin || loc?.durationMin || 20);
    }, 0);
    state.modal = {
      wide: true,
      html: `
        <h3>${n === 1 ? "Change trapper / schedule" : `Assign ${n} selected properties`}</h3>
        <p class="tiny">Duration ${fmtClock(selectDur)}. Same for one pin or a box selection.</p>
        <div class="setup-grid">
          <div class="field req"><label>Action</label>
            <select id="bulk-mode">
              <option value="move" selected>Reassign · move to this trapper</option>
              <option value="share">Share · add trapper (different days)</option>
            </select>
          </div>
          <div class="field req"><label>Trapper</label>
            <select id="bulk-tech">${TECHS.map((t) => `<option value="${t.id}" ${t.id === currentTech ? "selected" : ""}>${esc(t.name)} · ${esc(t.home)}</option>`).join("")}</select>
          </div>
          <div class="field req"><label>Schedule</label>
            <select id="bulk-sched">${SERVICE_SCHEDULES.map((s) => `<option value="${s.id}" ${s.id === currentSched.id ? "selected" : ""}>${esc(s.label)}</option>`).join("")}</select>
          </div>
        </div>
        <div class="notice">Reassign moves the stop. Share keeps the current trapper and adds another service — don’t copy the stop.</div>
        <div class="actions" style="margin-top:14px">
          <button class="btn btn-ghost" data-act="clear-map-select">Clear</button>
          <button class="btn btn-ghost" data-act="close-modal">Cancel</button>
          <button class="btn btn-primary" data-act="confirm-bulk-assign">Assign</button>
        </div>
      `,
    };
    render();
  }

  function pinMapAssign(cid, lid, mode) {
    if (!can("schedule.reassign") && state.role !== "owner") return;
    const techId = val("pin-tech");
    const schedId = val("pin-sched");
    if (!cid || !lid || !techId) {
      toast("Pick a trapper.");
      return;
    }
    applyMapAssign([`${cid}:${lid}`], { mode: mode || "move", techId, schedId });
  }

  function confirmBulkAssign() {
    if (!can("schedule.reassign") && state.role !== "owner") return;
    if (!state.mapSelect.length) return;
    const mode = val("bulk-mode") || "move";
    const techId = val("bulk-tech");
    const schedId = val("bulk-sched");
    if (!techId) {
      toast("Pick a trapper.");
      return;
    }
    applyMapAssign(state.mapSelect.slice(), { mode, techId, schedId });
  }

  function applyMapAssign(keys, { mode, techId, schedId }) {
    if (!keys?.length || !techId) return;
    const sched = SERVICE_SCHEDULES.find((s) => s.id === schedId) || SERVICE_SCHEDULES[0];
    if (mode === "share") {
      let n = 0;
      let skipped = 0;
      keys.forEach((key) => {
        const [cid, lid] = key.split(":");
        const c = custBy(cid);
        const loc = locBy(cid, lid);
        if (!c || !loc) return;
        const existing = svcsFor(cid, lid).filter(svcIsContinuing);
        if (!existing.length || locTechs(c, loc).includes(techId)) {
          skipped += 1;
          return;
        }
        if (existing.some((s) => s.days === sched.days)) {
          skipped += 1;
          return;
        }
        const primary = existing[0];
        if (!Array.isArray(state.data.services)) state.data.services = [];
        const svc = {
          id: nid("SVC"),
          customerId: cid,
          locationId: lid,
          type: primary.type || "12mon-res",
          status: "live",
          techId,
          days: sched.days,
          durationMin: primary.durationMin || loc.durationMin || 20,
          generated: true,
          schedule: sched.id,
          target: primary.target || "IGUANA",
          charge: primary.charge || "Production",
          start: primary.start || TODAY,
          expires: primary.expires || primary.renewal || null,
          renewal: primary.renewal || primary.expires || null,
          shared: true,
          active: true,
          opsNote: `Shared on map — separate service for ${techName(techId)}.`,
        };
        state.data.services.push(svc);
        loc.shared = true;
        loc.backupId = techId;
        if (c.paid || c.municipal || isMunicipal(c)) {
          patternDays(sched.days).forEach((d) => {
            state.data.stops.push({
              id: nid("S"), customerId: cid, locationId: lid,
              techId, day: d, time: nextSlot(techId, d),
              durationMin: svc.durationMin, type: "service",
              status: "scheduled", actualMin: null, removals: null,
            });
          });
        }
        n += 1;
      });
      state.mapSelect = [];
      state.mapLasso = false;
      state.mapPin = null;
      state.modal = null;
      toast(n
        ? `Shared ${n} ${n === 1 ? "property" : "properties"} with ${techName(techId)} · ${sched.days}.${skipped ? ` Skipped ${skipped}.` : ""}`
        : `Nothing shared — ${skipped} skipped (need a live service, free trapper, different days).`);
      render();
      return;
    }
    let n = 0;
    keys.forEach((key) => {
      const [cid, lid] = key.split(":");
      const c = custBy(cid);
      const loc = locBy(cid, lid);
      if (!c || !loc) return;
      if (loc.shared) {
        // Reassign primary (non-shared) service only; leave shared partners alone
        const primary = svcsFor(cid, lid).find((s) => svcIsContinuing(s) && !s.shared);
        if (!primary) return;
        const prev = primary.techId;
        primary.techId = techId;
        primary.days = sched.days;
        primary.schedule = sched.id;
        loc.techId = techId;
        loc.days = sched.days;
        state.data.stops = state.data.stops.filter((s) => !(s.customerId === cid && s.locationId === lid && s.status === "scheduled" && s.type !== "oneoff" && s.techId === prev));
        if ((c.paid || c.municipal || isMunicipal(c)) && primary.generated !== false) {
          patternDays(sched.days).forEach((d) => {
            state.data.stops.push({
              id: nid("S"), customerId: cid, locationId: lid,
              techId, day: d, time: nextSlot(techId, d),
              durationMin: primary.durationMin || 20, type: "service",
              status: "scheduled", actualMin: null, removals: null,
            });
          });
        }
        n += 1;
        return;
      }
      const prev = loc.techId;
      loc.techId = techId;
      loc.days = sched.days;
      const list = svcsFor(cid, lid);
      if (!list.length && locNeedsTech(c, loc)) {
        // Waiting assign — just set standing tech/days; map-assign path may still run later
        loc.techId = techId;
        loc.days = sched.days;
        n += 1;
        return;
      }
      list.forEach((svc) => {
        if (svc.shared) return;
        svc.techId = techId;
        svc.days = sched.days;
        svc.schedule = sched.id;
        state.data.stops = state.data.stops.filter((s) => !(s.customerId === cid && s.locationId === lid && s.status === "scheduled" && s.type !== "oneoff" && (!prev || s.techId === prev)));
        if ((c.paid || c.municipal || isMunicipal(c)) && svc.generated !== false) {
          patternDays(sched.days).forEach((d) => {
            state.data.stops.push({
              id: nid("S"), customerId: cid, locationId: lid,
              techId, day: d, time: nextSlot(techId, d),
              durationMin: svc.durationMin || 20, type: "service",
              status: "scheduled", actualMin: null, removals: null,
            });
          });
          svc.generated = true;
          svc.status = "live";
        }
      });
      n += 1;
    });
    state.mapSelect = [];
    state.mapLasso = false;
    state.mapPin = null;
    state.modal = null;
    toast(n ? `Assigned ${n} ${n === 1 ? "property" : "properties"} to ${techName(techId)} · ${sched.days}.` : "Nothing assigned.");
    render();
  }

  function bulkMove(techId) {
    if (!can("schedule.reassign") || !state.mapSelect.length) return;
    let n = 0;
    state.mapSelect.forEach((key) => {
      const [cid, lid] = key.split(":");
      const c = custBy(cid);
      const loc = locBy(cid, lid);
      if (!c || !loc || loc.shared) return;
      const prev = loc.techId;
      loc.techId = techId;
      svcsFor(cid, lid).forEach((svc) => {
        if (svc.shared) return;
        svc.techId = techId;
        if (svc.generated) {
          state.data.stops.filter((s) => s.customerId === cid && s.locationId === lid && s.status === "scheduled" && (!prev || s.techId === prev)).forEach((s) => {
            s.techId = techId;
          });
        }
      });
      n += 1;
    });
    state.mapSelect = [];
    state.mapLasso = false;
    toast(`Moved ${n} properties to ${techName(techId)}. Original trappers no longer have those stops.`);
    render();
  }

  function bulkDays(daysId) {
    if (!can("schedule.reassign") || !state.mapSelect.length) return;
    const newDays = patternDays(daysId);
    let n = 0;
    state.mapSelect.forEach((key) => {
      const [cid, lid] = key.split(":");
      const loc = locBy(cid, lid);
      if (!loc || loc.shared) return;
      loc.days = daysId;
      svcsFor(cid, lid).forEach((svc) => {
        if (svc.shared) return;
        svc.days = daysId;
        const tech = svc.techId || loc.techId;
        state.data.stops = state.data.stops.filter((s) => !(s.customerId === cid && s.locationId === lid && s.status === "scheduled" && s.type !== "oneoff"));
        if (tech && svc.generated !== false) {
          newDays.forEach((d) => {
            state.data.stops.push({
              id: nid("S"), customerId: cid, locationId: lid,
              techId: tech, day: d, time: nextSlot(tech, d),
              durationMin: svc.durationMin || 20, type: "service",
              status: "scheduled", actualMin: null, removals: null,
            });
          });
          svc.generated = true;
          svc.status = "live";
        }
      });
      n += 1;
    });
    state.mapSelect = [];
    state.mapLasso = false;
    toast(`Switched ${n} properties to ${daysId}. Old days dropped off the original trapper — nothing was copied.`);
    render();
  }

  function sendNotices() {
    state.data.stops.filter((s) => s.day === "Fri" && !s.pending).forEach((s) => { s.noticed = true; });
    toast("Friday visit notices queued — templated, two days ahead, no-reply.");
    render();
  }

  function approxGps(loc) {
    if (loc?.lat != null && loc?.lng != null) return `${Number(loc.lat).toFixed(4)}, ${Number(loc.lng).toFixed(4)}`;
    if (loc?.gps && !loc.manualPin) return loc.gps;
    const coords = latLngFromXy(pct(loc?.x), pct(loc?.y));
    return `${coords.lat}, ${coords.lng}`;
  }
  function latLngFromXy(xPct, yPct) {
    const lat = (26.9 - Number(yPct) * 0.025).toFixed(4);
    const lng = (-82.4 + Number(xPct) * 0.04).toFixed(4);
    return { lat, lng };
  }
  function xyFromLatLng(lat, lng) {
    const y = Math.max(4, Math.min(94, (26.9 - Number(lat)) / 0.025));
    const x = Math.max(4, Math.min(96, (Number(lng) + 82.4) / 0.04));
    return { x, y };
  }

  function copyGps(gps) {
    const text = gps || "";
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(() => toast("Copied " + text + " — paste into Google Maps.")).catch(() => toast(text));
    } else {
      toast("Copy: " + text);
    }
  }

  function val(id) {
    return document.getElementById(id)?.value.trim() || "";
  }

  render();
})();
