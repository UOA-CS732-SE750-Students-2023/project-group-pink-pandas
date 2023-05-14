
**ssh config file**
```bash
➜  project-group-pink-pandas git:(xingkun/testing) ✗ cat ~/.ssh/config
Host ec2
    HostName 3.26.24.167
    User ubuntu
    IdentityFile /Users/jingyiyou/Documents/patienttodolist.pem
```


**connect to ec2**
```bash
➜  project-group-pink-pandas git:(xingkun/testing) ssh ec2
Welcome to Ubuntu 22.04.2 LTS (GNU/Linux 5.15.0-1031-aws x86_64)
```

**project directory**
```bash
ubuntu@ip-172-31-25-163:~$ cd project-group-pink-pandas/
ubuntu@ip-172-31-25-163:~/project-group-pink-pandas$
```

**update code**
```bash
ubuntu@ip-172-31-25-163:~/project-group-pink-pandas$ git pull
Already up to date.
```

**check app**
```bash
ubuntu@ip-172-31-25-163:~/project-group-pink-pandas$ sudo su
root@ip-172-31-25-163:/home/ubuntu/project-group-pink-pandas# pm2 list
┌────┬───────────────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id │ name                  │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├────┼───────────────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0  │ npm run production    │ default     │ N/A     │ fork    │ 10927    │ 4m     │ 1    │ online    │ 0%       │ 62.9mb   │ root     │ disabled │
│ 1  │ npx tinylicious       │ default     │ N/A     │ fork    │ 10937    │ 4m     │ 1    │ online    │ 0%       │ 62.5mb   │ root     │ disabled │
└────┴───────────────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
```

**restart app**
```bash
root@ip-172-31-25-163:/home/ubuntu/project-group-pink-pandas# pm2 restart all
Use --update-env to update environment variables
[PM2] Applying action restartProcessId on app [all](ids: [ 0, 1 ])
[PM2] [npm run production](0) ✓
[PM2] [npx tinylicious](1) ✓
┌────┬───────────────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id │ name                  │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├────┼───────────────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0  │ npm run production    │ default     │ N/A     │ fork    │ 11837    │ 0s     │ 2    │ online    │ 0%       │ 46.9mb   │ root     │ disabled │
│ 1  │ npx tinylicious       │ default     │ N/A     │ fork    │ 11847    │ 0s     │ 2    │ online    │ 0%       │ 3.1mb    │ root     │ disabled │
└────┴───────────────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
```

**check docker container status**
```bash
root@ip-172-31-25-163:/home/ubuntu/project-group-pink-pandas# docker ps
CONTAINER ID   IMAGE          COMMAND                  CREATED          STATUS          PORTS                                           NAMES
78c5a7401bed   redis          "docker-entrypoint.s…"   36 minutes ago   Up 36 minutes   0.0.0.0:6379->6379/tcp, :::6379->6379/tcp       some-redis
173b9cba7bdd   mongo:latest   "docker-entrypoint.s…"   3 hours ago      Up 3 hours      0.0.0.0:27017->27017/tcp, :::27017->27017/tcp   mongo
```

**port configuration**
- 80: backend (set in env variable when start app)
- 8081: nginx which forwards websocket traffic to 7070 (set in `/etc/nginx/nginx.conf` file)
- 7070: tinylicious (default port)
- 27017: mongo DB (set in docker run command)