import Svg, { Rect, Circle, G, Path, Line } from 'react-native-svg';
import { colors } from '@constants/theme';

const INK = colors.text.primary;       // #221D16
const AMBER = colors.brand.DEFAULT;    // #BE6A2E
const AMBER_L = colors.brand.light;    // #D68A4C
const BRONZE = colors.gold.DEFAULT;    // #9A7634
const PAPER = colors.bg.card;          // #FAF5EB
const GREEN = colors.success;          // #4E7C59

interface Props {
  size?: number;
}

/** Guest — a disposable film camera with a few film frames drifting out. */
export function GuestArt({ size = 48 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* drifting film frames */}
      <G opacity={0.9}>
        <Rect x={31} y={6} width={11} height={8} rx={1.5} fill={PAPER} stroke={BRONZE} strokeWidth={1.4} />
        <Line x1={33} y1={6} x2={33} y2={14} stroke={BRONZE} strokeWidth={0.8} />
        <Line x1={40} y1={6} x2={40} y2={14} stroke={BRONZE} strokeWidth={0.8} />
      </G>

      {/* camera body */}
      <Rect x={6} y={16} width={30} height={22} rx={4.5} fill={PAPER} stroke={AMBER} strokeWidth={2} />
      {/* top flash + viewfinder bump */}
      <Rect x={11} y={11} width={9} height={6} rx={1.5} fill={AMBER_L} stroke={AMBER} strokeWidth={1.6} />
      <Rect x={26} y={12} width={6} height={5} rx={1} fill={INK} />
      {/* shutter button */}
      <Circle cx={31.5} cy={14.5} r={1.6} fill={AMBER} />

      {/* lens */}
      <Circle cx={19} cy={28} r={7.5} fill="#FFFFFF" stroke={AMBER} strokeWidth={2} />
      <Circle cx={19} cy={28} r={4.2} fill={AMBER_L} />
      <Circle cx={19} cy={28} r={1.8} fill={INK} />
      {/* little highlight */}
      <Circle cx={16.8} cy={25.8} r={1} fill="#FFFFFF" opacity={0.9} />

      {/* flash dot */}
      <Circle cx={31} cy={29} r={2.2} fill={AMBER} opacity={0.85} />
    </Svg>
  );
}

/** Empty state — a little stack of event photo cards with a "+" to start one. */
export function CreateEventArt({ size = 64 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      {/* confetti */}
      <G>
        <Line x1={26} y1={13} x2={24} y2={8} stroke={AMBER} strokeWidth={2} strokeLinecap="round" />
        <Circle cx={41} cy={11} r={1.6} fill={GREEN} />
        <Circle cx={16} cy={16} r={1.4} fill={BRONZE} />
        <Circle cx={50} cy={18} r={1.4} fill={AMBER} />
      </G>

      {/* back card (tilted) */}
      <Rect x={12} y={23} width={29} height={23} rx={4} fill={PAPER} stroke={BRONZE} strokeWidth={1.6}
        rotation={-12} originX={26.5} originY={34.5} opacity={0.85} />

      {/* front card — a tiny "photo" scene inside */}
      <G>
        <Rect x={20} y={20} width={30} height={24} rx={4} fill="#FFFFFF" stroke={AMBER} strokeWidth={2} />
        <Circle cx={42} cy={27} r={2.6} fill={AMBER_L} />
        <Path d="M22 42 L29 32 L34 37 L40 30 L48 42 Z" fill={AMBER_L} opacity={0.6} />
        <Path d="M22 42 L29 32 L34 37 L40 30 L48 42" stroke={AMBER} strokeWidth={1.6} strokeLinejoin="round" strokeLinecap="round" fill="none" />
      </G>

      {/* "+" badge */}
      <Circle cx={47} cy={45} r={8} fill={AMBER} stroke="#FFFFFF" strokeWidth={2.2} />
      <Line x1={47} y1={41.5} x2={47} y2={48.5} stroke="#FFFFFF" strokeWidth={2.4} strokeLinecap="round" />
      <Line x1={43.5} y1={45} x2={50.5} y2={45} stroke="#FFFFFF" strokeWidth={2.4} strokeLinecap="round" />
    </Svg>
  );
}

/** Host — a camera bursting out of a little confetti celebration. */
export function HostArt({ size = 48 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* confetti burst */}
      <G strokeWidth={2} strokeLinecap="round">
        <Line x1={24} y1={11} x2={24} y2={6} stroke={AMBER} />
        <Line x1={15} y1={13} x2={11} y2={9} stroke={BRONZE} />
        <Line x1={33} y1={13} x2={37} y2={9} stroke={GREEN} />
        <Line x1={10} y1={22} x2={5} y2={21} stroke={AMBER_L} />
        <Line x1={38} y1={22} x2={43} y2={21} stroke={AMBER} />
      </G>
      <G>
        <Circle cx={9} cy={14} r={1.6} fill={AMBER} />
        <Circle cx={40} cy={15} r={1.6} fill={BRONZE} />
        <Circle cx={24} cy={4.5} r={1.6} fill={GREEN} />
        <Rect x={6} y={28} width={3} height={3} rx={0.6} fill={AMBER_L} rotation={20} originX={7.5} originY={29.5} />
        <Rect x={39} y={29} width={3} height={3} rx={0.6} fill={AMBER} rotation={-25} originX={40.5} originY={30.5} />
      </G>

      {/* camera */}
      <Rect x={11} y={22} width={26} height={18} rx={4} fill={PAPER} stroke={AMBER} strokeWidth={2} />
      {/* top bump */}
      <Path d="M19 22 l2.5 -3.5 h5 L29 22 Z" fill={AMBER_L} stroke={AMBER} strokeWidth={1.6} strokeLinejoin="round" />
      {/* lens */}
      <Circle cx={24} cy={31} r={5.4} fill="#FFFFFF" stroke={AMBER} strokeWidth={2} />
      <Circle cx={24} cy={31} r={2.8} fill={AMBER_L} />
      <Circle cx={24} cy={31} r={1.2} fill={INK} />
      {/* flash dot */}
      <Circle cx={33} cy={26} r={1.6} fill={AMBER} />
    </Svg>
  );
}
