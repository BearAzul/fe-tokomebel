import { useState, useEffect } from "react";

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

export const RealTimeClock = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString("en-GB", {
        hour12: false, // 24 jam format
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setTime(formattedTime);
    };

    updateTime(); // set waktu saat komponen mount
    const intervalId = setInterval(updateTime, 1000); // update tiap detik

    return () => clearInterval(intervalId); // bersihkan interval saat unmount
  }, []);

  return <h5 className="fm-2 p-0 ms-3">{time}</h5>;
};

