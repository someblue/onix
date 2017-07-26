package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"text/template"

	log "github.com/Sirupsen/logrus"

	"gerrit.next.com/codegen"
)

// ltgen tmplfile datafile [outputfile]
func main() {
	log.Printf("ltgen!")
	if len(os.Args) < 3 {
		panic("args less than 2")
	}
	tmpl, err := template.New("ltgen").Funcs(codegen.Funcs()).Parse(getTmpl())
	if nil != err {
		panic(fmt.Errorf("parse tmpl error: %s", err))
	}

}

func getTmpl() string {
	var fileName = os.Args[1]
	content, err := ioutil.ReadFile(fileName)
	if nil != err {
		panic(err)
	}
	return string(content)
}

func getData() interface{} {
	var fileName = os.Args[2]
	content, err := ioutil.ReadFile(fileName)
	if nil != err {
		panic(err)
	}
	err := json.Unmarshal(content, j)
}

func output() (io.Writer, func()) {
	return
}
