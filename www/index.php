<?php
	function makePin($lenth =5) { 
    		// makes a random alpha numeric string of a given lenth 
		$aZ09 = array_merge(range('a', 'z'),range(0, 9)); 
		$out =''; 
		for($c=0;$c < $lenth;$c++) { 
			$out .= $aZ09[mt_rand(0,count($aZ09)-1)]; 
		} 
		return $out; 
	}

	if ($_GET["id"] && (strlen($_GET["id"]) == 10 || $_GET["id"] == "leben") && $_GET["lang"]) { // Estoy entrando a un chat
		$autojoin = $_GET["id"];
		$lang = $_GET["lang"];	
	} else { // Estoy entrando a la página de inicio
		header('Location: http://eroomba.com/es/' . makePin(10));
	}
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="content-type" content="text/html;charset=UTF-8">
	<title>Roomba!</title>
	<link rel="shortcut icon" href="/candy/res/img/favicon.png" type="image/gif">
	<link rel="stylesheet" type="text/css" href="/candy/res/default.css">
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js"></script>
	<script type="text/javascript" src="/candy/libs/libs.bundle.js"></script>
	<script type="text/javascript" src="/candy/candy.bundle.js"></script>
	<script type="text/javascript" src="http://s7.addthis.com/js/250/addthis_widget.js#pubid=ra-4f064b8360b3dcd6"></script>
	<script type="text/javascript">
		$(document).ready(function() {
			Candy.init('http-bind/', {
				core: { debug: false, autojoin: ['<? echo $autojoin ?>@conference.fermin'] },
				view: { resources: '/candy/res/', language: '<? echo $lang ?>' }
			});
			$('#salir').html(Mustache.to_html($('#salir').html(), Candy.View.Translation[Candy.View.getOptions().language]));
			$('#QR').attr('src', 'http://chart.googleapis.com/chart?chs=100x100&cht=qr&chl=' + $(location).attr('href'));
			$('#salir a').click(function(){
				Candy.Util.deleteCookie("Roomba_User");
				location.reload();
			});
			$('#lang').change(function() {
				var newlang = $('#lang :selected').val();
				location.href = 'http://eroomba.com/' + newlang + '/' + '<? echo $autojoin ?>';
			});	

			if (Candy.Util.cookieExists('Roomba_User')) {
				var Roomba_User = Candy.Util.getCookie('Roomba_User');
				Candy.Core.connect('localhost', null, Roomba_User);
			} else {
				Candy.Core.connect('localhost');
			}
		});
	</script>
</head>
<body>
	<div id="besocial">
		<div id="logo-roomba"></div>
		<div id="qrsala">
			<img id="QR" src="" alt="QR">
		</div>
		<div id="social-box">	
			<div id="salir">
				<a href="#">{{exit}} | {{changeNick}}</a> | {{lang}}
				<select id="lang">
					<option value="es" <? if ($_GET["lang"] == "es") echo 'selected="selected"' ?>>{{spanish}}</option>
					<option value="en" <? if ($_GET["lang"] == "en") echo 'selected="selected"' ?>>{{english}}</option>
					<option value="fr" <? if ($_GET["lang"] == "fr") echo 'selected="selected"' ?>>{{french}}</option>
					<option value="de" <? if ($_GET["lang"] == "de") echo 'selected="selected"' ?>>{{german}}</option>
					<option value="nl" <? if ($_GET["lang"] == "nl") echo 'selected="selected"' ?>>{{nederlands}}</option>
					<option value="cn" <? if ($_GET["lang"] == "cn") echo 'selected="selected"' ?>>{{chinese}}</option>
				</select>
			</div>
			<!-- AddThis Button BEGIN -->
			<div class="addthis_toolbox addthis_default_style ">
				<a class="addthis_button_facebook_like"></a>
				<a class="addthis_button_tweet"></a>
				<a class="addthis_button_google_plusone"></a>
			</div>
			<!-- AddThis Button END -->		
		</div>
		<form action="https://www.paypal.com/cgi-bin/webscr" method="post" id="donacion">
			<input type="hidden" name="cmd" value="_donations">
			<input type="hidden" name="business" value="jelle.jdc@gmail.com">
			<input type="hidden" name="lc" value="ES">
			<input type="hidden" name="item_name" value="Roomba">
			<input type="hidden" name="no_note" value="0">
			<input type="hidden" name="currency_code" value="EUR">
			<input type="hidden" name="bn" value="PP-DonationsBF:btn_donateCC_LG.gif:NonHostedGuest">
			<input type="image" src="/candy/res/img/donacion.png" name="submit" alt="Nada se sostiene sin ayuda">
			<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
		</form>
	</div>
	<div id="candy"></div>
</body>
</html>
