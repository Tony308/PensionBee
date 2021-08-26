const request = require('supertest');
const app = require('../index.js');
const fs = require('fs');
const path = require('path');

var base = "";
var content = "";

beforeEach(() => {
    base = fs.readFileSync(path.resolve("template.html"), {encoding: "utf-8"});
});

afterEach(() => app.close());

describe("when requesting '/about-page'", () => {

    it("given no errors then, return 200", () => {
        return request(app)
        .get("/about-page")
        .then(res => {
            expect(res.status).toBe(200);
            
        })
    })

    it("given content, load correct html", () => {

        content = fs.readFileSync(path.resolve("content/about-page/index.md"), {encoding: "utf-8"});
        base = base.replace("{{content}}", content);

        return request(app)
        .get("/about-page")
        .then(res => {
            expect(res.status).toBe(200);
            expect(res.text).toEqual(base);

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

    it("given content, load correct html", () => {

        content = fs.readFileSync(path.resolve("content/blog/june/company-update/index.md"), {encoding: "utf-8"});
        base = base.replace("{{content}}", content);

        return request(app)
        .get("/blog/june/company-update")
        .then(res => {
            expect(res.status).toBe(200);
            expect(res.text).toEqual(base);

        })    
    })
})

describe("When requesting '/jobs'", () => {
    it("given no errors then, return 200", () => {
        return request(app)
        .get("/jobs")
        .then(res => {
            expect(res.status).toBe(200);
        })
    })

    it("given content, load correct html", () => {

        content = fs.readFileSync(path.resolve("content/jobs/index.md"), {encoding: "utf-8"});
        base = base.replace("{{content}}", content);

        return request(app)
        .get("/jobs")
        .then(res => {
            expect(res.status).toBe(200);
            expect(res.text).toEqual(base);

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
    });


    it("given content, load correct html", () => {

        content = fs.readFileSync(path.resolve("content/valves/index.md"), {encoding: "utf-8"});
        base = base.replace("{{content}}", content);

        return request(app)
        .get("/valves")
        .then(res => {
            expect(res.status).toBe(200);
            expect(res.text).toEqual(base);

        })    
    })
});

describe("failures", () => {
    it("When requesting a URL that doesn't exist then, return 404", () => {
        return request(app)
        .get("/test")
        .then(res => {
            expect(res.status).toBe(404);
        })
    });
})
