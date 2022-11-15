package feedback

import (
        "fmt"
		"net/http"
		"os"
		"time"
		"encoding/json"
)

func wt(f *os.File, s string) {
	_, er := f.WriteString(s)
	if er != nil {
		fmt.Println(er)
		f.Close()
		return
	}
}

func PostFeedback(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Access-Control-Allow-Origin","*")
	headers := r.Header.Get("Access-Control-Request-Headers")
    w.Header().Set("Access-Control-Allow-Headers",headers)

	type Feedback struct {
        Textline  string
	}
	var fb Feedback
	err := json.NewDecoder(r.Body).Decode(&fb)
	if (err != nil){
		fmt.Printf("failed to decode request body to json\n")
	}

    fmt.Printf("body : %s\n",fb.Textline)

    /* 
	 *write feedback to the file 
	 */

	FNAME := "feedback.txt"
	feedback := fb.Textline//"feedback text\n"

	f,err := os.OpenFile(FNAME, os.O_APPEND | os.O_CREATE | os.O_WRONLY, os.ModePerm)
	if err != nil {
		fmt.Println(err)
		return
	}
	t := time.Now().Local()
    wt(f,t.String() + "," + feedback + "\n")

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(t.String()))
}
