import React, { useState } from 'react';

import {
  VerticalAlignBottomOutlined,
  VerticalAlignCenterOutlined,
  VerticalAlignTopOutlined,
} from '@mui/icons-material';
import { Box, Stack, Button, ToggleButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ImageProps, ImagePropsSchema } from '@usewaypoint/block-image';

import request, { getAccessibleAddress } from '../../../../utils/commonRequest';
import BaseSidebarPanel from './helpers/BaseSidebarPanel';
import RadioGroupInput from './helpers/inputs/RadioGroupInput';
import TextDimensionInput from './helpers/inputs/TextDimensionInput';
import TextInput from './helpers/inputs/TextInput';
import MultiStylePropertyPanel from './helpers/style-inputs/MultiStylePropertyPanel';

type ImageSidebarPanelProps = {
  data: ImageProps;
  setData: (v: ImageProps) => void;
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

export default function ImageSidebarPanel({ data, setData }: ImageSidebarPanelProps) {
  const [, setErrors] = useState<Zod.ZodError | null>(null);
  const [imageType, setImageType] = useState('URL');


  const updateData = (d: unknown) => {
    const res = ImagePropsSchema.safeParse(d);
    if (res.success) {
      setData(res.data);
      setErrors(null);
    } else {
      setErrors(res.error);
    }
  };


  return (
    <BaseSidebarPanel title="Image block">
      <Box sx={{ 'font-size': '13px' }}>Image source</Box>
      <Box sx={{ border: '1px solid rgba(0, 0, 0, 0.12)', padding: '14px 8px', marginTop: '10px!important', minHeight: '160px' }}>
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
          <TextInput
            label="Image URL"
            style={{ marginTop: '14px' }}
            defaultValue={data.props?.url ?? ''}
            onChange={(v) => {
              const url = v.trim().length === 0 ? null : v.trim();
              updateData({ ...data, props: { ...data.props, url } });
            }}
          />)}
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
                    .then(response => {
                      // 处理响应
                      console.log('ImageFile 上传成功', response);
                      const ImgUrl = response?.fileLocation;
                      if (ImgUrl) {
                        const url = getAccessibleAddress(ImgUrl);
                        updateData({ ...data, props: { ...data.props, url } });
                      }
                    })
                    .catch(error => {
                      // 处理错误
                      console.error('文件上传失败', error);
                    });
                }}
              // multiple
              />
            </Button>
          </Box>
        )}
      </Box>

      <TextInput
        label="Alt text"
        defaultValue={data.props?.alt ?? ''}
        onChange={(alt) => updateData({ ...data, props: { ...data.props, alt } })}
      />
      <TextInput
        label="Click through URL"
        defaultValue={data.props?.linkHref ?? ''}
        onChange={(v) => {
          const linkHref = v.trim().length === 0 ? null : v.trim();
          updateData({ ...data, props: { ...data.props, linkHref } });
        }}
      />
      <Stack direction="row" spacing={2}>
        <TextDimensionInput
          label="Width"
          defaultValue={data.props?.width}
          onChange={(width) => updateData({ ...data, props: { ...data.props, width } })}
        />
        <TextDimensionInput
          label="Height"
          defaultValue={data.props?.height}
          onChange={(height) => updateData({ ...data, props: { ...data.props, height } })}
        />
      </Stack>

      <RadioGroupInput
        label="Alignment"
        defaultValue={data.props?.contentAlignment ?? 'middle'}
        onChange={(contentAlignment) => updateData({ ...data, props: { ...data.props, contentAlignment } })}
      >
        <ToggleButton value="top">
          <VerticalAlignTopOutlined fontSize="small" />
        </ToggleButton>
        <ToggleButton value="middle">
          <VerticalAlignCenterOutlined fontSize="small" />
        </ToggleButton>
        <ToggleButton value="bottom">
          <VerticalAlignBottomOutlined fontSize="small" />
        </ToggleButton>
      </RadioGroupInput>

      <MultiStylePropertyPanel
        names={['backgroundColor', 'textAlign', 'padding']}
        value={data.style}
        onChange={(style) => updateData({ ...data, style })}
      />
    </BaseSidebarPanel>
  );
}
