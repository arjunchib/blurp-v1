export class CustomData extends Map<string, string> {
  name: string;

  // This order of the overloads generates better error message when
  // dataObject types mismatch
  constructor(name: string, dataObject: Record<string, string>);
  constructor(customId: string);
  constructor(inputStr: string, dataObject?: Record<string, string>) {
    super();
    if (dataObject) {
      this.name = inputStr;
      for (const k in dataObject) {
        this.set(k, dataObject[k]);
      }
    } else {
      const parts = inputStr.split(";");
      this.name = parts.shift() ?? "";
      parts.forEach((p) => {
        const [k, v] = p.split(":");
        this.set(k, v);
      });
    }
  }

  toString() {
    const parts = [];
    for (const [key, value] of this.entries()) {
      parts.push(`${key}:${value}`);
    }
    return `${this.name};${parts.join(";")}`;
  }
}
