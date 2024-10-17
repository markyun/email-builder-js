import React from 'react';
import { renderToStaticMarkup as baseRenderToStaticMarkup } from 'react-dom/server';

import Reader, { TReaderDocument } from '../Reader/core';

type TOptions = {
  rootBlockId: string;
};
export default function renderToStaticMarkup(document: TReaderDocument, { rootBlockId }: TOptions) {
  return (
    `<!DOCTYPE html>${
      baseRenderToStaticMarkup(
        // eslint-disable-next-line jsx-a11y/html-has-lang
        <html>
          <body>
            <Reader document={document} rootBlockId={rootBlockId} />
          </body>
        </html>
      )}`
  );
}
