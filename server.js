//모듈 추출 : fs 모듈, ejs 모듈, mysql 모듈, express 모듈, bodyParser 모듈
var fs = require('fs');
var ejs = require('ejs');
var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var session = require('express-session');                     
var MySQLStore = require('express-mysql-session')(session);
var socketio = require('socket.io');
const e = require('express');
var share_i = "";
var join_i = "";

var app = express();
var server = http.createServer(app);
app.use(bodyParser.urlencoded({
    extended: false
}));

//세션 미들웨어 설치
app.use(session({                                             
    secret:"itissecretkey",
    resave:false,
    saveUninitialized:true,
    store: sessionStore                                          
}));
  
//moaZOOM 데이터베이스 연결
var client = mysql.createConnection({
    user: 'root',
    password: 'root0103',
    database: 'moaZOOM',
    multipleStatements: true
});
var sessionStore = new MySQLStore(client);

var io = socketio();
io.attach(server);

server.listen(3000, function() {
  console.log('Server is running at http://127.0.0.1:3000');
});

//주요화면
app.get('/', function(request, response) {
    fs.readFile('main.html', 'utf8', function(error, data) {
        response.send(data);
    });
});

//회원가입
app.get('/join', function(request, response) { //회원가입 페이지
    fs.readFile('join.html', 'utf8', function(error, data) {
        response.send(data);
    });
});
app.post('/join', function(request, response) { //회원가입 페이지 주소
    var body = request.body;
    var ID = request.body.ID;
    var pw = request.body.pw;
    var name = request.body.name;
    var phone = request.body.phone;
    var email = request.body.email;
    var major = request.body.major;
    console.log(body);
    if(ID && pw && name && phone && email && major) {
        client.query('SELECT * FROM member_tbl WHERE ID = ?', [ID], function(error, results) {   //아이디를 DB에서 검색
            if (error) {
                console.log('에러가 발생했습니다');
                console.log(error);
                throw error;
            }
            if (results.length != 0) {   //아이디와 비밀번호 비교한 결과값이 존재할 때 (회원이 검색됨)
                response.send('<script type="text/javascript">alert("이미 존재하는 회원입니다"); document.location.href="/join";</script>');
            } else {
                client.query('INSERT INTO member_tbl (ID, pw, name, phone, email, major) VALUES (?, ?, ?, ?, ?, ?)', [
                    body.ID, body.pw, body.name, body.phone, body.email, body.major
                ], function() {
                    response.send('<script type="text/javascript">alert("회원가입 되었습니다"); document.location.href="/login";</script>');
                    //response.redirect('/login'); //회원가입 후 이동할 곳
                });
            }
        })
    } else {
        response.send('<script type="text/javascript">alert("입력하지 않은 내용이 있습니다"); document.location.href="/join";</script>'); //리다이렉트할 주소 적기
        response.end();
    }
});

//로그인
app.get('/login', function (request, response) { //로그인 페이지
    fs.readFile('login.html', 'utf8', function(error, data) { //''안에 로그인 페이지 html 넣기
        if(request.session.name) {
            response.send('<script type="text/javascript">alert("이미 로그인 되었습니다"); document.location.href="/all";</script>'); //리다이렉트할 주소 적기
            response.end();
        } else {
            response.send(data.toString());
        }
    });
});
app.post('/login', function(request, response) {
    var ID = request.body.ID;
    var pw = request.body.pw;

    console.log(ID, pw);
    console.log(request.body);
    if(ID && pw) {
        client.query('SELECT * FROM member_tbl WHERE ID = ? AND pw = ?', [ID, pw], function(error, results) {   //아이디와 비밀번호를 DB에서 검색
            if (error) {
                console.log('에러가 발생했습니다');
                throw error;
            }
            if (results.length == 0) {
                response.send('<script type="text/javascript">alert("로그인 정보 오류 발생, 재시도 하세요"); document.location.href="/login";</script>'); //리다이렉트할 주소 적기
            } else {
                client.query('SELECT major FROM member_tbl WHERE ID = ?', [ID], function(error, results) {
                    if(error) throw error;
                    else {
                        request.session.name = ID;
                        request.session.major = results;
                        request.session.isLogined = true;
                        console.log("로그인됨 세션열림");
                        request.session.save(function(){                             
                            response.redirect('/all');
                        });
                    }
                })
            };    
        });
    } else {
        response.send('<script type="text/javascript">alert("아이디 혹은 비밀번호를 잘못 입력하였습니다"); document.location.href="/login";</script>'); //리다이렉트할 주소 적기
        response.end();
    }
});

