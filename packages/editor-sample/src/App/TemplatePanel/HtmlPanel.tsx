import React, { useMemo } from 'react';

import { renderToStaticMarkup } from '@digitalc/email-builder';

import { useDocument } from '../../documents/editor/EditorContext';

import HighlightedCodePanel from './helper/HighlightedCodePanel';

export default function HtmlPanel() {
  // JSON 格式的 EmailBuilder 页面结构
  const document = useDocument();

  console.log('🚀 ~ HtmlPanel 当前document:', document);
  // 转换为HTML电子邮件字符串
  const code = useMemo(() => renderToStaticMarkup(document, { rootBlockId: 'root' }), [document]);
  console.log('html code', code);
  return <HighlightedCodePanel type="html" value={code} />;
}
