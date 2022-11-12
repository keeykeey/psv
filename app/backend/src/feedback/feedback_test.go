package feedback

import (
	"testing"
)

func TestFeedback(t *testing.T){
	res := FeedbackClient()
	if(res != "successifuly posted feedback"){
		t.Errorf("Test failed\n")
	}
}