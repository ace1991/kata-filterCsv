import {CsvFilter} from "../core/filter-csv";

describe('CSV Filter', () => {
    it('allow only correct lines', () => {
        const header = 'Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente';
        const invoiceLine = '1,02/05/2021,1000,790,21,,ACER Laptop,B76430134,';
        const csvFilter = CsvFilter.create([header, invoiceLine]);

        const result = csvFilter.filteredLines;

        expect(result).toEqual([header, invoiceLine]);
    });

    it('excludes lines with both tax fields are exclusive', () => {
        const header = 'Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente';
        const invoiceLine = '1,02/05/2021,1000,790,21,7,ACER Laptop,B76430134,';
        const csvFilter = CsvFilter.create([header, invoiceLine]);

        const result = csvFilter.filteredLines;

        expect(result).toEqual([header]);
    });

    it('excludes lines with both tax fields are empty', () => {
        const header = 'Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente';
        const invoiceLine = '1,02/05/2021,1000,790,,,ACER Laptop,B76430134,';
        const csvFilter = CsvFilter.create([header, invoiceLine]);

        const result = csvFilter.filteredLines;

        expect(result).toEqual([header]);
    });
});