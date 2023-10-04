'use client';

import { extendVariants, Button as NextButton } from '@nextui-org/react';

const Button = extendVariants(NextButton, {
  variants: {
    color: {
      primary: 'hover:bg-primary-600',
      secondary: 'hover:bg-secondary-400',
      success: 'hover:bg-success-600',
      warning: 'hover:bg-warning-600',
      error: 'hover:bg-error-600',
      info: 'hover:bg-info-600',
    },
  },
});

export default Button;
