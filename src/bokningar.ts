type Bokning = { lagenhet: string; dag: string; pass: number };
const bokningar: Bokning[] = [];

export function boka(lagenhet: string, dag: string, pass: number) {
  const bokning = { lagenhet, dag, pass };
  bokningar.push(bokning);
  return bokning;
}

export function bokningarFor(dag: string) {
  return bokningar.filter((b) => b.dag === dag);
}
