import React from 'react';
import { 
  Sparkles, Menu, ArrowRight, Activity, ZapOff, XCircle, AlertTriangle, 
  Check, Server, Globe, ShieldCheck, Zap, Lock, Search, MoreHorizontal, 
  ChevronRight, FileText, MessageSquare, GitBranch, Circle, Disc, 
  Database, BrainCircuit, CreditCard, Code, BarChart3, Play, UploadCloud, 
  CheckCircle2, Workflow, Command, Cloud, Box, Smile, Twitter, Linkedin, 
  Github, Mail, Phone, MapPin 
} from 'lucide-react';

// GYST device — references/brand/gyst-brand-spec.md §3. Master (>32px) keeps the weave seams.
const GystLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="currentColor" role="img" aria-label="GYST">
        <rect x="8" y="0" width="8" height="20" /><rect x="8" y="28" width="8" height="3" /><rect x="8" y="41" width="8" height="7" />
        <rect x="32" y="0" width="8" height="7" /><rect x="32" y="17" width="8" height="3" /><rect x="32" y="28" width="8" height="20" />
        <rect x="0" y="8" width="7" height="8" /><rect x="17" y="8" width="3" height="8" /><rect x="28" y="8" width="20" height="8" />
        <rect x="0" y="32" width="20" height="8" /><rect x="28" y="32" width="3" height="8" /><rect x="41" y="32" width="7" height="8" />
    </svg>
);

// Small device (≤32px) — seams removed so the cross channel survives. Spec §3.2: hard switch, not a preference.
const GystDeviceSmall = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="currentColor" role="img" aria-label="GYST">
        <rect x="8" y="0" width="8" height="20" /><rect x="8" y="28" width="8" height="20" />
        <rect x="32" y="0" width="8" height="20" /><rect x="32" y="28" width="8" height="20" />
        <rect x="0" y="8" width="20" height="8" /><rect x="28" y="8" width="20" height="8" />
        <rect x="0" y="32" width="20" height="8" /><rect x="28" y="32" width="20" height="8" />
    </svg>
);

export const Icons = {
    Sparkles, Menu, ArrowRight, Activity, ZapOff, XCircle, AlertTriangle,
    Check, Server, Globe, ShieldCheck, Zap, Lock, Search, MoreHorizontal,
    ChevronRight, FileText, MessageSquare, GitBranch, Circle, Disc,
    Database, BrainCircuit, CreditCard, Code, BarChart3, Play, UploadCloud,
    CheckCircle2, Workflow, Command, Cloud, Box, Smile, Twitter, Linkedin,
    Github, Mail, Phone, MapPin, GystLogo, GystDeviceSmall
};

export type IconName = keyof typeof Icons;

interface IconProps extends React.ComponentProps<'svg'> {
    name: IconName;
    size?: number | string;
}

export const Icon: React.FC<IconProps> = ({ name, size = 16, className, ...props }) => {
    const IconComponent = Icons[name] as React.ElementType;
    return IconComponent ? <IconComponent width={size} height={size} className={className} {...props} /> : null;
};