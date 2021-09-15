/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
t for license information.

import { IDocNodeParameters, DocNode, DocSection } from '@microsoft/tsdoc';
import { CustomDocNodeKind } from './CustomDocNodeKind';

/**
 * Constructor parameters for {@link DocTableCell}.
 */
export interface IDocTableCellParameters extends IDocNodeParameters {}

/**
 * Represents table cell, similar to an HTML `<td>` element.
 */
export class DocTableCell extends DocNode {
  public readonly content: DocSection;

  public constructor(
    parameters: IDocTableCellParameters,
    sectionChildNodes?: ReadonlyArray<DocNode>
  ) {
    super(parameters);

    this.content = new DocSection(
      { configuration: this.configuration },
      sectionChildNodes
    );
  }

  /** @override */
  public get kind(): string {
    return CustomDocNodeKind.TableCell;
  }
}
