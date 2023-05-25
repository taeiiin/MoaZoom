drop database if exists moaZOOM;
create database moaZOOM;
use moaZOOM;

drop table if exists member_tbl;
create table member_tbl( 						#회원정보 테이블
		ID int(9) not null primary key,	#회원 ID (학번 9자리)
    pw varchar(20) not null,								#비밀번호
    name varchar(10) not null,			#이름(별명)
    phone int(11) not null,					#전화번호
    email varchar(30),							#이메일
    major varchar(20)								#전공
);

drop table if exists chat_tbl_j;
create table chat_tbl_j(							#채팅 테이블
		chat_i int not null auto_increment primary key,	#채팅 인덱스
    text varchar(100) not null,			#채팅내용
    time varchar(30) not null,				#채팅시간
    join_i int(3) not null,
    nick varchar(20) not null

);

drop table if exists chat_tbl_s;
create table chat_tbl_s(							#채팅 테이블
		chat_i int not null auto_increment primary key,	#채팅 인덱스
    text varchar(100) not null,			#채팅내용
    time varchar(30) not null,				#채팅시간
	share_i int(3) not null,
	nick varchar(20) not null
);

drop table if exists match_tbl;
create table match_tbl(							#그룹매칭글 테이블
		gm_i int not null auto_increment primary key,		#글번호 인덱스
    title varchar(70) not null,			#글제목
    text varchar(500) not null,			#글본문
    num int(3) not null,							#그룹인원
    date varchar(30) not null,
    time varchar(30) not null,
    ID int(9) not null,											#그룹멤버 ID (회원정보 테이블에서 참조)
    foreign key(ID) references member_tbl(ID)
);

drop table if exists info_tbl;
create table info_tbl(							#정보글 테이블
		info_i int not null auto_increment primary key,	#글번호 인덱스
    title varchar(70) not null,			#글제목
    text varchar(500) not null,			#글본문
    ID int(9) not null,											#그룹멤버 ID (회원정보 테이블에서 참조)
    foreign key(ID) references member_tbl(ID)
);

drop table if exists group_tbl;			#그룹멤버 테이블
create table group_tbl(
	g_i int not null auto_increment primary key,
	num int(3),	#그룹멤버 인덱스
    ID int(9),											#그룹멤버 ID (회원정보 테이블에서 참조)
    foreign key(ID) references member_tbl(ID),
    textnum int(10),
    title varchar(70)
);