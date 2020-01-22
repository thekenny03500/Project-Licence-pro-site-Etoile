const chai = require('chai');
const fetchMock = require('fetch-mock');
const fetch = require("node-fetch");
global.fetch = fetch;

const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);

const httpclient = require('../client');
const star = require('../model/Star');

const { expect } = chai;

describe('Test API', () => {

    afterEach(fetchMock.resetBehavior)

    describe('Test Get', () => {

        const listeStar = [{"id":"cd5b95b2-fb42-4b23-b8e7-6dd8a03e19ae","name":"All Passion Spent","galaxy":"Little Hands Clapping","distance":null},{"id":"b0a40133-3c80-4c39-aeac-015d8710c603","name":"Tiger! Tiger!","galaxy":"An Evil Cradling","distance":null}];

        it('test / getAll', async () => {
            fetchMock.get(`http://localhost:7890/api/stars`, listeStar);
            const client = httpclient('localhost', 7890);
            client.getAll().then((result) => {
                expect(result).to.eql(listeStar);
            })
        });
        it('test / getInfo', async () => {
            const star = listeStar[0];
            fetchMock.get(`http://localhost:7890/api/stars/`+star.id,star );
            const client = httpclient('localhost', 7890);
            client.getInfo(star.id).then((result)=>{
                expect(result).to.eql(star);
            });
        });
    });

    describe('Test Post', () => {
        let aStar = new star("All Passion Spent","Little Hands Clapping",null);
        let aStarResult = {};
        Object.assign(aStarResult,aStar);
        aStarResult.id = "cd5b95b2-fb42-4b23-b8e7-6dd8a03e19ae";
        it('test / add', async () => {
            fetchMock.post(`http://localhost:7890/api/stars`,
                            aStarResult);

            const client = httpclient('localhost', 7890);
            client.add(aStar.name,aStar.galaxy,aStar.distance).then((result) => {
                expect(result.id).to.not.have.property("id"); // Test is id is null or undefined
                const request = fetchMock.lastCall()[1];
                expect(request.method).equal('post');
                expect(request.body).equal(JSON.stringify(aStar));
            })
        });
    });
});
