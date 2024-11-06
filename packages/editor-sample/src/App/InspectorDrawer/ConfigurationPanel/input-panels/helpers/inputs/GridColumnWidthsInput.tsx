import React, { useState } from 'react';

import { Stack } from '@mui/material';

import TextDimensionInput from './TextDimensionInput';

export const DEFAULT_2_COLUMNS = [6] as [number];
export const DEFAULT_3_COLUMNS = [4, 8] as [number, number];

type TWidthValue = number | null | undefined;
type FixedWidths = [
  //
  number | null | undefined,
  number | null | undefined,
  number | null | undefined,
];
type ColumnsLayoutInputProps = {
  defaultValue: FixedWidths | null | undefined;
  onChange: (v: FixedWidths | null | undefined) => void;
};
export default function ColumnWidthsInput({ defaultValue, columnsCount, onChange }: ColumnsLayoutInputProps) {
  const [currentValue, setCurrentValue] = useState<[TWidthValue, TWidthValue, TWidthValue]>(() => {
    if (defaultValue) {
      return defaultValue;
    }
    return [null, null, null, null, null, null];
  });

  const setIndexValue = (index: number, value: number | null | undefined) => {
    if (value >= 0) {
      const nValue: FixedWidths = [...currentValue];
      nValue[index] = value;
      setCurrentValue(nValue);
      onChange(nValue);
    }
  };

  const columnsCountValue = columnsCount;
  let column3 = null;
  if (columnsCountValue >= 3) {
    column3 = (
      <TextDimensionInput
        label="Column 3"
        type="number"
        unit="%"
        defaultValue={currentValue?.[2]}
        onChange={(v) => {
          setIndexValue(2, v);
        }}
      />
    );
  }
  let column4 = null;
  if (columnsCountValue >= 4) {
    column4 = (
      <TextDimensionInput
        label="Column 4"
        type="number"
        unit="%"
        defaultValue={currentValue?.[3]}
        onChange={(v) => {
          setIndexValue(3, v);
        }}
      />
    );
  }
  let column5 = null;
  if (columnsCountValue >= 5) {
    column5 = (
      <TextDimensionInput
        label="Column 5"
        type="number"
        unit="%"
        defaultValue={currentValue?.[4]}
        onChange={(v) => {
          setIndexValue(4, v);
        }}
      />
    );
  }
  let column6 = null;
  if (columnsCountValue >= 6) {
    column6 = (
      <TextDimensionInput
        label="Column 6"
        type="number"
        unit="%"
        defaultValue={currentValue?.[5]}
        onChange={(v) => {
          setIndexValue(5, v);
        }}
      />
    );
  }
  return (
    <>
      <Stack direction="row" spacing={1}>
        <TextDimensionInput
          label="Column 1"
          type="number"
          unit="%"
          defaultValue={currentValue?.[0]}
          onChange={(v) => {
            setIndexValue(0, v);
          }}
        />
        <TextDimensionInput
          label="Column 2"
          type="number"
          unit="%"
          defaultValue={currentValue?.[1]}
          onChange={(v) => {
            setIndexValue(1, v);
          }}
        />
        {column3}
      </Stack>

      <Stack direction="row" spacing={1}>
        {column4}
        {column5}
        {column6}
      </Stack>
    </>
  );
}
