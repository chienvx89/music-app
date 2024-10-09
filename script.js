$(document).ready(function () {
    var audio = $('#audio-player')[0];
    var tracks = [
        { title: "rain-sound 15minutes", src: "rain-sound 15minutes.mp3" },
        { title: "DoanXuanCa", src: "DoanXuanCa.mp3" },
        { title: "NgayXuanLongPhungSumVay", src: "NgayXuanLongPhungSumVay.mp3" },
        { title: "XuanOiOLaiChoi", src: "XuanOiOLaiChoi.mp3" },
		{ title: "One of the Greatest Speeches Ever  Steve Jobs_320kbpsi", src: "One of the Greatest Speeches Ever  Steve Jobs_320kbps.mp3" },
    ];
    var currentTrack = 0;
    var isLooping = false; // Trạng thái loop
	
	for (let i = 0; i < tracks.length; i++) {
	  	$( "#listsong" ).append( "<li class='asong' indexs="+i+" >" + tracks[i].title +"</li>" );
	}

    // Cập nhật thông tin bài hát
    function updateTrack() {
        $('#audio-source').attr('src', tracks[currentTrack].src);
        $('#track-title').text(tracks[currentTrack].title);
        audio.load();
        audio.play();
    }

    // Xử lý nút Play
    $('#play-btn').click(function () {
        audio.play();
    });

    // Xử lý nút Pause
    $('#pause-btn').click(function () {
        audio.pause();
    });

    // Xử lý nút Next
    $('#next-btn').click(function () {
        currentTrack = (currentTrack + 1) % tracks.length;
        updateTrack();
    });

    // Xử lý nút Loop
    $('#loop-btn').click(function () {
        isLooping = !isLooping;
        $(this).text('Loop: ' + (isLooping ? 'On' : 'Off'));
    });

      // Xử lý nút mua roi
      $('#rain-btn').click(function () {
        currentTrack = 0;
         updateTrack();
    });

    // Khi bài hát kết thúc
    audio.addEventListener('ended', function () {
        if (isLooping) {
            audio.play(); // Phát lại bài hát nếu loop bật
        } else {
            // Chuyển sang bài tiếp theo nếu loop tắt
            currentTrack = (currentTrack + 1) % tracks.length;
            updateTrack();
        }
    });
	
	 $('.asong').click(function () {		
			let index =$(this).attr("indexs");	
			currentTrack = index;
			updateTrack();
    });

    // Load track đầu tiên khi khởi động
    updateTrack();
});
