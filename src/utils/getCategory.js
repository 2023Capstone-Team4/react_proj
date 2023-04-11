export const category_FrontToBack = (category) => {
    const result = category === "개발/프로그래밍" ? "IT_PROGRAMMING" : 
    category === "IT" ? "IT" :
    category === "게임 개발" ? "GAME_DEV" : 
    category === "크리에이티브" ? "CREATIVE" :
    category === "학문/외국어" ? "ACADEMICS" :
    category === "커리어" ? "CAREER" :
    "LIFE";

    return result;
}

export const category_BackToFront = (category) => {
    const result = category ===  "IT_PROGRAMMING" ? "개발/프로그래밍": 
    category === "IT" ? "IT" :
    category === "GAME_DEV" ? "게임 개발": 
    category === "CREATIVE" ? "크리에이티브" :
    category === "ACADEMICS" ? "학문/외국어" :
    category === "CAREER" ? "커리어" :
    "자기계발";

    return result;
}

export const category_BackToFront_URL = (category) => {
    const result = category ===  "it-programming" ? "개발/프로그래밍": 
    category === "it" ? "IT" :
    category === "game-dev" ? "게임 개발": 
    category === "creative" ? "크리에이티브" :
    category === "academics" ? "학문/외국어" :
    category === "career" ? "커리어" :
    "자기계발";

    return result;   
}

export const category_FrontToBack_URL = (category) => {
    const result = category ===  "it-programming" ? "IT_PROGRAMMING": 
    category === "it" ? "IT" :
    category === "game-dev" ? "GAME_DEV": 
    category === "creative" ? "CREATIVE" :
    category === "academics" ? "ACADEMICS" :
    category === "career" ? "CAREER" :
    "LIFE";

    return result;   
}
