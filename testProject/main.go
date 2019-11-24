package main

import (
	"fmt"

	"github.com/TheScenery/BoltAdmin/boltadmin"

	"io/ioutil"
	"path/filepath"

	bolt "go.etcd.io/bbolt"
)

type MyDBManager struct {
	allDBs []string
}

func (manager MyDBManager) GetAllDBs() *[]string {
	return &manager.allDBs
}

func (manager MyDBManager) OpenDB(name string) (*bolt.DB, error) {
	return bolt.Open(filepath.Join("./data", name), 0600, nil)
}

func (manager MyDBManager) CloseDB(name string, db *bolt.DB) {
	db.Close()
}

func getAllDbs(dir string) (*[]string, error) {
	files, err := ioutil.ReadDir(dir)
	if err != nil {
		return nil, err
	}

	dbFiles := make([]string, 0)
	for _, file := range files {
		fileName := file.Name()
		if filepath.Ext(fileName) == ".db" {
			dbFiles = append(dbFiles, fileName)
		}
	}
	return &dbFiles, err
}

func initTestDb() {
	db, err := bolt.Open("./data/test.db", 0600, nil)
	defer db.Close()
	if err != nil {
		return
	}
	db.Update(func(tx *bolt.Tx) error {
		// Retrieve the users bucket.
		// This should be created when the DB is first opened.
		b, _ := tx.CreateBucketIfNotExists([]byte("users"))
		b, _ = tx.CreateBucketIfNotExists([]byte("rows"))
		b, _ = tx.CreateBucketIfNotExists([]byte("columns"))
		b, _ = tx.CreateBucketIfNotExists([]byte("nodes"))
		b, _ = tx.CreateBucketIfNotExists([]byte("photos"))
		b, _ = tx.CreateBucketIfNotExists([]byte("others"))
		return b.Put([]byte("qwer"), []byte("4567"))
	})

	db.View(func(tx *bolt.Tx) error {
		b := tx.Bucket([]byte("users"))
		v := b.Get([]byte("qwer"))
		fmt.Printf("The qwer is: %s\n", v)
		return nil
	})
}

func main() {
	allDbs, err := getAllDbs("./data")
	if err != nil {
		return
	}

	initTestDb()

	myDBManager := MyDBManager{
		allDBs: *allDbs,
	}
	err = boltadmin.Start(myDBManager)
	if err != nil {
		fmt.Println(err)
	}
}
