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

func getKey(db *bolt.DB, keys []string) (interface{}, error) {
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

func setKey(db *bolt.DB, keys []string, value string) (interface{}, error) {
	values := make(map[string]interface{})
	if len(keys) < 2 {
		return nil, fmt.Errorf("set key must have 2 keys at least")
	}
	var err error
	db.Update(func(tx *bolt.Tx) error {
		b, e := tx.CreateBucketIfNotExists([]byte(keys[0]))
		if err != nil {
			err = e
			return nil
		}
		bucketLength := len(keys) - 1
		valueKey := keys[bucketLength]
		for i := 1; i < bucketLength; i++ {
			key := keys[i]
			b, e = b.CreateBucketIfNotExists([]byte(key))
			if e != nil {
				err = e
				return nil
			}
		}
		if b == nil {
			err = fmt.Errorf("can not find bucket %s", keys)
			return nil
		}

		e = b.Put([]byte(valueKey), []byte(value))
		if err != nil {
			err = e
		}
		values[valueKey] = value
		return nil
	})
	return values, err
}

func deleteKey(db *bolt.DB, keys []string) (interface{}, error) {
	values := make(map[string]interface{})
	if len(keys) < 2 {
		return nil, fmt.Errorf("delete key must have 2 keys at least")
	}
	var err error
	db.Update(func(tx *bolt.Tx) error {
		b, e := tx.CreateBucketIfNotExists([]byte(keys[0]))
		if err != nil {
			err = e
			return nil
		}
		bucketLength := len(keys) - 1
		valueKey := keys[bucketLength]
		for i := 1; i < bucketLength; i++ {
			key := keys[i]
			b, e = b.CreateBucketIfNotExists([]byte(key))
			if e != nil {
				err = e
				return nil
			}
		}
		if b == nil {
			err = fmt.Errorf("can not find bucket %s", keys)
			return nil
		}
		value := b.Get([]byte(valueKey))
		e = b.Delete([]byte(valueKey))
		if err != nil {
			err = e
		}
		values[valueKey] = string(value)
		return nil
	})
	return values, err
}

func addBucket(db *bolt.DB, keys []string) (interface{}, error) {
	var err error
	var bucketName string
	db.Update(func(tx *bolt.Tx) error {
		b, e := tx.CreateBucketIfNotExists([]byte(keys[0]))
		if err != nil {
			err = e
			return nil
		}
		bucketLength := len(keys)
		for i := 1; i < bucketLength; i++ {
			key := keys[i]
			b, e = b.CreateBucketIfNotExists([]byte(key))
			if e != nil {
				err = e
				return nil
			}
		}
		if b == nil {
			err = fmt.Errorf("can not create bucket %s", keys)
			return nil
		}

		bucketName = keys[bucketLength-1]

		return nil
	})
	return bucketName, err
}
