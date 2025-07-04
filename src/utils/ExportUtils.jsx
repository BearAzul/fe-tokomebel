import { formatTanggalWaktu, formatToIDR } from "./index.jsx";

export const headers = [
  { label: "ID Pelanggan", key: "id" },
  { label: "Nama Lengkap", key: "fullName" },
  { label: "Email", key: "email" },
  { label: "No. Telp", key: "phone" },
  { label: "Jenis Kelamin", key: "gender" },
  { label: "Kabupaten/Kota", key: "city" },
  { label: "Alamat", key: "address" },
];

export const formatDataForExport = (customers) => {
  return customers.map((customer) => ({
    id: customer._id,
    fullName: `${customer.firstName} ${customer.lastName}`,
    email: customer.email,
    phone: customer.phone || '-',
    gender: customer.gender || '-',
    city: customer.city || '-',
    address: customer.address || '-',
  }));
};

export const orderHeaders = [
  { label: "ID Pesanan", key: "id" },
  { label: "Tanggal", key: "tanggal" },
  { label: "Nama Pelanggan", key: "pelanggan" },
  { label: "Email", key: "email" },
  { label: "Total Pembayaran", key: "total" },
  { label: "Status Pembayaran", key: "statusBayar" },
  { label: "Status Pengiriman", key: "statusKirim" },
  { label: "Jumlah Item", key: "jumlahItem" },
];

export const formatOrderDataForExport = (orders) => {
  return orders.map((order) => {
    let statusKirimText = "Belum Dibayar";
    if (order.status === 'success') {
      statusKirimText = order.shipping === 'delivered' ? 'Sudah Sampai' : 'Dalam Perjalanan';
    }

    return {
      id: order._id,
      tanggal: formatTanggalWaktu(order.createdAt),
      pelanggan: `${order.firstName} ${order.lastName}`,
      email: order.email,
      total: formatToIDR(order.total),
      statusBayar: order.status,
      statusKirim: statusKirimText,
      jumlahItem: order.itemsDetail.reduce((sum, item) => sum + item.quantity, 0),
    };
  });
};
