package boltadmin

import (
	"fmt"

	bolt "go.etcd.io/bbolt"
)

type dbValue struct {
	Key      string `json:"key"`
	Value    string `json:"value"`
	IsBucket bool   `json:"isBucket"`
}

func getKeys(db *bolt.DB, keys []string) (interface{}, error) {
	buckets := make([]dbValue, 0)
	db.View(func(tx *bolt.Tx) error {
		c := tx.Cursor()

		for k, v := c.First(); k != nil; k, v = c.Next() {
			dbValueItem := dbValue{
				Key:      fmt.Sprintf("%s", k),
				IsBucket: v == nil,
			}
			if v != nil {
				dbValueItem.Value = fmt.Sprintf("%s", v)
			}
			buckets = append(buckets, dbValueItem)
		}

		return nil
	})
	return buckets, nil
}
