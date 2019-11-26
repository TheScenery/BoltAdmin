package boltadmin

import (
	"github.com/gin-gonic/gin"
	bolt "go.etcd.io/bbolt"
)

type DBManager interface {
	GetAllDBs() *[]string
	OpenDB(dbName string) (*bolt.DB, error)
	CloseDB(dbName string, db *bolt.DB)
}

func Start(dbManager DBManager) error {
	router := gin.Default()
	router.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	router.GET("api/alldbs", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"dbs": dbManager.GetAllDBs(),
		})
	})
	router.GET("/allbuckets", func(c *gin.Context) {
		db, err := dbManager.OpenDB("test.db")
		if err == nil {
			c.JSON(200, gin.H{
				"buckets": getAllBuckets(db),
			})
		}

	})
	router.Run(":10113") // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
	return nil
}