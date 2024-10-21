import React from 'react';

interface DottedGridProps {
  className?: string;
}

export const DottedGrid: React.FC<DottedGridProps> = ({ className = '' }) => {
  return (
    <div className={`pointer-events-none ${className}`}>
      <div className="absolute inset-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMCwgMCwgMCwgMC4zKSIvPjwvc3ZnPg==')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKSIvPjwvc3ZnPg==')] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
    </div>
  );
};

const gridStyles = `
  @supports (background: paint(houdini)) {
    @property --dot-color {
      syntax: '<color>';
      initial-value: rgba(17, 24, 39, 0.4);
      inherits: false;
    }

    @property --dot-size {
      syntax: '<length>';
      initial-value: 1px;
      inherits: false;
    }

    @property --dot-space {
      syntax: '<length>';
      initial-value: 22px;
      inherits: false;
    }

    .bg-grid-gray-900 {
      --dot-color: rgba(17, 24, 39, 0.4);
    }

    .dark .bg-grid-slate-100 {
      --dot-color: rgba(241, 245, 249, 0.3);
    }

    .bg-grid-gray-900,
    .dark .bg-grid-slate-100 {
      background-image: paint(dotted-background);
    }
  }
`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = gridStyles;
  document.head.appendChild(style);

  if ('paintWorklet' in CSS) {
    CSS.paintWorklet.addModule(`
      registerPaint('dotted-background', class {
        static get inputProperties() {
          return ['--dot-color', '--dot-size', '--dot-space'];
        }
        
        paint(ctx, size, properties) {
          const dotColor = properties.get('--dot-color').toString();
          const dotSize = parseFloat(properties.get('--dot-size').toString());
          const dotSpace = parseFloat(properties.get('--dot-space').toString());

          ctx.fillStyle = dotColor;
          
          for (let x = 0; x < size.width; x += dotSpace) {
            for (let y = 0; y < size.height; y += dotSpace) {
              ctx.beginPath();
              ctx.arc(x, y, dotSize / 2, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      });
    `);
  }
}
