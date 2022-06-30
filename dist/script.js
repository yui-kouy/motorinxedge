// アプリメイン機能
function success(position) {
	// ハンバーガーメニュー
    const nav = document.getElementById('nav-wrapper');
    const hamburger = document.getElementById('js-hamburger');
    const blackBg = document.getElementById('js-black-bg');

    hamburger.addEventListener('click', function () {
        nav.classList.toggle('open');
    });
    blackBg.addEventListener('click', function () {
        nav.classList.remove('open');
    });

	// 現在位置_本番用（取得した位置情報）
	const strlat = position.coords.latitude;
	const strlon = position.coords.longitude;

	/*
	// 現在位置_テスト用（東京都庁）
	const strlat = 35.6895014;
	const strlon = 139.6917337;
	*/

	// console.log("初期緯度:" + strlat);
	// console.log("初期経度:" + strlon);
	
	// ボタンの表示非表示を切り替える
	document.getElementById('button').style.visibility = 'visible'    // buttonを表示
	document.getElementById('button2').style.visibility = 'hidden'    // button2を非表示

	// 現在地をセンターにマップを表示
	let map = L.map('mapid', {
		center: [ strlat , strlon ],
		zoom: 16,
	}); 

	// OpenStreetMap から地図画像を読み込む
	const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
	});
	tileLayer.addTo(map);

	// 現在地アイコンの配列 HTMLのURLと順番を揃えないとダメ
	const aiconUrl = ["https://maps.gsi.go.jp/image/map/crosshairs.png",
					  "https://i.gyazo.com/f6d7d2394486dee4afa3179b0388ea77.jpg",
					  "https://i.gyazo.com/a441e4947693b79ec40ccdcaa093b136.jpg",
					  "https://i.gyazo.com/e7d91db048fa6a9e69069813b4dba846.jpg",
					  "https://i.gyazo.com/58345f29672a4fbb4aae921b75438b24.jpg",
					  "https://i.gyazo.com/90a2a60506c0a66bb484b32ca21c6c1d.jpg",
					  "https://i.gyazo.com/715768ba7cbce81f6a0da3b6fb4087f8.jpg",
					  "https://i.gyazo.com/175de6a59ab2aa5aca1f6c701676261f.jpg",
					  "https://i.gyazo.com/af095ad825d3dc09795a73efabf6b7a3.jpg",
					  "https://i.gyazo.com/e6b35705e35672a306d70975726139bc.jpg",
					  "https://i.gyazo.com/42b2a0eab7ea7f538ddf61d006259784.jpg",
					  "https://i.gyazo.com/842c0cb18422fea2b7ed2f3f38e718ae.jpg",
					  "https://i.gyazo.com/8f88aa7637080156276d6f54880cce76.jpg",
					  "https://i.gyazo.com/017df26d75542a57fd3e56cb14b11e7c.jpg",
					  "https://i.gyazo.com/cb818ba60a23a8429e2d5fd8128bcfe0.jpg"
					];

	// アイコンを指定 初期アイコンは十字+
	let crossIcon = L.icon({
		iconUrl: aiconUrl[0],
		iconSize: [100, ],
		iconAnchor: [20, 20]
	});

	// アイコンをマップのセンターに表示
	let crossMarker = L.marker( map.getCenter(),{
		icon:crossIcon,
		zIndexOffset:1000,
		interactive:false
	}).addTo(map);
	
	// マーカー画像の変更があった場合はアイコンの選択結果によって更新する
	let listItems = document.querySelectorAll('#list li');
	listItems = Array.prototype.slice.call(listItems,0);
	 
	listItems.forEach(function($listItem,aiconNo){
	  $listItem.addEventListener('click',function(){
		console.log('順番',aiconNo);//変数「aiconNo」に順番が入っている（0スタート）

		// 参考URL→https://medium-company.com/leaflet-remove-removelayer/
		map.removeLayer(crossMarker);

		crossIcon = L.icon({
			iconUrl: aiconUrl[aiconNo],
			iconSize: [100, ],
			iconAnchor: [20, 20]
		});

		// アイコンをマップのセンターに表示
		crossMarker = L.marker( map.getCenter(),{
		icon:crossIcon,  
		zIndexOffset:1000, 
		interactive:false 
		}).addTo(map);

		// ハンバーガーメニューを閉じる
		nav.classList.remove('open');

	  });
	});

	const $button = document.querySelector('#button');		// Startボタン
	const $button2 = document.querySelector('#button2');	// Finishボタン

	// Startボタンを押したら実行する
	$button.addEventListener("click", () => {

		// ボタンの表示非表示を切り替える
		document.getElementById("button").style.visibility = "hidden"    // buttonを非表示
		document.getElementById("button2").style.visibility = "visible"  // button2を表示

		// 始まりのセリフ
		// Startするとよろしく的な挨拶をしゃべるようにする
		const startSerifuHai = ["今日もよろしくお願いします！",
								"安全運転で行きましょう！",
								"よっしゃぁ！飛ばすぞぉ！",
								"よーし！楽しんで走るぞぉ！",
								"今日はどこまで行きますか？おともします！",
								"うーん！絶好調！走るぞぉ！",
								];

		startSerifu = startSerifuHai[Math.floor(Math.random() * startSerifuHai.length)]; 
		// startSerifu = startSerifuHai[2];

		// ↓話す処理↓
		let uttearnceSt = new SpeechSynthesisUtterance();
		uttearnceSt.text = startSerifu;
		uttearnceSt.volume = 1;
		uttearnceSt.rate = 1;
		uttearnceSt.pitch = 1;
		uttearnceSt.lang = 'ja-JP';
		window.speechSynthesis.speak(uttearnceSt);
		// ↑話す処理↑

		// チェックポイントの配列を作る
		// 配列に取得した緯度経度を加算減算してチェックポイント化する予定　ループして配列に格納　15回×4回
		// 緯度：lat、経度：lon
		// 加算：Sum、減算：Sub(Subtractionの略)、計算：Calcu（Calculationの略）、配列：Hai（配列の略…）
		// 配列の操作　参考URL→https://www.javadrive.jp/javascript/array/index4.html

		let latChkSum = [];		// 緯度：加算
		let	lonChkSum = [];		// 経度：加算
		let latChkSub = [];		// 緯度：減算
		let lonChkSub = [];		// 経度：減算

		let latHai = strlat;	// 緯度初期値
		let lonHai = strlon;	// 経度初期値
		
		let WhileCnt = 0;		// whileの回数カウント
		const CalHai = [0.002,0.003,0.0004,0.0005,0.006,0.007,0.0008,0.0009,0.001];
		const NumHai = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,
						20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,
						40,41,42,43,44,45,46,47,48,49];
		let rdmNum ="";
		let lati = 0;
		let loni = 0; 

		while(WhileCnt < 50){
			
			// 緯度を加算する
			rdmNum = CalHai[Math.floor(Math.random() * CalHai.length)]; 
			latChkSum.push(latHai + rdmNum);
			latHai = latHai + rdmNum;

			// 経度を加算する
			rdmNum = CalHai[Math.floor(Math.random() * CalHai.length)]; 
			lonChkSum.push(lonHai + rdmNum);
			lonHai = lonHai + rdmNum;
	
			WhileCnt++;
		}

		WhileCnt = 0;		// whileの回数カウント 初期化
		latHai = strlat;	// 緯度初期値
		lonHai = strlon;	// 経度初期値
		
		while(WhileCnt < 50){
			
			// 緯度を減算する
			rdmNum = CalHai[Math.floor(Math.random() * CalHai.length)]; 
			latChkSub.push(latHai - rdmNum);
			latHai = latHai - rdmNum;
			console.log()
			// 経度を減算する
			rdmNum = CalHai[Math.floor(Math.random() * CalHai.length)]; 
			lonChkSub.push(lonHai - rdmNum);
			lonHai = lonHai - rdmNum;
	
			WhileCnt++;
		}

		const latChkHai = [];
		const lonChkHai = [];

		// ループ処理して、マーカーを表示　20×4箇所にアイコン　動き重くならないといいな
		for(let i = 0; i < 50; i++){

			lati = NumHai[Math.floor(Math.random() * NumHai.length)]; 
			loni = NumHai[Math.floor(Math.random() * NumHai.length)]; 
			addMarker = L.marker([latChkSum[lati], lonChkSum[loni]]).addTo(map);
			// console.log(i + "回目（加加）；　緯度：" + latChkSum[lati] + "経度：" + lonChkSum[loni])
			latChkHai.push(latChkSum[lati]);
			lonChkHai.push(lonChkSum[loni]);

			lati = NumHai[Math.floor(Math.random() * NumHai.length)]; 
			loni = NumHai[Math.floor(Math.random() * NumHai.length)]; 
			addMarker = L.marker([latChkSub[lati], lonChkSub[loni]]).addTo(map);
			// console.log(i + "回目（減減）；　緯度：" + latChkSum[lati] + "経度：" + lonChkSum[loni])
			latChkHai.push(latChkSum[lati]);
			lonChkHai.push(lonChkSum[loni]);

			lati = NumHai[Math.floor(Math.random() * NumHai.length)]; 
			loni = NumHai[Math.floor(Math.random() * NumHai.length)]; 
			addMarker = L.marker([latChkSum[lati], lonChkSub[loni]]).addTo(map);
			// console.log(i + "回目（加減）；　緯度：" + latChkSum[lati] + "経度：" + lonChkSum[loni])
			latChkHai.push(latChkSum[lati]);
			lonChkHai.push(lonChkSum[loni]);

			lati = NumHai[Math.floor(Math.random() * NumHai.length)]; 
			loni = NumHai[Math.floor(Math.random() * NumHai.length)]; 
			addMarker = L.marker([latChkSub[lati], lonChkSum[loni]]).addTo(map);
			// console.log(i + "回目（減加）；　緯度：" + latChkSum[lati] + "経度：" + lonChkSum[loni])
			latChkHai.push(latChkSum[lati]);
			lonChkHai.push(lonChkSum[loni]);
		}

		// 配列にセリフを格納 リターンでいただくセリフを格納予定
		// cpKokaon=効果音、cpSerihu=チェックポイントセリフ、rdSerihu=ランダムセリフ
	
		// 待つ処理
		// 参考URL→https://naokeyzmt.com/rogue/skillup-nodejs-scripts/
		const sleep = (ms) => {
			return new Promise(resolve => setTimeout(resolve, ms));
		}
				
		const cpKokaon = ["music/answer3.mp3",
						  "music/coin04.mp3",
						  "music/coin05.mp3",
						  "music/hirameki.mp3",
						  "music/jan.mp3",
						  "music/ma.mp3",
						  "music/quiz.mp3"];

		const cpSerifu = ["たらららったらぁ",
						  "たったらたららららったったぁ",
						  "チェックポイント通過したね！",
						  "次はどこのチェックポイントを通過できるかなぁ",
						  "結構走ったよね？休憩しない？",
						  "チェックポイントォツウカァ！！",
						  "わぁーい！チェックポイント通過したね！",
						  "チェックポイント、まだまだいっぱいあるよぉ！"
						];

		const rdSerifu = ["どこに行くの？",
						  "へいへいへーい",
						  "こんなに走っても走り足りないんだ！",
						  "たまには休憩も必要だよぉ",
						  "チェックポイントは通過してないよぉ",
						  "信号待ちはひと休みだね",
						  "天気予報は確認した？",
						  "夏でも冬でも水分補給は必要です！",
						  "エンジンの音、ちゃんと聞いてね！",
						  "風を感じるって良いと思うんだ！",
						  "バイクに乗るって良いでしょ？",
						  "しょうがい、せいしゅん！",
						  "車には無い魅力があるでしょ？",
						  "まだまだ走ろうね",
						  "もっともっともーっと走りたいな！",
						  "もっともっと走ってほしいなぁ",
						  "えいえいおー！",
						  "前に進めば前進する。あたりまえだね",
						  "困ったらどっかで止まろう！何とかなる！",
						  "やってみなくちゃわからない！わからなかったらやってみよう！",
						  "最後まで希望を捨てちゃいかん。あきらめたら、そこで試合終了だよ",
						  "なんとかなるよ、絶対大丈夫だよ",
						  "なせば大抵なんとかなる",
						  "今までのは奇跡なんかじゃないよ。奇跡はこれからだ",
						  "無理だったかもしれない、無茶だったかもしれない、でも無駄じゃなかった",
						  "終わりが見えなくても、焦らなくていいんだよ",
						  "見ててイライラするなら、見なければいいんだね？",
						  "楽しい方をえらぼう！",
						  "面白いか？面白くないか？それは面白い方がいいよねぇ",
						  "私の戦闘りょくは530000です",
						  "自分のすきなようにやってごらん",
						  "ありえないなんて事はありえない！",
						  "そろそろ何か食べたいかもしれない",
						  "いっわしったのっ・・・しんっしょうぅが・・・食べたいんじゃない？",
						];

		let koukaon = "";
		let serifu = "";

		let idouCnt = 0;	// idou内の処理回数をカウントするもの
		let idouCntMod = 0;
		// ここから時間経過でセリフをランダムで話す記述など
		let idou = setInterval(function(){
			idouCnt +=1;
			function successIn(position) {
				let lat = position.coords.latitude;
				let lon = position.coords.longitude;
				// console.log("緯度lat:" + lat);
				// console.log("経度lon:" + lon);

                // アイコンのマーカーを消す
                map.removeLayer(crossMarker);

				// panTo：現在位置へ地図の中心を移動
				map.panTo([lat, lon]);

        		// アイコンをマップのセンターに表示
	        	crossMarker = L.marker( map.getCenter(),{
                    icon:crossIcon,  
                    zIndexOffset:1000, 
                    interactive:false 
                }).addTo(map);

				// チェックポイントが近いか確認
				// whileでループ処理してすべて確認する
				// 一致していたらチェックポイントの処理に入る
				
				let a=0; // ifのために一時的に使用 a=2だったら緯度経度両方が近いことになる
				let latHani = 0; // 緯度：比較するため
				let lonHani = 0; // 経度：比較するため
				WhileCnt = 0;
				
				// 80か所のマーカーの緯度経度と現在地を比較する(大体近ければOK)
				while(WhileCnt < 200){
					
					// 現在の緯度経度の差分を計算
					latHani = Math.floor((latChkHai[WhileCnt] - lat) * Math.pow(10,5)) / Math.pow(10,5);
					lonHani = Math.floor((lonChkHai[WhileCnt] - lon) * Math.pow(10,5)) / Math.pow(10,5);
					
					// console.log("緯度" + WhileCnt + "回目：" + latChkHai[WhileCnt] + " - " + lat + " = " + latHani);
					// console.log("経度" + WhileCnt + "回目：" + lonChkHai[WhileCnt] + " - " + lon + " = " + lonHani);

					// 計算結果を比較する　緯度バージョン　0.0001
					if(latHani <= 0.0001 && latHani >= -0.0001){
						a++;

						// console.log(WhileCnt + "回目：" +  "a:" + a)
						// 計算結果を比較する　経度バージョン
						if(lonHani <= 0.0001 && lonHani >= -0.0001 ){
							a++;
							// console.log(WhileCnt + "回目：" +  "a:" + a)
							WhileCnt = WhileCnt + 200;    // whileから抜けるため 

						}else{
							a = 0;
						}
					}else{
						a = 0;
					}
					WhileCnt++;	
				}
				// console.log("while抜けたところのa:" + a)

				let uttearnce = new SpeechSynthesisUtterance();
				uttearnce.volume = 1;
				uttearnce.rate = 1;
				uttearnce.pitch = 1;
				uttearnce.lang = 'ja-JP';
				
				if(a === 2){	// チェックポイントが近い場合
					// 参考URL→https://qumeru.com/magazine/376
					let music = new Audio(cpKokaon[Math.floor(Math.random() * cpKokaon.length)]);
					music.volume = 0.3;    // 0～1の間で設定 0:無音/1:最大
					music.play();

					// チェックポイント用のセリフを格納
					serifu = koukaon + cpSerifu[Math.floor(Math.random() * cpSerifu.length)]; 
					console.log("a===2の方");

					const sendMessage = async() => {
						await sleep(1.7*1000);
						// console.log("sendMessage" + sleep);
						// ここから共通しゃべる部分
						console.log(serifu);
						// ↓話す処理↓
						uttearnce.text = serifu;
						window.speechSynthesis.speak(uttearnce);
						// ↑話す処理↑
					}
					sendMessage();	// 待つ＆しゃべるを呼び出す

				// 一致していなかったら通常の処理に入る
				// チェックポイントが近くない場合　10分ごとにランダムセリフをしゃべる　10分インターバル中はしゃべらない
				} else {
					// idouCntMod = idouCnt % 60;		// 10分に1回しゃべりたい 10秒ごとに位置計測する 6回で1分×10回
					idouCntMod = idouCnt % 60;		// 1分に1回しゃべる　テスト用
					console.log("回数：" + idouCnt);
					console.log("余り：" + idouCntMod);
					if(idouCntMod === 0){				// あまりが0だったらしゃべる
						console.log("elseの方");

						serifu = rdSerifu[Math.floor(Math.random() * rdSerifu.length)]; 
						// ↓話す処理↓
						uttearnce.text = serifu;
						window.speechSynthesis.speak(uttearnce);
						// ↑話す処理↑
					}
				}
			}

			// ボタンを押したらsetIntervalをクリア
			$button2.addEventListener("click", () => {
				console.log("Finish-Push")
				// ボタンの表示非表示を切り替える
				document.getElementById("button").style.visibility = "visible";    // buttonを表示
				document.getElementById("button2").style.visibility = "hidden";    // button2を非表示

				// setIntervalを止める記述
				clearInterval(idou);

				// 画面再読み込み
				//location.reload();
			});

			function errorIn() {
			}
		navigator.geolocation.getCurrentPosition(successIn, errorIn);
		},10000);  //1,000=1秒　
	})
}

function error() {
    document.write("位置情報の取得に失敗しました。画面を再読み込みしてください。");
}

navigator.geolocation.getCurrentPosition(success, error);
