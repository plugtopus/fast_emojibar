function loadSmile(e) {
	var o = document["getElementsByClassName"]("im-chat-input--textarea fl_l _im_text_input _emoji_field_wrap _voice_field_wrap"),
		k = document["createElement"]("div");
	k.className = "emoji_smile_container", o[0].appendChild(k), k.innerHTML = "";
	var i;
	for (i = 1; i <= x; i++) {
		var d = window["k" + i];
		k.innerHTML += '<a class="emoji_smile_cont2" onmousedown="Emoji.addEmoji(' + e + ", '" + d + '\' , this); return cancelEvent(event);" onclick="return cancelEvent(event);" onmouseover="return Emoji.emojiOver(' + e + ', this, true);"><img class="emoji" src="/images/emoji/' + d + '.png"></a>'
	}
}

function loadEmoji() {
	chrome.storage.sync.get({
		x: "7",
		kod1: "D83DDE0A",
		kod2: "D83DDE0C",
		kod3: "D83DDE09",
		kod4: "D83DDE04",
		kod5: "D83EDD23",
		kod6: "D83DDE33",
		kod7: "D83DDE1A",
		kod8: "D83DDE0D",
		kod9: "D83DDE0E",
		kod10: "263A",
		kod11: "D83DDE0F",
		kod12: "D83DDE1F",
		kod13: "D83DDC4D",
		kod14: "D83EDD17",
		kod15: "D83DDE03"
	}, function (e) {
		x = e.x, k1 = e.kod1, k2 = e.kod2, k3 = e.kod3, k4 = e.kod4, k5 = e.kod5, k6 = e.kod6, k7 = e.kod7, k8 = e.kod8, k9 = e.kod9, k10 = e.kod10, k11 = e.kod11, k12 = e.kod12, k13 = e.kod13, k14 = e.kod14, k15 = e.kod15
	})
}
var smile = !1,
	k1, k2, k3, k4, k5, k6, k7, k8, k9, k10, k11, k12, k13, k14, k15, x;
window.onload = function () {
	loadEmoji();
	setInterval(function () {
		var e = document["getElementsByClassName"]("im-chat-input--textarea fl_l _im_text_input _emoji_field_wrap _voice_field_wrap");
		if (!smile && 1 == e.length) {
			var o = document["getElementsByClassName"]("page_progress_preview media_preview clear_fix");
			for (j = 0; j <= o.length - 1; j++) var k = o[j].id,
				i = Number(k.replace(/\D+/g, ""));
			loadSmile(i - 1), smile = !0
		}
		smile && 0 == e.length && (smile = !1)
	}, 750)
};