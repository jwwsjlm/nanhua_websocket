package js

import (
	"fmt"
	"github.com/dop251/goja"
	"os"
)

type Jsjiami struct {
	jsFile []byte
	Js     *goja.Runtime
}
type Auth struct {
	Apptype string  `json:"apptype"`
	Token   []uint8 `json:"token"`
}

type Data struct {
	Auth Auth `json:"auth"`
}

func NewJsjiami(File string) *Jsjiami {
	F, _ := os.ReadFile(File) //"./js/nahai.js"

	return &Jsjiami{
		jsFile: F,
		Js:     goja.New(),
	}
}
func (j *Jsjiami) Decode(data []uint8) string {
	_, err := j.Js.RunString(string(j.jsFile))
	if err != nil {
		fmt.Println("JS代码有问题！")
		return ""
	}
	var Dec func([]uint8) string
	err = j.Js.ExportTo(j.Js.Get("decode"), &Dec)
	if err != nil {
		panic("Not a function")
	}

	return Dec(data)
}

func (j *Jsjiami) Encode(msgid int) ([]uint8, error) {
	_, err := j.Js.RunString(string(j.jsFile))
	if err != nil {
		fmt.Println("JS代码有问题！")
		return make([]uint8, 0), err
	}

	var Encode func(int) []uint8
	err = j.Js.ExportTo(j.Js.Get("jiami"), &Encode)
	if err != nil {
		panic("Not a function")
	}

	return Encode(msgid), nil

}
