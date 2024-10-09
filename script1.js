$(document).ready(function () {
    var audio = $('#audio-player')[0];
    var tracks = [
        { title: "rain-sound 15minutes", src: "rain-sound 15minutes.mp3" },
        { title: "DoanXuanCa", src: "DoanXuanCa.mp3" },
        { title: "NgayXuanLongPhungSumVay", src: "NgayXuanLongPhungSumVay.mp3" },
        { title: "XuanOiOLaiChoi", src: "XuanOiOLaiChoi.mp3" },
      
    ];
    var currentTrack = 0;

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

      // Xử lý nút mua roi
      $('#rain-btn').click(function () {
        currentTrack = 0;
         updateTrack();
        
    });

    // Load track đầu tiên khi khởi động
    updateTrack();
});
