package boltadmin

import (
	"fmt"

	bolt "go.etcd.io/bbolt"
)

func getAllBuckets(db *bolt.DB) []string {
	buckets := make([]string, 0)
	db.View(func(tx *bolt.Tx) error {
		c := tx.Cursor()

		for k, v := c.First(); k != nil; k, v = c.Next() {
			buckets = append(buckets, fmt.Sprintf("%s", k))
			fmt.Printf("key=%s, value=%s\n", k, v)
		}

		return nil
	})
	return buckets
}