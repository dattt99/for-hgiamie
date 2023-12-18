const textConfig = {
  text1: "Chào em hờ gia mi ê ^-^",
  text2: "Merry Christmas!!",
  text3: "Cái kết của sói?",
  text4: "Quá khứ của anh rất tệ. Anh từng trải qua mối quan hệ không tốt...một vài chuyện không hay. Nó khiến anh ám ảnh đến tận bây giờ. Đến thời điểm hiện tại a luôn suy nghĩ làm sao để tương lai mình tốt đẹp hơn và trở thành một người cũng xứng đáng được yêu thương. Nếu em có thể tin tưởng anh, anh tin rằng anh sẽ không làm em phải thất vọng vì anh nghĩ anh của hiện tại đang là một phiên bản hoàn thiện nhất, nếu em đồng ý ... chúng mình yêu nhau lâu hơn một chút được không? Lâu tới khi không còn sự ngại ngùng nào trên gương mặt của cả hai... Lâu tới khi gia đình hai bên được biết nhau ... Và ... Lâu tới khi anh được đón em về chung nhà ...",
  text5: "Naen't",
  text6: "Nae",
  text7: "Ngày mai là ngày làm việc cuối cùng của a... A đã mặc sẵn vest và đi xe wave a đón người anh yêu đi chơi nhé hgiamie!",
  text8: "If you say yes, please click here!",
  text9: "Vâng tất nhiên rồi!",
  text10: "Nếu đã vào đến đây rồi thì a có vài lời nói dành cho người a yêu",
  text11:
    "Hãy ấn tiếp và chọn một bộ phim em thích rồi để lại câu trả lời trên Locket. All I Want For Christmas Is You!!!",
  text12: "Nae ^-^",
};

$(document).ready(function () {
  // process bar
  setTimeout(function () {
    firstQuestion();
    $(".spinner").fadeOut();
    $("#preloader").delay(350).fadeOut("slow");
    $("body").delay(350).css({
      overflow: "visible",
    });
  }, 600);

  $("#text3").html(textConfig.text3);
  $("#text4").html(textConfig.text4);
  $("#no").html(textConfig.text5);
  $("#yes").html(textConfig.text6);

  function firstQuestion() {
    $(".content").hide();
    Swal.fire({
      title: textConfig.text1,
      text: textConfig.text2,
      imageUrl: "img/meo.png",
      imageWidth: 300,
      imageHeight: 300,
      background: '#fff url("img/iput-bg.jpg")',
      imageAlt: "Custom image",
    }).then(function () {
      $(".content").show(200);
    });
  }

  // switch button position
  function switchButton() {
    var audio = new Audio("sound/duck.mp3");
    audio.play();
    var leftNo = $("#no").css("left");
    var topNO = $("#no").css("top");
    var leftY = $("#yes").css("left");
    var topY = $("#yes").css("top");
    $("#no").css("left", leftY);
    $("#no").css("top", topY);
    $("#yes").css("left", leftNo);
    $("#yes").css("top", topNO);
  }
  // move random button póition
  function moveButton() {
    var audio = new Audio("sound/Swish1.mp3");
    audio.play();
    if (screen.width <= 600) {
      var x = Math.random() * 300;
      var y = Math.random() * 500;
    } else {
      var x = Math.random() * 500;
      var y = Math.random() * 500;
    }
    var left = x + "px";
    var top = y + "px";
    $("#no").css("left", left);
    $("#no").css("top", top);
  }

  var n = 0;
  $("#no").mousemove(function () {
    if (n < 1) switchButton();
    if (n > 1) moveButton();
    n++;
  });
  $("#no").click(() => {
    if (screen.width >= 900) switchButton();
  });

  // generate text in input
  function textGenerate() {
    var n = "";
    var text = " " + textConfig.text9;
    var a = Array.from(text);
    var textVal = $("#txtReason").val() ? $("#txtReason").val() : "";
    var count = textVal.length;
    if (count > 0) {
      for (let i = 1; i <= count; i++) {
        n = n + a[i];
        if (i == text.length + 1) {
          $("#txtReason").val("");
          n = "";
          break;
        }
      }
    }
    $("#txtReason").val(n);
  }

  // show popup
  $("#yes").click(function () {
    var audio = new Audio("sound/tick.mp3");
    audio.play();
    Swal.fire({
      title: textConfig.text7,
      // html: true,
      width: 900,
      padding: "3em",
      // html: "<input type='text' class='form-control' id='txtReason'  placeholder='Em hãy điền vào đây nhé'>",
      background: '#fff url("img/iput-bg.jpg")',
      backdrop: `
                    rgba(0,0,123,0.4)
                    url("img/giphy2.gif")
                    left top
                    no-repeat
                  `,
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonColor: "#fe8a71",
      cancelButtonColor: "#f6cd61",
      confirmButtonText: textConfig.text8,
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          width: 900,
          confirmButtonText: textConfig.text12,
          background: '#fff url("img/iput-bg.jpg")',
          title: textConfig.text10,
          text: textConfig.text11,
          confirmButtonColor: "#83d0c9",
          onClose: () => {
            window.location = "https://www.cgv.vn/default/movies/now-showing.html";
          },
        });
      }
    });

    $("#txtReason").focus(function () {
      var handleWriteText = setInterval(function () {
        textGenerate();
      }, 10);
      $("#txtReason").blur(function () {
        clearInterval(handleWriteText);
      });
    });
  });
});
