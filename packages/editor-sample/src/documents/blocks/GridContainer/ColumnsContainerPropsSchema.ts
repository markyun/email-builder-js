import { z } from 'zod';

import { GridPropsSchema as BaseColumnsContainerPropsSchema } from '@digitalc/block-grid-layout';

const BasePropsShape = BaseColumnsContainerPropsSchema.shape.props.unwrap().unwrap().shape;

const GridContainerPropsSchema = z.object({
  style: BaseColumnsContainerPropsSchema.shape.style,
  props: z
    .object({
      ...BasePropsShape,
      columns: z.any().optional().nullable(),
    })
    .optional()
    .nullable(),
});

export default GridContainerPropsSchema;
export type GridContainerProps = z.infer<typeof GridContainerPropsSchema>;
