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
