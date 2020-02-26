type Id = number;

export interface Personne {
  nom: string;
  id: Id;
}

export interface Formation {
  libelle: string;
  key: string;
  id: Id;
  type: string;
  formateurs: Id[];
  coFormateurs: Id[];
  participants: Id[];
}
// export const makeState(formations: string[], participants: string[])
