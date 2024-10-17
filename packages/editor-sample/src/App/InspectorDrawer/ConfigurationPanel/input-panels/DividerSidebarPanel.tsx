import React, { useState } from 'react';

import { HeightOutlined, OpacityOutlined } from '@mui/icons-material';
import { DividerProps, DividerPropsDefaults, DividerPropsSchema } from '@digitalc/block-divider';

import BaseSidebarPanel from './helpers/BaseSidebarPanel';
import ColorInput from './helpers/inputs/ColorInput';
import SliderInput from './helpers/inputs/SliderInput';
import MultiStylePropertyPanel from './helpers/style-inputs/MultiStylePropertyPanel';

type DividerSidebarPanelProps = {
  data: DividerProps;
  setData: (v: DividerProps) => void;
};
export default function DividerSidebarPanel({ data, setData }: DividerSidebarPanelProps) {
  const [, setErrors] = useState<Zod.ZodError | null>(null);
  const updateData = (d: unknown) => {
    const res = DividerPropsSchema.safeParse(d);
    console.log('🚀 ~ Divider updateData ~ res:', res);
    if (res.success) {
      setData(res.data);
      setErrors(null);
    } else {
      setErrors(res.error);
    }
  };

  const lineColor = data.props?.lineColor ?? DividerPropsDefaults.lineColor;
  const lineHeight = data.props?.lineHeight ?? DividerPropsDefaults.lineHeight;
  const opacity = data.props?.opacity ?? DividerPropsDefaults.opacity;

  return (
    <BaseSidebarPanel title="Divider block">
      <ColorInput
        label="Color"
        defaultValue={lineColor}
        onChange={(lineColor) => updateData({ ...data, props: { ...data.props, lineColor } })}
      />
      <SliderInput
        label="Height"
        iconLabel={<HeightOutlined sx={{ color: 'text.secondary' }} />}
        units="px"
        step={1}
        min={1}
        max={24}
        defaultValue={lineHeight}
        onChange={(lineHeight) => updateData({ ...data, props: { ...data.props, lineHeight } })}
      />
      <SliderInput
        label="Opacity"
        iconLabel={<OpacityOutlined sx={{ color: 'text.secondary' }} />}
        units="%"
        step={1}
        min={1}
        max={100}
        defaultValue={opacity}
        onChange={(opacity) => updateData({ ...data, props: { ...data.props, opacity } })}
      />
      <MultiStylePropertyPanel
        names={['backgroundColor', 'padding']}
        value={data.style}
        onChange={(style) => updateData({ ...data, style })}
      />
    </BaseSidebarPanel>
  );
}
