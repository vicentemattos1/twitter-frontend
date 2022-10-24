export function currentDateFormater(date?: string) {
  return new Date(date || "").toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
