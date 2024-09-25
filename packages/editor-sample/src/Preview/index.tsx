import React from 'react';
import { Stack } from '@mui/material';

import TemplatePanel from '../App/TemplatePanel';



export default function Index() {
  const [templateOutput, setTemplateOutput] = useState('');
  return (
    <>
      <Stack
        data-cee="Preview模板"
        sx={{
          marginRight:  0,
          marginLeft:  0,
        }}
      >
        <TemplatePanel isPreview />
      </Stack>
    </>
  );
}
