"use client";
import React, { useEffect, useState } from "react";

const StockReport = () => {
  const [brandTotals, setBrandTotals] = useState([]);
  const [overallTotals, setOverallTotals] = useState({
    totalStokMasuk: 0,
    totalStokKeluar: 0,
    totalSisaStok: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
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

        // Mengelompokkan data berdasarkan brand dan tanggal
        const groupedByBrandAndDate = data.stobar.reduce((acc, item) => {
          if (!acc[item.brand]) {
            acc[item.brand] = {};
          }
          if (!acc[item.brand][item.tanggal]) {
            acc[item.brand][item.tanggal] = {
              stokMasuk: 0,
              stokKeluar: 0,
              sisaStok: 0,
            };
          }

          acc[item.brand][item.tanggal].stokMasuk += parseFloat(item.stokMasuk || 0);
          acc[item.brand][item.tanggal].stokKeluar += parseFloat(item.stokKeluar || 0);
          acc[item.brand][item.tanggal].sisaStok += parseFloat(item.sisaStok || 0);

          return acc;
        }, {});

        // Menghitung total stok masuk, keluar, dan sisa stok untuk setiap brand
        const totals = Object.keys(groupedByBrandAndDate).map((brand) => {
          const dates = groupedByBrandAndDate[brand];
          const totalStokMasuk = Object.values(dates).reduce((sum, date) => sum + date.stokMasuk, 0);
          const totalStokKeluar = Object.values(dates).reduce((sum, date) => sum + date.stokKeluar, 0);
          const totalSisaStok = Object.values(dates).reduce((sum, date) => sum + date.sisaStok, 0);
          return {
            brand,
            totalStokMasuk,
            totalStokKeluar,
            totalSisaStok,
            dates,
          };
        });

        // Menghitung total keseluruhan stok masuk, keluar, dan sisa stok
        const totalOverallStokMasuk = totals.reduce((sum, item) => sum + item.totalStokMasuk, 0);
        const totalOverallStokKeluar = totals.reduce((sum, item) => sum + item.totalStokKeluar, 0);
        const totalOverallSisaStok = totals.reduce((sum, item) => sum + item.totalSisaStok, 0);

        setBrandTotals(totals);
        setOverallTotals({
          totalStokMasuk: totalOverallStokMasuk,
          totalStokKeluar: totalOverallStokKeluar,
          totalSisaStok: totalOverallSisaStok,
        });
      } catch (error) {
        console.error("Error reading spreadsheet:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Laporan Stok Barang</h1>

      {/* Total Keseluruhan Stok */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">Total Stok Masuk</h2>
          <p className="text-lg font-bold text-yellow-600">
            {overallTotals.totalStokMasuk.toFixed(1).replace(".", ",").replace(/,?0+$/, "") || "0"}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">Total Stok Keluar</h2>
          <p className="text-lg font-bold text-red-600">
            {overallTotals.totalStokKeluar.toFixed(1).replace(".", ",").replace(/,?0+$/, "") || "0"}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">Total Sisa Stok</h2>
          <p className="text-lg font-bold text-blue-600">
            {overallTotals.totalSisaStok.toFixed(1).replace(".", ",").replace(/,?0+$/, "") || "0"}
          </p>
        </div>
      </div>

      {/* Kartu Statistik per Brand */}
      {brandTotals.map((brandTotal, index) => (
        <div key={index} className="mb-6 p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">{brandTotal.brand}</h2>

          {/* <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-4">
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Stok Masuk</h3>
                <p className="text-xl font-bold text-yellow-600">
                  {brandTotal.totalStokMasuk.toFixed(1).replace(".", ",").replace(/,?0+$/, "") || "0"}
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
                <h3 className="text-lg font-semibold text-gray-700">Stok Keluar</h3>
                <p className="text-xl font-bold text-red-600">
                  {brandTotal.totalStokKeluar.toFixed(1).replace(".", ",").replace(/,?0+$/, "") || "0"}
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
                <h3 className="text-lg font-semibold text-gray-700">Sisa Stok</h3>
                <p className="text-xl font-bold text-blue-600">
                  {brandTotal.totalSisaStok.toFixed(1).replace(".", ",").replace(/,?0+$/, "") || "0"}
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
          </div> */}

          {/* Tabel Detil Per Brand */}
          {Object.entries(brandTotal.dates).map(([date, values], idx) => (
            <div key={idx} className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{date}</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 border-collapse">
                  <thead>
                    <tr className="border-b border-gray-300 bg-gray-200">
                      <th className="py-2 px-4 text-gray-700">Stok Masuk</th>
                      <th className="py-2 px-4 text-gray-700">Stok Keluar</th>
                      <th className="py-2 px-4 text-gray-700">Sisa Stok</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 bg-white">
                      <td className="py-2 px-4 text-gray-700 text-center">
                        {values.stokMasuk.toFixed(1).replace(".", ",").replace(/,?0+$/, "") || "0"}
                      </td>
                      <td className="py-2 px-4 text-gray-700 text-center">
                        {values.stokKeluar.toFixed(1).replace(".", ",").replace(/,?0+$/, "") || "0"}
                      </td>
                      <td className="py-2 px-4 text-gray-700 text-center">
                        {values.sisaStok.toFixed(1).replace(".", ",").replace(/,?0+$/, "") || "0"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default StockReport;
