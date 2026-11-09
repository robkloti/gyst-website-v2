export interface RoomAgent {
    id: string;
    name: string;
    role: string;
    zone: string;
    x: number;
    y: number;
    human?: boolean;
    status?: 'live' | 'in-build';
    does: string;
    tools: string[];
    today: string[];
    measured?: string;
}

export interface RoomZone {
    id: string;
    label: string;
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface RoomHandoff {
    from: string;
    to: string;
    text: string;
    counter?: string;
}

export interface RoomCounter {
    id: string;
    label: string;
    start: number;
}

export interface RoomData {
    slug: string;
    title: string;
    wallTitle: string;
    floor: { w: number; h: number };
    zones: RoomZone[];
    agents: RoomAgent[];
    counters: RoomCounter[];
    script: RoomHandoff[];
}
