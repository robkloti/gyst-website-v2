import React from 'react';
import { 
  Sparkles, Menu, ArrowRight, Activity, ZapOff, XCircle, AlertTriangle, 
  Check, Server, Globe, ShieldCheck, Zap, Lock, Search, MoreHorizontal, 
  ChevronRight, FileText, MessageSquare, GitBranch, Circle, Disc, 
  Database, BrainCircuit, CreditCard, Code, BarChart3, Play, UploadCloud, 
  CheckCircle2, Workflow, Command, Cloud, Box, Smile, Twitter, Linkedin, 
  Github, Mail, Phone, MapPin 
} from 'lucide-react';

const GystLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M3.172 19.828C4.343 21 6.229 21 10 21h3.93a3.17 3.17 0 0 1-.43-1.588c0-.816.32-1.592.857-2.162H13.5a.75.75 0 0 1 0-1.5h1.928c.511-1.29 1.727-2.25 3.239-2.25c1.56 0 2.81 1.028 3.288 2.38l.014.01C22 15.074 22 14.12 22 13v-.25H2V13c0 3.771 0 5.657 1.172 6.828M6 18.25a.75.75 0 0 1-.75-.75v-2a.75.75 0 0 1 1.5 0v2a.75.75 0 0 1-.75.75m3 0a.75.75 0 0 1-.75-.75v-2a.75.75 0 0 1 1.5 0v2a.75.75 0 0 1-.75.75M3.172 4.172C2 5.343 2 7.229 2 11v.25h20V11c0-3.771 0-5.657-1.172-6.828S17.771 3 14 3h-4C6.229 3 4.343 3 3.172 4.172M9 9.25a.75.75 0 0 1-.75-.75v-2a.75.75 0 0 1 1.5 0v2a.75.75 0 0 1-.75.75M5.25 8.5a.75.75 0 0 0 1.5 0v-2a.75.75 0 0 0-1.5 0zm7.5-1a.75.75 0 0 1 .75-.75H18a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75" />
    </svg>
);

export const Icons = {
    Sparkles, Menu, ArrowRight, Activity, ZapOff, XCircle, AlertTriangle,
    Check, Server, Globe, ShieldCheck, Zap, Lock, Search, MoreHorizontal,
    ChevronRight, FileText, MessageSquare, GitBranch, Circle, Disc,
    Database, BrainCircuit, CreditCard, Code, BarChart3, Play, UploadCloud,
    CheckCircle2, Workflow, Command, Cloud, Box, Smile, Twitter, Linkedin,
    Github, Mail, Phone, MapPin, GystLogo
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