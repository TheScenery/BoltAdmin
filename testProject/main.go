package main

import (
	"fmt"
	"github.com/TheScenery/BoltAdmin/boltadmin"

	bolt "go.etcd.io/bbolt"
	"io/ioutil"
	"path/filepath"
)

type MyDBManager struct {
	allDBs []string
}

func (manager MyDBManager) GetAllDBs() *[]string {
	return &manager.allDBs
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

func main() {

	db, err := bolt.Open("./data/db1.db", 0600, nil)
	if err != nil {
		fmt.Println(err)
	}
	defer db.Close()

	allDbs, err := getAllDbs("./data")
	if err != nil {
		return
	}

	myDBManager := MyDBManager{
		allDBs: *allDbs,
	}
	err = boltadmin.Start(myDBManager)
	if err != nil {
		fmt.Println(err)
	}
}
