package js

import (
	"fmt"
	"testing"
)

func TestJsjiami(t *testing.T) {
	j := NewJsjiami("./nanhua.js")
	//str := []uint8{8, 32, 42, 36, 42, 34, 10, 32, 42, 113, 144, 178, 179, 5, 177, 180, 15, 225, 205, 211, 200, 78, 232, 70, 94, 152, 195, 98, 204, 215, 4, 122, 86, 237, 78, 231, 121, 171, 100, 221}
	//uint8Array := []uint8(str)
	fmt.Println(j.Encode(18))
	//fmt.Println(j.Decode(str))
	//fmt.Println(j.Run())

}
