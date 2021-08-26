const request = require('supertest');
const app = require('../index.js');

describe("when requesting '/about-page'", () => {

    it("given no errors then, return 200", () => {
        return request(app)
        .get("/about-page")
        .then(res => {
            expect(res.status).toBe(200);
            app.close();
        })
    })
})

describe("When requesting '/blog/june/company-update'", () => {
    it("given no errors then return 200", () => {
        return request(app)
        .get("/blog/june/company-update")
        .then(res => {
            expect(res.status).toBe(200);
        })
    });
})

describe("When requesting '/jobs'", () => {
    it("given no errors then, return 200", () => {
        return request(app)
        .get("/jobs")
        .then(res => {
            expect(res.status).toBe(200);
        })
    })
});
describe("When requesting '/valves'", () => {
    it("given no errors then, return 200", () => {
        return request(app)
        .get("/valves")
        .then(res => {
            expect(res.status).toBe(200);
        })
    })
});

it("When requesting a URL that doesn't exist then, return 404", () => {
    return request(app)
    .get("/test")
    .then(res => {
        expect(res.status).toBe(404);
    })
})
