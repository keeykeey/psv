package feedback

import (
	"fmt"
	"net/http"
	"io/ioutil"
	"bytes"
	"encoding/json"
)

type Feedback struct {
	Textline string
}

func FeedbackClient() string {
	/*
	 * Preparation
	 */
	request_body := &Feedback{
		Textline: "your app is good. but still you have a lot to do with it!\n",
	}
    json_string,err := json.Marshal(request_body)
	if (err != nil) {
		panic("Error\n")
	}
  
	endpoint := "http://localhost:8080/postfeedback"
    req, err := http.NewRequest("POST", endpoint, bytes.NewBuffer(json_string))
	if (err != nil) {
		panic("Error\n")
	}
	req.Header.Set("Content-type","application/json")

	/* 
	 * Send Request From Client
	 */
    client := new(http.Client)
	resp, err := client.Do(req)
	if (err != nil) {
		panic("Error")
	}
	defer resp.Body.Close()

    byteArray, err := ioutil.ReadAll(resp.Body)
	if (err != nil) {
		panic("error")
	}

	fmt.Printf("resp.Body : %#v\n",string(byteArray))

    return string(byteArray)
}