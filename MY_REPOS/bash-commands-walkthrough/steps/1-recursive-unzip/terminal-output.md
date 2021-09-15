
#BEFORE: 
```23:50:00|bryan@LAPTOP-9LGJ3JGS:[1-recursive-unzip] 1-recursive-unzip_exitstatus:0[╗___________o>

tree
.
└── starter
    ├── Export-4ade574e-a08d-44c0-b460-6f9316cd8b3f.zip
    ├── js-range-main.zip
    └── terminal-output.md

1 directory, 3 files
|23:50:10|bryan@LAPTOP-9LGJ3JGS:[1-recursive-unzip] 1-recursive-unzip_exitstatus:0[╗___________o>
```

---
---
---
---
# DURING:

```|23:50:51|bryan@LAPTOP-9LGJ3JGS:[starter] starter_exitstatus:0[╗___________o>

find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;    
Archive:  ./Export-4ade574e-a08d-44c0-b460-6f9316cd8b3f.zip
  inflating: ./Bash-Commands 294b447e9a6e4d81911853d98c4c035a.html  
  inflating: ./Bash-Commands 294b447e9a6e4d81911853d98c4c035a/Reading List 05953aed7a3240e9b2df1003e786e280.html  
  inflating: ./Bash-Commands 294b447e9a6e4d81911853d98c4c035a/Quick Note d1e2f25e632c4567a9e3d88412526d37.html  
  inflating: ./Bash-Commands 294b447e9a6e4d81911853d98c4c035a/Getting Started from Evernote a240046e7cf54cbc9a168f0875ff64cc.html  
  inflating: ./Bash-Commands 294b447e9a6e4d81911853d98c4c035a/Engineering Wiki a629f03619b44d08a52e54c894fa68a8.html  
  inflating: ./Bash-Commands 294b447e9a6e4d81911853d98c4c035a/Reading List 05953aed7a3240e9b2df1003e786e280/Media 55fbe45c36ba4153b0ad0a0495f731d1.html  
  inflating: ./Bash-Commands 294b447e9a6e4d81911853d98c4c035a/Reading List 05953aed7a3240e9b2df1003e786e280/Media 55fbe45c36ba4153b0ad0a0495f731d1/General Magic the Movie 25e6e6253b604d028e68597c8b3b9f3b.html  
  inflating: ./Bash-Commands 294b447e9a6e4d81911853d98c4c035a/Reading List 05953aed7a3240e9b2df1003e786e280/Media 55fbe45c36ba4153b0ad0a0495f731d1/Bon Appe╠Бtit Foodcast 7933ea58a6a34bc887fb3f77b3474196.html  
  inflating: ./Bash-Commands 294b447e9a6e4d81911853d98c4c035a/Reading List 05953aed7a3240e9b2df1003e786e280/Media 55fbe45c36ba4153b0ad0a0495f731d1/Jane Eyre and the Invention of Self 983726bf4dce446cafd563b842763e83.html  
  inflating: ./Bash-Commands 294b447e9a6e4d81911853d98c4c035a/Reading List 05953aed7a3240e9b2df1003e786e280/Media 55fbe45c36ba4153b0ad0a0495f731d1/The contribution of neural networks and genetic al acff41cf8bd244de95e8d49419be4ad8.html
  inflating: ./Bash-Commands 294b447e9a6e4d81911853d98c4c035a/Reading List 05953aed7a3240e9b2df1003e786e280/Media 55fbe45c36ba4153b0ad0a0495f731d1/A Tax That Could Fix Big Tech d9fbd3fcec434ee4abe4f6cfa1ad1e98.html
  inflating: ./Bash-Commands 294b447e9a6e4d81911853d98c4c035a/Reading List 05953aed7a3240e9b2df1003e786e280/Media 55fbe45c36ba4153b0ad0a0495f731d1/Who Will Teach Silicon Valley to Be Ethical e4420173cfb0411e8132df8bd7380a37.html
  inflating: ./Bash-Commands 294b447e9a6e4d81911853d98c4c035a/Engineering Wiki a629f03619b44d08a52e54c894fa68a8/Getting Started 4c622df0a1c1491e8c4fa69b9f69035d.html
  inflating: ./Bash-Commands 294b447e9a6e4d81911853d98c4c035a/Engineering Wiki a629f03619b44d08a52e54c894fa68a8/Engineering Guidelines 9f570ee6151f42c5854800ba3bf46eff.html
  inflating: ./Bash-Commands 294b447e9a6e4d81911853d98c4c035a/Engineering Wiki a629f03619b44d08a52e54c894fa68a8/Development Lifecycle 782ffda4e6a8455db6fb8a172638673e.html
  inflating: ./Bash-Commands 294b447e9a6e4d81911853d98c4c035a/Engineering Wiki a629f03619b44d08a52e54c894fa68a8/How to Deploy 97b0398f9ae14b0f86c6e9db6249dcb9.html
  inflating: ./Bash-Commands 294b447e9a6e4d81911853d98c4c035a/Engineering Wiki a629f03619b44d08a52e54c894fa68a8/Useful Commands 90e3f2044f1c42678950e0906b383710.html
  inflating: ./Bash-Commands 294b447e9a6e4d81911853d98c4c035a/Engineering Wiki a629f03619b44d08a52e54c894fa68a8/Engineering Interviews 4497a878f9f348c98b5d01caa4c6824c.html
  inflating: ./Bash-Commands 294b447e9a6e4d81911853d98c4c035a/Engineering Wiki a629f03619b44d08a52e54c894fa68a8/How to QA d53d38994fe04670b8dba3c3fc047bb7.html
  inflating: ./Bash-Commands 294b447e9a6e4d81911853d98c4c035a/Engineering Wiki a629f03619b44d08a52e54c894fa68a8/Code Reviews 1463ec26093d492e9b9f57d8cfa7ce20.html
  inflating: ./Bash-Commands 294b447e9a6e4d81911853d98c4c035a/Engineering Wiki a629f03619b44d08a52e54c894fa68a8/React eedaa497189a4cd3baff43ac0b080440.html
  inflating: ./Bash-Commands 294b447e9a6e4d81911853d98c4c035a/Engineering Wiki a629f03619b44d08a52e54c894fa68a8/Backend 0299a83d8013422f9a18402de788456d.html
  inflating: ./Bash-Commands 294b447e9a6e4d81911853d98c4c035a/Engineering Wiki a629f03619b44d08a52e54c894fa68a8/Engineering Directory c6f60839ad584647b355ef518da0e414.html
  inflating: ./Bash-Commands 294b447e9a6e4d81911853d98c4c035a/Engineering Wiki a629f03619b44d08a52e54c894fa68a8/AWS d8627e83331444fa92b343fdfdc0a57b.html
  inflating: ./Bash-Commands 294b447e9a6e4d81911853d98c4c035a/Engineering Wiki a629f03619b44d08a52e54c894fa68a8/Redis 6ebe3f9ff246422bac7cf58b4dd0e782.html
  inflating: ./Bash-Commands 294b447e9a6e4d81911853d98c4c035a/Engineering Wiki a629f03619b44d08a52e54c894fa68a8/CircleCI f0e7ce7f1a5441268859010c23c6aeb6.html
  inflating: ./Bash-Commands 294b447e9a6e4d81911853d98c4c035a/Engineering Wiki a629f03619b44d08a52e54c894fa68a8/Getting Started 4c622df0a1c1491e8c4fa69b9f69035d/Example sub-page 5b0a3df5ee854542942f7b06b869a00e.html
  inflating: ./Bash-Commands 294b447e9a6e4d81911853d98c4c035a/Engineering Wiki a629f03619b44d08a52e54c894fa68a8/Engineering Interviews 4497a878f9f348c98b5d01caa4c6824c/Questions 8a830d86b0764a009895d65acd0355ad.html
  inflating: ./Bash-Commands 294b447e9a6e4d81911853d98c4c035a/Engineering Wiki a629f03619b44d08a52e54c894fa68a8/Engineering Interviews 4497a878f9f348c98b5d01caa4c6824c/Questions 8a830d86b0764a009895d65acd0355ad/FizzBuzz 9230695469c147aea81a7b25bb21e7e6.html
  inflating: ./Bash-Commands 294b447e9a6e4d81911853d98c4c035a/Engineering Wiki a629f03619b44d08a52e54c894fa68a8/Engineering Interviews 4497a878f9f348c98b5d01caa4c6824c/Questions 8a830d86b0764a009895d65acd0355ad/Alphabet Ordering 9728580c9e4c4b1ca30ead87e9151ebd.html
  inflating: ./Bash-Commands 294b447e9a6e4d81911853d98c4c035a/Engineering Wiki a629f03619b44d08a52e54c894fa68a8/Engineering Interviews 4497a878f9f348c98b5d01caa4c6824c/Questions 8a830d86b0764a009895d65acd0355ad/To Do List Design 491aacbec3a64715ab61c273dc5b25b5.html
  inflating: ./Bash-Commands 294b447e9a6e4d81911853d98c4c035a/Engineering Wiki a629f03619b44d08a52e54c894fa68a8/Engineering Interviews 4497a878f9f348c98b5d01caa4c6824c/Questions 8a830d86b0764a009895d65acd0355ad/Interview Question b30b87aa143b40f4b848c7973418bcbb.html
  inflating: ./Bash-Commands 294b447e9a6e4d81911853d98c4c035a/Engineering Wiki a629f03619b44d08a52e54c894fa68a8/Engineering Directory c6f60839ad584647b355ef518da0e414/AWS 0c826eb928a249cab0b1e3429b4a984e.html
  inflating: ./Bash-Commands 294b447e9a6e4d81911853d98c4c035a/Engineering Wiki a629f03619b44d08a52e54c894fa68a8/Engineering Directory c6f60839ad584647b355ef518da0e414/Document permissions 700ed57086c643abb093e8db7de21d6f.html
  inflating: ./Bash-Commands 294b447e9a6e4d81911853d98c4c035a/Engineering Wiki a629f03619b44d08a52e54c894fa68a8/Engineering Directory c6f60839ad584647b355ef518da0e414/User settings d79f34e28b6248da9d98ca1fbef5024a.html
  inflating: ./Bash-Commands 294b447e9a6e4d81911853d98c4c035a/Engineering Wiki a629f03619b44d08a52e54c894fa68a8/Engineering Directory c6f60839ad584647b355ef518da0e414/Redis Memcached 7b81b8174c8e478ca4c76443861b8ae7.html
  inflating: ./Bash-Commands 294b447e9a6e4d81911853d98c4c035a/Engineering Wiki a629f03619b44d08a52e54c894fa68a8/Engineering Directory c6f60839ad584647b355ef518da0e414/Document editor a947258198f84a8f83cc36f4a01ec388.html
  inflating: ./Bash-Commands 294b447e9a6e4d81911853d98c4c035a/Getting Started from Evernote a240046e7cf54cbc9a168f0875ff64cc/168d7498-3f29-4960-8213-fe4d5f76e624-my-links-database-views.gif
  inflating: ./Bash-Commands 294b447e9a6e4d81911853d98c4c035a/Reading List 05953aed7a3240e9b2df1003e786e280/Media 55fbe45c36ba4153b0ad0a0495f731d1/General Magic the Movie 25e6e6253b604d028e68597c8b3b9f3b/GeneralMagicSiliconValleyPremiere_StandingOvation_Credit_MattMaude.png
  inflating: ./Bash-Commands 294b447e9a6e4d81911853d98c4c035a/Reading List 05953aed7a3240e9b2df1003e786e280/Media 55fbe45c36ba4153b0ad0a0495f731d1/Jane Eyre and the Invention of Self 983726bf4dce446cafd563b842763e83/Untitled.png
  inflating: ./Bash-Commands 294b447e9a6e4d81911853d98c4c035a/Reading List 05953aed7a3240e9b2df1003e786e280/Media 55fbe45c36ba4153b0ad0a0495f731d1/A Tax That Could Fix Big Tech d9fbd3fcec434ee4abe4f6cfa1ad1e98/merlin_154479453_cb026b47-68c6-4d04-b207-8cefa72b9648-articleLarge.jpg
  inflating: ./Bash-Commands 294b447e9a6e4d81911853d98c4c035a/Reading List 05953aed7a3240e9b2df1003e786e280/Media 55fbe45c36ba4153b0ad0a0495f731d1/Who Will Teach Silicon Valley to Be Ethical e4420173cfb0411e8132df8bd7380a37/22swisher-articleLarge.jpg
  inflating: ./Bash-Commands 294b447e9a6e4d81911853d98c4c035a/Engineering Wiki a629f03619b44d08a52e54c894fa68a8/Engineering Directory c6f60839ad584647b355ef518da0e414/Document permissions 700ed57086c643abb093e8db7de21d6f/Ivan-2.png
  inflating: ./Bash-Commands 294b447e9a6e4d81911853d98c4c035a/Engineering Wiki a629f03619b44d08a52e54c894fa68a8/Engineering Directory c6f60839ad584647b355ef518da0e414/User settings d79f34e28b6248da9d98ca1fbef5024a/Screen_Shot_2017-11-20_at_4.53.16_PM.png
  inflating: ./Bash-Commands 294b447e9a6e4d81911853d98c4c035a/Engineering Wiki a629f03619b44d08a52e54c894fa68a8/Engineering Directory c6f60839ad584647b355ef518da0e414/Redis Memcached 7b81b8174c8e478ca4c76443861b8ae7/Ryo.png
  inflating: ./Bash-Commands 294b447e9a6e4d81911853d98c4c035a/Engineering Wiki a629f03619b44d08a52e54c894fa68a8/Engineering Directory c6f60839ad584647b355ef518da0e414/Document editor a947258198f84a8f83cc36f4a01ec388/Screen_Shot_2017-11-20_at_4.55.34_PM.png
Archive:  ./js-range-main.zip
b6ff943d3487e9cf34be9a52f13dff62423db58d
   creating: ./js-range-main/
 extracting: ./js-range-main/.gitignore
 extracting: ./js-range-main/.npmignore
  inflating: ./js-range-main/LICENSE
  inflating: ./js-range-main/README.md
  inflating: ./js-range-main/package-lock.json
  inflating: ./js-range-main/package.json
   creating: ./js-range-main/src/
  inflating: ./js-range-main/src/charRange.js
  inflating: ./js-range-main/src/index.js
  inflating: ./js-range-main/src/numRange.js
  inflating: ./js-range-main/src/utils.js
   creating: ./js-range-main/test/
  inflating: ./js-range-main/test/charRangeTest.js
  inflating: ./js-range-main/test/errorTest.js
  inflating: ./js-range-main/test/numRangeTest.js
|23:50:52|bryan@LAPTOP-9LGJ3JGS:[starter] starter_exitstatus:0[╗___________o>

find . -name "*.zip" -type f -print -delete
./Export-4ade574e-a08d-44c0-b460-6f9316cd8b3f.zip
./js-range-main.zip
|23:50:55|bryan@LAPTOP-9LGJ3JGS:[starter] starter_exitstatus:0[╗___________o>
```


