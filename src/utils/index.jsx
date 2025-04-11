// export const generateSelectAmount = (amount) => {
//   return Array.from({ length: amount }, (_, index) => {
//     const amount = index + 1
//     return (
//       <option value={amount} key={amount}>
//         {amount}
//       </option>
//     )
//   })
// }

export const formatToIDR = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);
};

export const formatLineChart = (orders) => {
  const filtered = orders.filter((order) => order.status === "success");

  const labels = [];
  const data = [];

  filtered.forEach((order) => {
    const date = new Date(order.createdAt);
    const label = date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    labels.push(label);
    data.push(order.total);
  });

  return {
    labels,
    datasets: [
      {
        label: "Total Transaksi Harian",
        data,
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
        tension: 0.3,
      },
    ],
  };
};


