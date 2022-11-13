#!/bin/sh
echo gopath : $GOPATH
echo goroot : $GOROOT

#GOモジュールがデフォルトで有効になったため、GO111MODULE=off をつけなくては、gopathからのimportに失敗するようになった。
GO111MODULE=off go run main.go