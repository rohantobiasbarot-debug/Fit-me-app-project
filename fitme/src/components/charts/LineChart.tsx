interface LineChartProps {
  data: number[];
  labels: string[];
  color?: string;
  height?: number;
  unit?: string;
  ariaLabel: string;
}

// Lightweight dependency-free SVG line chart with gradient area fill.
export default function LineChart({
  data,
  labels,
  color = "#F97316",
  height = 180,
  unit = "",
  ariaLabel,
}: LineChartProps) {
  const width = 600;
  const padding = { top: 16, right: 8, bottom: 24, left: 8 };
  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((v, i) => {
    const x = padding.left + (i / (data.length - 1)) * innerW;
    const y = padding.top + innerH - ((v - min) / range) * innerH;
    return { x, y, v };
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");

  const areaPath =
    `${linePath} L ${points[points.length - 1].x.toFixed(1)} ${padding.top + innerH} ` +
    `L ${points[0].x.toFixed(1)} ${padding.top + innerH} Z`;

  const gradId = `grad-${color.replace("#", "")}`;

  return (
    <figure className="m-0" aria-label={ariaLabel}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
        role="img"
        aria-label={ariaLabel}
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>

        <path d={areaPath} fill={`url(#${gradId})`} />
        <path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3" fill={color} />
        ))}

        {labels.map((label, i) => {
          const x = padding.left + (i / (labels.length - 1)) * innerW;
          return (
            <text
              key={i}
              x={x}
              y={height - 6}
              textAnchor="middle"
              fontSize="11"
              fill="#64748B"
            >
              {label}
            </text>
          );
        })}
      </svg>

      {/* Accessible data table alternative */}
      <figcaption className="sr-only">
        <table>
          <tbody>
            {data.map((v, i) => (
              <tr key={i}>
                <th scope="row">{labels[i]}</th>
                <td>
                  {v}
                  {unit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </figcaption>
    </figure>
  );
}
