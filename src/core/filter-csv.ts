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
        if (this.isNotFilledBoth(ivaField,igicField) && this.isNotEmptyBoth(ivaField,igicField)) {
            result.push(this.lines[1]);
        }
        return result;
    }

    private isNotEmptyBoth(field1: string, field2:string) {
        return !(!field1 && !field2);
    }

    private isNotFilledBoth(field1: string, field2:string) {
        return !field1 || !field2;
    }

    private splitFields() {
        return this.lines[1].split(this._separator);
    }
}