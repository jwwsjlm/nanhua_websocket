package main

import (
	"fmt"
	"github.com/gorilla/websocket"
	"log"
	es5 "nanhua/js"
	"net/http"
	"os"
	"os/signal"
)

func main() {

	interrupt := make(chan os.Signal, 1)
	signal.Notify(interrupt, os.Interrupt)

	// 建立 WebSocket 连接
	u := "wss://ipv46hqgatewaycr.nanhua.net:9443/gateway" // WebSocket 服务器的地址
	header := http.Header{}                               // 可以添加自定义的请求头
	c, _, err := websocket.DefaultDialer.Dial(u, header)
	if err != nil {
		log.Fatal("无法建立 WebSocket 连接：", err)
	}
	defer c.Close()

	done := make(chan struct{})
	js := es5.NewJsjiami("./js/nanhua.js")

	// 启动一个 goroutine 接收 WebSocket 服务器发送的消息
	go func() {
		defer close(done)
		for {
			_, message, err := c.ReadMessage()
			mesDecode := js.Decode(message)
			if err != nil {
				log.Println("读取消息错误：", err)
				return
			}
			fmt.Printf("收到消息：%s\n", mesDecode)

		}
	}()

	// 主程序等待中断信号（Ctrl+C）并关闭 WebSocket 连接
	data, _ := js.Encode(32)
	c.WriteMessage(websocket.BinaryMessage, data)

	data, _ = js.Encode(66)
	c.WriteMessage(websocket.BinaryMessage, data)
	data, _ = js.Encode(64)
	c.WriteMessage(websocket.BinaryMessage, data)
	data, _ = js.Encode(18)
	c.WriteMessage(websocket.BinaryMessage, data)
	//fmt.Println([]byte(v))
	for {
		select {
		case <-done:
			return
		case <-interrupt:
			log.Println("接收到中断信号，关闭 WebSocket 连接...")
			err := c.WriteMessage(websocket.CloseMessage, websocket.FormatCloseMessage(websocket.CloseNormalClosure, ""))
			if err != nil {
				log.Println("关闭 WebSocket 连接错误：", err)
				return
			}
			select {
			case <-done:
			}
			return
		}
	}
}
