import USERUPIAH from '../../../utils/USERUPIAH';
import React from 'react';

const SalesReport = () => {
  // Data penjualan dengan informasi tanggal, brand, total dibeli, cash, credit, harga satuan, hasil penjualan, dan status
  const salesItems = [
    { no: 1, brand: 'SM Grape', tanggal: '2024-07-01', bungkusDikeluarkan: 5, hargaSatuan: 14200, cash: 10000, credit: 61000, hasilPenjualan: 10000, status: 'Belum Lunas' },
    { no: 2, brand: 'Blueberry', tanggal: '2024-07-02', bungkusDikeluarkan: 6, hargaSatuan: 13000, cash: 78000, credit: 0, hasilPenjualan: 78000, status: 'Lunas' },
    { no: 3, brand: 'SM Menthol', tanggal: '2024-07-03', bungkusDikeluarkan: 4, hargaSatuan: 15000, cash: 60000, credit: 0, hasilPenjualan: 60000, status: 'Lunas' },
    { no: 4, brand: 'Liox Menthol', tanggal: '2024-07-04', bungkusDikeluarkan: 7, hargaSatuan: 14000, cash: 98000, credit: 0, hasilPenjualan: 98000, status: 'Lunas' },
    { no: 5, brand: 'Xbold', tanggal: '2024-07-05', bungkusDikeluarkan: 8, hargaSatuan: 16000, cash: 0, credit: 128000, hasilPenjualan: 0, status: 'Belum Lunas' },
    { no: 6, brand: 'You Bold', tanggal: '2024-07-06', bungkusDikeluarkan: 5, hargaSatuan: 12000, cash: 60000, credit: 0, hasilPenjualan: 60000, status: 'Lunas' },
  ];

  // Menghitung total cash, total credit, total hasil penjualan, dan total tagihan
  const totalCash = salesItems.reduce((acc, item) => acc + item.cash, 0);
  const totalCredit = salesItems.reduce((acc, item) => acc + item.credit, 0);
  const totalHasilPenjualan = salesItems.reduce((acc, item) => acc + item.hasilPenjualan, 0);
  const totalTagihanBelumLunas = salesItems.reduce((acc, item) => acc + (item.credit), 0);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Laporan Penjualan Barang</h1>

      {/* Kartu Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Jumlah Cash</h2>
            <p className="text-lg font-bold text-green-600">{USERUPIAH(totalCash)}</p>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 10l5 5 5-5H7z" />
            </svg>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Jumlah Credit</h2>
            <p className="text-lg font-bold text-yellow-600">{USERUPIAH(totalCredit)}</p>
          </div>
          <div className="bg-yellow-100 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 10l5 5 5-5H7z" />
            </svg>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Jumlah Tagihan Belum Lunas</h2>
            <p className="text-lg font-bold text-red-600">{USERUPIAH(totalTagihanBelumLunas)}</p>
          </div>
          <div className="bg-red-100 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Hasil Penjualan</h2>
            <p className="text-lg font-bold text-blue-600">{USERUPIAH(totalHasilPenjualan)}</p>
          </div>
          <div className="bg-blue-100 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12l5 5L20 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Tabel Penjualan Barang */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-left text-gray-600">Tanggal</th>
              <th className="py-2 px-4 text-left text-gray-600">Brand</th>
              <th className="py-2 px-4 text-left text-gray-600">Total Dibeli</th>
              <th className="py-2 px-4 text-left text-gray-600">Dibayar/Cash</th>
              <th className="py-2 px-4 text-left text-gray-600">Tagihan/Credit</th>
              <th className="py-2 px-4 text-left text-gray-600">Harga Satuan</th>
              <th className="py-2 px-4 text-left text-gray-600">Hasil Penjualan</th>
              <th className="py-2 px-4 text-left text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {salesItems.map((item, index) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="py-2 px-4 text-gray-700">{item.tanggal}</td>
                <td className="py-2 px-4 text-gray-700">{item.brand}</td>
                <td className="py-2 px-4 text-gray-700">{item.bungkusDikeluarkan} Bungkus</td>
                <td className="py-2 px-4 text-gray-700">{USERUPIAH(item.cash)}</td>
                <td className="py-2 px-4 text-gray-700">{USERUPIAH(item.credit)}</td>
                <td className="py-2 px-4 text-gray-700">{USERUPIAH(item.hargaSatuan)}</td>
                <td className="py-2 px-4 text-gray-700">{USERUPIAH(item.hasilPenjualan)}</td>
                <td className={`py-2 px-4 text-gray-700 ${item.status === 'Lunas' ? 'text-green-600' : 'text-red-600'}`}>
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesReport;
