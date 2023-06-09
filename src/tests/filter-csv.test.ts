import {CsvFilter} from "../core/filter-csv";

describe('CSV Filter', () => {
    const header = 'Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente';
    it('allow only correct lines', () => {
        const invoiceLine = '1,02/05/2021,1000,790,21,,ACER Laptop,B76430134,';
        const csvFilter = CsvFilter.create([header, invoiceLine]);
        const result = csvFilter.filteredLines;

        expect(result).toEqual([header, invoiceLine]);
    });

    it('excludes lines with both tax fields are exclusive', () => {
        const invoiceLine = '1,02/05/2021,1000,790,21,7,ACER Laptop,B76430134,';
        const csvFilter = CsvFilter.create([header, invoiceLine]);
        const result = csvFilter.filteredLines;

        expect(result).toEqual([header]);
    });

    it('excludes lines with both tax fields are empty', () => {
        const invoiceLine = '1,02/05/2021,1000,790,,,ACER Laptop,B76430134,';
        const csvFilter = CsvFilter.create([header, invoiceLine]);
        const result = csvFilter.filteredLines;

        expect(result).toEqual([header]);
    });

    it('excludes lines with non decimal tax fields', () => {
        const invoiceLine = '1,02/05/2021,1000,790,XYZ,,ACER Laptop,B76430134,';
        const csvFilter = CsvFilter.create([header, invoiceLine]);
        const result = csvFilter.filteredLines;

        expect(result).toEqual([header]);
    });

    it('excludes lines with both tax fields populated even if non decimal', () => {
        const invoiceLine = '1,02/05/2021,1000,790,XYZ,7,ACER Laptop,B76430134,';
        const csvFilter = CsvFilter.create([header, invoiceLine]);

        const result = csvFilter.filteredLines;

        expect(result).toEqual([header]);
    });

});