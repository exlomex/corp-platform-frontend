import { useEffect, useRef } from 'react';

export function useClickOutside<T extends HTMLElement>(
    onClickOutside: () => void
) {
    const ref = useRef<T>(null);
    const mouseDownPosition = useRef<{ x: number; y: number } | null>(null);

    useEffect(() => {
        const handleMouseDown = (event: MouseEvent) => {
            mouseDownPosition.current = { x: event.clientX, y: event.clientY };
        };

        const handleMouseUp = (event: MouseEvent) => {
            const { x, y } = mouseDownPosition.current ?? { x: 0, y: 0 };
            const deltaX = Math.abs(event.clientX - x);
            const deltaY = Math.abs(event.clientY - y);

            const mouseMoved = deltaX > 5 || deltaY > 5;

            if (mouseMoved) return;

            if (ref.current && !ref.current.contains(event.target as Node)) {
                onClickOutside();
            }
        };

        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [onClickOutside]);

    return ref;
}
