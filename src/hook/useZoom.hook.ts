import { useRef } from 'react';
import Zoom from 'smooth-zoom';

export default function useZoom() {
  const zoom = useRef(Zoom(undefined, { background: 'auto' }));

  return {
    attach: zoom.current.attach,
    detach: zoom.current.detach,
  };
}
