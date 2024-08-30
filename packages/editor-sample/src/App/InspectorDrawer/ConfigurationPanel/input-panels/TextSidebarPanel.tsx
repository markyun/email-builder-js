import React, { useState } from 'react';

import { TextProps, TextPropsSchema } from '@usewaypoint/block-text';
import MarkdownEditor from '@uiw/react-markdown-editor';

import BaseSidebarPanel from './helpers/BaseSidebarPanel';
import BooleanInput from './helpers/inputs/BooleanInput';
import TextInput from './helpers/inputs/TextInput';
import MultiStylePropertyPanel from './helpers/style-inputs/MultiStylePropertyPanel';

type TextSidebarPanelProps = {
  data: TextProps;
  setData: (v: TextProps) => void;
};
export default function TextSidebarPanel({ data, setData }: TextSidebarPanelProps) {
  const [, setErrors] = useState<Zod.ZodError | null>(null);

  const updateData = (d: unknown) => {
    const res = TextPropsSchema.safeParse(d);
    if (res.success) {
      setData(res.data);
      setErrors(null);
    } else {
      setErrors(res.error);
    }
  };
  document.documentElement.setAttribute('data-color-mode', 'light')

  return (
    <BaseSidebarPanel title="Text block">
      <TextInput
        label="Content"
        rows={5}
        defaultValue={data.props?.text ?? ''}
        onChange={(text) => updateData({ ...data, props: { ...data.props, text } })}
      />
      <div>
        <p style={{margin:' 0 0 10px 0 '}}>Content</p>
        <MarkdownEditor
          value={data.props?.text ?? ''}
          height="200px"
          enablePreview={false}
          data-color-mode="light"
          onChange={(value, viewUpdate) => {
            console.log("value",value);
            const text = value;
            updateData({ ...data, props: { ...data.props, text } });
          }}
        />
      </div>

      <div style={{color:'#1F1F21',marginTop:'10px'}}>GitHub Flavored Markdown and Liquid templating supported.</div>
      <BooleanInput
        label="Markdown"
        defaultValue={data.props?.markdown ?? false}
        onChange={(markdown) => updateData({ ...data, props: { ...data.props, markdown } })}
      />

      <MultiStylePropertyPanel
        names={['color', 'backgroundColor', 'fontFamily', 'fontSize', 'fontWeight', 'textAlign', 'padding']}
        value={data.style}
        onChange={(style) => updateData({ ...data, style })}
      />
    </BaseSidebarPanel>
  );
}
