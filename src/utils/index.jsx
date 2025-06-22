export const formatToIDR = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);
};

export const formatTanggalWaktu = (isoString) => {
  if (!isoString) return "-";

  const date = new Date(isoString);

  if (isNaN(date.getTime())) {
    return "Tanggal tidak valid";
  }

  return date.toLocaleString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

