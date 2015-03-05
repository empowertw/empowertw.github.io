# empowertw.github.io

此repository為empower.tw官網的開放原始碼，歡迎有興趣的人一同維護。

共有兩個主要分支，分別為rehearsal和master。

其中master與rehearsal分支分別為為deploy與原始碼版本。

# rehearsal分支簡介

包含yeomon和react-gulp，主元件位於app資料夾中。

編輯完成後以gulp build建立dist檔。

deploy則採用deploy.sh腳本。

# 開發

從rehearsal新建一個branch後在該branch中開發

利用指令"gulp s"與網址"localhost:9000"進行瀏覽

完成後執行push、並merge到rehearsal

checkout至rehearsal後執行"./deploy.sh"即可編譯網頁到master分支上

# Contributor

由"410還權於民網站小組"維護。

目前Joy Hsu擔任主視覺；Wanglin Tsai、Han Lin、王希、林祖儀等人負責專案協調；

Mark Chang與Yuren Ju提供技術支援；目前程式撰寫為Novel，也歡迎其他人一同加入撰寫。

# 授權方式

MIT授權
