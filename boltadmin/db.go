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
	values := make([]dbValue, 0)
	var err error
	db.View(func(tx *bolt.Tx) error {
		c := tx.Cursor()
		if len(keys) > 0 {
			b := tx.Bucket([]byte(keys[0]))
			for i := 1; i < len(keys); i++ {
				if b == nil {
					err = fmt.Errorf("can not find bucket %s", keys)
					return nil
				}
				key := keys[i]
				b = b.Bucket([]byte(key))
			}
			if b == nil {
				err = fmt.Errorf("can not find bucket %s", keys)
				return nil
			}
			c = b.Cursor()
		}

		for k, v := c.First(); k != nil; k, v = c.Next() {
			dbValueItem := dbValue{
				Key:      fmt.Sprintf("%s", k),
				IsBucket: v == nil,
			}
			if v != nil {
				dbValueItem.Value = fmt.Sprintf("%s", v)
			}
			values = append(values, dbValueItem)
		}

		return nil
	})
	return values, err
}
