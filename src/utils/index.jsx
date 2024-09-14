export const generateSelectAmount = (amount) => {
  return Array.from({ length: amount }, (_, index) => {
    const amount = index + 1
    return (
      <option value={amount} key={amount}>
        {amount}
      </option>
    )
  })
}

export const formatToIDR = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);
};
