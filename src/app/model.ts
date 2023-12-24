export interface Post {
  userId: number,
  id: number,
  title: string,
  body: string
}

export class PostClass {
  constructor(public userId: number,
              public id: number,
              public title: string,
              public body: string) {
  }

  getTitle(){
    return this.title.toUpperCase();
  }
}

export interface Comment {
  postId: number,
  id: number,
  name: string,
  email: string,
  body: string,
}

export interface EntityExtractionResponse {
  time: number,
  lang: string,
  timestamp: string,
  langConfidence: number,
  annotations: Annotation[],
  topEntities: TopEntity[],
}

export interface Annotation {
  start: number,
  end: number,
  spot: string,
  confidence: number,
  id: number,
  title: string,
  uri: string,
  label: string,
  types: string[],
  categories: string[],
  abstract: string,
  image: Image,
}

export interface Image {
  full: string,
  thumbnail: string,
}

export interface TopEntity {
  id: number,
  score: number,
  uri: string,
}


export interface TextSimilarityResponse {
  time: number,
  similarity: number,
  lang: string,
  timestamp: string,
}

export interface LanguageDetectionResponse {
  time: number,
  timestamp: string,
  detectedLangs: DetectedLang[],
}

export interface DetectedLang {
  lang: string,
  confidence: number,
}

export interface SentimentAnalysisResponse {
  time: number,
  lang: string,
  timestamp: string,
  langConfidence: number,
  sentiment: Sentiment,
}

export interface Sentiment {
  score: number,
  type: string,
}