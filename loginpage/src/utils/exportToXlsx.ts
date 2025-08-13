import * as XLSX from "xlsx-js-style";

interface ExportProduct {
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  addedBy: string;
}

export const exportToXlsx = (products: ExportProduct[], fileName : string) => {
  if(!products){
    alert("Nothing to Export");
    return;
  }
  const formatted = products.map((p, index) => ({
    Serial: index + 1,
    Name: p.name,
    Price: p.price,
    Description: p.description,
    Category: p.category,
    "Image URL": p.image,
    "Added By": p.addedBy
  }));

  const ws = XLSX.utils.json_to_sheet(formatted);

  const header = Object.keys(formatted[0]);
  
  for(let colIndex = 0; colIndex < header.length; colIndex++){
    const cellAddress = XLSX.utils.encode_cell({ r: 0, c: colIndex });
    if (ws[cellAddress]) {
      ws[cellAddress].s = {
        font: { bold: true },
        alignment: { horizontal: "center" }
      };
    }
  }

  ws["!cols"]=[{wch:6},{wch:20},{wch:10},{wch:30},{wch:15},{wch:40},{wch:20},];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Products");
  XLSX.writeFile(wb, fileName);
};
