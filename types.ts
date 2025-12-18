
export interface Drama {
  id: string;
  title: string;
  originalTitle: string;
  year: number;
  rating: number;
  episodes: number;
  genres: string[];
  description: string;
  image: string;
  banner: string;
  trending?: boolean;
  popular?: boolean;
}

export interface RecommendationRequest {
  mood: string;
  favoriteGenre: string;
  extraInfo: string;
}

export interface AIResponse {
  summary: string;
  recommendations: Partial<Drama>[];
}
