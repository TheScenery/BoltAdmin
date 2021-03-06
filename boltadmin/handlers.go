package boltadmin

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

type handlerWrapper struct {
	dbManager DBManager
}

type requestData struct {
	Keys  []string `json:"keys"`
	Value string   `json:"value"`
}

func (wrapper *handlerWrapper) getAllDbs(c *gin.Context) {
	dbManager := wrapper.dbManager
	c.JSON(http.StatusOK, gin.H{
		"dbs": dbManager.GetAllDBs(),
	})
}

func (wrapper *handlerWrapper) getKey(c *gin.Context) {
	var requestOptions requestData
	if c.BindJSON(&requestOptions) == nil {
		dbManager := wrapper.dbManager
		dbName := c.Param("db")
		db, err := dbManager.OpenDB(dbName)
		defer dbManager.CloseDB(dbName, db)
		if err != nil {
			c.String(http.StatusBadRequest, "db name required")
			return
		}
		result, err := getKey(db, requestOptions.Keys)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err,
			})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"result": result,
		})
	}
}

func (wrapper *handlerWrapper) setKey(c *gin.Context) {
	var requestOptions requestData
	if c.BindJSON(&requestOptions) == nil {
		dbManager := wrapper.dbManager
		dbName := c.Param("db")
		db, err := dbManager.OpenDB(dbName)
		defer dbManager.CloseDB(dbName, db)
		if err != nil {
			c.String(http.StatusBadRequest, "db name required")
			return
		}
		result, err := setKey(db, requestOptions.Keys, requestOptions.Value)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err,
			})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"result": result,
		})
	}
}

func (wrapper *handlerWrapper) deleteKey(c *gin.Context) {
	var requestOptions requestData
	if c.BindJSON(&requestOptions) == nil {
		dbManager := wrapper.dbManager
		dbName := c.Param("db")
		db, err := dbManager.OpenDB(dbName)
		defer dbManager.CloseDB(dbName, db)
		if err != nil {
			c.String(http.StatusBadRequest, "db name required")
			return
		}
		result, err := deleteKey(db, requestOptions.Keys)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err,
			})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"result": result,
		})
	}
}

func (wrapper *handlerWrapper) addBucket(c *gin.Context) {
	var requestOptions requestData
	if c.BindJSON(&requestOptions) == nil {
		dbManager := wrapper.dbManager
		dbName := c.Param("db")
		db, err := dbManager.OpenDB(dbName)
		defer dbManager.CloseDB(dbName, db)
		if err != nil {
			c.String(http.StatusBadRequest, "db name required")
			return
		}
		result, err := addBucket(db, requestOptions.Keys)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err,
			})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"result": result,
		})
	}
}

func (wrapper *handlerWrapper) deleteBucket(c *gin.Context) {
	var requestOptions requestData
	if c.BindJSON(&requestOptions) == nil {
		dbManager := wrapper.dbManager
		dbName := c.Param("db")
		db, err := dbManager.OpenDB(dbName)
		defer dbManager.CloseDB(dbName, db)
		if err != nil {
			c.String(http.StatusBadRequest, "db name required")
			return
		}
		result, err := deleteBucket(db, requestOptions.Keys)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err,
			})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"result": result,
		})
	}
}
