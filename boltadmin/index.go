package boltadmin

import (
	"github.com/gin-gonic/gin"
)

func Start(dbManager DBManager) error {
	router := gin.Default()
	wrapper := handlerWrapper{dbManager: dbManager}

	// test server
	router.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	api := router.Group("/api")
	api.GET("/alldbs", wrapper.getAllDbs)
	api.POST("/getKey/:db", wrapper.getKey)
	api.POST("/setKey/:db", wrapper.setKey)
	api.POST("/deleteKey/:db", wrapper.deleteKey)

	router.Run(":10113") // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
	return nil
}
