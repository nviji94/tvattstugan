type Bokning = { lagenhet: string; dag: string; pass: number };
const bokningar: Bokning[] = [];

export function boka(lagenhet: string, dag: string, pass: number) {
  if (bokningar.some((b) => b.dag === dag && b.pass === pass)) {
    return { ok: false, fel: "Passet är redan bokat" };
  }
  const bokning = { lagenhet, dag, pass };
  bokningar.push(bokning);
  return { ok: true, bokning: { ...bokning } };
}

export function bokningarFor(dag: string) {
  return bokningar.filter((b) => b.dag === dag);
}
