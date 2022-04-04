function success(position) {
	//console.log("緯度:" + position.coords.latitude);
	//console.log("経度:" + position.coords.longitude);
	const lat = position.coords.latitude;
	const lng = position.coords.longitude;
	//console.log("lat=" + lat)
	//console.log("lng=" + lng )

	// 現在地をセンターに表示
	const map = L.map('mapid', {
		center: [ lat , lng ],
		zoom: 16,
	}); 
	// OpenStreetMap から地図画像を読み込む

	const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
	});
	tileLayer.addTo(map);
	
// マーカー画像の場所を指定する　→どうしよう・・・


	const crossIcon = L.icon({
//		iconUrl: 'https://maps.gsi.go.jp/image/map/crosshairs.png',
		iconUrl: 'https://i.postimg.cc/63mKxMZP/I8d1-Di-HQY8e5-Meu1635871349-1635871569.jpg',
		iconSize: [32, 32], 
		iconAnchor: [16, 16] 
	});

	const crossMarker = L.marker( map.getCenter(),{
		icon:crossIcon,  
		zIndexOffset:1000, 
		interactive:false 
	}).addTo(map);

	map.on('move', e =>  {
		crossMarker.setLatLng(map.getCenter());
	});

	map.on('moveend', e => {
		console.log("緯度: " + map.getCenter().lat);
		console.log("経度: " + map.getCenter().lng);   
	});

	const $button = document.querySelector('#button')
	
	$button.addEventListener('click', () => {
		
		let cnt = 0;
		function addCnt() {
				cnt = cnt + 1;
		}
		// 配列にセリフを格納
		const cpKokaon = ["チャリン","ポヨン","カーン","ジャジャン","ヒュー"];
		const cpSerifu = ["セリフイチ","セリフ二","セリフサン","セリフヨン","セリフゴ"];
		const rdSerifu = ["セリフイチ","セリフ二","セリフサン","セリフヨン","セリフゴ"];

		let Serihu = "";

		// ここから時間経過でセリフをランダムで話す記述
		let idou = setInterval(function(){
			addCnt();

			// チェックポイントが近いか確認
			
				// チェックポイントが近い場合
					// 音を鳴らす
					// チェックポイント用のセリフをしゃべる
				// チェックポイントが近くない場合　セリフをしゃべる
				Serihu = rdSerifu[Math.floor(Math.random() * rdSerifu.length)]; 


		},30000);
	})
}


function error() {
    document.write("位置情報の取得に失敗しました。画面を再読み込みしてください。");
}

navigator.geolocation.getCurrentPosition(success, error);