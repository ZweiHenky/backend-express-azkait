

export const globals = {
  pendingUsers: [] as {
    userId_fk: number;
    url_linkedin: string | null;
    id_professionalProfile_fk: number[] | undefined;
    source:string
    timestamp:number;
  }[],
};