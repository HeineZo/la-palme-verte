export interface ApiResponse<Entity> {
  results: Entity[] | Entity;
  code: number;
  message: string;
}
