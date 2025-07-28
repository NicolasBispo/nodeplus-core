export class NodePlusPath {
  private bootStrapScriptFilePath?: string


  setBootStrapScriptFilePath(filePath: string) {
    this.bootStrapScriptFilePath = filePath
  }

  getBootStrapScriptFilePath() {
    return this.bootStrapScriptFilePath
  }

}

export const nodePaths = new NodePlusPath()