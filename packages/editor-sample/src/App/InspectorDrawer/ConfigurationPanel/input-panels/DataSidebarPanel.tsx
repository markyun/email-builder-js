import React, { useState, useCallback } from 'react';
import { Box, Stack, Typography } from '@mui/material';

import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

import { useDocument } from '../../../../documents/editor/EditorContext';
import BaseSidebarPanel from './helpers/BaseSidebarPanel';
import './cee-codemirror2.css'; // 引入你自定义的 CSS 文件

export default function DataSidebarPanel({ data = null, setData = null}) {

  const block = useDocument().root;
  if (!block) {
    return <p>Block not found</p>;
  }

  console.log("DataSidebarPanel init");

  const initialJson = `{
    "amount": 50,
    "refund_id": "09234p29384",
    "survey_url": "https://survey.com",
    "display_name": "markyun"
  }`;

  const [value, setValue] = useState(initialJson);
  const onChange = useCallback((val, viewUpdate) => {
    setValue(val);
  }, []);


  const [, setErrors] = useState<Zod.ZodError | null>(null);

  const updateData = (d: unknown) => {
    if (d) {
      // setData(d);
      setErrors(null);
    } else {
      setErrors(res.error);
    }
  };
  return (
    <BaseSidebarPanel title="Variables Data">
        <p style={{color:'#1F1F21', margin:'0'}}>Mimic the JSON data that your application will pass to this template. <br/>Eg: <code>{ "{ \"displayName\": \"Joe\" }" }</code>.</p>
        <p style={{color:'#1F1F21',marginTop:'10px'}}> Output variables on your template using Liquid syntax. <br/>  Eg:<code>{"{{ displayName }}"}</code>.</p>

        <div className='cee-codemirror2'>
          <CodeMirror value={value} height="300px" placeholder='Variables Data' extensions={[javascript({ jsx: true })]} onChange={onChange} />
        </div>

    </BaseSidebarPanel>
  );
}
