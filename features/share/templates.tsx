import { ReactNode } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import QRCode from 'react-native-qrcode-svg';
import Svg, { Circle, Rect, Path, Line, G } from 'react-native-svg';
import { EventType } from '@store/eventStore';
import { fonts } from '@constants/theme';

export const CARD_W = 300;
export const CARD_H = 462;

export interface ShareData {
  name: string;
  dateLabel: string;
  code: string;
  qrValue: string;
  coverUrl: string | null;
  invited: string;   // "You're invited"
  scan: string;      // "Scan to add your photos"
}

type Template = (p: { data: ShareData }) => ReactNode;

interface Theme {
  bg: string;
  ink: string;
  sub: string;
  faint: string;
  accent: string;
  qrBg: string;
  qrColor: string;
}

function Qr({ value, size, theme }: { value: string; size: number; theme: Theme }) {
  return (
    <View style={[styles.qrWrap, { backgroundColor: theme.qrBg }]}>
      <QRCode value={value} size={size} backgroundColor={theme.qrBg} color={theme.qrColor} />
    </View>
  );
}

// Shared poster layout — header / QR / footer, themed per template.
function Poster({ data, theme, decoration, gradient }: { data: ShareData; theme: Theme; decoration?: ReactNode; gradient?: [string, string] }) {
  return (
    <View style={[styles.card, { backgroundColor: theme.bg }]}>
      {gradient && <LinearGradient colors={gradient} style={StyleSheet.absoluteFill} />}
      <View style={styles.block}>
        {decoration}
        <Text style={[styles.kicker, { color: theme.accent }]}>{data.invited.toUpperCase()}</Text>
        <Text style={[styles.title, { color: theme.ink }]} numberOfLines={3} adjustsFontSizeToFit>{data.name}</Text>
        {!!data.dateLabel && <Text style={[styles.date, { color: theme.sub }]}>{data.dateLabel}</Text>}
      </View>

      <Qr value={data.qrValue} size={128} theme={theme} />

      <View style={styles.block}>
        <Text style={[styles.scan, { color: theme.sub }]}>{data.scan}</Text>
        <Text style={[styles.footer, { color: theme.faint }]}>GuestCam · {data.code}</Text>
      </View>
    </View>
  );
}

/* ---------- decorations ---------- */
function Rings({ color }: { color: string }) {
  return (
    <Svg width={64} height={40} viewBox="0 0 64 40">
      <Circle cx={26} cy={20} r={13} stroke={color} strokeWidth={2} fill="none" />
      <Circle cx={40} cy={20} r={13} stroke={color} strokeWidth={2} fill="none" />
      <Path d="M40 5 l3 5 h-6 Z" fill={color} />
    </Svg>
  );
}
function Confetti({ a, b, c }: { a: string; b: string; c: string }) {
  return (
    <Svg width={120} height={36} viewBox="0 0 120 36">
      <G>
        <Rect x={8} y={6} width={6} height={6} rx={1} fill={a} rotation={20} originX={11} originY={9} />
        <Circle cx={30} cy={10} r={3} fill={b} />
        <Rect x={50} y={4} width={6} height={6} rx={1} fill={c} rotation={-15} originX={53} originY={7} />
        <Circle cx={74} cy={9} r={3} fill={a} />
        <Rect x={92} y={6} width={6} height={6} rx={1} fill={b} rotation={25} originX={95} originY={9} />
        <Circle cx={110} cy={12} r={3} fill={c} />
      </G>
    </Svg>
  );
}
function CameraLine({ color }: { color: string }) {
  return (
    <Svg width={56} height={44} viewBox="0 0 56 44">
      <Rect x={4} y={12} width={48} height={28} rx={6} stroke={color} strokeWidth={2} fill="none" />
      <Path d="M20 12 l3 -5 h10 l3 5" stroke={color} strokeWidth={2} fill="none" strokeLinejoin="round" />
      <Circle cx={28} cy={26} r={8} stroke={color} strokeWidth={2} fill="none" />
      <Path d="M25 26 a3 3 0 0 1 3 -3" stroke={color} strokeWidth={1.6} fill="none" strokeLinecap="round" />
    </Svg>
  );
}

/* ---------- themes ---------- */
const T_EDITORIAL: Theme = { bg: '#EFE7D6', ink: '#221D16', sub: '#5B5247', faint: '#9C9182', accent: '#BE6A2E', qrBg: '#FFFFFF', qrColor: '#221D16' };
const T_WEDDING: Theme = { bg: '#3A0E16', ink: '#F6ECE0', sub: '#D9B8A8', faint: '#B98E7C', accent: '#E0B074', qrBg: '#F6ECE0', qrColor: '#3A0E16' };
const T_CONFETTI: Theme = { bg: '#FFFFFF', ink: '#161616', sub: '#5B5247', faint: '#A8A29A', accent: '#BE6A2E', qrBg: '#161616', qrColor: '#FFFFFF' };
const T_MINIMAL: Theme = { bg: '#F7F4EE', ink: '#1F1B16', sub: '#6B6357', faint: '#A8A096', accent: '#BE6A2E', qrBg: '#FFFFFF', qrColor: '#1F1B16' };
const T_NIGHT: Theme = { bg: '#14110C', ink: '#F4EEE1', sub: '#C2A05A', faint: '#7C746A', accent: '#E0B074', qrBg: '#F4EEE1', qrColor: '#14110C' };