---
---
---
---
# AFTER:

```
tree
.
├── Bash-Commands 294b447e9a6e4d81911853d98c4c035a
│   ├── Engineering Wiki a629f03619b44d08a52e54c894fa68a8
│   │   ├── AWS d8627e83331444fa92b343fdfdc0a57b.html
│   │   ├── Backend 0299a83d8013422f9a18402de788456d.html
│   │   ├── CircleCI f0e7ce7f1a5441268859010c23c6aeb6.html
│   │   ├── Code Reviews 1463ec26093d492e9b9f57d8cfa7ce20.html
│   │   ├── Development Lifecycle 782ffda4e6a8455db6fb8a172638673e.html
│   │   ├── Engineering Directory c6f60839ad584647b355ef518da0e414
│   │   │   ├── AWS 0c826eb928a249cab0b1e3429b4a984e.html
│   │   │   ├── Document editor a947258198f84a8f83cc36f4a01ec388
│   │   │   │   └── Screen_Shot_2017-11-20_at_4.55.34_PM.png
│   │   │   ├── Document editor a947258198f84a8f83cc36f4a01ec388.html
│   │   │   ├── Document permissions 700ed57086c643abb093e8db7de21d6f
│   │   │   │   └── Ivan-2.png
│   │   │   ├── Document permissions 700ed57086c643abb093e8db7de21d6f.html
│   │   │   ├── Redis Memcached 7b81b8174c8e478ca4c76443861b8ae7
│   │   │   │   └── Ryo.png
│   │   │   ├── Redis Memcached 7b81b8174c8e478ca4c76443861b8ae7.html
│   │   │   ├── User settings d79f34e28b6248da9d98ca1fbef5024a
│   │   │   │   └── Screen_Shot_2017-11-20_at_4.53.16_PM.png
│   │   │   └── User settings d79f34e28b6248da9d98ca1fbef5024a.html
│   │   ├── Engineering Directory c6f60839ad584647b355ef518da0e414.html
│   │   ├── Engineering Guidelines 9f570ee6151f42c5854800ba3bf46eff.html
│   │   ├── Engineering Interviews 4497a878f9f348c98b5d01caa4c6824c
│   │   │   ├── Questions 8a830d86b0764a009895d65acd0355ad
│   │   │   │   ├── Alphabet Ordering 9728580c9e4c4b1ca30ead87e9151ebd.html
│   │   │   │   ├── FizzBuzz 9230695469c147aea81a7b25bb21e7e6.html
│   │   │   │   ├── Interview Question b30b87aa143b40f4b848c7973418bcbb.html
│   │   │   │   └── To Do List Design 491aacbec3a64715ab61c273dc5b25b5.html
│   │   │   └── Questions 8a830d86b0764a009895d65acd0355ad.html
│   │   ├── Engineering Interviews 4497a878f9f348c98b5d01caa4c6824c.html
│   │   ├── Getting Started 4c622df0a1c1491e8c4fa69b9f69035d
│   │   │   └── Example sub-page 5b0a3df5ee854542942f7b06b869a00e.html
│   │   ├── Getting Started 4c622df0a1c1491e8c4fa69b9f69035d.html
│   │   ├── How to Deploy 97b0398f9ae14b0f86c6e9db6249dcb9.html
│   │   ├── How to QA d53d38994fe04670b8dba3c3fc047bb7.html
│   │   ├── React eedaa497189a4cd3baff43ac0b080440.html
│   │   ├── Redis 6ebe3f9ff246422bac7cf58b4dd0e782.html
│   │   └── Useful Commands 90e3f2044f1c42678950e0906b383710.html
│   ├── Engineering Wiki a629f03619b44d08a52e54c894fa68a8.html
│   ├── Getting Started from Evernote a240046e7cf54cbc9a168f0875ff64cc
│   │   └── 168d7498-3f29-4960-8213-fe4d5f76e624-my-links-database-views.gif
│   ├── Getting Started from Evernote a240046e7cf54cbc9a168f0875ff64cc.html
│   ├── Quick Note d1e2f25e632c4567a9e3d88412526d37.html
│   ├── Reading List 05953aed7a3240e9b2df1003e786e280
│   │   ├── Media 55fbe45c36ba4153b0ad0a0495f731d1
│   │   │   ├── A Tax That Could Fix Big Tech d9fbd3fcec434ee4abe4f6cfa1ad1e98
│   │   │   │   └── merlin_154479453_cb026b47-68c6-4d04-b207-8cefa72b9648-articleLarge.jpg
│   │   │   ├── A Tax That Could Fix Big Tech d9fbd3fcec434ee4abe4f6cfa1ad1e98.html
│   │   │   ├── Bon Appe╠Бtit Foodcast 7933ea58a6a34bc887fb3f77b3474196.html
│   │   │   ├── General Magic the Movie 25e6e6253b604d028e68597c8b3b9f3b
│   │   │   │   └── GeneralMagicSiliconValleyPremiere_StandingOvation_Credit_MattMaude.png
│   │   │   ├── General Magic the Movie 25e6e6253b604d028e68597c8b3b9f3b.html
│   │   │   ├── Jane Eyre and the Invention of Self 983726bf4dce446cafd563b842763e83
│   │   │   │   └── Untitled.png
│   │   │   ├── Jane Eyre and the Invention of Self 983726bf4dce446cafd563b842763e83.html
│   │   │   ├── The contribution of neural networks and genetic al acff41cf8bd244de95e8d49419be4ad8.html
│   │   │   ├── Who Will Teach Silicon Valley to Be Ethical e4420173cfb0411e8132df8bd7380a37
│   │   │   │   └── 22swisher-articleLarge.jpg
│   │   │   └── Who Will Teach Silicon Valley to Be Ethical e4420173cfb0411e8132df8bd7380a37.html
│   │   └── Media 55fbe45c36ba4153b0ad0a0495f731d1.html
│   └── Reading List 05953aed7a3240e9b2df1003e786e280.html
├── Bash-Commands 294b447e9a6e4d81911853d98c4c035a.html
├── js-range-main
│   ├── LICENSE
│   ├── README.md
│   ├── package-lock.json
│   ├── package.json
│   ├── src
│   │   ├── charRange.js
│   │   ├── index.js
│   │   ├── numRange.js
│   │   └── utils.js
│   └── test
│       ├── charRangeTest.js
│       ├── errorTest.js
│       └── numRangeTest.js
└── terminal-output.md

20 directories, 58 files
|23:50:58|bryan@LAPTOP-9LGJ3JGS:[starter] starter_exitstatus:0[╗___________o>


```
