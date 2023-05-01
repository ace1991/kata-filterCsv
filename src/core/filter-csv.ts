export class CsvFilter {

    private readonly _separator = ",";
    private constructor(private readonly lines: string[]) {}
    static create(lines: string[]) {
        return new CsvFilter(lines);
    }
    get filteredLines() {
        const result = [];
        result.push(this.lines[0]);
        const fields = this.splitFields();
        const ivaField = fields[4];
        const igicField = fields[5];
        const decimalRegex = '\\d+(\\.\\d+)?';
        const taxFieldAreMutuallyExclusive =  (ivaField.match(decimalRegex) || igicField.match(decimalRegex)) &&
            !(ivaField.match(decimalRegex) && igicField.match(decimalRegex));
        if(taxFieldAreMutuallyExclusive) {
            result.push(this.lines[1]);
        }
        return result;
    }

    private splitFields() {
        return this.lines[1].split(this._separator);
    }
}