const star = require('./model/Star');

module.exports = function(host, port) {
    
    function getAll() {
        return new Promise((resolve, reject) => {
            fetch(`http://${host}:${port}/api/stars`)
            .then((response) => {
                resolve(response.json());
            })
            .catch(reject);
        });
    }
    function add(name, galaxy, distance) {
        let starToAdd = new star(name, galaxy, distance);
        return new Promise((resolve, reject) => {
            fetch(`http://${host}:${port}/api/stars`, {
                method: 'post',
                body: JSON.stringify(starToAdd)
            })
            .then((response) =>{
                resolve(response.json());
            })
            .catch(reject);
        });
    }
    return {
        getAll: getAll,
        add: add
    }
}