
const dbEmails = _db.query(`
  SELECT
    account.id,
    account.uid,
    template.code AS template,
    account.name AS account,
    domain.name AS domain,
    message.id AS message_id,
    message.subject,
    message.content
  FROM account
    INNER JOIN domain ON account.domain_id = domain.id
    INNER JOIN account_category ON account.id = account_category.account_id
    INNER JOIN message_category ON account_category.category_id = message_category.category_id
    INNER JOIN message ON message.id = message_category.message_id
    INNER JOIN template ON template.id = message.template_id
  WHERE account.active = TRUE
    AND domain.active = TRUE
    AND message.active = TRUE
    AND account.since < message.schedule
    AND message.finished IS NULL
    AND account.id NOT IN (SELECT account_id FROM account_message WHERE message_id = message.id)
  LIMIT ${_app.settings().getInt('send-limit')}
`)

if (dbEmails.isEmpty()) {
  const dbMessages = _db.query(`SELECT * FROM message WHERE finished IS NULL`)
  for (const dbMessage of dbMessages) {
    _db.update(
      'message', dbMessage.getInt('id'),
      _val.map()
        .set('finished', _db.timestamp())
    )
  }
  _log.info(`Nothing to send.`)
} else {
  _log.info(`Sending ${dbEmails.size()} more e-mails...`)
  for (const dbEmail of dbEmails) {
    const smtp = _smtp.init()

    smtp.to = dbEmail.getString('account') +'@'+ dbEmail.getString('domain')

    smtp.subject = dbEmail.getString('subject')

    smtp.text = `Content in HTML.`

    dbEmail.set('unsubscribe-link', `${_app.settings().getString('unsubscribe-link')}/${dbEmail.getString('uid')}`)

    smtp.html = _template.getOutput(
      'email/'+ dbEmail.getString('template'),
      dbEmail
    )

    smtp.attachment(
      "logo.png",
      "image/png",
      _storage.filesystem("server", "mail-logo.png").file(),
      "logo"
    )

    smtp.send()

    _db.insert(
      'account_message',
      _val.map()
        .set('account_id', dbEmail.getInt('id'))
        .set('message_id', dbEmail.getInt('message_id'))
        .set('moment', _db.timestamp())
    )
  }
}

_out.json(
  _val.map()
    .set('result', true)
)
