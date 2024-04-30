export interface Role {
    rate: number
}

// TODO: Récupérer les rôles et leur niveau d'importance depuis une table notion dédiée
export const Roles: Record<string, Role | undefined> = {
    "Président": {
        rate : 1,
    },
    "Vice-présidente": {
        rate: 2,
    },
    "Responsable communication": {
        rate: 3,
    },
    "Trésorier" : {
        rate: 4,
    },
    "Vice-trésorière" : {
        rate: 5
    },
    "Secrétaire": {
        rate: 6
    },
    "Rédacteur": {
        rate: 7
    },
    "Membre": {
        rate: 99,
    },

}
