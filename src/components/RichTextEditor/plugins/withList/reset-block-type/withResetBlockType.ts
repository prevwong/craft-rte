import { Editor } from 'slate';

import { WithResetBlockTypeOptions } from './types';
import { withBreakEmptyReset } from './withBreakEmptyReset';
import { withDeleteStartReset } from './withDeleteStartReset';

/**
 * Combine {@link withBreakEmptyReset} and {@link withDeleteStartReset}.
 */
export const withResetBlockType = (options: WithResetBlockTypeOptions) => <
  T extends Editor
>(
  editor: T
) => {
  // eslint-disable-next-line no-param-reassign
  editor = withBreakEmptyReset(options)(editor);

  // eslint-disable-next-line no-param-reassign
  editor = withDeleteStartReset(options)(editor);

  return editor;
};
