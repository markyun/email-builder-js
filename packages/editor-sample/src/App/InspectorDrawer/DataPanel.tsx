import React from 'react';

import { setDocument, useDocument } from '../../documents/editor/EditorContext';

import DataSidebarPanel from './ConfigurationPanel/input-panels/DataSidebarPanel';

export default function DataPanel() {
  const block = useDocument().root;
  if (!block) {
    return <p>Block not found</p>;
  }

  const { data, type } = block;
  if (type !== 'EmailLayout') {
    throw new Error('Expected "root" element to be of type EmailLayout');
  }

  return <>
        <DataSidebarPanel  />
      </>
}
