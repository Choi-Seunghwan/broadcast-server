# broadcast-server

## DB 구조.

### User

- [Key] ID (User ID)
- Email
- Name
- Password
- Avator (?? 혹은 User Info 테이블을 새로 만들고 User ID Key 로 연동.)
- Create Time (가입 시각)
- Update Time

### Chat

- [Key] ID (chat ID)
- [Key] NUM (chat Number)
- User ID
- Content (내용)
- Type ?? (공지, 일반 챗 등..?)
- Time

###
