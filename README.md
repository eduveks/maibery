![Logo](https://raw.githubusercontent.com/eduveks/maibery/main/docs/logo.svg)

# maibery

This is an e-mail delivery system that manages to send massive emails.

## Installation

The requirements and the server, easy-peasy:

- [Netuno Platform Install](https://doc.netuno.org/docs/en/installation/)

#### Automatic

In your terminal, execute the command below into the Netuno root folder to install and autoconfigure the application:

```
./netuno app github=eduveks/maibery
```

> This requires GIT command.

Then start the Netuno with the Maibery application:

```
./netuno server app=maibery
```

> At first time will take some time because of the auto-execution of the NPM installs.

#### Manual

Clone this project inside of the `apps` folder in the Netuno root, for example:

```
cd netuno/apps
git clone https://github.com/eduveks/maibery.git
```

And set the configurations inside of the Maibery app folder:

```
cd netuno/apps/maibery
```

Copy from base configuration and edit to make your own adjustments:

```
cp config/sample.json config/_development.json
```

Now just need to start the Netuno Server, but with the Plunto Web Chat as the main application:

```
./netuno server app=maibery
```

> At the first time, may execute the NPM installs automatically.

## Local Development Links

After starting the Maibery application and finished the NPM installs, these links below will be available.

Backoffice:
 - http://localhost:9000/

Website:
 - http://localhost:3000/

# Configuration

Set your SMTP host configurations inside the `config/_*.json` files, according to your environment:

```
  "smtp": {
    "default": {
      "enabled": true,
      "host": "YOUR.MAIL.HOST.COM",
      "port": 465,
      "ssl": true,
      "from": "YOUR.FROM@E-MAIL.COM",
      "username": "YOUR@E-MAIL.COM",
      "password": "YOUR-PASSWORD"
    }
  },
```

Make your adjustments like the unsubscribe link on these configs:

```
  "settings": {
    "public": {},
    "unsubscribe-link": "http://localhost:9000/unsubscribe",
    "send-limit": 10
  },
```

🙌 have fun.
