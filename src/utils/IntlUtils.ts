export function toCurrencyFormat(amount: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

export function toDateFormat(date: Date) {
  return new Intl.DateTimeFormat("de-DE").format(date);
}
