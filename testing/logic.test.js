import {getUser, handleChange, flipEdit, getEndCard, handleSubmit, getMatches, logout, register, getMatches, getCurrentUser, deleteMessage, getName,sendMessage, onSwipeLeft, onSwipeRight, deleteFavorite, addFavorites} from './../logic/logic';

const info = {name: 'frank', age: 30}
const message = [“Hello”, “Goodbye”];
const id = 523;

describe('Tests getUser function', ()=> {
    it('should be a function', () => {
        expect(typeof getUser).toBe('function')
    });
});

describe('Tests getCurrentUser function', ()=> {
    it('should be a function', () => {
        expect(typeof getCurrentUser).toBe('function')
    });
    it('should return an array',()=>{
        expect(result).toBe(Array)
    });
});

describe('Tests getMatches function', ()=> {
    it('should be a function', () => {
        expect(typeof getMatches).toBe('function')
    });
    it('should return an array',()=>{
        expect(result).toBe(Array)
    });
});

describe('Tests handleChange function', () => {
    it('should be a function', () => {
        expect(typeof handleChange).toBe('function')
    });
});

describe('Tests flipEdit function', () => {
    it('should be a function', ()=> {
        expect(typeof flipEdit).toBe('function')
    })
    it('should return a boolean value',()=>{
        expect(typeof result).toBe('boolean')
    });
});

describe('Tests getEndCard function', () => {
    it('should be a function', ()=> {
        expect(typeof getEndCard).toBe('function')
    })
    it('should not return an array',()=>{
        expect(result).not.toBe(Array)
    });
});

describe('Tests handleSubmit function', () => {
    const result = handleSubmit(info)
    it('should be a function', ()=> {
        expect(typeof handleSubmit).toBe('function')
    })
    it('should not return an object',()=>{
        expect(result).not.toBe(Object)
    })
    it('should have property name of name', () => {
        expect(user[0]).toHaveProperty('name')
    })
    it('should have property name of age', () => {
        expect(user[1]).toHaveProperty('age')
    })
    it('should be type of string', () => {
        expect(typeof user[0].name).toBe('string')
    })
    it('should be type of integer', () => {
        expect(typeof user[1].name).toBe('integer')
    });
});

describe('Tests register function',()=>{
    it('should be a function',()=>{
        expect(typeof register).toBe('function')
    });
});

describe('Tests logout function', () => {
    it('should be a function',()=>{
        expect(typeof logout).toBe('function')
    });
});

describe('Tests getMatches function', () => {
    it('should be a function', () => {
        expect(typeof getMatches).toBe('function')
    });
});

describe("Tests deleteMessage function", () => {
    const result = deleteMessage(message);
    it("should be a function", () => {
        expect(typeof deleteMessage).toBe("function");
    });
    it("should not return an object", () => {
        expect(result).not.toBe(Object);
    });
    it("should be type of string", () => {
        expect(typeof message[0]).toBe("string");
    });
});

describe("Tests getName function", () => {
    it("should be a function", () => {
        expect(typeof getName).toBe("function");
    });
});

describe("Tests sendMessage function", () => {
    const result = sendMessage(message);
    it("should be a function", () => {
        expect(typeof sendMessage).toBe("function");
    });
    it("should not return an object", () => {
        expect(result).not.toBe(Object);
    });
    it("should be type of string", () => {
        expect(typeof message[0]).toBe("string");
    });
    it("should be type of string", () => {
        expect(typeof message[1]).toBe("string");
    });
});

describe("Tests onSwipeLeft function", () => {
    const result = onSwipeLeft(id);
    it("should be a function", () => {
        expect(typeof onSwipeLeft).toBe("function");
    });
    it("should not return an object", () => {
        expect(result).not.toBe(Object);
    });
    it("should return a string", () => {
        expect(typeof result).toBe("string");
    });
});

describe("Tests onSwipeRight function", () => {
    const result = onSwipeRight(id);
    it("should be a function", () => {
        expect(typeof onSwipeRight).toBe("function");
    });
    it("should not return an object", () => {
        expect(result).not.toBe(Object);
    });
    it("should return a string", () => {
        expect(typeof result).toBe("string");
    });
});

describe("Tests deleteFavorite function", () => {
    const result = deleteFavorite(id);
    it("should be a function", () => {
        expect(typeof deleteFavorite).toBe("function");
    });
    it("should not return an object", () => {
        expect(result).not.toBe(Object);
    });
    it("should return an array", () => {
        expect(typeof result).toBe(Array);
    });
});

describe("Tests addFavorites function", () => {
    const result = addFavorites(id);
    it("should be a function", () => {
        expect(typeof addFavorites).toBe("function");
    });
    it("should not return an object", () => {
        expect(result).not.toBe(Object);
    });
    it("should return an array", () => {
        expect(typeof result).toBe(Array);
    });
});