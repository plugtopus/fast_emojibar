function save_options() {
	var likesxsmile = document["getElementById"]('xsmile').value;
	var kod_smile1 = document["getElementById"]('smile1').value;
	var kod_smile2 = document["getElementById"]('smile2').value;
	var kod_smile3 = document["getElementById"]('smile3').value;
	var kod_smile4 = document["getElementById"]('smile4').value;
	var kod_smile5 = document["getElementById"]('smile5').value;
	var kod_smile6 = document["getElementById"]('smile6').value;
	var kod_smile7 = document["getElementById"]('smile7').value;
	var kod_smile8 = document["getElementById"]('smile8').value;
	var kod_smile9 = document["getElementById"]('smile9').value;
	var kod_smile10 = document["getElementById"]('smile10').value;
	var kod_smile11 = document["getElementById"]('smile11').value;
	var kod_smile12 = document["getElementById"]('smile12').value;
	var kod_smile13 = document["getElementById"]('smile13').value;
	var kod_smile14 = document["getElementById"]('smile14').value;
	var kod_smile15 = document["getElementById"]('smile15').value;

	chrome.storage.sync.set({
		x: likesxsmile,
		kod1: kod_smile1,
		kod2: kod_smile2,
		kod3: kod_smile3,
		kod4: kod_smile4,
		kod5: kod_smile5,
		kod6: kod_smile6,
		kod7: kod_smile7,
		kod8: kod_smile8,
		kod9: kod_smile9,
		kod10: kod_smile10,
		kod11: kod_smile11,
		kod12: kod_smile12,
		kod13: kod_smile13,
		kod14: kod_smile14,
		kod15: kod_smile15
	}, function (items) {
		var status = document["getElementById"]('status');
		status.textContent = 'Настройки сохранены. Обновите страничку ВК';
		setTimeout(function () {
			status.textContent = ' ';
		}, 1750);
	});
}

function restore_options() {
	chrome.storage.sync.get({
		x: '15',
		kod1: 'D83DDE0A',
		kod2: 'D83DDE0C',
		kod3: 'D83DDE09',
		kod4: 'D83DDE04',
		kod5: 'D83EDD23',
		kod6: 'D83DDE33',
		kod7: 'D83DDE1A',
		kod8: 'D83DDE0D',
		kod9: 'D83DDE0E',
		kod10: '263A',
		kod11: 'D83DDE0F',
		kod12: 'D83DDE1F',
		kod13: 'D83EDD14',
		kod14: 'D83EDD17',
		kod15: 'D83DDE03',
		kodLoad: 'load'
	}, function (items) {
		document["getElementById"]('xsmile').value = items.x;
		document["getElementById"]('smile1').value = items.kod1;
		document["getElementById"]('smile2').value = items.kod2;
		document["getElementById"]('smile3').value = items.kod3;
		document["getElementById"]('smile4').value = items.kod4;
		document["getElementById"]('smile5').value = items.kod5;
		document["getElementById"]('smile6').value = items.kod6;
		document["getElementById"]('smile7').value = items.kod7;
		document["getElementById"]('smile8').value = items.kod8;
		document["getElementById"]('smile9').value = items.kod9;
		document["getElementById"]('smile10').value = items.kod10;
		document["getElementById"]('smile11').value = items.kod11;
		document["getElementById"]('smile12').value = items.kod12;
		document["getElementById"]('smile13').value = items.kod13;
		document["getElementById"]('smile14').value = items.kod14;
		document["getElementById"]('smile15').value = items.kod15;
	});
}

document.addEventListener('DOMContentLoaded', restore_options);
document["getElementById"]('save').addEventListener('click', save_options);
document["getElementById"]('view').addEventListener('click', view_options);

function view_options() {
	var smilebar = document["getElementById"]('smilebar');
	smilebar.innerHTML = "";
	var x = document["getElementById"]('xsmile').value;
	var i;
	for (i = 1; i <= x; i++) {
		var skod = 'smile' + i;
		var sid = document["getElementById"](skod).value;
		var simg = 'smile' + i + 'img';
		var shtml = '<img src="http://vk.com/images/emoji/' + sid + '.png" class="smile_bar"></a>';
		smilebar.innerHTML += shtml;
	}
}

window.onload = function () {
	var timer = setInterval(function () {
		var i;
		for (i = 1; i <= 15; i++) {
			var skod = 'smile' + i;
			var sid = document["getElementById"](skod).value;
			var simg = 'smile' + i + 'img';
			var simgid = document["getElementById"](simg);
			var shtml = '<img src="http://vk.com/images/emoji/' + sid + '.png" class="smile_table"></a>';
			simgid.innerHTML = shtml;
		}
	}, 1000);
}