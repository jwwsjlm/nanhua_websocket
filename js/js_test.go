package js

import (
	"encoding/hex"
	"fmt"
	"testing"
)

func TestJsjiami(t *testing.T) {

	j := NewJsjiami("./nanhua.js")
	str := "081010082200"
	//{"msgid":16,"seq":4,"request":{}}
	// 将字符串转换为字节数组
	byteArr, err := hex.DecodeString(str)
	if err != nil {
		fmt.Println("转换失败:", err)
		return
	}

	fmt.Printf("转换结果: %v\n", byteArr)
	//str := []uint8{8, 32, 42, 36, 42, 34, 10, 32, 42, 113, 144, 178, 179, 5, 177, 180, 15, 225, 205, 211, 200, 78, 232, 70, 94, 152, 195, 98, 204, 215, 4, 122, 86, 237, 78, 231, 121, 171, 100, 221}
	//uint8Array := []uint8(str)
	fmt.Println(j.Encode(16))
	fmt.Println(j.Decode(byteArr))
	//fmt.Println(j.Run())

}
