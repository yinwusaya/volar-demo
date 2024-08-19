import type { LanguagePlugin, VirtualCode } from "@volar/language-core";
import type { URI } from "vscode-uri";
import type * as ts from 'typescript';

export const language = {
  getLanguageId(uri) {
    if (uri.path.endsWith('.html1')) {
      return 'html1';
    }
  },
  createVirtualCode(uri, languageId, snapshot) {
    if (languageId === "html1") {
      return new Html1Code(snapshot);
    }
  },
  updateVirtualCode(uri, languageCode, snapshot) {
    languageCode.update(snapshot);
    return languageCode;
  },
} satisfies LanguagePlugin<URI>;

export class Html1Code implements VirtualCode {
  id = "root";
  languageId = "html1";
  embeddedCodes: VirtualCode[] = [];

  constructor(public snapshot: ts.IScriptSnapshot) {
    this.onSnapshotUpdated();
  }

  public update(newSnapshot: ts.IScriptSnapshot) {
    this.snapshot = newSnapshot;
    this.onSnapshotUpdated();
  }

  public onSnapshotUpdated() {
    // Do something with the snapshot
  }
}