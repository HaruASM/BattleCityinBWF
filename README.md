# BattleCityinBWF
html5 game 

#### 거시기 마크다운으로 '손' 글자 적기
#### 얘들아 점호 손!
## 손 - 세준

## 손 - 해균
## 손 - 장희

- html게임 /canvas 랜더링 / 클라이언트에서 자원관리, 컨트롤

- battlecit
 L public 
   - index.html
    L js
      -main.js

## 사용되는 객체
### Map
- 액션
	- generateBlock
		- 맵 위에 벽돌 생성

### Block
- 속성
	- int x
	- int y
	- constant int type
		- 벽돌의 타입이 '파괴'인지 '비파괴'인지 알려줌

### BaseTank
- 속성
    - int x
    - int y
    - boolean bulletFired
	    - 총알이 연속해서 나가지 않도록, 총알의 발사 유무를 알려줌
    - boolean live
	    - 탱크가 살았는지 죽었는지
    - constant int speed
	    - 탱크의 속도

- 액션
	- move
	- die
	- fire

### PlayerTank ( 상속 BaseTank )
- 모두 상속받음

### EnemyTank ( 상속 BaseTank )
- 모두 상속받음

### BaseBullet
- 속성
    - int x
    - int y
    - constant int speed
     	- 총알의 속도

### PlayerBullet ( 상속 BaseBullet )
- 액션
	- dash
		- 돌진
		- 유효한 타겟 : PlayerTank, EnemyTank

### EnemyBullet ( 상속 BaseBullet )
- 액션 ( trigger )
	- dash
		- 돌진
		- 유효한 타겟 : PlayerTank
