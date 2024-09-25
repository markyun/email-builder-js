import React, { useState } from 'react';
import { MenuItem, TextField, IconButton, } from '@mui/material';
import { TextProps, TextPropsSchema } from '@usewaypoint/block-text';
import MarkdownEditor from '@uiw/react-markdown-editor';
import request from '../../../../utils/commonRequest';

import BaseSidebarPanel from './helpers/BaseSidebarPanel';
import BooleanInput from './helpers/inputs/BooleanInput';
import TextInput from './helpers/inputs/TextInput';
import MultiStylePropertyPanel from './helpers/style-inputs/MultiStylePropertyPanel';
import CascadingMenu from "./CascadingMenu/CascadingMenu";


type TextSidebarPanelProps = {
  data: TextProps;
  setData: (v: TextProps) => void;
};

let menuItem = [];

// 插入宏和变量
const MacroSelect = (props) => {
  const { editor } = props?.editorProps;
  const { state, view } = editor?.current || {};
  const handle = (v) => {
    if (!state || !view) return;
    // const lineInfo = view.state.doc.lineAt(view.state.selection.main.from);
    const lineInfo = view.state.doc;
    const from = view.state.selection.main?.from
    view.dispatch({
      changes: {
        from,
        // to: lineInfo.to,
        insert: `$\{${v}}`
      },
      // selection: EditorSelection.range(lineInfo.from + mark.length, lineInfo.to),
      selection: { anchor: lineInfo?.length + v?.length + 1 },
    });
  };
  return (<>
    <TextField
      select
      size="small"
      variant="standard"
      label={null}
      value={'init'}
      onChange={(ev) => {
        const v = ev.target.value;
        handle(v);
      }}
    >
      <MenuItem value="init" label='Macro Variables'>Macro</MenuItem>
      <MenuItem value="START_DATE">START_DATE</MenuItem>
      <MenuItem value="END_DATE">END_DATE</MenuItem>
    </TextField>
  </>
  );
};
// 查询宏变量
async function qryMacroList(params): Promise {
  try {
    const response = await request(
      '/ceg/AdviceMacroController/qryMacroList',
      {
        method: 'post',
        data: params,

      },
    );
    if (response) {
      return response;
    }
  } catch (error) {
  }
}

qryMacroList({}).then((data) => {
  if (data?.svcCont?.data) {
    menuItem = data?.svcCont?.data;
    console.log("🚀 ~ 查询到了 MacroList:", menuItem)
  }
});
// 插入宏和变量
const MacroTabs = (props) => {
  const [anchorElement, setAnchorElement] = useState(null);
  const { editor } = props?.editorProps;
  const { state, view } = editor?.current || {};

  const groupedData = (menuItem || []).reduce((acc, item) => {

    if (item.useScope !== null) {
      if (!acc[item.useScope]) {
        acc[item.useScope] = {
          key: `group-${item.useScope}`,
          caption: item.useScope,
          subMenuItems: []
        };
      }
      acc[item.useScope].subMenuItems.push({
        ...item,
        key: item.macroId.toString(),
        caption: item.macroName,
        // onClick: () => {} // 这里可以定义点击事件
      });
    }
    return acc;
  }, {});

  const finalData = Object.values(groupedData).map(group => ({
    key: group.key,
    caption: group.caption,
    subMenuItems: group.subMenuItems.map(subItem => ({
      ...subItem,
      key: subItem.key,
      caption: subItem.caption,
      // onClick: subItem.onClick
    }))
  }));
  console.log(groupedData, finalData);

  const handle = (v) => {
    if (!state || !view) return;
    // const lineInfo = view.state.doc.lineAt(view.state.selection.main.from);
    const lineInfo = view.state.doc;
    const from = view.state.selection.main?.from
    view.dispatch({
      changes: {
        from,
        // to: lineInfo.to,
        insert: `$\{${v}}`
      },
      // selection: EditorSelection.range(lineInfo.from + mark.length, lineInfo.to),
      selection: { anchor: lineInfo?.length + v?.length + 2 },
    });
  };

  const handleClick = event => {
    setAnchorElement(event?.currentTarget);
  };
  const handleClose = event => {
    setAnchorElement(null);
  };

  const handleChange = (event, newValue) => {
    console.log(newValue);
  };
  return (<>
    <IconButton
      aria-label="Macro"
      aria-controls="user-menu"
      aria-haspopup="true"
      onClick={handleClick}
    >
      <svg fill="#005AF0" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Macro</title><path d="M12 0c6.628 0 12 5.373 12 12s-5.372 12-12 12C5.373 24 0 18.627 0 12S5.373 0 12 0zm-.92 19.278l5.034-8.377a.444.444 0 00.097-.268.455.455 0 00-.455-.455l-2.851.004.924-5.468-.927-.003-5.018 8.367s-.1.183-.1.291c0 .251.204.455.455.455l2.831-.004-.901 5.458z" /></svg>
    </IconButton>

    <CascadingMenu
      anchorElement={anchorElement}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      rootmenu={'macroSelect'}
      menuItems={finalData || []}
      onClose={handleClose}
      onClick={handle}
      open={Boolean(anchorElement)}
      transformOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
    />
  </>
  );
};

const macro = {
  name: 'macro',
  keyCommand: 'macro',
  title: null,
  // button: { 'aria-label': 'Add macro text' },

  // 下拉形式
  // button: (command, props, opts) => <MacroSelect command={command} editorProps={{ ...props, ...opts }} />,

  // 级联选择形式
  button: (command, props, opts) => <MacroTabs command={command} editorProps={{ ...props, ...opts }} />,
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
  const enableMarkdown = data?.props?.markdown;
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
                  // 'image',
                  macro,
                ]}
                onChange={(value, viewUpdate) => {
                  const text = value;
                  updateData({ ...data, props: { ...data.props, text } });
                }}
              />
            </div>
          )
      }
      <div style={{ color: '#1F1F21', marginTop: '10px', marginBottom: '-26px' }} title='GitHub Flavored Markdown and Liquid templating supported' >GitHub Flavored Markdown and Liquid templating supported.</div>
      <BooleanInput
        label="Markdown"
        defaultValue={data.props?.markdown}
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