//로그아웃 : 세션 종료시키기
app.get('/logout', function(request, response) {  //로그아웃 페이지
    request.session.isLogined = false;
    delete request.session.name;
    response.send('<script type="text/javascript">alert("로그아웃"); document.location.href="/all";</script>') //로그아웃 후 위치 지정
    response.end();
});

//마이페이지
app.get('/mypage', function (request, response) { //로그인 페이지
    fs.readFile('mypage.html', 'utf8', function(error, data) { //''안에 로그인 페이지 html 넣기
        ID = request.session.name
        if(ID) {
            client.query('SELECT * FROM member_tbl WHERE ID = ?;'+'SELECT * FROM info_tbl WHERE ID = ?;'+'SELECT * FROM match_tbl WHERE ID = ?;'+'SELECT * FROM group_tbl WHERE ID = ?', [ID, ID, ID, ID], function(error, results) {
                var sql1 = results[0];
                var sql2 = results[1];
                var sql3 = results[2];
                var sql4 = results[3];
                
                response.send(ejs.render(data, {
                    data1: sql1,
                    data2: sql2,
                    data3: sql3,
                    data4: sql4
                }));
            });
        } else {
            response.send('<script type="text/javascript">alert("로그인하세요"); document.location.href="/login";</script>'); //리다이렉트할 주소 적기
            response.end();
        }
        
    });
});

//메인 페이지 로딩
app.get('/all', function(request, response) { //그룹매칭글 작성 페이지
    fs.readFile('all.html', 'utf8', function(error, data) { //그룹매칭글 html
        client.query('SELECT * FROM match_tbl;'+'SELECT * FROM info_tbl;', function(error, results) {
            var sql1 = results[0];
            var sql2 = results[1];
                
            response.send(ejs.render(data, {
                data1: sql1,
                data2: sql2
            }));
        });
    });
});

app.get('/map', function(request, response) { //그룹매칭글 작성 페이지
    fs.readFile('map.html', 'utf8', function(error, data) { //그룹매칭글 html
        response.send(data);
    });
});

//그룹매칭 페이지
app.get('/group_matching', function(request, response) { //그룹매칭글 작성 페이지
    fs.readFile('group_matching.html', 'utf8', function(error, data) { //그룹매칭글 html
        client.query('SELECT * FROM match_tbl;', function(error, results) {
            response.send(ejs.render(data, {
                data: results
            }));
        });
    });
});
app.post('/group_matching', function(request, response) {
    if(request.body.textnum) {
        if(request.session.name) {
            ID = request.session.name;
            var textnum = request.body.textnum;
            var num = request.body.num;
            var title = request.body.title;
            client.query('SELECT * FROM group_tbl WHERE textnum=? AND ID=?', [textnum, ID], function(error, result) {
                if(result.length != 0) {
                    response.send('<script type="text/javascript">alert("이미 참가한 그룹입니다"); document.location.href="/group_matching";</script>');
                } else {
                    client.query('SELECT * FROM group_tbl WHERE textnum=?', [textnum], function(error, result) {
                        if(result.length >= num) {
                            response.send('<script type="text/javascript">alert("그룹 꽉 찼습니다, 현재 '+result.length+'명 참여 중"); document.location.href="/group_matching";</script>');
                        } else {
                            client.query('INSERT INTO group_tbl (g_i, num, ID, textnum, title) VALUES (?, ?, ?, ?, ?)', [
                                0, num, ID, textnum, title
                            ], function() {
                                response.send('<script type="text/javascript">alert("그룹에 추가되었습니다! 현재'+(result.length+1)+'명 참여중"); document.location.href="/group_matching";</script>');
                            });
                        }
                    })
                }
            })
        } else {
            response.send('<script type="text/javascript">alert("로그인하세요"); document.location.href="/login";</script>'); //리다이렉트할 주소 적기
            response.end();
        }
    } else if(request.body.gm_i) {
        join_i = request.body.gm_i;
        //response.send('<script type="text/javascript">document.location.href="/group_matching";</script>');
        //response.end();
    }
});

