import React, { useState } from 'react';


import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';


import BaseSidebarPanel from './helpers/BaseSidebarPanel';
import BooleanInput from './helpers/inputs/BooleanInput';
import TextInput from './helpers/inputs/TextInput';
import MultiStylePropertyPanel from './helpers/style-inputs/MultiStylePropertyPanel';
export default function TextSidebarPanel({ data = null, setData = null}) {

  // JSON 格式的初始数据
  const initialJson = `{
    "amount": 50,
    "refund_id": "09234p29384",
    "survey_url": "https://survey.com",
    "display_name": "markyun"
  }`;

  const [code, setCode] = useState(initialJson);
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
    <BaseSidebarPanel title="Variables Data ">
        <p style={{color:'#1F1F21', margin:'0'}}>Mimic the JSON data that your application will pass to this template. Eg: <br/><code>{ "{ \"displayName\": \"Joe\" }" }</code>.</p>
        <p style={{color:'#1F1F21',marginTop:'10px'}}> Output variables on your template using Liquid syntax. Eg: <br/> <code>{"{{ displayName }}"}</code>.</p>

        <CodeMirror
        value={code}
        options={{
          mode: { name: "javascript", json: true },
          theme: "default",
          lineNumbers: true,
        }}
        onBeforeChange={(editor, data, value) => {
          setCode(value);
        }}
        onChange={(editor, data, value) => {
          console.log('Controlled:', value);
          updateData(value);
        }}
      />

      {/* <TextInput
        label="Content"
        rows={5}
        defaultValue={''}
        onChange={(text) => updateData({ ...data, props: { ...data?.props, text } })}
      /> */}

    </BaseSidebarPanel>
  );
}
