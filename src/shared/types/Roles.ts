export interface Role {
    rate: number
}

// TODO: Use fetched roles list from Users db instead of hard-coded strings
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