import { Injectable } from "@angular/core";
import { Formation } from "./utils";
import { of, Observable } from "rxjs";
import { delay, map, tap } from "rxjs/operators";

const formations: Formation[] = [
  {
    libelle: "Kubernetes",
    key: "kub",
    id: 0,
    type: "back",
    formateurs: [0],
    coFormateurs: [],
    participants: [1, 10, 12]
  },
  {
    libelle: "Docker",
    key: "docker",
    id: 1,
    type: "transverse",
    formateurs: [0, 9],
    coFormateurs: [],
    participants: [1, 5, 10, 12, 13, 14, 17, 19, 21]
  },
  {
    libelle: "Elasticsearch",
    key: "elasearch",
    id: 2,
    type: "back",
    formateurs: [1],
    coFormateurs: [],
    participants: []
  },
  {
    libelle: "Elastic Stack",
    key: "elastack",
    id: 3,
    type: "back",
    formateurs: [1],
    coFormateurs: [],
    participants: []
  },
  {
    libelle: "Java",
    key: "java",
    id: 4,
    type: "back",
    formateurs: [0, 3, 4, 6, 8],
    coFormateurs: [],
    participants: []
  },
  {
    libelle: "RxJava",
    key: "rxjava",
    id: 5,
    type: "back",
    formateurs: [3],
    coFormateurs: [],
    participants: []
  },
  {
    libelle: "Spring (boot)",
    key: "spring",
    id: 6,
    type: "back",
    formateurs: [3, 6],
    coFormateurs: [],
    participants: [8, 11]
  },
  {
    libelle: "Javascript",
    key: "js",
    id: 7,
    type: "transverse",
    formateurs: [4, 7, 8, 9],
    coFormateurs: [],
    participants: [15, 19, 21]
  },
  {
    libelle: "RxJS",
    key: "rxjs",
    id: 8,
    type: "transverse",
    formateurs: [3, 4, 9],
    coFormateurs: [17],
    participants: [11, 13, 18, 19]
  },
  {
    libelle: "Angular",
    key: "ng",
    id: 9,
    type: "front",
    formateurs: [2, 4, 5, 7, 8, 9, 15],
    coFormateurs: [17],
    participants: [11, 13, 19, 21]
  },
  {
    libelle: "Vue",
    key: "vue",
    id: 10,
    type: "front",
    formateurs: [2, 7, 9],
    coFormateurs: [],
    participants: [8, 13, 16, 17]
  },
  {
    libelle: "React",
    key: "react",
    id: 11,
    type: "front",
    formateurs: [7, 9],
    coFormateurs: [],
    participants: [8, 14, 15, 16, 17]
  },
  {
    libelle: "Node.js",
    key: "node",
    id: 12,
    type: "back",
    formateurs: [1, 4, 5, 7, 9],
    coFormateurs: [],
    participants: [8, 15, 17, 21]
  },
  {
    libelle: "TypeScript",
    key: "ts",
    id: 13,
    type: "transverse",
    formateurs: [4, 7, 9],
    coFormateurs: [],
    participants: [10, 12, 13, 17]
  },
  {
    libelle: "Svelte",
    key: "svelte",
    id: 14,
    type: "front",
    formateurs: [4],
    coFormateurs: [],
    participants: [14, 17, 21]
  },
  {
    libelle: "DataViz",
    key: "dataviz",
    id: 15,
    type: "front",
    formateurs: [4],
    coFormateurs: [],
    participants: [11, 17, 20]
  },
  {
    libelle: "Git",
    key: "git",
    id: 16,
    type: "transverse",
    formateurs: [4, 8, 9],
    coFormateurs: [],
    participants: [13, 17, 19]
  },
  {
    libelle: "Tests / BDD",
    key: "test",
    id: 17,
    type: "transverse",
    formateurs: [4, 7, 8],
    coFormateurs: [],
    participants: [13, 15, 17]
  },
  {
    libelle: "Clean Code",
    key: "cc",
    id: 18,
    type: "transverse",
    formateurs: [8],
    coFormateurs: [],
    participants: [10, 11, 12, 13, 14, 15, 16, 17, 19]
  },
  {
    libelle: "Go",
    key: "go",
    id: 19,
    type: "back",
    formateurs: [0],
    coFormateurs: [9],
    participants: [18]
  },
  {
    libelle: "Python",
    key: "python",
    id: 20,
    type: "back",
    formateurs: [8],
    coFormateurs: [4],
    participants: []
  },
  {
    libelle: "Scala / Prog Fonctionnelle",
    key: "scala",
    id: 21,
    type: "back",
    formateurs: [4],
    coFormateurs: [],
    participants: [18]
  }
];

