module.exports = function(host, port) {
    
    function getAll() {
        return new Promise((resolve, reject) => {
            fetch(`http://${host}:${port}/api/stars`)
                .then((response) => {
                    resolve(response.json());
                })
                .catch(reject)
        });
    }

    function getInfo(idStar) {
        return new Promise((resolve, reject) => {
            fetch(`http://${host}:${port}/api/stars/${idStar}`)
                .then((response) => {
                    resolve(response.json());
                })
                .catch(reject)
        });
    }

    function add() {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:7890/api/stars', {
            method: 'post',
            body: JSON.stringify({eee: "uuuuu"})
        }).then(resolve).catch(reject)
        });
    }

    return {
        getAll: getAll,
        getInfo: getInfo,
        add: add
    }
}