package main

import (
	"database/sql"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"path"
	"time"

	_ "github.com/lib/pq"
)

func main(){
	http.HandleFunc("/", routeIndexGet)
    http.HandleFunc("/process", routeSubmitPost)
	
	
	fmt.Println("server started at localhost:9990")
	http.ListenAndServe(":9990", nil)
}

type message struct{
	id int
	created_at time.Time
	question string
}

func connect()(*sql.DB, error){
	dsn := "host=localhost user=postgres password=postgres dbname=test_db_arta port=5432 sslmode=disable TimeZone=Asia/Jakarta"
	db, err := sql.Open("postgres", dsn)
    if err != nil {
		log.Fatal(err)
        return nil, err
    }

    return db, nil
}

func sqlQueryGet()([]message, error) {
    db, err := connect()
    if err != nil {
        log.Fatal(err)
        return nil, err
    }
    defer db.Close()

    rows, err := db.Query("select * from messages")
    if err != nil {
        log.Fatal(err)
        return nil, err
    }
    defer rows.Close()

    var result []message

    for rows.Next() {
        var each = message{}
        var err = rows.Scan(&each.id, &each.created_at, &each.question)

        if err != nil {
            log.Fatal(err)
            return nil, err
        }

        result = append(result, each)
    }

    if err = rows.Err(); err != nil {
        log.Fatal(err)
        return nil, err
    }

	return result, nil
}

func sqlQueryPost(question string){
	db, err := connect()
    if err != nil {
        panic(err)
    }
    defer db.Close()

    _, err = db.Exec("insert into messages (question) values ($1)", question)
    if err != nil {
        panic(err)
    }
}

func routeIndexGet(w http.ResponseWriter, r *http.Request) {
    if r.Method == "GET" {
		qData, err := sqlQueryGet()
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
		}
		data := []map[string]string{}
		for i := range qData {
			data = append(data, map[string]string{})
			data[i]["created_at"] = qData[len(qData)-1-i].created_at.Format("2006-01-02  [15:04:05]")
			data[i]["question"] = qData[len(qData)-1-i].question
		}
        var filepath = path.Join("views", "message.html")
		var header = path.Join("views", "header.html")
		var footer = path.Join("views", "footer.html")
		var tmpl = template.Must(template.ParseFiles(filepath,header,footer))
		err = tmpl.Execute(w, data)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
		}
		return
    }

    w.WriteHeader(http.StatusBadRequest)
}

func routeSubmitPost(w http.ResponseWriter, r *http.Request) {
    if r.Method == "POST" {

        if err := r.ParseForm(); err != nil {
            w.WriteHeader(http.StatusBadRequest)
            return
        }

        var question = r.FormValue("question")
        sqlQueryPost(question)
		http.Redirect(w,r,"/", http.StatusFound)
        return
    }
	
	w.WriteHeader(http.StatusBadRequest)
	
}