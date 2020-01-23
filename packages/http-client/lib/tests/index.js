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
                const request = fetchMock.lastCall()[1];
                done();
            })
        });
        it('test / getInfoByIdExists', (done) => {
            fetchMock.get(`http://localhost:7890/api/stars/`+ star1.id, star1);
            client.getInfo(star1.id).then((result) => {
                expect(result.id).to.equal(star1.id);
                expect(result.name).to.equal(star1.name);
                expect(result.name).to.equal(star1.name);
                expect(result.name).to.equal(star1.name);
                done();
            })
        });
        it('test / getInfoByIdDoesNotExists', (done) => {
            fetchMock.get(`http://localhost:7890/api/stars/`+ star2.id, 404);
            client.getInfo(star2.id).then((result) => {
                expect(result).to.eql(404);
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
                
                // Optionnal ?
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
                expect(result).eql(true);
                done();
            })
        })
        it("test / deleteOnceByIdDoesNotExists", (done) => {
            fetchMock.delete(`http://localhost:7890/api/stars/` + starIdToDelete, 404);
            client.deleteOnce(starIdToDelete).then((result) => {
                expect(result).eql(false);
                done();
            })
        })
    })
});
