import { useCurrentFrame } from 'remotion';
import { useStopMotion } from '../hooks/useStopMotion';

export const Town = () => {
  const frame = useCurrentFrame();
  const stop = useStopMotion(12);

  // Paper town: row of small houses, shop, hospital cross, road, a few paper trees
  // Road (brown paper)
  const road = (
    <rect
      x="0"
      y="900"
      width="1920"
      height="180"
      fill="#5a3b27"
      filter="url(#sh)"
    />
  );

  // House with paper cutout style
  const house = (x: number, y: number, bodyColor = "#efe3c9", roofColor = "#d4553d") => (
    <g filter="url(#sh)">
      <rect x={x} y={y} width={80} height={80} fill={bodyColor} />
      <polygon points={`${x},${y} ${x+40},${y-50} ${x+80},${y}`} fill={roofColor} />
      <rect x={x + 15} y={y + 25} width={20} height={30} fill="#5a3b27" />
      <rect x={x + 45} y={y + 25} width={20} height={30} fill="#5a3b27" />
    </g>
  );

  // Hospital with cross
  const hospital = (x: number, y: number) => (
    <g filter="url(#sh)">
      <rect x={x} y={y} width={100} height={100} fill="#efe3c9" />
      <polygon points={`${x},${y} ${x+50},${y-60} ${x+100},${y}`} fill="#d4553d" />
      <rect x={x + 30} y={y + 15} width={40} height={40} fill="#5a3b27" />
      <line x1={x + 50} y1={y + 25} x2={x + 50} y2={y + 55} stroke="#3c8a8a" strokeWidth={5} />
      <line x1={x + 30} y1={y + 40} x2={x + 70} y2={y + 40} stroke="#3c8a8a" strokeWidth={5} />
    </g>
  );

  // Shop with awning
  const shop = (x: number, y: number) => (
    <g filter="url(#sh)">
      <rect x={x} y={y} width={100} height={90} fill="#efe3c9" />
      <polygon points={`${x},${y} ${x+50},${y-55} ${x+100},${y}`} fill="#d4553d" />
      <rect x={x + 10} y={y + 20} width={30} height={30} fill="#3c8a8a" />
      <rect x={x + 60} y={y + 20} width={30} height={30} fill="#3c8a8a" />
      <rect x={x - 10} y={y + 5} width={120} height={15} fill="#e9b949" />
    </g>
  );

  // Paper tree
  const tree = (x: number, y: number) => (
    <g filter="url(#sh)">
      <rect x={x + 5} y={y + 40} width={10} height={60} fill="#5a3b27" />
      <circle cx={x + 10} cy={y + 20} r={25} fill="#3c8a8a" />
      <circle cx={x - 5} cy={y + 35} r={15} fill="#1f5a63" />
      <circle cx={x + 25} cy={y + 35} r={15} fill="#1f5a63" />
    </g>
  );

  return (
    <g>
      {road}
      {/* Houses */}
      {house(50, 750)}
      {house(150, 700, "#efe3c9", "#e9b949")}
      {house(300, 750, "#efe3c9", "#3c8a8a")}
      {/* Hospital */}
      {hospital(500, 700)}
      {/* Shop */}
      {shop(680, 720)}
      {/* Trees */}
      {tree(200, 600)}
      {tree(700, 650)}
      {tree(1000, 600)}
      {tree(1200, 620)}
    </g>
  );
};