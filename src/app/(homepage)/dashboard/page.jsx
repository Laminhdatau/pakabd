"use client";
import React, { useEffect, useState } from "react";

const StockReport = () => {
  const [stockItems, setStockItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // try {
      const response = await fetch(
        `https://api.sheety.co/2b00a1ba1f50b72fd55ffadece582479/dataStokBarang/stobar`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRETS}`,
          },
        }
      );

      const data = await response.json();
      console.log({ data });
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();

      // Filter data untuk bulan dan tahun saat ini
      const filteredData = data.stobar.filter((row) => {
        console.log({ row });
        const rowDate = new Date(row.tanggal);
        return (
          rowDate.getMonth() === currentMonth &&
          rowDate.getFullYear() === currentYear
        );
      });

      // Group data by brand
      const groupedData = filteredData.reduce((acc, row) => {
        if (!acc[row.brand]) {
          acc[row.brand] = {
            tanggal: row.tanggal, // Ambil tanggal dari salah satu entri, bisa disesuaikan
            brand: row.brand,
            stokMasuk: 0,
            stokKeluar: 0,
            sisaStok: 0,
          };
        }
        acc[row.brand].stokMasuk += parseFloat(row.stokMasuk) || 0;
        acc[row.brand].stokKeluar += parseFloat(row.stokKeluar) || 0;

        // Update sisa stok
        acc[row.brand].sisaStok =
          acc[row.brand].stokMasuk - acc[row.brand].stokKeluar;

        return acc;
      }, {});
      console.log({ groupedData });
      // Convert the grouped data object to an array
      const formattedData = Object.values(groupedData);

      setStockItems(formattedData);
      // } catch (error) {
      //   console.error("Error reading spreadsheet:", error.message);
      // }
    };

    fetchData();
  }, []);

  // Menghitung total stok masuk, stok keluar, dan sisa stok
  const totalStokMasuk = stockItems.reduce(
    (acc, item) => acc + item.stokMasuk,
    0
  );

  const totalStokKeluar = stockItems.reduce(
    (acc, item) => acc + item.stokKeluar,
    0
  );

  const totalSisaStok = stockItems.reduce(
    (acc, item) => acc + item.sisaStok,
    0
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Laporan Stok Barang
      </h1>

      {/* Kartu Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Stok Masuk</h2>
            <p className="text-lg font-bold text-yellow-600">
              {totalStokMasuk.toFixed(1).replace(",", ".")}
            </p>
          </div>
          <div className="bg-yellow-100 p-3 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-yellow-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 14l-5-5-5 5h10z"
              />
            </svg>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Stok Keluar</h2>
            <p className="text-lg font-bold text-red-600">
              {totalStokKeluar.toFixed(1).replace(",", ".")}
            </p>
          </div>
          <div className="bg-red-100 p-3 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 14l5-5 5 5H7z"
              />
            </svg>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Sisa Stok</h2>
            <p className="text-lg font-bold text-blue-600">
              {totalSisaStok.toFixed(1).replace(",", ".")}
            </p>
          </div>
          <div className="bg-blue-100 p-3 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 12l5 5L20 7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Tabel Stok Barang */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 border-collapse">
          <thead>
            <tr className="border-b border-gray-300 bg-gray-200">
              <th className="py-2 px-4 text-gray-700">Tanggal</th>
              <th className="py-2 px-4 text-gray-700">Brand</th>
              <th className="py-2 px-4 text-gray-700">Stok Masuk</th>
              <th className="py-2 px-4 text-gray-700">Stok Keluar</th>
              <th className="py-2 px-4 text-gray-700">Sisa Stok</th>
            </tr>
          </thead>
          <tbody>
            {stockItems.map((item, index) => (
              <tr key={index} className="border-b border-gray-200 bg-white">
                <td className="py-2 px-4 text-gray-700 text-center">
                  {item.tanggal}
                </td>
                <td className="py-2 px-4 text-gray-700 text-center">
                  {item.brand}
                </td>
                <td className="py-2 px-4 text-gray-700 text-center">
                  {item.stokMasuk === "0,00" ||
                  item.stokMasuk === null ||
                  parseFloat(item.stokMasuk) === 0
                    ? "0"
                    : parseFloat(item.stokMasuk)
                        .toString()
                        .replace(".", ",")
                        .replace(/,00+$/, "")}
                </td>
                <td className="py-2 px-4 text-gray-700 text-center">
                  {item.stokKeluar === "0,00" ||
                  item.stokKeluar === null ||
                  parseFloat(item.stokKeluar) === 0
                    ? "0"
                    : parseFloat(item.stokKeluar)
                        .toString()
                        .replace(".", ",")
                        .replace(/,00+$/, "")}
                </td>
                <td className="py-2 px-4 text-gray-700 text-center">
                  {item.sisaStok === "0,00" ||
                  item.sisaStok === null ||
                  parseFloat(item.sisaStok) === 0
                    ? "0"
                    : parseFloat(item.sisaStok)
                        .toString()
                        .replace(".", ",")
                        .replace(/,00+$/, "")}
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr className="border-t border-gray-300 bg-gray-200">
              <th className="py-2 px-4 text-gray-700" colSpan={2}>
                Total
              </th>
              <th className="py-2 px-4 text-gray-700 text-center">
                {totalStokMasuk.toFixed(1).replace(",", ".")}
              </th>
              <th className="py-2 px-4 text-gray-700 text-center">
                {totalStokKeluar.toFixed(1).replace(",", ".")}
              </th>
              <th className="py-2 px-4 text-gray-700 text-center">
                {totalSisaStok.toFixed(1).replace(",", ".")}
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default StockReport;
