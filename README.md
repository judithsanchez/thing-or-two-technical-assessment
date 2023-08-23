# Thing Or Two Technical Assessment

[🔗 Live preview](https://www.loom.com/share/963f9db23def4c03b0e047d8b9929978?sid=dc9bdb79-d855-432c-92fc-ad3d0bf601fd)

**🔍 Keywords:** React.js, Typescript, Nest.js, MySQL.

- **🌱 Next version:** Improve design.
- **👾 Bugs:** None that I know of, but if you find one let me know!

### 📦 Dependencies

1. Run `npm install` in project backend. This will install server-related dependencies.

2. Run `npm install` in project front. This will install client-related dependencies.

### 💾 Database Setup

To set up the MySQL database for the project, follow these steps:

1. Once you installed the backend dependencies just run the command `npm run start`.

## 📋 Table in thingortwo:

| Tables_in_thingortwo |
| -------------------- |
| song                 |

## 📋 Table structure for song:

| Field     | Type         | Null | Key | Default | Extra          |
| --------- | ------------ | ---- | --- | ------- | -------------- |
| id        | int          | NO   | PRI | NULL    | auto_increment |
| song_name | varchar(255) | No   |     | NULL    |                |
| band      | varchar(255) | No   |     | NULL    |                |
| year      | int          | No   |     | NULL    |                |
