### React

npm create vite@latest

cd music_frontend
npm install
npm run dev

# 创建虚拟环境

python -m venv venv

# 在 macOS/Linux 上激活虚拟环境

source venv/bin/activate

npm i react-router-dom

npm i @heroicons/react

npm install @headlessui/react

### Tailwind

https://tailwindcss.com/docs/guides/vite

Follow above link to install Tailwind CSS

### Run

npm run dev

这里 upload, 先把 image 和 audio stream 发给 firebase, 然后拿到 return 的 URL 后再储存在 form 中, 最后再向 MongoDB 提交.

## 修改

1.增加在 detail page 可以现场修改

2.在 detail page delete 的时候, 目前只 delete MongoDB, 之后增加 Delete FireBase 的 API (目前 image 和 audio 没有被一起 delete) √, 通过后端改好了

3.增加 web 网页登录系统, 只能授权的 email 才能登录

### GIT

// push to remote
git push -u origin main

git pull origin main

//witch to the feature branch

git checkout feature-branch

//Merge changes from main into feature-branch