/* ---------- templates ---------- */
const Editorial: Template = ({ data }) => <Poster data={data} theme={T_EDITORIAL} />;
const Wedding: Template = ({ data }) => <Poster data={data} theme={T_WEDDING} decoration={<Rings color={T_WEDDING.accent} />} />;
const Confetti_: Template = ({ data }) => <Poster data={data} theme={T_CONFETTI} decoration={<Confetti a="#BE6A2E" b="#4E7C59" c="#9A7634" />} />;
const Minimal: Template = ({ data }) => <Poster data={data} theme={T_MINIMAL} decoration={<CameraLine color={T_MINIMAL.accent} />} />;
const Night: Template = ({ data }) => <Poster data={data} theme={T_NIGHT} decoration={<CameraLine color={T_NIGHT.accent} />} />;

const Cover: Template = ({ data }) => (
  <View style={[styles.card, styles.coverCard]}>
    {data.coverUrl ? <Image source={{ uri: data.coverUrl }} style={StyleSheet.absoluteFill} resizeMode="cover" /> : null}
    <LinearGradient colors={['rgba(0,0,0,0.25)', 'rgba(0,0,0,0.85)']} style={StyleSheet.absoluteFill} />
    <View style={styles.block}>
      <Text style={[styles.kicker, { color: '#fff' }]}>{data.invited.toUpperCase()}</Text>
      <Text style={[styles.title, { color: '#fff' }]} numberOfLines={3} adjustsFontSizeToFit>{data.name}</Text>
      {!!data.dateLabel && <Text style={[styles.date, { color: 'rgba(255,255,255,0.85)' }]}>{data.dateLabel}</Text>}
    </View>
    <View style={styles.block}>
      <View style={[styles.qrWrap, { backgroundColor: '#fff' }]}>
        <QRCode value={data.qrValue} size={120} backgroundColor="#fff" color="#161616" />
      </View>
      <Text style={[styles.scan, { color: 'rgba(255,255,255,0.85)' }]}>{data.scan}</Text>
      <Text style={[styles.footer, { color: 'rgba(255,255,255,0.7)' }]}>GuestCam · {data.code}</Text>
    </View>
  </View>
);

export interface TemplateMeta { key: string; label: string; comp: Template; needsCover?: boolean }

export const TEMPLATES: TemplateMeta[] = [
  { key: 'editorial', label: 'Editorial', comp: Editorial },
  { key: 'wedding', label: 'Elegant', comp: Wedding },
  { key: 'confetti', label: 'Confetti', comp: Confetti_ },
  { key: 'minimal', label: 'Minimal', comp: Minimal },
  { key: 'night', label: 'Night', comp: Night },
  { key: 'cover', label: 'Cover', comp: Cover, needsCover: true },
];

const BY_TYPE: Partial<Record<EventType, string[]>> = {
  wedding: ['wedding', 'editorial', 'minimal'],
  birthday: ['confetti', 'editorial', 'minimal'],
  party: ['confetti', 'night', 'editorial'],
  club: ['night', 'confetti', 'editorial'],
  festival: ['night', 'confetti', 'editorial'],
  yacht: ['night', 'editorial', 'minimal'],
  corporate: ['minimal', 'editorial'],
  other: ['editorial', 'minimal', 'confetti'],
};

/** Suggested templates for a type first, then the rest. Cover only with an image. */
export function orderedTemplates(type: EventType, hasCover: boolean): TemplateMeta[] {
  const usable = TEMPLATES.filter((t) => !t.needsCover || hasCover);
  const pref = BY_TYPE[type] ?? ['editorial'];
  const score = (k: string) => { const i = pref.indexOf(k); return i === -1 ? 99 : i; };
  return [...usable].sort((a, b) => score(a.key) - score(b.key));
}

const styles = StyleSheet.create({
  card: {
    width: CARD_W, height: CARD_H, borderRadius: 24, paddingHorizontal: 26, paddingVertical: 30,
    alignItems: 'center', justifyContent: 'center', gap: 26, overflow: 'hidden',
  },
  coverCard: { backgroundColor: '#000', justifyContent: 'space-between', gap: 0, paddingVertical: 34 },
  block: { alignItems: 'center', gap: 5 },
  kicker: { fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 2.5 },
  title: { fontFamily: fonts.displayBold, fontSize: 27, lineHeight: 31, textAlign: 'center', marginTop: 4 },
  date: { fontFamily: fonts.body, fontSize: 13 },
  qrWrap: { padding: 11, borderRadius: 14 },
  scan: { fontFamily: fonts.bodyMedium, fontSize: 12.5, textAlign: 'center', maxWidth: 230, lineHeight: 17 },
  footer: { fontFamily: fonts.bodySemibold, fontSize: 11, letterSpacing: 1 },
});
