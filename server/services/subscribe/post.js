
const email = _req.getString('email')

const emailParts = email.split('@')

const account = emailParts[0]

const domain = emailParts[1]

const dbDomain = _db.queryFirst(`SELECT * FROM domain WHERE name = ?`, domain)

let dbDomainId = 0;
if (dbDomain) {
    dbDomainId = dbDomain.getInt('id')
} else {
    dbDomainId = _db.insert(
        'domain',
        _val.map()
            .set('name', domain)
    )
}

const dbAccountId = _db.insertIfNotExists(
    'account',
    _val.init()
        .set('name', account)
        .set('domain_id', dbDomainId)
        .set('since', _db.timestamp())
);

_db.execute(`DELETE FROM account_category WHERE account_id = ?`, dbAccountId)

for (const categoryCode of _req.getValues('categories', _val.list())) {
  const dbCategory = _db.queryFirst('SELECT * FROM category WHERE code = ?', categoryCode)
  if (dbCategory) {
    _db.insert(
      'account_category',
      _val.map()
        .set('account_id', dbAccountId)
        .set('category_id', dbCategory.getInt('id'))
    )
  }
}

const dbAccount = _db.get('account', dbAccountId)

const smtp = _smtp.init()

smtp.to = email

smtp.subject = 'Welcome'

smtp.text = `Content in HTML.`

smtp.html = _template.getOutput(
  'email/generic',
  _val.map()
    .set('subject', 'Welcome')
    .set('content', 'Thank you for your subscription.')
    .set('unsubscribe-link', `${_app.settings().getString('unsubscribe-link')}/${dbAccount.getString('uid')}`)
)

smtp.attachment(
  "logo.png",
  "image/png",
  _storage.filesystem("server", "mail-logo.png").file(),
  "logo"
)

smtp.send()

_out.json({
    result: true
})
