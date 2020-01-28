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
  
      function getInfo(idStar) {
        return new Promise((resolve, reject) => {
            fetch(`http://${host}:${port}/api/stars/${idStar}`)
                .then((result) => {
                    if(result.status === 200){
                        resolve(result.json());
                    }
                    else{
                        resolve("GET : Bad request, id star does not exists");
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
                    reject( {
                        name:        "FailAddException",
                        message:     "Bad request, fail to add star",
                    });
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
                    reject("DELETE : Bad request, please verify attributes and id of star");
                }
                else{ // 404
                    reject("DELETE : Bad request, star id does not exists");
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
                    reject("PUT : Bad request, please verify attributes and id of star");
                }
                else{ // 404
                    reject("PUT : Bad request, id star does not exists");
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