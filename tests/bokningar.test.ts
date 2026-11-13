import { it, expect } from "vitest";
import { boka, bokningarFor } from "../src/bokningar";

it("visar en bokning för rätt dag", () => {
  boka("1101", "måndag", 1);
  expect(bokningarFor("måndag")).toEqual([{ lagenhet: "1101", dag: "måndag", pass: 1 }]);
});

it("visar inte bokningar från andra dagar", () => {
  boka("1205", "tisdag", 2);
  expect(bokningarFor("tisdag").map((b) => b.lagenhet)).toEqual(["1205"]);
  expect(bokningarFor("onsdag")).toEqual([]);
});

it("nekar en andra bokning av samma dag och pass", () => {
  boka("1101", "torsdag", 3);
  const svar = boka("1302", "torsdag", 3);
  expect(svar).toEqual({ ok: false, fel: expect.any(String) });
  expect(bokningarFor("torsdag").map((b) => b.lagenhet)).toEqual(["1101"]);
});

it("godkänner samma dag men annat pass", () => {
  boka("1101", "fredag", 1);
  expect(boka("1302", "fredag", 2)).toMatchObject({ ok: true });
  expect(bokningarFor("fredag").map((b) => b.lagenhet)).toEqual(["1101", "1302"]);
});

it("godkänner samma pass men annan dag", () => {
  boka("1101", "lördag", 4);
  expect(boka("1302", "söndag", 4)).toMatchObject({ ok: true });
});

it("nekar samma lägenhet som bokar samma dag och pass två gånger", () => {
  boka("1101", "söndag", 1);
  expect(boka("1101", "söndag", 1)).toEqual({ ok: false, fel: expect.any(String) });
  expect(bokningarFor("söndag").filter((b) => b.pass === 1)).toHaveLength(1);
});
