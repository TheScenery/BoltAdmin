# BoltAdmin

[![Join the chat at https://gitter.im/TheScenery-BoltAdmin/community](https://badges.gitter.im/TheScenery-BoltAdmin/community.svg)](https://gitter.im/TheScenery-BoltAdmin/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A BoltDB Client.

A BoltBD wrapper can easily intergrate in your service and manage your DB without stop you own service.

![image](https://github.com/TheScenery/BoltAdmin/raw/master/src/asserts/boltAdmin.png)

# How to use?

Get the latest release from [here](https://github.com/TheScenery/BoltAdmin/releases).

```
./boltClient -dataDir "/var/botDbs"
```
you should use "dataDir" to pass a dbs directory, open `localhost:10113` in your browser. Then you can see all the "xxx.db" as a db.

# Build in local?

environment `node`, `yarn` and `go 1.13.5`

```
yarn install
yarn start
```

You are ready to go.