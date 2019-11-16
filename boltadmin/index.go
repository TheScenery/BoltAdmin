package boltadmin

import "github.com/gin-gonic/gin"

type DBManager interface {
	GetAllDBs() *[]string
}

func Start(dbManager DBManager) error {
	router := gin.Default()
	router.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	router.Run(":10113") // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
	return nil
}
