import { CSSProperties, ReactNode } from 'react';
import { useViewportSize } from '@mantine/hooks';

interface GridProps {
  children: ReactNode;
  cols?: number; 
  mobileCols?: number; 
  spacing?: string | number;
  style?: CSSProperties;
}

export const Grid = ({
  children,
  cols = 1,
  mobileCols = 1,
  spacing = '1rem',
  style,
}: GridProps) => {
  const { width } = useViewportSize();
  const isMobileView = width < 1024;

  const gridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${isMobileView ? mobileCols : cols}, 1fr)`,
    gap: spacing,
    ...style,
  };

  return <div style={gridStyle}>{children}</div>;
};