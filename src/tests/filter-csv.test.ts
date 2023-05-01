import {CsvFilter} from "../core/filter-csv";

describe('CSV Filter', () => {
    it('Allow only correct lines', () => {
        const header = 'Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente';
        const invoiceLine = '1,02/05/2021,1000,790,21,,ACER Laptop,B76430134,';
        const csvFilter = new CsvFilter([header, invoiceLine]);

        const result = csvFilter.filteredLines;

        expect(result).toEqual([header, invoiceLine]);
    });
});