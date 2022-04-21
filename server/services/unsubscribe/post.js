
const uid = _req.getString('uid')

const dbAccount = _db.get('account', uid)

if (dbAccount) {
  _db.update(
    'account', dbAccount.getInt('id'),
    _val.map()
      .set('active', false)
  )
}

_out.json(
  _val.map()
    .set('result', true)
)
