package boltadmin

import bolt "go.etcd.io/bbolt"

type DBManager interface {
	GetAllDBs() *[]string
	OpenDB(dbName string) (*bolt.DB, error)
	CloseDB(dbName string, db *bolt.DB)
}
