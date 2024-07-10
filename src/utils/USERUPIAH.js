const USERUPIAH = (uang) => {
          // Mengecek apakah input adalah angka
          if (typeof uang !== 'number') {
                    throw new Error('Input harus berupa angka');
          }

          // Format angka menjadi format mata uang Rupiah
          const formattedUang = uang.toLocaleString('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0,
          });

          return formattedUang;
};

export default USERUPIAH;
