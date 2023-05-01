export class CsvFilter {

    private readonly _separator = ",";
    private constructor(private readonly lines: string[]) {}
    static create(lines: string[]) {
        return new CsvFilter(lines);
    }
    get filteredLines() {
        const result = [];
        result.push(this.lines[0]);
        const fields = this.splitFlieds();
        if (this.isNotFilledIvaAndIgic(fields)) {
            result.push(this.lines[1]);
        }
        return result;
    }

    private isNotFilledIvaAndIgic(fields: string[]) {
        return !fields[4] || !fields[5];
    }

    private splitFlieds() {
        return this.lines[1].split(this._separator);
    }
}