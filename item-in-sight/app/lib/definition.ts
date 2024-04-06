
export type Item = {
    name: string,
    locations: Array<string>,
    url: string,
    photoUrl: string
}

export type Location = {
    name: string,
    items: Array<string>,
    locations: Array<string>,
    url: string,
    photoUrl: string
}
