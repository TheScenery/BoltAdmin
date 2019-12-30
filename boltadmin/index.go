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

	router.Static("/static", "./static")
	router.StaticFile("/", "./index.html")
	router.StaticFile("/favicon.ico", "./favicon.ico")

	api := router.Group("/api")
	api.GET("/alldbs", wrapper.getAllDbs)
	api.POST("/getKey/:db", wrapper.getKey)
	api.POST("/setKey/:db", wrapper.setKey)
	api.POST("/deleteKey/:db", wrapper.deleteKey)
	api.POST("/addBucket/:db", wrapper.addBucket)
	api.POST("/deleteBucket/:db", wrapper.deleteBucket)

	router.Run(":10113") // listen and serve on 0.0.0.0:10113 (for windows "localhost:10113")
	return nil
}
