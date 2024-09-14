import React, { useState } from 'react';
import { MenuItem, TextField, IconButton, } from '@mui/material';
import { TextProps, TextPropsSchema } from '@usewaypoint/block-text';
import MarkdownEditor from '@uiw/react-markdown-editor';

import BaseSidebarPanel from './helpers/BaseSidebarPanel';
import BooleanInput from './helpers/inputs/BooleanInput';
import TextInput from './helpers/inputs/TextInput';
import MultiStylePropertyPanel from './helpers/style-inputs/MultiStylePropertyPanel';
import CascadingMenu from "./CascadingMenu/CascadingMenu";


type TextSidebarPanelProps = {
  data: TextProps;
  setData: (v: TextProps) => void;
};

const menuItem = [
  {
    "paramType": "M",
    "macroId": 1,
    "useScope": "MCCM",
    "paramCode": "CAMPAIGN_NAME",
    "macroScriptId": 1,
    "hasParam": null,
    "paramName": "CAMPAIGN_NAME"
  },
  {
    "paramType": "M",
    "macroId": 2,
    "useScope": "MCCM",
    "paramCode": "START_DATE",
    "macroScriptId": 2,
    "hasParam": null,
    "paramName": "START_DATE"
  },
  {
    "paramType": "M",
    "macroId": 3,
    "useScope": "MCCM",
    "paramCode": "END_DATE",
    "macroScriptId": 3,
    "hasParam": null,
    "paramName": "END_DATE"
  },
  {
    "paramType": "M",
    "macroId": 4,
    "useScope": "MCCM",
    "paramCode": "OFFER_NAME",
    "macroScriptId": 4,
    "hasParam": null,
    "paramName": "OFFER_NAME"
  },
  {
    "paramType": "M",
    "macroId": 5,
    "useScope": "MCCM",
    "paramCode": "RESPONSE_CODE",
    "macroScriptId": 5,
    "hasParam": null,
    "paramName": "RESPONSE_CODE"
  },
  {
    "paramType": "M",
    "macroId": 6,
    "useScope": "MCCM",
    "paramCode": "SUBS_ID",
    "macroScriptId": 6,
    "hasParam": null,
    "paramName": "SUBS_ID"
  },
  {
    "paramType": "M",
    "macroId": 7,
    "useScope": "MCCM",
    "paramCode": "ACC_NBR",
    "macroScriptId": 7,
    "hasParam": null,
    "paramName": "ACC_NBR"
  },
  {
    "paramType": "M",
    "macroId": 8,
    "useScope": "MCCM",
    "paramCode": "CUST_NAME",
    "macroScriptId": 8,
    "hasParam": null,
    "paramName": "CUST_NAME"
  },
  {
    "paramType": "M",
    "macroId": 13,
    "useScope": "MCCM",
    "paramCode": "QST_NAIRE_URL",
    "macroScriptId": 13,
    "hasParam": null,
    "paramName": "QST_NAIRE_URL"
  },
  {
    "paramType": "M",
    "macroId": 16,
    "useScope": "MCCM",
    "paramCode": "CONFIGED_END_DATE",
    "macroScriptId": 16,
    "hasParam": "Y",
    "paramName": "CONFIGED_END_DATE"
  },
  {
    "paramType": "M",
    "macroId": 17,
    "useScope": "MCCM",
    "paramCode": "CONTACT_ID",
    "macroScriptId": 17,
    "hasParam": null,
    "paramName": "CONTACT_ID"
  },
  {
    "paramType": "M",
    "macroId": 18,
    "useScope": "MCCM",
    "paramCode": "APP_DEEP_LINK",
    "macroScriptId": 18,
    "hasParam": null,
    "paramName": "APP_DEEP_LINK"
  },
  {
    "paramType": "M",
    "macroId": 19,
    "useScope": "MCCM",
    "paramCode": "VOUCHER_NUMBER",
    "macroScriptId": 19,
    "hasParam": null,
    "paramName": "VOUCHER_NUMBER"
  },
  {
    "paramType": "M",
    "macroId": 20,
    "useScope": "MCCM",
    "paramCode": "VOUCHER_VALID_DATE",
    "macroScriptId": 20,
    "hasParam": null,
    "paramName": "VOUCHER_VALID_DATE"
  },
  {
    "paramType": "M",
    "macroId": 21,
    "useScope": "MCCM",
    "paramCode": "SysDate",
    "macroScriptId": 21,
    "hasParam": null,
    "paramName": "SysDate"
  },
  {
    "paramType": "M",
    "macroId": 22,
    "useScope": "MCCM",
    "paramCode": "ENCRIPT_ACC_NBR",
    "macroScriptId": 22,
    "hasParam": null,
    "paramName": "ENCRIPT_ACC_NBR"
  },
  {
    "paramType": "M",
    "macroId": 61,
    "useScope": "MCCM",
    "paramCode": "TIME_RANGE_END",
    "macroScriptId": 61,
    "hasParam": null,
    "paramName": "TIME_RANGE_END"
  },
  {
    "paramType": "M",
    "macroId": 62,
    "useScope": "MCCM",
    "paramCode": "FAILURE_THRESHOLD",
    "macroScriptId": 62,
    "hasParam": null,
    "paramName": "FAILURE_THRESHOLD"
  },
  {
    "paramType": "M",
    "macroId": 63,
    "useScope": "MCCM",
    "paramCode": "ALARM_NAME",
    "macroScriptId": 63,
    "hasParam": null,
    "paramName": "ALARM_NAME"
  },
  {
    "paramType": "M",
    "macroId": 64,
    "useScope": "MCCM",
    "paramCode": "TIME_RANGE_START",
    "macroScriptId": 64,
    "hasParam": null,
    "paramName": "TIME_RANGE_START"
  },
  {
    "paramType": "M",
    "macroId": 66,
    "useScope": "MCCM",
    "paramCode": "CAMPAIGN_CODE",
    "macroScriptId": 66,
    "hasParam": null,
    "paramName": "CAMPAIGN_CODE"
  },
  {
    "paramType": "M",
    "macroId": 67,
    "useScope": "MCCM",
    "paramCode": "CAMPAIGN_END_DATE",
    "macroScriptId": 67,
    "hasParam": null,
    "paramName": "CAMPAIGN_END_DATE"
  },
  {
    "paramType": "M",
    "macroId": 68,
    "useScope": "MCCM",
    "paramCode": "STAFF_NAME",
    "macroScriptId": 68,
    "hasParam": null,
    "paramName": "STAFF_NAME"
  },
  {
    "paramType": "M",
    "macroId": 103,
    "useScope": "MCCM",
    "paramCode": "REWARD_NAME",
    "macroScriptId": 103,
    "hasParam": null,
    "paramName": "REWARD_NAME"
  },
  {
    "paramType": "M",
    "macroId": 104,
    "useScope": "MCCM",
    "paramCode": "LUCKY_DRAW_NAME",
    "macroScriptId": 104,
    "hasParam": null,
    "paramName": "LUCKY_DRAW_NAME"
  },
  {
    "paramType": "M",
    "macroId": 105,
    "useScope": "MCCM",
    "paramCode": "MY_PRIZES_LINK",
    "macroScriptId": 105,
    "hasParam": null,
    "paramName": "MY_PRIZES_LINK"
  },
  {
    "paramType": "M",
    "macroId": 106,
    "useScope": "MCCM",
    "paramCode": "DATE_UNIT",
    "macroScriptId": 106,
    "hasParam": null,
    "paramName": "DATE_UNIT"
  },
  {
    "paramType": "M",
    "macroId": 107,
    "useScope": "MCCM",
    "paramCode": "VALID_DAYS",
    "macroScriptId": 107,
    "hasParam": null,
    "paramName": "VALID_DAYS"
  },
  {
    "paramType": "M",
    "macroId": 108,
    "useScope": "MCCM",
    "paramCode": "PRC_RES_SN",
    "macroScriptId": 108,
    "hasParam": null,
    "paramName": "PRC_RES_SN"
  },
  {
    "paramType": "M",
    "macroId": 109,
    "useScope": "MCCM",
    "paramCode": "PRC_RES_PWD",
    "macroScriptId": 109,
    "hasParam": null,
    "paramName": "PRC_RES_PWD"
  },
  {
    "paramType": "M",
    "macroId": 110,
    "useScope": "MCCM",
    "paramCode": "PRC_RES_EXP_DATE",
    "macroScriptId": 110,
    "hasParam": null,
    "paramName": "PRC_RES_EXP_DATE"
  },
  {
    "paramType": "M",
    "macroId": 111,
    "useScope": "MCCM",
    "paramCode": "MY_PRIZES_LINK_INBOX",
    "macroScriptId": 111,
    "hasParam": null,
    "paramName": "MY_PRIZES_LINK_INBOX"
  },
  {
    "paramType": "M",
    "macroId": 121,
    "useScope": "MCCM",
    "paramCode": "LAST_DAY_OF_MONTH",
    "macroScriptId": 121,
    "hasParam": "Y",
    "paramName": "LAST_DAY_OF_MONTH"
  },
  {
    "paramType": "M",
    "macroId": 122,
    "useScope": "MCCM",
    "paramCode": "vasOfferName",
    "macroScriptId": 122,
    "hasParam": null,
    "paramName": "vasOfferName"
  },
  {
    "paramType": "M",
    "macroId": 123,
    "useScope": "MCCM",
    "paramCode": "DAYS_TO_THE_LAST_DAY_OF_MONTH",
    "macroScriptId": 123,
    "hasParam": null,
    "paramName": "DAYS_TO_THE_LAST_DAY_OF_MONTH"
  },
  {
    "paramType": "M",
    "macroId": 124,
    "useScope": "MCCM",
    "paramCode": "FORMAT_BONUS_VALUE",
    "macroScriptId": 124,
    "hasParam": null,
    "paramName": "FORMAT_BONUS_VALUE"
  },
  {
    "paramType": "M",
    "macroId": 125,
    "useScope": "MCCM",
    "paramCode": "FORMAT_BONUS_UNIT",
    "macroScriptId": 125,
    "hasParam": null,
    "paramName": "FORMAT_BONUS_UNIT"
  },
  {
    "paramType": "M",
    "macroId": 126,
    "useScope": "MCCM",
    "paramCode": "FILE_NAME",
    "macroScriptId": 126,
    "hasParam": null,
    "paramName": "FILE_NAME"
  },
  {
    "paramType": "M",
    "macroId": 127,
    "useScope": "MCCM",
    "paramCode": "OPERATION_TIME",
    "macroScriptId": 127,
    "hasParam": null,
    "paramName": "OPERATION_TIME"
  },
  {
    "paramType": "M",
    "macroId": 128,
    "useScope": "MCCM",
    "paramCode": "FILE_DOWNLOAD_STATUS",
    "macroScriptId": 128,
    "hasParam": null,
    "paramName": "FILE_DOWNLOAD_STATUS"
  },
  {
    "paramType": "M",
    "macroId": 129,
    "useScope": "MCCM",
    "paramCode": "OPER_STAFF_NAME",
    "macroScriptId": 129,
    "hasParam": null,
    "paramName": "OPER_STAFF_NAME"
  },
  {
    "paramType": "M",
    "macroId": 130,
    "useScope": "MCCM",
    "paramCode": "FAIL_RATE",
    "macroScriptId": 130,
    "hasParam": null,
    "paramName": "FAIL_RATE"
  },
  {
    "paramType": "M",
    "macroId": 131,
    "useScope": "MCCM",
    "paramCode": "PROCESS_TYPE_NAME",
    "macroScriptId": 131,
    "hasParam": null,
    "paramName": "PROCESS_TYPE_NAME"
  },
  {
    "paramType": "M",
    "macroId": 132,
    "useScope": "MCCM",
    "paramCode": "APPROVE_OPERTION_TYPE",
    "macroScriptId": 132,
    "hasParam": null,
    "paramName": "APPROVE_OPERTION_TYPE"
  },
  {
    "paramType": "M",
    "macroId": 148,
    "useScope": "MCCM",
    "paramCode": "EMAIL_TRACK",
    "macroScriptId": 148,
    "hasParam": null,
    "paramName": "EMAIL_TRACK"
  },
  {
    "paramType": "M",
    "macroId": 149,
    "useScope": "MCCM",
    "paramCode": "UTM_LINK",
    "macroScriptId": 149,
    "hasParam": "Y",
    "paramName": "UTM_LINK"
  },
  {
    "paramType": "M",
    "macroId": 151,
    "useScope": "MCCM",
    "paramCode": "BONUS_LIST",
    "macroScriptId": 151,
    "hasParam": null,
    "paramName": "BONUS_LIST"
  },
  {
    "paramType": "M",
    "macroId": 155,
    "useScope": "MCCM",
    "paramCode": "OFFER_LIST",
    "macroScriptId": 155,
    "hasParam": null,
    "paramName": "OFFER_LIST"
  },
  {
    "paramType": "M",
    "macroId": 156,
    "useScope": "MCCM",
    "paramCode": "NOTIFY_CONTACT_ID",
    "macroScriptId": 156,
    "hasParam": null,
    "paramName": "NOTIFY_CONTACT_ID"
  },
  {
    "paramType": "M",
    "macroId": 157,
    "useScope": "MCCM",
    "paramCode": "ORDER_RET_CODE",
    "macroScriptId": 157,
    "hasParam": null,
    "paramName": "ORDER_RET_CODE"
  },
  {
    "paramType": "M",
    "macroId": 158,
    "useScope": "MCCM",
    "paramCode": "CRM_ORDER_ID",
    "macroScriptId": 158,
    "hasParam": null,
    "paramName": "CRM_ORDER_ID"
  },
  {
    "paramType": "M",
    "macroId": 159,
    "useScope": "MCCM",
    "paramCode": "VOUCHER_CODE",
    "macroScriptId": 159,
    "hasParam": null,
    "paramName": "VOUCHER_CODE"
  },
  {
    "paramType": "M",
    "macroId": 160,
    "useScope": "MCCM",
    "paramCode": "LOTTERY_CHANCE",
    "macroScriptId": 160,
    "hasParam": null,
    "paramName": "LOTTERY_CHANCE"
  },
  {
    "paramType": "M",
    "macroId": 161,
    "useScope": "MCCM",
    "paramCode": "PERCENTAGE",
    "macroScriptId": 161,
    "hasParam": null,
    "paramName": "PERCENTAGE"
  },
  {
    "paramType": "M",
    "macroId": 2001,
    "useScope": "GCP",
    "paramCode": "REWARD_TYPE",
    "macroScriptId": 2001,
    "hasParam": null,
    "paramName": "REWARD_TYPE"
  },
  {
    "paramType": "M",
    "macroId": 2002,
    "useScope": "GCP",
    "paramCode": "REWARD_CODE",
    "macroScriptId": 2002,
    "hasParam": null,
    "paramName": "REWARD_CODE"
  },
  {
    "paramType": "M",
    "macroId": 2016,
    "useScope": "GCP",
    "paramCode": "RECEIVE_DEAD_DATE",
    "macroScriptId": 2016,
    "hasParam": null,
    "paramName": "RECEIVE_DEAD_DATE"
  },
  {
    "paramType": "M",
    "macroId": 2017,
    "useScope": "GCP",
    "paramCode": "LUCKY_DRAW_EFF_DATE",
    "macroScriptId": 2017,
    "hasParam": null,
    "paramName": "LUCKY_DRAW_EFF_DATE"
  },
  {
    "paramType": "M",
    "macroId": 2018,
    "useScope": "GCP",
    "paramCode": "LUCKY_DRAW_EXP_DATE",
    "macroScriptId": 2018,
    "hasParam": null,
    "paramName": "LUCKY_DRAW_EXP_DATE"
  },
  {
    "paramType": "M",
    "macroId": 2019,
    "useScope": "GCP",
    "paramCode": "USER_NAME",
    "macroScriptId": 2019,
    "hasParam": null,
    "paramName": "USER_NAME"
  },
  {
    "paramType": "M",
    "macroId": 2020,
    "useScope": "GCP",
    "paramCode": "TO_MSISDN",
    "macroScriptId": 2020,
    "hasParam": null,
    "paramName": "TO_MSISDN"
  },
  {
    "paramType": "M",
    "macroId": 2021,
    "useScope": "GCP",
    "paramCode": "COUPON_CODE",
    "macroScriptId": 2021,
    "hasParam": null,
    "paramName": "COUPON_CODE"
  },
  {
    "paramType": "M",
    "macroId": 2022,
    "useScope": "GCP",
    "paramCode": "COUPON_EFF_DATE",
    "macroScriptId": 2022,
    "hasParam": null,
    "paramName": "COUPON_EFF_DATE"
  },
  {
    "paramType": "M",
    "macroId": 2023,
    "useScope": "GCP",
    "paramCode": "COUPON_EXP_DATE",
    "macroScriptId": 2023,
    "hasParam": null,
    "paramName": "COUPON_EXP_DATE"
  }
];

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


// 插入宏和变量
const MacroTabs = (props) => {
  const [anchorElement, setAnchorElement] = useState(null);

  const { editor } = props?.editorProps;
  const { state, view } = editor?.current || {};

  const groupedData = (menuItem || []).reduce((acc, item) => {
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
      caption: item.paramName,
      // onClick: () => {} // 这里可以定义点击事件
    });
    return acc;
  }, {});

  const finalData = Object.values(groupedData).map(group => ({
    key: group.key,
    caption: group.caption,
    subMenuItems: group.subMenuItems.map(subItem => ({
      ...subItem,
      key: subItem.key,
      caption: subItem.caption,
      onClick: subItem.onClick
    }))
  }));
  console.log(groupedData,finalData);

  const handle = (v) => {
    console.log("v", v);
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
      menuItems={finalData||[]}
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
      <div style={{ color: '#1F1F21', marginTop: '10px' }} title='GitHub Flavored Markdown and Liquid templating supported' >GitHub Flavored Markdown and Liquid templating supported.</div>
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
