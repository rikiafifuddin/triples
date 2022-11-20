exports.formatNumberToRupiah = num => {
  const rupiah = Number(num).toFixed(2);

  return `Rp ${new Intl.NumberFormat('id-ID').format(Number(rupiah))}`;
};

exports.formatHiddenAccountNumber = str => {
  return (
    Array.from({ length: str.length - 4 })
      .map(() => 'X')
      .join('') + str.slice(-4)
  );
};
