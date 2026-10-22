export type Media = { id: string; type: 'image' | 'video' | 'embed' | 'link'; src: string; title: string; thumbnail?: string };
export type Project = { id: string; title: string; brand: string; category: string; summary: string; challenge: string; solution: string; contribution?: string; results?: string; cover: string; published: boolean; media: Media[] };
export type Experience = { company: string; role: string; dates: string; description?: string };
export type Portfolio = { theme?: 'light' | 'dark' | 'system'; name: string; role: string; intro: string; bio: string; email: string; phone: string; linkedin: string; behance: string; portrait: string; pdf: string; cv?: string; education: string; experience: Experience[]; accent: string; animation: boolean; projects: Project[] };
export type PortfolioState = { revision: number; data: Portfolio };
