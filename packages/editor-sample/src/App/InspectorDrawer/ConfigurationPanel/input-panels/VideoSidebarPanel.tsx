/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { VideoProps, VideoPropsSchema } from '@digitalc/block-video';
import BaseSidebarPanel from './helpers/BaseSidebarPanel';
import TextInput from './helpers/inputs/TextInput';
import BooleanInput from './helpers/inputs/BooleanInput';
import MultiStylePropertyPanel from './helpers/style-inputs/MultiStylePropertyPanel';

// type HtmlSidebarPanelProps = {
//   data: VideoProps;
//   setData: (v: VideoProps) => void;
// };
export default function VideoSidebarPanel({ data, setData }) {
  const [, setErrors] = useState<Zod.ZodError | null>(null);

  const updateData = (d: unknown) => {
    const res = VideoPropsSchema.safeParse(d);
    if (res.success) {
      setData(res.data);
      setErrors(null);
    } else {
      setErrors(res.error);
    }
  };

  return (
    <BaseSidebarPanel title="Video block">
      <span>Can only be used in web scenarios</span>
      <TextInput
        label="Url"
        rows={5}
        placeholder="eg: https://digix.iwhalecloud.com/media/luckyWheel.mp4 "
        defaultValue={data.props?.url ?? ''}
        onChange={(url) => updateData({ ...data, props: { ...data.props, url } })}
      />

      <BooleanInput
        label="Controls"
        defaultValue={data.props?.controls}
        onChange={(controls) => updateData({ ...data, props: { ...data.props, controls } })}
      />

      {/* <div>HTML supported.</div> */}
      <MultiStylePropertyPanel
        names={['color', 'backgroundColor', 'fontFamily', 'fontSize', 'textAlign', 'padding']}
        value={data.style}
        onChange={(style) => updateData({ ...data, style })}
      />
    </BaseSidebarPanel>
  );
}
