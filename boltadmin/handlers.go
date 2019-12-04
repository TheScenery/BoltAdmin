package boltadmin

import "github.com/gin-gonic/gin"

type handlerWrapper struct {
	dbManager DBManager
}

func (wrapper *handlerWrapper) getAllDbs(c *gin.Context) {
	dbManager := wrapper.dbManager
	c.JSON(200, gin.H{
		"dbs": dbManager.GetAllDBs(),
	})
}

func (wrapper *handlerWrapper) getKeys(c *gin.Context) {
	dbManager := wrapper.dbManager
	c.JSON(200, gin.H{
		"dbs": dbManager.GetAllDBs(),
	})
}
