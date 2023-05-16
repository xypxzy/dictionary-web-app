export interface IWords {
    meta: Meta
    hom: number
    hwi: Hwi
    fl: string
    def: Def[]
    history: History
    shortdef: string[]
}

export interface Meta {
    id: string
    uuid: string
    src: string
    section: string
    stems: string[]
    offensive: boolean
}

export interface Hwi {
    hw: string
    prs: Pr[]
}

export interface Pr {
    mw: string
    sound: Sound
}

export interface Sound {
    audio: string
}

export interface Def {
    sseq: [string, Sseq][][]
}

export interface Sseq {
    sn: string
    dt: [string, any][]
}

export interface History {
    pl: string
    pt: string[][]
}
