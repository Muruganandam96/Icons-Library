export interface LibraryDetails {
    name: string;
    type: string[];
    typeDetail: {
        filled: string,
        outlined: string,
        duotoned: string
    },
    image: string;
    license: string;
    repoUrl: string;
    active: boolean;
}
