export type User = {
  id: string;
  name: string;
  email: string;
};

export type Tag = {
  id: string;
  name: string;
};

export type Note = {
  id: string;
  title: string;    
  content: string;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
  shareLink: { slug: string } | null;
  aiSummary: string | null;
  aiActions: string | null;
  aiSuggestedTitle: string | null;
  aiUsageCount: number;
};

export type DashboardData = {
  totalNotes: number;
  recentNotes: { id: string; title: string; updatedAt: string }[];
  topTags: { name: string; count: number }[];
  aiUsageCount: number;
  weeklyActivity: { day: string; count: number }[];
};