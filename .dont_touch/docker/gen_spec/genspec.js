const { writeFileSync } = require('fs')

const all = {
    episodes: {
        singleName:"Episode",
        multiName: "Episodes",
        properties: [
            {
                name: "code",
                type: "string",
            },
            {
                name: "serie",
                type: "string",
            },
            {
                name: "note",
                type: "integer"
            }
        ]
    }
};

console.log(process.env);

function generate(part) {

    let spec = `
    {
        "openapi": "3.0.1",
        "info": {
            "title": "My API for ${part}",
            "version": "1.0.0"
        },
        "paths": {
            "/api/${part}": {
                "get": {
                    "summary": "List all ${part}",
                    "responses": {
                        "200": {
                            "description": "A paged array of ${part}",
                            "content": {
                                "application/json": {    
                                    "schema": {
                                        "$ref": "#/components/schemas/${all[part].multiName}"
                                    }
                                }
                            }
                        }
                    }
                },
                "post": {
                    "summary": "Add a ${part}",
                    "requestBody": {
                        "required": "true",
                        "content": {
                           "application/json": {    
                                "schema": {
                                    "$ref": "#/components/schemas/${all[part].singleName}Edit"
                                }
                            }
                        }
                    },
                    "responses": {
                        "201": {
                            "description": "Expected response to a valid request",
                            "content": {
                                "application/json": {    
                                    "schema": {
                                        "$ref": "#/components/schemas/${all[part].singleName}"
                                    }
                                }
                            }
                        },
                        "400": {
                            "description": "Expected response to a invalid request"
                        }
                    }
                }
            },
            "/api/${part}/{id}": {
                "get": {
                    "summary": "Info for a ${part}",
                    "parameters": [
                        {
                            "name": "id",
                            "in": "path",
                            "required": true,
                            "description": "The id of the ${part} to retrieve",
                            "type": "string",
                            "format": "uuid"
                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "Expected response to a valid request",
                            "schema": {
                                "$ref": "#/components/schemas/${all[part].singleName}"
                            }
                        },
                        "404": {
                            "description": "${part} not found"
                        }
                    }
                },
                "delete": {
                    "summary": "Delete a ${part}",
                    "parameters": [
                        {
                            "name": "id",
                            "in": "path",
                            "required": true,
                            "description": "The id of the ${part} to delete",
                            "type": "string",
                            "format": "uuid"
                        }
                    ],
                    "responses": {
                        "204": {
                            "description": "Expected response to a valid request"
                        },
                        "404": {
                            "description": "${part} not found"
                        }
                    }
                },
                "put": {
                    "summary": "Edit a ${part}",
                    "parameters": [
                        {
                            "name": "id",
                            "in": "path",
                            "required": true,
                            "description": "The id of the ${part} to edit",
                            "type": "string",
                            "format": "uuid"
                        }
                    ],
                    "requestBody": {
                        "required": "true",
                        "content": {
                           "application/json": {    
                                "schema": {
                                    "$ref": "#/components/schemas/${all[part].singleName}Edit"
                                }
                            }
                        }
                    },
                    "responses": {
                        "200": {
                            "description": "Expected response to a valid request"
                        },
                        "404": {
                            "description": "${part} not found"
                        },
                        "400": {
                            "description": "Expected response to a invalid request"
                        }
                    }
                }
            }
        },
        "components": {
            "schemas": {
                "${all[part].singleName}": {
                    "type": "object",
                    "required": [
                        "id" ${all[part].properties.reduce((value, property) => {
                            return `${value}, "${property.name}"`
                        }, "")}
                    ],
                    "properties": {
                        "id": {
                            "type":"string",
                            "format": "uuid"
                        }${all[part].properties.reduce((value, property) => {
                        return `${value},
                        "${property.name}": { 
                            "type": "${property.type}"
                        }`
                    }, "")}
                    }
                },
                "${all[part].singleName}Edit": {
                    "type": "object",
                    "required": [
                        ${all[part].properties.reduce((value, property, index) => {
                            return `${value}${ index != 0 ? ',': ''} "${property.name}"`
                        }, "")}
                    ],
                    "properties": {
                        ${all[part].properties.reduce((value, property, index) => {
                        return `${value}${ index != 0 ? ',': ''}
                        "${property.name}": { 
                            "type": "${property.type}"
                        }`
                    }, "")}
                    }
                },
                "${all[part].multiName}": {
                    "type": "array",
                    "items": {
                        "$ref": "#/components/schemas/${all[part].singleName}"
                    }
                }
            }
        }
    }
`

writeFileSync('/var/www/spec/spec.json', spec)

}

generate(process.env.PROJECT_PART);