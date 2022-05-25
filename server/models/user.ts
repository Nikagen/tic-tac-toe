export type User = {
  login: string;
  password: string;
  refreshToken: string;
  gameSession: {
    columns: number;
    rows: number;
    cross: string;
    zero: string;
  };
  avatar?: string;
};