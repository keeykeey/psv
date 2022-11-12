package main

import (
	"log"
    "fmt"
	"net/http"
	"feedback"
)

//func PostFeedback(w http.ResponseWriter, r *http.Request){
//	fmt.Printf("post feedback function is running\n")
//}

func main() {
    fmt.Printf("go main script is running\n")
	http.HandleFunc("/postfeedback",feedback.PostFeedback)
	log.Fatal(http.ListenAndServe(":8080",nil))
}