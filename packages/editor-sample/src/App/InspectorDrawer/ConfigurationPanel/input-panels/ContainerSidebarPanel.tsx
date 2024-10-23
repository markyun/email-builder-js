import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button, ToggleButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import ContainerPropsSchema, { ContainerProps } from '../../../../documents/blocks/Container/ContainerPropsSchema';

import BaseSidebarPanel from './helpers/BaseSidebarPanel';
import MultiStylePropertyPanel from './helpers/style-inputs/MultiStylePropertyPanel';
import RadioGroupInput from './helpers/inputs/RadioGroupInput';
import TextInput from './helpers/inputs/TextInput';

type ContainerSidebarPanelProps = {
  data: ContainerProps;
  setData: (v: ContainerProps) => void;
};

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function ContainerSidebarPanel({ data, setData }: ContainerSidebarPanelProps) {
  const [, setErrors] = useState<Zod.ZodError | null>(null);
  const [imageType, setImageType] = useState('URL');

  const updateData = (d: unknown) => {
    const res = ContainerPropsSchema.safeParse(d);
    if (res.success) {
      setData(res.data);
      setErrors(null);
    } else {
      setErrors(res.error);
    }
  };
  return (
    <BaseSidebarPanel title="Container block">
      <Box sx={{ 'font-size': '13px' }}>Image background</Box>
      <Box
        sx={{
          border: '1px solid rgba(0, 0, 0, 0.12)',
          padding: '14px 8px',
          marginTop: '10px!important',
          minHeight: '160px',
        }}
      >
        <RadioGroupInput
          label=""
          defaultValue={imageType}
          onChange={(v) => {
            setImageType(v);
          }}
        >
          <ToggleButton value="URL">URL</ToggleButton>
          <ToggleButton value="Upload">Upload</ToggleButton>
        </RadioGroupInput>
        {imageType === 'URL' && (
          <>
            <TextInput
              label="Image URL"
              style={{ marginTop: '14px' }}
              defaultValue={data.style?.url ?? ''}
              onChange={(v) => {
                const url = v.trim().length === 0 ? null : v.trim();
                updateData({ ...data, style: { ...data.style, url } });
              }}
            />
            <TextInput
              label="Background setting"
              style={{ marginTop: '14px' }}
              defaultValue={data.style?.bgSetting ?? ''}
              placeholder="eg: no-repeat left bottom / cover #000"
              onChange={(v) => {
                const bgSetting = v.trim().length === 0 ? null : v.trim();
                updateData({ ...data, style: { ...data.style, bgSetting } });
              }}
            />
          </>
        )}
        {imageType === 'Upload' && (
          <Box sx={{ textAlign: 'center', margin: '30px 0' }}>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload files
              <VisuallyHiddenInput
                type="file"
                accept=".jpeg,.jpg,.png,.gif"
                onChange={(event) => {
                  const formData = new FormData();
                  formData.append('file', event?.target?.files?.[0]);
                  request('/ceg/ceg/UploadImageController/saveImageFile', {
                    // request('/rap2api/ceg/UploadImageController/saveImageFile', {
                    method: 'post',
                    data: formData,
                    headers: {
                      'Content-Type': 'multipart/form-data',
                    },
                  })
                    .then((response) => {
                      // 处理响应
                      console.log('ImageFile 上传成功', response);
                      const ImgUrl = response?.fileLocation;
                      if (ImgUrl) {
                        const url = getAccessibleAddress(ImgUrl);
                        updateData({ ...data, style: { ...data.style, url } });
                        setImageType('URL');
                      }
                    })
                    .catch((error) => {
                      console.error('文件上传失败', error);
                    });
                }}
                // multiple
              />
            </Button>
          </Box>
        )}
      </Box>

      <MultiStylePropertyPanel
        names={['backgroundColor', 'borderColor', 'borderRadius', 'padding', 'margin', 'float']}
        value={data.style}
        onChange={(style) => updateData({ ...data, style })}
      />
    </BaseSidebarPanel>
  );
}
