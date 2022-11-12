package main

import (
    "log"
    "fmt"
    "net/http"
    "feedback"
)

func main() {
    fmt.Printf("go main script is running\n")
    http.HandleFunc("/postfeedback",feedback.PostFeedback)
    log.Fatal(http.ListenAndServe(":8080",nil))
}