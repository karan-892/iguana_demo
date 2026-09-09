(() => {
  "use strict";

  function esc(s) {
    return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function field(label, input, hint) {
    return `<div class="intake-field">
      <label>${esc(label)}</label>
      ${input}
      ${hint ? `<span class="tiny">${esc(hint)}</span>` : ""}
    </div>`;
  }

  function locationBlock(index, prefill = {}, removable) {
    const i = index;
    const p = prefill || {};
    const x = p.x != null && p.x !== "" ? p.x : 28 + (i % 5) * 4;
    const y = p.y != null && p.y !== "" ? p.y : 40 + (i % 4) * 5;
    const lat = p.lat != null && p.lat !== "" ? p.lat : (26.9 - Number(y) * 0.025).toFixed(4);
    const lng = p.lng != null && p.lng !== "" ? p.lng : (-82.4 + Number(x) * 0.04).toFixed(4);
    return `
      <div class="loc-block" data-loc-index="${i}">
        <div class="loc-block-head">
          <strong>Service location ${i + 1}</strong>
          ${removable ? `<button type="button" class="btn btn-ghost" data-act="remove-loc-row" data-index="${i}">Remove</button>` : ""}
        </div>
        <p class="tiny">Each property has its own map. Type the address or lat/long, or drag the pin — they stay matched.</p>
        <div class="loc-map-row">
          <div class="loc-map-fields">
            <div class="intake-grid">
              ${field("Property name", `<input id="nc-loc-name-${i}" value="${esc(p.name || "")}" placeholder="Residence, Building B, Canal lot">`)}
              ${field("Location type", `<select id="nc-loc-type-${i}">
                <option value="residential" ${(p.locationType || "residential") === "residential" ? "selected" : ""}>Residential</option>
                <option value="commercial" ${p.locationType === "commercial" ? "selected" : ""}>Commercial</option>
                <option value="hoa" ${p.locationType === "hoa" ? "selected" : ""}>HOA / community</option>
                <option value="municipal" ${p.locationType === "municipal" ? "selected" : ""}>Municipal</option>
              </select>`, "What this property is — Christy can change it later.")}
              ${field("Subdivision", `<input id="nc-loc-subdiv-${i}" value="${esc(p.subdivision || "")}" placeholder="Palm Cove, Lakeside, etc.">`)}
              ${field("Street", `<input id="nc-loc-street-${i}" value="${esc(p.street || "")}" data-preview-pin="intake-pin-${i}" data-preview-x="nc-loc-x-${i}" data-preview-y="nc-loc-y-${i}" data-loc-index="${i}" placeholder="418 NE 4th St">`)}
              ${field("City", `<input id="nc-loc-city-${i}" value="${esc(p.city || "")}" data-preview-pin="intake-pin-${i}" data-preview-x="nc-loc-x-${i}" data-preview-y="nc-loc-y-${i}" data-loc-index="${i}" placeholder="Boca Raton">`)}
              ${field("State", `<select id="nc-loc-state-${i}"><option ${(!p.state || p.state === "FL") ? "selected" : ""}>FL</option></select>`)}
              ${field("Zip", `<input id="nc-loc-zip-${i}" value="${esc(p.zip || "")}" placeholder="33432">`)}
              ${field("Latitude", `<input id="nc-loc-lat-${i}" value="${esc(lat)}" data-coord="1" data-preview-pin="intake-pin-${i}" data-pair-lat="nc-loc-lat-${i}" data-pair-lng="nc-loc-lng-${i}" inputmode="decimal" placeholder="26.3587">`)}
              ${field("Longitude", `<input id="nc-loc-lng-${i}" value="${esc(lng)}" data-coord="1" data-preview-pin="intake-pin-${i}" data-pair-lat="nc-loc-lat-${i}" data-pair-lng="nc-loc-lng-${i}" inputmode="decimal" placeholder="-80.0831">`)}
            </div>
            <input type="hidden" id="nc-loc-x-${i}" value="${esc(x)}">
            <input type="hidden" id="nc-loc-y-${i}" value="${esc(y)}">
          </div>
          <div class="mini-map-box intake-map">
            <h3>Map · location ${i + 1}</h3>
            <div class="mini-map" id="mini-map-${i}" data-intake-map="${i}">
              <div class="map-bg"></div>
              <div class="map-label" style="left:6%;top:16%">Gulf</div>
              <div class="map-label" style="left:58%;top:16%">East</div>
              <div class="pin mini client" id="intake-pin-${i}" data-drag-mini="1" data-x="nc-loc-x-${i}" data-y="nc-loc-y-${i}" data-fill-city="nc-loc-city-${i}" data-fill-street="nc-loc-street-${i}" data-fill-lat="nc-loc-lat-${i}" data-fill-lng="nc-loc-lng-${i}" data-cap="mini-cap-${i}" style="left:${esc(x)}%;top:${esc(y)}%"><div class="pin-dot"></div><span>Pin</span></div>
            </div>
            <p class="tiny" id="mini-cap-${i}">${esc(lat)}, ${esc(lng)} · type address, edit lat/long, or drag the pin</p>
          </div>
        </div>
      </div>
    `;
  }

  function formHtml(prefill = {}, billTos = [], locCount = 0) {
    const p = prefill || {};
    const channel = p.channel || "Call";
    const billType = p.billToType || p.type || "residential";
    const locType = p.locationType || p.type || billType;
    const billOptions = (billTos || []).map((b) =>
      `<option value="${esc(b.id)}">${esc(b.label || b.name)}${b.type === "hoa" ? " · HOA" : ""}</option>`
    ).join("");
    const n = Math.max(0, Number(locCount) || 0);
    const firstLoc = {
      name: p.locationName || "",
      locationType: locType,
      street: p.street || "",
      city: p.city || "",
      state: p.state || "FL",
      zip: p.zip || "",
      x: p.x,
      y: p.y,
    };
    const locs = Array.from({ length: n }, (_, i) => locationBlock(i, i === 0 ? firstLoc : {}, true));

    return `
      <div class="intake">
        <div class="intake-bar">
          <div>
            <div class="tiny">After the call or message</div>
            <h2>Add customer</h2>
            <p class="muted">Save the Bill-To now. A property is optional — add it when they give the address.</p>
          </div>
          <div class="actions">
            <button class="btn btn-ghost" data-act="cancel-add" type="button">Cancel</button>
            <button class="btn btn-primary" data-act="create-customer" type="button">Save customer</button>
          </div>
        </div>

        <section class="intake-card">
          <h3>How they reached us</h3>
          <div class="chip-row">
            ${["Call", "Text", "Email", "Voicemail"].map((ch) => `
              <label class="chip-opt"><input type="radio" name="nc-channel" value="${ch}" ${channel === ch ? "checked" : ""}> ${ch}</label>
            `).join("")}
          </div>
        </section>

        <section class="intake-card">
          <h3>Bill-To</h3>
          <p class="tiny">The person or company that pays. Two houses still mean one Bill-To — quotes and invoices stay per property.</p>
          <div class="chip-row" style="margin-bottom:12px">
            <label class="chip-opt"><input type="radio" name="nc-billto" value="new" data-act="billto-mode" checked> New Bill-To</label>
            <label class="chip-opt"><input type="radio" name="nc-billto" value="existing" data-act="billto-mode"> Existing Bill-To</label>
          </div>
          <div id="nc-existing-wrap" class="intake-field" hidden>
            <label>Choose existing Bill-To</label>
            <select id="nc-existing" data-act="pick-billto" disabled>
              <option value="">Select an account…</option>
              ${billOptions || `<option value="" disabled>No accounts yet</option>`}
            </select>
            <span class="tiny">Contact fields fill from that account. You can still edit them. Add the new service location below.</span>
          </div>
          <div id="nc-bill-notice" class="notice" hidden style="margin-top:10px">Existing Bill-To selected — contact details filled. Add the new location(s) under this account.</div>
        </section>

        <section class="intake-card" id="nc-contact-card">
          <h3>Contact on the Bill-To</h3>
          <div class="intake-grid">
            ${field("Bill-To type", `<select id="nc-billtype" data-act="intake-type">
              <option value="residential" ${billType === "residential" ? "selected" : ""}>Residential</option>
              <option value="commercial" ${billType === "commercial" ? "selected" : ""}>Commercial</option>
              <option value="hoa" ${billType === "hoa" ? "selected" : ""}>HOA</option>
              <option value="municipal" ${billType === "municipal" ? "selected" : ""}>Municipal</option>
            </select>`, "Who pays. Each property has its own location type below.")}
            <div class="intake-field" id="nc-company-wrap" ${billType === "hoa" ? "" : "hidden"}>
              <label>Company / HOA name</label>
              <input id="nc-company" value="${esc(billType === "hoa" ? (p.company || "") : "")}" placeholder="Palm Cove HOA, Lakeside Community…">
              <span class="tiny">Only when the Bill-To is an HOA / community</span>
            </div>
            ${field("First name", `<input id="nc-first" value="${esc(p.firstName || "")}">`)}
            ${field("Last name", `<input id="nc-last" value="${esc(p.lastName || "")}" placeholder="Homeowner last name">`)}
            ${field("Phone", `<input id="nc-phone" value="${esc(p.phone || "")}" placeholder="(954) 555-0100">`)}
            ${field("Mobile", `<input id="nc-mobile" value="${esc(p.mobile || "")}">`)}
            ${field("Email", `<div class="email-row"><input id="nc-email" value="${esc(p.email || "")}" placeholder="name@email.com"><label class="chk"><input type="checkbox" id="nc-email-none" data-act="email-none"> None</label></div>`)}
            ${field("Alt. phone", `<input id="nc-alt" value="${esc(p.altPhone || "")}">`)}
          </div>
        </section>
         <section class="intake-card">
          <div class="loc-section-head">
            <div>
              <h3>Property / location</h3>
              <p class="tiny">Optional. Save the customer without an address if they have not given it yet. Add it here now, or later from the account.</p>
            </div>
            <button type="button" class="btn btn-ghost" data-act="add-loc-row">${n ? "+ Another location" : "+ Add property"}</button>
          </div>
          ${n
            ? `<div id="nc-locs">${locs.join("")}</div>`
            : `<p class="muted" id="nc-locs">No property yet. Click + Add property if they already gave an address.</p>`}
        </section>

        <section class="intake-card">
          <h3>Instructions</h3>
          <p class="tiny">Where to go, how the client behaves, gate codes, dogs, park on the street — what the tech needs on site. You can fill this later with the property.</p>
          <textarea id="nc-instructions" rows="5" placeholder="Gate on the left. Dogs in the yard — go around the side. Meet at the clubhouse…">${esc(p.note || p.instructions || "")}</textarea>
          <div class="intake-field" style="margin-top:12px">
            <label>Internal office note</label>
            <input id="nc-internal" value="${esc(p.internalComment || "")}" placeholder="Office only — not on the customer report">
          </div>
        </section>

        <section class="intake-card">
          <h3>Batch output</h3>
          <p class="tiny">How this customer gets invoices and visit notices. Print and email are on by default; SMS is off unless they opt in.</p>
          <div class="chip-row">
            <label class="chk"><input type="checkbox" id="nc-print" checked> Print</label>
            <label class="chk"><input type="checkbox" id="nc-mail" checked> Email</label>
            <label class="chk"><input type="checkbox" id="nc-sms"> SMS</label>
          </div>
        </section>

       

        <div class="intake-foot">
          <button class="btn btn-ghost" data-act="cancel-add" type="button">Cancel</button>
          <button class="btn btn-primary" data-act="create-customer" type="button">Save customer</button>
        </div>
      </div>
    `;
  }

  function collectLocations() {
    const blocks = [...document.querySelectorAll(".loc-block")];
    return blocks.map((block) => {
      const i = block.dataset.locIndex;
      const street = (document.getElementById(`nc-loc-street-${i}`)?.value || "").trim();
      const city = (document.getElementById(`nc-loc-city-${i}`)?.value || "").trim();
      const st = document.getElementById(`nc-loc-state-${i}`)?.value || "FL";
      const zip = (document.getElementById(`nc-loc-zip-${i}`)?.value || "").trim();
      const name = (document.getElementById(`nc-loc-name-${i}`)?.value || "").trim();
      const locationType = document.getElementById(`nc-loc-type-${i}`)?.value || "residential";
      const subdivision = (document.getElementById(`nc-loc-subdiv-${i}`)?.value || "").trim();
      const x = document.getElementById(`nc-loc-x-${i}`)?.value;
      const y = document.getElementById(`nc-loc-y-${i}`)?.value;
      const lat = (document.getElementById(`nc-loc-lat-${i}`)?.value || "").trim();
      const lng = (document.getElementById(`nc-loc-lng-${i}`)?.value || "").trim();
      return {
        name, locationType, subdivision, street, city, state: st, zip,
        x: x !== "" && x != null ? Number(x) : null,
        y: y !== "" && y != null ? Number(y) : null,
        lat: lat !== "" ? Number(lat) : null,
        lng: lng !== "" ? Number(lng) : null,
        address: [street, city, `${st} ${zip}`].filter(Boolean).join(", "),
      };
    }).filter((l) => l.street && l.city);
  }

  window.IguanaIntake = { formHtml, locationBlock, collectLocations, esc };
})();
