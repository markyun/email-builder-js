/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Stack } from '@mui/material';

import TemplatePanel from '../App/TemplatePanel';


export default function Index() {
  const [templateOutput, setTemplateOutput] = useState('');

  useEffect(() => {

  }, []); // 空依赖数组确保这个 effect 只运行一次

  return (
    <>
      <Stack
        data-cee="Preview模板"
        sx={{
          marginRight: 0,
          marginLeft: 0,
        }}
      >
        <TemplatePanel isPreview />
      </Stack>
    </>
  );
}