//그룹 상세 페이지
app.get('/view_join', function(request, response) {
    fs.readFile('view_join.html', 'utf8', function(error, data) {
        client.query('SELECT * FROM match_tbl WHERE gm_i = ?;'+'SELECT * FROM chat_tbl_j WHERE join_i = ?',[join_i, join_i], function(error, results) {
            var sql1 = results[0];
            var sql2 = results[1];
            
            response.send(ejs.render(data, {
                data1: sql1,
                data2: sql2
            }));
        });
    });
});
app.post('/view_join', function(request, response) {
    if(request.session.name) {
        if(request.body.textnum) {
            ID = request.session.name;
            var textnum = request.body.textnum;
            var num = request.body.num;
            var title = request.body.title;
            client.query('SELECT * FROM group_tbl WHERE textnum=? AND ID=?', [textnum, ID], function(error, result) {
                if(result.length != 0) {
                    response.send('<script type="text/javascript">alert("이미 참가한 그룹입니다"); document.location.href="/view_join";</script>');
                } else {
                    client.query('SELECT * FROM group_tbl WHERE textnum=?', [textnum], function(error, result) {
                        if(result.length >= num) {
                            response.send('<script type="text/javascript">alert("그룹이 꽉찼습니다, 현재'+result.length+'명 참여중"); document.location.href="/view_join";</script>');
                        } else {
                            client.query('INSERT INTO group_tbl (g_i, num, ID, textnum, title) VALUES (?, ?, ?, ?, ?)', [
                                0, num, ID, textnum, title
                            ], function() {
                                response.send('<script type="text/javascript">alert("그룹에 추가되었습니다! 현재'+(result.length+1)+'명 참여중"); document.location.href="/group_matching";</script>');
                            });
                        }
                    })
                }
            })
        } else {
            if(request.session.name) {
                var ID = request.session.name;
                var major = request.session.major;
                var ID2 = ID.substr(0, 2);
                var major2 = major[Object.keys(major)[0]];
                var major3 = major2[Object.keys(major2)[0]];
                var nick = ID2+"학번 "+major3;
                var text = request.body.text;
                var today = new Date();  
                var time = today.toLocaleTimeString();
                client.query('INSERT INTO chat_tbl_j (chat_i, text, time, join_i, nick) VALUES (?, ?, ?, ?, ?)', [
                    0, text, time, join_i, nick
                ], function() {
                    console.log('댓글 성공!');
                    response.send('<script type="text/javascript">document.location.href="/view_join";</script>');
                });
            } else {
                response.send('<script type="text/javascript">alert("로그인하세요"); document.location.href="/login";</script>'); //리다이렉트할 주소 적기
                response.end();
            }
        }
        
    } else {
        response.send('<script type="text/javascript">alert("로그인하세요"); document.location.href="/login";</script>'); //리다이렉트할 주소 적기
        response.end();
    }
});

