import { Facebook, Instagram, MessageCircle, type LucideIcon } from 'lucide-react';
import type { Channel } from '../types';

const channelConfig: Record<Channel, { label: string; icon: LucideIcon; classes: string }> = {
  whatsapp: {
    label: 'WhatsApp',
    icon: MessageCircle,
    classes: 'bg-emerald-500/12 text-emerald-600 ring-emerald-500/20',
  },
  instagram: {
    label: 'Instagram',
    icon: Instagram,
    classes: 'bg-fuchsia-500/12 text-fuchsia-600 ring-fuchsia-500/20',
  },
  facebook: {
    label: 'Facebook',
    icon: Facebook,
    classes: 'bg-sky-500/12 text-sky-600 ring-sky-500/20',
  },
};

interface ChannelBadgeProps {
  channel: Channel;
  showLabel?: boolean;
  className?: string;
}

export function ChannelBadge({ channel, showLabel = false, className = '' }: ChannelBadgeProps) {
  const config = channelConfig[channel];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${config.classes} ${className}`.trim()}
    >
      <Icon className="h-3.5 w-3.5" />
      {showLabel ? config.label : null}
    </span>
  );
}
