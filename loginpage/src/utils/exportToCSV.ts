import {unparse} from "papaparse";

export const exportToCSV = (data : any[], filename : string = "data.csv") => {
    if(!data.length) {
        return;
    }

    const csv = unparse(data);

    const csvTODownload = new Blob([csv], {type: "text/csv;charset=utf-8;"});
    const url = URL.createObjectURL(csvTODownload);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    
};