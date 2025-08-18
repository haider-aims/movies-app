export const getRating = (vote_average: number) => Math.round(vote_average / 2);
export const getRealseYear = (release_date: string) => release_date.split("-")[0];
