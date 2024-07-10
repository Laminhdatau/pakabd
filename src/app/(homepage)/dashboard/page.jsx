import USERUPIAH from '../../../utils/USERUPIAH';
import React from 'react';

const StockReport = () => {
  // Data stok berdasarkan laporan penjualan
  const stockItems = [
    { tanggal: '2024-07-01', brand: 'SM Grape', stokMasuk: 10, stokKeluar: 5, status: 'Credit', hargaSisaStok: 14200 * 5, sisaStok: 5 },
    { tanggal: '2024-07-02', brand: 'Blueberry', stokMasuk: 10, stokKeluar: 6, status: 'Cash', hargaSisaStok: 13000 * 4, sisaStok: 4 },
    { tanggal: '2024-07-03', brand: 'SM Menthol', stokMasuk: 10, stokKeluar: 4, status: 'Cash', hargaSisaStok: 15000 * 6, sisaStok: 6 },
    { tanggal: '2024-07-04', brand: 'Liox Menthol', stokMasuk: 10, stokKeluar: 7, status: 'Cash', hargaSisaStok: 14000 * 3, sisaStok: 3 },
    { tanggal: '2024-07-05', brand: 'Xbold', stokMasuk: 10, stokKeluar: 8, status: 'Credit', hargaSisaStok: 16000 * 2, sisaStok: 2 },
    { tanggal: '2024-07-06', brand: 'You Bold', stokMasuk: 10, stokKeluar: 5, status: 'Cash', hargaSisaStok: 12000 * 5, sisaStok: 5 },
  ];

  // Menghitung total stok masuk, stok keluar, dan harga sisa stok
  const totalStokMasuk = stockItems.reduce((acc, item) => acc + item.stokMasuk, 0);
  const totalStokKeluar = stockItems.reduce((acc, item) => acc + item.stokKeluar, 0);
  const totalSisaStok = stockItems.reduce((acc, item) => acc + item.sisaStok, 0);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Laporan Stok Barang</h1>

      {/* Kartu Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Stok Masuk</h2>
            <p className="text-lg font-bold text-yellow-600">{totalStokMasuk.toLocaleString()}</p>
          </div>
          <div className="bg-yellow-100 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l-5-5-5 5h10z" />
            </svg>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Stok Keluar</h2>
            <p className="text-lg font-bold text-red-600">{totalStokKeluar.toLocaleString()}</p>
          </div>
          <div className="bg-red-100 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 14l5-5 5 5H7z" />
            </svg>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Sisa Stok</h2>
            <p className="text-lg font-bold text-blue-600">{totalSisaStok.toLocaleString()}</p>
          </div>
          <div className="bg-blue-100 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12l5 5L20 7" />
            </svg>
          </div>
        </div>

      </div>

      {/* Tabel Stok Barang */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-left text-gray-600">Tanggal</th>
              <th className="py-2 px-4 text-left text-gray-600">Brand</th>
              <th className="py-2 px-4 text-left text-gray-600">Stok Masuk</th>
              <th className="py-2 px-4 text-left text-gray-600">Stok Keluar</th>
              <th className="py-2 px-4 text-left text-gray-600">Sisa Stok</th>
            </tr>
          </thead>
          <tbody>
            {stockItems.map((item, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-2 px-4 text-gray-700">{item.tanggal}</td>
                <td className="py-2 px-4 text-gray-700">{item.brand}</td>
                <td className="py-2 px-4 text-gray-700">{item.stokMasuk}</td>
                <td className="py-2 px-4 text-gray-700">{item.stokKeluar}</td>
                <td className="py-2 px-4 text-gray-700">{item.sisaStok}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockReport;
