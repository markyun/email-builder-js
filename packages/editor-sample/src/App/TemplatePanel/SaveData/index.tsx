import React, { useMemo } from 'react';

import { SaveOutlined } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

import { useDocument } from '../../../documents/editor/EditorContext';

export default function SaveData() {
  const doc = useDocument();
  const code = useMemo(() => {
    console.log("save code");
  }, [doc]);
  const saveCode = () => {
    console.log("saveCode");
  };
  return (
    <Tooltip title="Save JSON code and Email code">
        <IconButton onClick={() => {
      saveCode('clicked');
    }} >
        <SaveOutlined fontSize="small" />
      </IconButton>
    </Tooltip>
  );
}
