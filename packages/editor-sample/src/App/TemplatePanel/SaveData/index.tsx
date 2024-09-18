import React, { useMemo } from 'react';

import { SaveOutlined } from '@mui/icons-material';
import { IconButton, Button, Tooltip } from '@mui/material';
import { renderToStaticMarkup } from '@usewaypoint/email-builder';
import { SnackbarProvider, useSnackbar } from 'notistack';

import { useDocument } from '../../../documents/editor/EditorContext';

function SaveData() {
  const doc = useDocument();
  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (variant) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar('Successfully saved to local!', {
      variant,
      preventDuplicate: true,
      autoHideDuration: 2000,
      transitionDuration: { enter: 525, exit: 295 },
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center'
      }
    });
  };

  // 转换为HTML电子邮件字符串
  const htmlCode = useMemo(() => renderToStaticMarkup(doc, { rootBlockId: 'root' }), [doc]);
  const code = JSON.stringify(doc, null, ' ');

  const saveCode = () => {
    // console.log("saveCode", code);
    // console.log("saveCode htmlCode", htmlCode);
    // 通知父窗口保存
    window?.parent?.postMessage(
      {
        data: {
          json: code,
          html: htmlCode,
        },
        type: 'mccm.cms.saveData.callback',
      },
      '*'
    );
    setTimeout(() => {
      handleClickVariant('success');
    }, 1500);
  };

  return (
    <React.Fragment>
      <Tooltip title="Save JSON code and Email code">
        <IconButton onClick={() => {
          saveCode('clicked');
        }} >
          <SaveOutlined fontSize="small" />
        </IconButton>

        {/*  有底色的按钮 */}
        {/* <Button variant="contained" size="small"
          startIcon={<SaveOutlined fontSize="small" />}
          onClick={() => {
            saveCode('clicked');
          }}>
          Save
        </Button> */}
      </Tooltip>
    </React.Fragment>
  );
}
export default function Index() {
  return (
    <SnackbarProvider maxSnack={3}>
      <SaveData />
    </SnackbarProvider>
  );
}