migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g9k05zd7of3w5bl")

  // remove
  collection.schema.removeField("mvknwzce")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g9k05zd7of3w5bl")

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