//그룹매칭 글작성
app.get('/write_join', function(request, response) { //그룹매칭글 작성 페이지
    fs.readFile('write_join.html', 'utf8', function(error, data) { //그룹매칭글 html
        ID = request.session.name;
        if(ID) {
            response.send(data);
        } else {
            response.send('<script type="text/javascript">alert("로그인하세요"); document.location.href="/login";</script>'); //리다이렉트할 주소 적기
            response.end();
        }
    });
});
app.post('/write_join', function(request, response) { //그룹매칭글 주소
    var ID = request.session.name;
    var title = request.body.title;
    var text = request.body.text;
    var num = request.body.num;
    var dates = request.body.dates;
    var times = request.body.times;
    
    if(title && text && num && dates && times) {
        client.query('INSERT INTO match_tbl (gm_i, title, text, num, date, time, ID) VALUES (?, ?, ?, ?, ?, ?, ?)', [
            0, title, text, num, dates, times, ID    
        ], function() {
            console.log('데이터 입력 성공!');
            setTimeout(function() {
                client.query('DELETE FROM match_tbl WHERE title=?', [title], function() {
                    console.log('글삭제됨');
                });
            }, 10000);
            response.send('<script type="text/javascript>window.close();</script>'); //글작성 후 이동할 곳
        });
    } else {
        response.send('<script type="text/javascript">alert("작성하지 않은 내용이 있습니다"); document.location.href="/write_join";</script>'); //리다이렉트할 주소 적기
        response.end();
    }
});

//정보 페이지
app.get('/share', function(request, response) { //그룹매칭글 작성 페이지
    fs.readFile('share.html', 'utf8', function(error, data) { //그룹매칭글 html
        client.query('SELECT * FROM info_tbl;', function(error, results) {
            response.send(ejs.render(data, {
                data: results
            }));
        });
    });
});
app.post('/share', function(request, response) {
    share_i = request.body.info_i;
    if(share_i) {
        //response.send('<script type="text/javascript">document.location.href="/view_share";</script>');
        //response.end();
    }
});

//정보 상세 페이지
app.get('/view_share', function(request, response) {
    fs.readFile('view_share.html', 'utf8', function(error, data) {
        client.query('SELECT * FROM info_tbl WHERE info_i = ?;'+'SELECT * FROM chat_tbl_s WHERE share_i = ?',[share_i, share_i], function(error, results) {
            var sql1 = results[0];
            var sql2 = results[1];
            
            response.send(ejs.render(data, {
                data1: sql1,
                data2: sql2
            }));
        });
    });
});
app.post('/view_share', function(request, response) { //정보글 주소
    if(request.session.name) {
        var ID = request.session.name;
        var major = request.session.major;
        var ID2 = ID.substr(0, 2);
        var major2 = major[Object.keys(major)[0]];
        var major3 = major2[Object.keys(major2)[0]];
        var nick = ID2+"학번 "+major3;
        var text = request.body.text;
        var today = new Date();  
        var time = today.toLocaleTimeString();
        console.log(today);
        client.query('INSERT INTO chat_tbl_s (chat_i, text, time, share_i, nick) VALUES (?, ?, ?, ?, ?)', [
            0, text, time, share_i, nick
        ], function() {
            console.log('댓글 성공!');
            response.send('<script type="text/javascript">document.location.href="/view_share";</script>');
        });
    } else {
        response.send('<script type="text/javascript">alert("로그인하세요"); document.location.href="/login";</script>'); //리다이렉트할 주소 적기
        response.end();
    }
});

//정보글 작성
app.get('/write_share', function(request, response) { //정보글 작성 페이지
    fs.readFile('write_share.html', 'utf8', function(error, data) { //정보글 html
        response.send(data);
    });
});
app.post('/write_share', function(request, response) { //정보글 주소
    var ID = request.session.name;
    var title = request.body.title;
    var text = request.body.text;

    client.query('INSERT INTO info_tbl (info_i, title, text, ID) VALUES (?, ?, ?, ?)', [
        0, title, text, ID
    ], function() {
        console.log('데이터 입력 성공!');
        setTimeout(function() {
            client.query('DELETE FROM info_tbl WHERE title=?', [title], function() {
                console.log('글삭제됨');
            });
        }, 10000);
        response.send('<script type="text/javascript>document.location.href="/reload";</script>'); //글작성 후 이동할 곳
        console.log('이동됨');
    });
});

//백로딩 페이지
app.get('/reload', function(request, response) { //그룹매칭글 작성 페이지
    fs.readFile('reload.html', 'utf8', function(error, data) { //그룹매칭글 html
        response.send(data);
    });
});