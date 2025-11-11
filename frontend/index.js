class VersionManager {
  flag = false;
  versions = [];
  constructor(version) {
    if (arguments.length === 0) {
      this.pointer = 0;
      this.versions.push("0.1.0");
    }
    if (arguments.length === 1) {
      const [major, minor, patch] = version.split(".").map(Number);
      if (
        typeof major === "number" &&
        typeof minor === "number" &&
        typeof patch === "number"
      ) {
        this.pointer = 0;
        this.versions.push(version);
      }
    }
  }
  calculate(type) {
    const [major, minor, patch] = this.versions[this.pointer]
      .split(".")
      .map(Number);
    let newVersion;
    switch (type) {
      case "major":
        newVersion = `${major + 1}.0.0`;
        break;
      case "minor":
        newVersion = `${major}.${minor + 1}.0`;
        break;
      case "patch":
        newVersion = `${major}.${minor}.${patch + 1}`;
        break;
    }
    this.versions.push(newVersion);
    this.pointer += 1;
    return this;
  }
  major() {
    return this.calculate("major");
  }
  minor() {
    return this.calculate("minor");
  }
  patch() {
    return this.calculate("patch");
  }
  rollback() {
    if (this.pointer > 0) {
      this.flag = true;
      this.pointer -= 1;
      return this;
    } else {
      throw new Error("Cannot rollback!");
    }
  }
  release() {
    if (this.flag) {
      const currentVersion = this.versions[this.versions.length - 1].split(".");
      return `${currentVersion[0]}.${currentVersion[1]}.${currentVersion[2]}`;
    }
    const currentVersion = this.versions[this.pointer].split(".");
    return `${currentVersion[0]}.${currentVersion[1]}.${currentVersion[2]}`;
  }
}
const manager = new VersionManager();
manager.major();
manager.patch();
manager.patch();
manager.patch();
manager.minor();
manager.rollback();
manager.patch();
console.log(manager.versions);
console.log(manager.release());
