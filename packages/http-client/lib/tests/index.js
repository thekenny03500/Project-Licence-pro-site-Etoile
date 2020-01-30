const chai = require('chai');
const fetchMock = require('fetch-mock');
const fetch = require("node-fetch");
global.fetch = fetch;

const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);

const httpclient = require('../client');
const star = require('../model/Star');

const { expect } = chai;
let client;

describe('Test API', () => {
    beforeEach(() => client = httpclient('localhost', 7890))
    afterEach(fetchMock.resetBehavior)

    describe('Test Get', () => {
        let star1 = new star("name1", "galaxy1", 1000);
        star1.id = "id1";
        let star2 = new star("name2", "galaxy2", 2000);
        const starList = [star1, star2];

        it('test / getAll', (done) => {
            fetchMock.get(`http://localhost:7890/api/stars`, starList);
            client.getAll().then((result) => {
                expect(result).to.eql(starList);
                //const request = fetchMock.lastCall()[1];
                done();
            })
        });
        it('test / getInfoByIdExists', (done) => {
            fetchMock.get(`http://localhost:7890/api/stars/`+ star1.id, star1);
            client.getInfo(star1.id).then((result) => {
                expect(result.id).to.equal(star1.id);
                expect(result.name).to.equal(star1.name);
                expect(result.galaxy).to.equal(star1.galaxy);
                expect(result.distance).to.equal(star1.distance);
                done();
            })
        });
        it('test / getInfoByIdDoesNotExists', (done) => {
            fetchMock.get(`http://localhost:7890/api/stars/`+ star2.id, 404);
            client.getInfo(star2.id).catch((result) => {
                //expect(result).to.eql("GET : Bad request, id star does not exists");
                expect(result.statusCode).eql(404);
                expect(result.message).eql("Bad request, id star does not exists");
                done();
            })
        });
    });

    describe('Test Post', () => {
        let starToAdd = new star("I am a name", "I am a galaxy", 1000);
        let starToAddWithId = {};
        Object.assign(starToAddWithId, starToAdd);
        starToAddWithId.id = "iAmAnImposedId";
        it('test / add', (done) => {
            fetchMock.post(`http://localhost:7890/api/stars`, starToAddWithId);
            client.add(starToAdd.name,starToAdd.galaxy,starToAdd.distance).then((addedStar) => {
                expect(addedStar).have.property("id");
                expect(addedStar.id).eql(starToAddWithId.id);
                expect(addedStar.name).eql(starToAddWithId.name);
                expect(addedStar.galaxy).eql(starToAddWithId.galaxy);
                expect(addedStar.distance).eql(starToAddWithId.distance);
                
                const request = fetchMock.lastCall()[1];
                expect(request.method).equal('post');
                expect(request.body).equal(JSON.stringify(starToAdd));
                done();
            })
        });
        it('test / addByAttributesMissing', (done) => {
            let error = {name: "FailAddException", message: "Bad request, fail to add star"};
            let badStar = new star("myName", "myGalaxy", null);
            fetchMock.post(`http://localhost:7890/api/stars`, 400);
            client.add(starToAdd.name,starToAdd.galaxy,starToAdd.distance).catch((result) => {
                expect(result.statusCode).eql(400);
                expect(result.message).eql("Bad request, fail to add star");

                const request = fetchMock.lastCall()[1];
                expect(request.method).equal('post');
                expect(request.body).equal(JSON.stringify(starToAdd));
                done();
            })
        });
    });

    describe('Test Delete', () =>{
        let starIdToDelete = "iAmAnId";
        it("test / deleteOnceByIdExists", (done) => {
            fetchMock.delete(`http://localhost:7890/api/stars/` + starIdToDelete, 204);
            client.deleteOnce(starIdToDelete).then((result) => {
                expect(result).eql("DELETE : '" + starIdToDelete + "' has been deleted");
                done();
            })
        })
        it("test / deleteOnceByIdDoesNotExists", (done) => {
            fetchMock.delete(`http://localhost:7890/api/stars/` + starIdToDelete, 404);
            client.deleteOnce(starIdToDelete).catch((result) => {
                expect(result.statusCode).eql(404);
                expect(result.message).eql("Bad request, star id does not exists");
                done();
            })
        })
        it("test / deleteOnceByBadArguments", (done) => {
            fetchMock.delete(`http://localhost:7890/api/stars/` + starIdToDelete, 400);
            client.deleteOnce(starIdToDelete).catch((result) => {
                expect(result.statusCode).eql(400);
                expect(result.message).eql("Bad request, please verify attributes and id of star");
                done();
            })
        })
    })

    describe('Test Put', () => {
        let starToChange = {};
        it("test / putByOneAttribute", (done) => {
            starToChange.id = "iAmAnIdWichExists";
            starToChange.name = "starName";
            fetchMock.put(`http://localhost:7890/api/stars/` + starToChange.id, 200);
            client.put(starToChange).then((result) => {
                expect(result).eql("PUT : '" + starToChange.id + "' has been changed");
                done();
            })
        })
        it("test / putByTwoAttribute", (done) => {
            starToChange.id = "iAmAnIdWichExists";
            starToChange.name = "starName";
            starToChange.galaxy = "galaxyStar";
            fetchMock.put(`http://localhost:7890/api/stars/` + starToChange.id, 200);
            client.put(starToChange).then((result) => {
                expect(result).eql("PUT : '" + starToChange.id + "' has been changed");
                done();
            })
        })
        it("test / putByThreeAttribute", (done) => {
            starToChange.id = "iAmAnIdWichExists";
            starToChange.name = "starName";
            starToChange.galaxy = "galaxyStar";
            starToChange.distance = 1000;
            fetchMock.put(`http://localhost:7890/api/stars/` + starToChange.id, 200);
            client.put(starToChange).then((result) => {
                expect(result).eql("PUT : '" + starToChange.id + "' has been changed");
                done();
            })
        })
        it("test / putByIdWhichDoesNotExists", (done) => {
            starToChange.id = "iAmAnIdWichDoesNotExists";
            starToChange.name = "starName";
            fetchMock.put(`http://localhost:7890/api/stars/` + starToChange.id, 404);
            client.put(starToChange).catch((result) => {
                expect(result.statusCode).eql(404);
                expect(result.message).eql("Bad request, id star does not exists");
                done();
            })
        })
        it("test / putWithoutId", (done) => {
            starToChange.name = "iAmNameStarButItDoesNotHaveId"
            fetchMock.put(`http://localhost:7890/api/stars/` + starToChange.id, 400);
            client.put(starToChange).catch((result) => {
                expect(result.statusCode).eql(400);
                expect(result.message).eql("Bad request, please verify attributes and id of star");
                done();
            })
        })
        it("test / putWithoutStarAttribute", (done) => {
            starToChange.id = "iAmAnIdWichExists"
            fetchMock.put(`http://localhost:7890/api/stars/` + starToChange.id, 400);
            client.put(starToChange).catch((result) => {
                expect(result.statusCode).eql(400);
                expect(result.message).eql("Bad request, please verify attributes and id of star");
                done();
            })
        })
        it("test / putWithoutStarAttributeAndWhitoutId", (done) => {
            fetchMock.put(`http://localhost:7890/api/stars/` + starToChange.id, 400);
            client.put(starToChange).catch((result) => {
                expect(result.statusCode).eql(400);
                expect(result.message).eql("Bad request, please verify attributes and id of star");
                done();
            })
        })
    })
});
