package main

import (
	"fmt"
	"github.com/TheScenery/BoltAdmin/boltadmin"
)

type MyDBManager struct {
	allDBs []string
}

func (manager MyDBManager) GetAllDBs() *[]string {
	return &manager.allDBs
}

func main() {
	myDBManager := MyDBManager{
		allDBs: []string{"aaa"},
	}
	err := boltadmin.Start(myDBManager)
	if err != nil {
		fmt.Println(err)
	}
}
