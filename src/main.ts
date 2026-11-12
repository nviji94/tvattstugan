import { boka, bokningarFor } from "./bokningar";

const DAGAR = ["måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag", "söndag"];
const PASS = ["1 (07–10)", "2 (10–13)", "3 (13–16)", "4 (16–19)"];

const lagenhet = document.getElementById("lagenhet") as HTMLInputElement;
const dag = document.getElementById("dag") as HTMLSelectElement;
const pass = document.getElementById("pass") as HTMLSelectElement;
const meddelande = document.getElementById("meddelande") as HTMLDivElement;
const schema = document.getElementById("schema") as HTMLTableElement;

dag.innerHTML = DAGAR.map((d) => `<option>${d}</option>`).join("");
pass.innerHTML = PASS.map((p, i) => `<option value="${i + 1}">${p}</option>`).join("");

document.getElementById("formular")!.addEventListener("submit", (e) => {
  e.preventDefault();
  // Fungerar både före och efter rättningen: i dag svarar boka() med bokningen,
  // efter rättningen med { ok: true/false }.
  const svar: any = boka(lagenhet.value, dag.value, Number(pass.value));
  if (svar && svar.ok === false) {
    visa(`Nekad: ${svar.fel}`, "fel");
  } else {
    visa(`Bokat: lägenhet ${lagenhet.value}, ${dag.value}, pass ${pass.value}`, "ok");
  }
  ritaSchema();
});

function visa(text: string, klass: string) {
  meddelande.textContent = text;
  meddelande.className = klass;
}

function ritaSchema() {
  let html = "<tr><th>Dag</th>" + PASS.map((p) => `<th>Pass ${p}</th>`).join("") + "</tr>";
  for (const d of DAGAR) {
    html += `<tr><th>${d}</th>`;
    for (let p = 1; p <= PASS.length; p++) {
      const lgh = bokningarFor(d).filter((b) => b.pass === p).map((b) => b.lagenhet);
      const klass = lgh.length > 1 ? ' class="dubbel"' : "";
      html += `<td${klass}>${lgh.join(", ")}</td>`;
    }
    html += "</tr>";
  }
  schema.innerHTML = html;
}

ritaSchema();
