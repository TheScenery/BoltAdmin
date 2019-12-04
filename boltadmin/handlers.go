package boltadmin

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

type handlerWrapper struct {
	dbManager DBManager
}

type formData struct {
	DBName string   `json:"dbName"`
	Keys   []string `json:"keys"`
	Value  string   `json:"value"`
}

func (wrapper *handlerWrapper) getAllDbs(c *gin.Context) {
	dbManager := wrapper.dbManager
	c.JSON(http.StatusOK, gin.H{
		"dbs": dbManager.GetAllDBs(),
	})
}

func (wrapper *handlerWrapper) getKeys(c *gin.Context) {
	var requestOptions formData
	if c.BindJSON(&requestOptions) == nil {
		dbManager := wrapper.dbManager
		db, err := dbManager.OpenDB(requestOptions.DBName)
		if err != nil {
			c.String(http.StatusBadRequest, "db name required")
			return
		}
		result, err := getKeys(db, requestOptions.Keys)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err,
			})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"reqult": result,
		})
	}
}
