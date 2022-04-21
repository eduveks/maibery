
const dbCategories = _db.query(`SELECT * FROM category WHERE active = TRUE`)

const list = _val.list()

for (const dbCategory of dbCategories) {
  list.add(
    _val.map()
      .set('code', dbCategory.getString('code'))
      .set('name', dbCategory.getString('name'))
  )
}

_out.json(list)
