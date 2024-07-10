'use client'
import React, { useState } from 'react';
import USERUPIAH from '../../../utils/USERUPIAH';


const DataBarang = () => {
  // Data contoh stok barang
  const [stockItems, setStockItems] = useState([
    { no: 1, brand: 'SM Grape', hargaPerSlop: 142000, hargaPerBungkus: 14200, stokMasuk: 10, stokKeluar: 2, sisaStok: 8, totalPenjualan: 28400, tanggal: '2024-07-01' },
    { no: 2, brand: 'Blueberry', hargaPerSlop: 140000, hargaPerBungkus: 14000, stokMasuk: 10, stokKeluar: 4, sisaStok: 6, totalPenjualan: 56000, tanggal: '2024-07-02' },
    { no: 3, brand: 'SM Menthol', hargaPerSlop: 115000, hargaPerBungkus: 11500, stokMasuk: 10, stokKeluar: 3, sisaStok: 7, totalPenjualan: 34500, tanggal: '2024-07-03' },
    { no: 4, brand: 'Liox Menthol', hargaPerSlop: 115000, hargaPerBungkus: 11500, stokMasuk: 10, stokKeluar: 5, sisaStok: 5, totalPenjualan: 57500, tanggal: '2024-07-04' },
    { no: 5, brand: 'Xbold', hargaPerSlop: 106000, hargaPerBungkus: 10600, stokMasuk: 10, stokKeluar: 5, sisaStok: 5, totalPenjualan: 53000, tanggal: '2024-07-05' },
    { no: 6, brand: 'You Bold', hargaPerSlop: 103000, hargaPerBungkus: 10300, stokMasuk: 10, stokKeluar: 2, sisaStok: 8, totalPenjualan: 20600, tanggal: '2024-07-06' },
  ]);

  // State untuk form input
  const [form, setForm] = useState({
    no: '',
    brand: '',
    hargaPerSlop: '',
    hargaPerBungkus: '',
    stokMasuk: '',
    stokKeluar: '',
    sisaStok: '',
    totalPenjualan: '',
    tanggal: ''
  });

  // State untuk menyimpan data yang sedang diedit
  const [editingIndex, setEditingIndex] = useState(null);

  // Fungsi untuk menangani perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Fungsi untuk menambahkan data barang baru
  const handleAdd = () => {
    if (!form.brand || !form.hargaPerSlop || !form.hargaPerBungkus || !form.stokMasuk || !form.stokKeluar || !form.sisaStok || !form.totalPenjualan || !form.tanggal) {
      alert('Harap isi semua field');
      return;
    }

    const newItem = {
      no: stockItems.length + 1,
      brand: form.brand,
      hargaPerSlop: parseInt(form.hargaPerSlop),
      hargaPerBungkus: parseInt(form.hargaPerBungkus),
      stokMasuk: parseInt(form.stokMasuk),
      stokKeluar: parseInt(form.stokKeluar),
      sisaStok: parseInt(form.sisaStok),
      totalPenjualan: parseInt(form.totalPenjualan),
      tanggal: form.tanggal,
    };

    setStockItems([...stockItems, newItem]);
    setForm({
      no: '',
      brand: '',
      hargaPerSlop: '',
      hargaPerBungkus: '',
      stokMasuk: '',
      stokKeluar: '',
      sisaStok: '',
      totalPenjualan: '',
      tanggal: ''
    });
  };

  // Fungsi untuk menyimpan perubahan pada data barang
  const handleUpdate = () => {
    if (!form.brand || !form.hargaPerSlop || !form.hargaPerBungkus || !form.stokMasuk || !form.stokKeluar || !form.sisaStok || !form.totalPenjualan || !form.tanggal) {
      alert('Harap isi semua field');
      return;
    }

    const updatedItems = stockItems.map((item, index) => {
      if (index === editingIndex) {
        return {
          ...item,
          brand: form.brand,
          hargaPerSlop: parseInt(form.hargaPerSlop),
          hargaPerBungkus: parseInt(form.hargaPerBungkus),
          stokMasuk: parseInt(form.stokMasuk),
          stokKeluar: parseInt(form.stokKeluar),
          sisaStok: parseInt(form.sisaStok),
          totalPenjualan: parseInt(form.totalPenjualan),
          tanggal: form.tanggal,
        };
      }
      return item;
    });

    setStockItems(updatedItems);
    setForm({
      no: '',
      brand: '',
      hargaPerSlop: '',
      hargaPerBungkus: '',
      stokMasuk: '',
      stokKeluar: '',
      sisaStok: '',
      totalPenjualan: '',
      tanggal: ''
    });
    setEditingIndex(null);
  };

  // Fungsi untuk memulai proses edit
  const handleEdit = (index) => {
    const item = stockItems[index];
    setForm({
      no: item.no,
      brand: item.brand,
      hargaPerSlop: item.hargaPerSlop,
      hargaPerBungkus: item.hargaPerBungkus,
      stokMasuk: item.stokMasuk,
      stokKeluar: item.stokKeluar,
      sisaStok: item.sisaStok,
      totalPenjualan: item.totalPenjualan,
      tanggal: item.tanggal,
    });
    setEditingIndex(index);
  };

  // Fungsi untuk menghapus data barang
  const handleDelete = (index) => {
    const updatedItems = stockItems.filter((_, i) => i !== index);
    setStockItems(updatedItems);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Daftar Stok Barang</h1>
      
      {/* Form Input Barang */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Tambah / Edit Barang</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600">Brand</label>
              <input
                type="text"
                name="brand"
                value={form.brand}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div>
              <label className="block text-gray-600">Harga Per Slop</label>
              <input
                type="number"
                name="hargaPerSlop"
                value={form.hargaPerSlop}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div>
              <label className="block text-gray-600">Harga Per Bungkus</label>
              <input
                type="number"
                name="hargaPerBungkus"
                value={form.hargaPerBungkus}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div>
              <label className="block text-gray-600">Stok Masuk</label>
              <input
                type="number"
                name="stokMasuk"
                value={form.stokMasuk}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div>
              <label className="block text-gray-600">Stok Keluar</label>
              <input
                type="number"
                name="stokKeluar"
                value={form.stokKeluar}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div>
              <label className="block text-gray-600">Sisa Stok</label>
              <input
                type="number"
                name="sisaStok"
                value={form.sisaStok}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div>
              <label className="block text-gray-600">Total Penjualan</label>
              <input
                type="number"
                name="totalPenjualan"
                value={form.totalPenjualan}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div>
              <label className="block text-gray-600">Tanggal</label>
              <input
                type="date"
                name="tanggal"
                value={form.tanggal}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            {editingIndex !== null ? (
              <button
                type="button"
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Update
              </button>
            ) : (
              <button
                type="button"
                onClick={handleAdd}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Tambah
              </button>
            )}
            {editingIndex !== null && (
              <button
                type="button"
                onClick={() => {
                  setForm({
                    no: '',
                    brand: '',
                    hargaPerSlop: '',
                    hargaPerBungkus: '',
                    stokMasuk: '',
                    stokKeluar: '',
                    sisaStok: '',
                    totalPenjualan: '',
                    tanggal: ''
                  });
                  setEditingIndex(null);
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Tabel Data Barang */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-left text-gray-600">No</th>
              <th className="py-2 px-4 text-left text-gray-600">Tanggal</th>
              <th className="py-2 px-4 text-left text-gray-600">Brand</th>
              <th className="py-2 px-4 text-left text-gray-600">Harga</th>
              <th className="py-2 px-4 text-left text-gray-600">Stok Masuk</th>
              <th className="py-2 px-4 text-left text-gray-600">Stok Keluar</th>
              <th className="py-2 px-4 text-left text-gray-600">Sisa Stok</th>
              <th className="py-2 px-4 text-left text-gray-600">Total Penjualan</th>
              <th className="py-2 px-4 text-left text-gray-600">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {stockItems.map((item, index) => (
              <tr key={item.no} className="border-b border-gray-200">
                <td className="py-2 px-4 text-gray-700">{item.no}</td>
                <td className="py-2 px-4 text-gray-700">{item.tanggal}</td>
                <td className="py-2 px-4 text-gray-700">{item.brand}</td>
                <td className="py-2 px-4 text-gray-700">{USERUPIAH(item.hargaPerSlop)}</td>
                <td className="py-2 px-4 text-gray-700">{item.stokMasuk}</td>
                <td className="py-2 px-4 text-gray-700">{item.stokKeluar}</td>
                <td className="py-2 px-4 text-gray-700">{item.sisaStok}</td>
                <td className="py-2 px-4 text-gray-700">{USERUPIAH(item.totalPenjualan)}</td>
                <td className="py-2 px-4 flex space-x-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataBarang;
