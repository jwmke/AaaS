migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g9k05zd7of3w5bl")

  // remove
  collection.schema.removeField("we3fajr5")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nwwnfcjg",
    "name": "info",
    "type": "url",
    "required": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g9k05zd7of3w5bl")

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // remove
  collection.schema.removeField("nwwnfcjg")

  return dao.saveCollection(collection)
})
