migrate((db) => {
  const collection = new Collection({
    "id": "g9k05zd7of3w5bl",
    "created": "2023-02-25 17:18:44.749Z",
    "updated": "2023-02-25 17:18:44.749Z",
    "name": "acronyms",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "mvknwzce",
        "name": "acronym",
        "type": "text",
        "required": true,
        "unique": true,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "bjtpz1e2",
        "name": "expanded",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "we3fajr5",
        "name": "info",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": 200,
          "pattern": ""
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("g9k05zd7of3w5bl");

  return dao.deleteCollection(collection);
})
