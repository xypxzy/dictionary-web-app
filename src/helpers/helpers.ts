import {IWords} from "../types/words.types.ts";

export const searchFormatter = (word: IWords) => {
    return word.hwi.hw.includes('*') ?
        word.hwi.hw.split('').filter(ch => ch !== '*').join('') :
        word.hwi.hw
}

