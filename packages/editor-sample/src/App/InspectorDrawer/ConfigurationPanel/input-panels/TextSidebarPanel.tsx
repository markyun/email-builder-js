import React, { useState } from 'react';
import { MenuItem, TextField } from '@mui/material';
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


// 插入宏和变量
const MacroList = (props) => {
  const { editor } = props?.editorProps;
  const  { state, view }  = editor?.current || {};
  const handle = (v) => {
    if (!state || !view) return;
    // const lineInfo = view.state.doc.lineAt(view.state.selection.main.from);
    const from = view.state.selection.main.from
    view.dispatch({
      changes: {
        from,
        // to: lineInfo.to,
        insert: `$\{${v}}`
      },
      // selection: EditorSelection.range(lineInfo.from + mark.length, lineInfo.to),
      selection: { anchor: from + v?.length },
    });
  };

  return (<>
    <TextField
      select
      variant="standard"
      label={null}
      value={'init'}
      onChange={(ev) => {
        const v = ev.target.value;
        handle(v);
      }}
    >
      <MenuItem value="init">Macro Variables</MenuItem>
      <MenuItem value="START_DATE">START_DATE</MenuItem>
      <MenuItem value="END_DATE">END_DATE</MenuItem>
    </TextField>
  </>
  );
};

const macro = {
  name: 'macro',
  keyCommand: 'macro',
  title: null,
  // button: { 'aria-label': 'Add macro text' },
  button: (command, props, opts) => <MacroList command={command} editorProps={{ ...props, ...opts }} />,
  icon: (
    <svg fill="#005AF0" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>AMP</title><path d="M12 0c6.628 0 12 5.373 12 12s-5.372 12-12 12C5.373 24 0 18.627 0 12S5.373 0 12 0zm-.92 19.278l5.034-8.377a.444.444 0 00.097-.268.455.455 0 00-.455-.455l-2.851.004.924-5.468-.927-.003-5.018 8.367s-.1.183-.1.291c0 .251.204.455.455.455l2.831-.004-.901 5.458z" /></svg>
  ),
  execute: ({ editor, state, view }) => {
    if (!state || !view) return;
    const lineInfo = view.state.doc.lineAt(view.state.selection.main.from);
    let mark = '#';
    const matchMark = lineInfo.text.match(/^#+/)
    if (matchMark && matchMark[0]) {
      const txt = matchMark[0];
      if (txt.length < 6) {
        mark = txt + '#';
      }
    }
    if (mark.length > 6) {
      mark = '#';
    }
    const title = lineInfo.text.replace(/^#+/, '')
    view.dispatch({
      changes: {
        from: lineInfo.from,
        to: lineInfo.to,
        insert: ` ${title}${mark}`
      },
      // selection: EditorSelection.range(lineInfo.from + mark.length, lineInfo.to),
      selection: { anchor: lineInfo.from + mark.length },
    });
  },
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
  const enableMarkdown = data?.props?.markdown || true;
  document.documentElement.setAttribute('data-color-mode', 'light')

  return (
    <BaseSidebarPanel title="Text block">
      {
        !enableMarkdown ?
          (<TextInput
            label="Content"
            rows={5}
            defaultValue={data.props?.text ?? ''}
            onChange={(text) => updateData({ ...data, props: { ...data.props, text } })}
          />) : (
            <div>
              <p style={{ margin: ' 0 0 5px 0 ', fontSize: '14px' }}>Content</p>
              <MarkdownEditor
                value={data.props?.text ?? ''}
                height="200px"
                enablePreview={false}
                data-color-mode="light"
                toolbars={[
                  'undo',
                  'redo',
                  'header',
                  'italic',
                  'bold',
                  'strike',
                  'underline',
                  'quote',
                  'olist',
                  'ulist',
                  'todo',
                  'image',
                  macro,
                  // test(),
                ]}
                onChange={(value, viewUpdate) => {
                  const text = value;
                  updateData({ ...data, props: { ...data.props, text } });
                }}
              />
            </div>
          )
      }
      <div style={{ color: '#1F1F21', marginTop: '10px' }} title='GitHub Flavored Markdown and Liquid templating supported' >GitHub Flavored Markdown and Liquid templating supported.</div>
      <BooleanInput
        label="Markdown"
        defaultValue={data.props?.markdown ?? true}
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
