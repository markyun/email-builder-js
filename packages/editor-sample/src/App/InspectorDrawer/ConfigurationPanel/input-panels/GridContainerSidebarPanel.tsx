import React, { useState } from 'react';

import {
  SpaceBarOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignCenterOutlined,
  VerticalAlignTopOutlined,
  VerticalShadesClosedOutlined,
} from '@mui/icons-material';
import { ToggleButton } from '@mui/material';

import GridContainerPropsSchema, {
  GridContainerProps,
} from '../../../../documents/blocks/GridContainer/ColumnsContainerPropsSchema';

import BaseSidebarPanel from './helpers/BaseSidebarPanel';
import GridColumnWidthsInput from './helpers/inputs/GridColumnWidthsInput';
import RadioGroupInput from './helpers/inputs/RadioGroupInput';
import SliderInput from './helpers/inputs/SliderInput';
import MultiStylePropertyPanel from './helpers/style-inputs/MultiStylePropertyPanel';

type GridContainerPanelProps = {
  data: GridContainerProps;
  setData: (v: GridContainerProps) => void;
};
export default function GridContainerSidebarPanel({ data, setData }: GridContainerPanelProps) {
  const [, setErrors] = useState<Zod.ZodError | null>(null);
  const [columnsCount, setColumnsCount] = useState(data?.props?.columnsCount);
  const updateData = (d: unknown) => {
    const res = GridContainerPropsSchema.safeParse(d);
    if (res.success) {
      setData(res.data);
      setErrors(null);
    } else {
      setErrors(res.error);
    }
  };

  return (
    <BaseSidebarPanel title="Grid Layout block">
      <span>Can only be used in web scenarios</span>
      <RadioGroupInput
        label="Number of columns"
        defaultValue={`${data.props?.columnsCount}`}
        onChange={(v) => {
          updateData({ ...data, props: { ...data.props, columnsCount: parseInt(v, 10) } });
          setColumnsCount(v);
        }}
      >
        <ToggleButton value="2">2</ToggleButton>
        <ToggleButton value="3">3</ToggleButton>
        <ToggleButton value="4">4</ToggleButton>
        <ToggleButton value="5">5</ToggleButton>
        <ToggleButton value="6">6</ToggleButton>
      </RadioGroupInput>
      <GridColumnWidthsInput
        defaultValue={data.props?.fixedWidths}
        columnsCount={columnsCount}
        onChange={(fixedWidths) => {
          updateData({ ...data, props: { ...data.props, fixedWidths } });
        }}
      />
      <SliderInput
        label="Columns gap"
        iconLabel={<SpaceBarOutlined sx={{ color: 'text.secondary' }} />}
        units="px"
        step={4}
        marks
        min={0}
        max={80}
        defaultValue={data.props?.columnsGap ?? 0}
        onChange={(columnsGap) => updateData({ ...data, props: { ...data.props, columnsGap } })}
      />
      {/*       <RadioGroupInput
        label="Alignment"
        defaultValue={data.props?.contentAlignment ?? 'middle'}
        onChange={(contentAlignment) => {
          updateData({ ...data, props: { ...data.props, contentAlignment } });
        }}
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
      </RadioGroupInput> */}

      <RadioGroupInput
        label="Alignment"
        defaultValue={data.props?.contentAlignment ?? 'middle'}
        onChange={(contentAlignment) => {
          updateData({ ...data, props: { ...data.props, contentAlignment } });
        }}
      >
        <ToggleButton value="flex-start">
          <VerticalAlignTopOutlined fontSize="small" />
        </ToggleButton>
        <ToggleButton value="center">
          <VerticalAlignCenterOutlined fontSize="small" />
        </ToggleButton>
        <ToggleButton value="flex-end">
          <VerticalAlignBottomOutlined fontSize="small" />
        </ToggleButton>
        <ToggleButton value="stretch">
          <VerticalShadesClosedOutlined fontSize="small" />
        </ToggleButton>
      </RadioGroupInput>

      <MultiStylePropertyPanel
        names={['backgroundColor', 'padding']}
        value={data.style}
        onChange={(style) => updateData({ ...data, style })}
      />
    </BaseSidebarPanel>
  );
}
