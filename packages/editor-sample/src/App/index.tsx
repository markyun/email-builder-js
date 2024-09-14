import React, { useState, useEffect } from 'react';
import { Stack, useTheme } from '@mui/material';
import { Liquid } from 'liquidjs';

import { useInspectorDrawerOpen, useSamplesDrawerOpen } from '../documents/editor/EditorContext';

import InspectorDrawer, { INSPECTOR_DRAWER_WIDTH } from './InspectorDrawer';
import SamplesDrawer, { SAMPLES_DRAWER_WIDTH } from './SamplesDrawer';
import TemplatePanel from './TemplatePanel';

function useDrawerTransition(cssProperty: 'margin-left' | 'margin-right', open: boolean) {
  const { transitions } = useTheme();
  return transitions.create(cssProperty, {
    easing: !open ? transitions.easing.sharp : transitions.easing.easeOut,
    duration: !open ? transitions.duration.leavingScreen : transitions.duration.enteringScreen,
  });
}

export default function App() {
  const [templateOutput, setTemplateOutput] = useState('');

  const inspectorDrawerOpen = useInspectorDrawerOpen();
  const samplesDrawerOpen = useSamplesDrawerOpen();

  const marginLeftTransition = useDrawerTransition('margin-left', samplesDrawerOpen);
  const marginRightTransition = useDrawerTransition('margin-right', inspectorDrawerOpen);

  // Liquid 变量测试
  useEffect(() => {
    const engine = new Liquid({
      cache: process.env.NODE_ENV === 'production'
    });

    const data = { name: 'Ma.jinyun', test: 'test22' };
    const template = `Hello, {{ name }}  + {{ test }} {{ template }}!`;
    engine.parseAndRender(template, data).then(rendered => {
      setTemplateOutput(rendered);
    });
  }, []); // 空依赖数组确保这个 effect 只运行一次

  console.log("Liquid 变量测试",templateOutput);

  return (
    <>
      {/* 左侧模板 */}
      <SamplesDrawer />
      {/* 右侧属性修改 */}
      <InspectorDrawer />
       {/* Editor Block */}
      <Stack
        data-cee="模板编辑区"
        sx={{
          marginRight: inspectorDrawerOpen ? `${INSPECTOR_DRAWER_WIDTH}px` : 0,
          marginLeft: samplesDrawerOpen ? `${SAMPLES_DRAWER_WIDTH}px` : 0,
          transition: [marginLeftTransition, marginRightTransition].join(', '),
        }}
      >
        <TemplatePanel />
      </Stack>
    </>
  );
}
