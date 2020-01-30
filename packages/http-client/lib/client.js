const star = require('./model/Star');
const responseException = require('./exception/ResponseException');

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
  
      function getInfo(idStar) {
        return new Promise((resolve, reject) => {
            fetch(`http://${host}:${port}/api/stars/${idStar}`)
                .then((result) => {
                    if(result.status === 200){
                        resolve(result.json());
                    }
                    else{
                        //reject("GET : Bad request, id star does not exists");
                        reject(new responseException(result.status, "Bad request, id star does not exists"));
                    }
                })
                .catch(reject)
        });
    }

    function add(name, galaxy, distance) {
        let starToAdd = new star(name, galaxy, distance);
              return new Promise((resolve, reject) => {
            fetch(`http://${host}:${port}/api/stars`, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(starToAdd)
            })
            .then((response) =>{
                if(response.status === 200){
                    resolve(response.json());
                }
                else{
                    reject(new responseException(response.status, "Bad request, fail to add star"));
                }
            })
            .catch(reject);
        });
    }

    function deleteOnce(id){ 
        return new Promise((resolve, reject) => {
            fetch(`http://${host}:${port}/api/stars/${id}`, {
                method: 'delete'
            })
            .then((result) => {
                if(result.status === 204){
                    resolve("DELETE : '" + id + "' has been deleted");
                }
                else if(result.status === 400){
                    reject(new responseException(result.status, "Bad request, please verify attributes and id of star"));
                }
                else{ // 404
                    reject(new responseException(result.status, "Bad request, star id does not exists"));
                }
            })
            .catch(reject);
        })
    }

    function put(selectedStar){
        return new Promise((resolve, reject) => {
            fetch(`http://${host}:${port}/api/stars/${selectedStar.id}`, {
                method: 'put'
            })
            .then((result) => {
                if(result.status === 200){
                    resolve("PUT : '" + selectedStar.id + "' has been changed");
                }
                else if (result.status === 400){
                    reject(new responseException(result.status, "Bad request, please verify attributes and id of star"));
                }
                else{ // 404
                    reject(new responseException(result.status, "Bad request, id star does not exists"));
                }
            })
        })
    }
    
    return {
        getAll: getAll,
        getInfo: getInfo,
        add: add,
        deleteOnce: deleteOnce,
        put: put
    }
}