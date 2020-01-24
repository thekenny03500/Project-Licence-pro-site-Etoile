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
                    if(result.status == 200){
                        resolve(result.json());
                    }
                    else{
                        resolve(result.status);
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
                resolve(response.json());
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
                if(result.status == 204){
                    resolve(true);
                }
                else{
                    resolve(false);
                }
            })
            .catch(reject);
        })
    }
    
    return {
        getAll: getAll,
        getInfo: getInfo,
        add: add,
        deleteOnce: deleteOnce
    }
}