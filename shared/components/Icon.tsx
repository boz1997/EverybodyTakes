import {
  Camera, Images, Image as ImageIcon, ArrowRight, ArrowLeft, ChevronDown, ChevronUp,
  Settings, X, Check, Zap, SwitchCamera, Share2, Copy, Trash2, Crown, Gift,
  Film, Mail, QrCode, Users, Calendar, Sparkles, Gem, Cake, PartyPopper,
  Sailboat, Music, Tent, Building2, Lock, Plus, RefreshCw, CircleAlert,
  Keyboard, Download, MoreHorizontal, Play, Video, Bell, Heart,
  Mic, Pause, Square, Pen,
} from 'lucide-react-native';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '@constants/theme';
import type { EventType } from '@store/eventStore';

const REGISTRY = {
  camera: Camera,
  gallery: Images,
  image: ImageIcon,
  arrowRight: ArrowRight,
  arrowLeft: ArrowLeft,
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  settings: Settings,
  close: X,
  check: Check,
  flash: Zap,
  flip: SwitchCamera,
  share: Share2,
  copy: Copy,
  trash: Trash2,
  crown: Crown,
  gift: Gift,
  film: Film,
  mail: Mail,
  qr: QrCode,
  users: Users,
  calendar: Calendar,
  sparkles: Sparkles,
  lock: Lock,
  plus: Plus,
  refresh: RefreshCw,
  alert: CircleAlert,
  keyboard: Keyboard,
  download: Download,
  more: MoreHorizontal,
  play: Play,
  pause: Pause,
  stop: Square,
  mic: Mic,
  pen: Pen,
  video: Video,
  bell: Bell,
  heart: Heart,
  // event types
  wedding: Gem,
  birthday: Cake,
  party: PartyPopper,
  yacht: Sailboat,
  club: Music,
  festival: Tent,
  corporate: Building2,
} as const;

export type IconName = keyof typeof REGISTRY;

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
  fill?: string;
}

export function Icon({ name, size = 22, color = colors.text.primary, strokeWidth = 2, fill = 'none' }: IconProps) {
  const Component = REGISTRY[name];
  return <Component size={size} color={color} strokeWidth={strokeWidth} fill={fill} />;
}

export const EVENT_TYPE_ICON: Record<EventType, IconName> = {
  wedding: 'wedding',
  birthday: 'birthday',
  party: 'party',
  yacht: 'yacht',
  club: 'club',
  festival: 'festival',
  corporate: 'corporate',
  other: 'sparkles',
};

interface BrandIconProps {
  brand: 'apple' | 'google';
  size?: number;
  color?: string;
}

export function BrandIcon({ brand, size = 20, color = colors.text.primary }: BrandIconProps) {
  return <FontAwesome name={brand} size={size} color={color} />;
}
