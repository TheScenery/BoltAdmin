package main

import (
	"flag"
	"fmt"

	"github.com/TheScenery/BoltAdmin/boltadmin"

	"io/ioutil"
	"path/filepath"

	bolt "go.etcd.io/bbolt"

	"path"
	"runtime"
)

type MyDBManager struct {
	baseDataDir string
	allDBs      []string
}

func (manager MyDBManager) GetAllDBs() *[]string {
	return &manager.allDBs
}

func (manager MyDBManager) OpenDB(name string) (*bolt.DB, error) {
	return bolt.Open(filepath.Join(manager.baseDataDir, name), 0600, nil)
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

func main() {
	_, filename, _, _ := runtime.Caller(0)
	currentDir := path.Dir(filename)
	defDataDir := path.Join(currentDir, "/data")
	dataDir := flag.String("dataDir", defDataDir, "db files directory path")
	fmt.Println(*dataDir)
	allDbs, err := getAllDbs(*dataDir)
	if err != nil {
		fmt.Println(err)
		return
	}

	myDBManager := MyDBManager{
		baseDataDir: defDataDir,
		allDBs:      *allDbs,
	}
	err = boltadmin.Start(myDBManager)
	if err != nil {
		fmt.Println(err)
	}
}
