module.exports = function(host, port) {
    
    function getAll() {
        return new Promise((resolve, reject) => {
            fetch(`http://${host}:${port}/api/change`)
                .then((response) => {
                    resolve(response.json());
                })
                .catch(reject)
        });
    }
    function add() {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:7890/api/change', {
            method: 'post',
            body: JSON.stringify({eee: "uuuuu"})
        }).then(resolve).catch(reject)
        });
    }
    return {
        getAll: getAll,
        add: add
    }
}