const personnes = [
  {
    nom: "Patrice",
    id: 0
  },
  {
    nom: "Moussa",
    id: 1
  },
  {
    nom: "Vivien",
    id: 2
  },
  {
    nom: "Sylvain",
    id: 3
  },
  {
    nom: "Lang",
    id: 4
  },
  {
    nom: "Tanguy",
    id: 5
  },
  {
    nom: "Rémy",
    id: 6
  },
  {
    nom: "Thierry",
    id: 7
  },
  {
    nom: "Aurélien",
    id: 8
  },
  {
    nom: "Romain",
    id: 9
  },
  {
    nom: "Tom",
    id: 10
  },
  {
    nom: "Pira",
    id: 11
  },
  {
    nom: "Steven",
    id: 12
  },
  {
    nom: "Claudine",
    id: 13
  },
  {
    nom: "Nicolas B",
    id: 14
  },
  {
    nom: "Matthias",
    id: 15
  },
  {
    nom: "Youcef",
    id: 16
  },
  {
    nom: "Hubert",
    id: 17
  },
  {
    nom: "Antoine",
    id: 18
  },
  {
    nom: "Cedric",
    id: 19
  },
  {
    nom: "Denise",
    id: 20
  },
  {
    nom: "Nicolas M",
    id: 21
  }
];

export interface ServiceParams {
  recherche: string;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  sortedColumn: {
    colKey: string;
    ascendant: boolean;
  };
}

export interface MappedFormations {
  libelle: string;
  nbFormateurs: number;
  nbCandidats: number;
  totalParticipants: number;
}

export interface FormationResponse {
  formations: MappedFormations[];
  totalItems: number;
}

@Injectable({
  providedIn: "root"
})
export class FormationHttpService {
  constructor() {}

  currentSize = 0;

  getFormations(params: ServiceParams): Observable<FormationResponse> {
    return of(formations).pipe(
      map(formations => {
        return formations.map(f => ({
          libelle: f.libelle,
          nbFormateurs: f.formateurs.length + f.coFormateurs.length,
          nbCandidats: f.participants.length,
          totalParticipants:
            f.formateurs.length + f.coFormateurs.length + f.participants.length
        }));
      }),
      map(formations =>
        formations.filter(f =>
          f.libelle
            .toLocaleLowerCase()
            .includes(params.recherche.toLocaleLowerCase())
        )
      ),
      tap(formations => (this.currentSize = formations.length)),
      map(formations => {
        const { colKey, ascendant } = params.sortedColumn;

        return formations.sort((a, b) => {
          if (a[colKey] < b[colKey]) return ascendant ? -1 : 1;
          if (a[colKey] > b[colKey]) return ascendant ? 1 : -1;
          return 0;
        });
      }),
      map(formations => {
        return formations.filter((_, i) => {
          const { pageIndex, pageSize } = params.pagination;
          const debut = pageIndex * pageSize;
          const fin = (pageIndex + 1) * pageSize - 1;

          return i >= debut && i <= fin;
        });
      }),
      map(formations => ({
        formations,
        totalItems: this.currentSize
      })),
      delay(700)
    );
  }

  getPersonnes() {
    return of(personnes).pipe(delay(1000));
  }
}
